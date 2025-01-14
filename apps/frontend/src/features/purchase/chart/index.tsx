import { Bar, BarChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis } from 'recharts'
import { usePurchases } from '~/hooks/query/usePurchases'
import useResponsive from '~/hooks/useResponsive'
import * as S from './style'

import { css } from '@emotion/react'

type PurchaseChartProps = {
  dateRange: { from?: Date; to?: Date } | undefined
}

function PurchaseChart({ dateRange }: PurchaseChartProps) {
  const { isMobile } = useResponsive()
  const { data } = usePurchases(dateRange)

  const formatXAxis = (value: string) => {
    const [start] = value.split(' - ').map((v) => parseInt(v.replace(/,/g, '')))
    const manWon = (start / 10000).toFixed(0)

    if (isMobile) {
      if (manWon === '0') {
        return '~2만'
      }
      return `${manWon}만`
    }

    if (manWon === '0') {
      return '2만원 이하'
    }
    return `${manWon}만원~${Number(manWon) + 1}만원`
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <XAxis
          dataKey="range"
          axisLine={false}
          tickLine={false}
          tickFormatter={formatXAxis}
          interval={0}
          height={60}
          fontSize={isMobile ? 12 : 14}
          textAnchor={isMobile ? 'end' : 'middle'}
        />
        <Tooltip cursor={{ fill: 'transparent' }} content={CustomTooltip} />
        <Bar dataKey="count" radius={[8, 8, 0, 0]} fill={'#F9FFA8'} activeBar={{ fill: '#F6FF91' }} />
      </BarChart>
    </ResponsiveContainer>
  )
}

function CustomTooltip({ active, payload }: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    const [start, end] = payload[0].payload.range.split(' - ')
    const startWon = (parseInt(start.replace(/,/g, '')) / 10000).toFixed(0)
    const endWon = (parseInt(end.replace(/,/g, '')) / 10000).toFixed(0)

    const rangeText = startWon === '0' ? '2만원 이하' : `${startWon}만원 ~ ${Number(endWon)}만원`

    return (
      <S.TooltipWrapper>
        <p
          css={css`
            font-size: 16px;
          `}
        >
          {rangeText}
        </p>
        <p
          css={css`
            color: #777;
            margin-top: 4px;
            font-size: 14px;
          `}
        >
          {`${payload[0].value?.toLocaleString()}건 구매`}
        </p>
      </S.TooltipWrapper>
    )
  }

  return null
}

export default PurchaseChart
