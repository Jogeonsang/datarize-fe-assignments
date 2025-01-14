import * as S from './style'
import { PeriodType } from '../type'
import { useState, useTransition } from 'react'
import DatePicker from './DatePicker'

type PurchasePeriodProps = {
  selectedPeriod: PeriodType
  setSelectedPeriod: (period: PeriodType) => void
  setDateRange: (range: { from: Date; to: Date } | undefined) => void
}

function PurchasePeriod({ selectedPeriod, setSelectedPeriod, setDateRange }: PurchasePeriodProps) {
  const [selectedRange, setSelectedRange] = useState<{ from?: Date; to?: Date } | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [, startTransition] = useTransition()

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period)
    if (period === '30days') {
      setDateRange(undefined)
    }
  }

  const handleDateRangeSelect = (range: { from?: Date; to?: Date } | undefined) => {
    if (!range?.from || !range.to || range.from === range.to) {
      setSelectedRange(null)
      return
    }

    const fromDate = new Date(range.from)
    fromDate.setHours(0, 0, 0, 0)

    const toDate = new Date(range.to)
    toDate.setHours(23, 59, 59, 999)

    setSelectedRange({ from: fromDate, to: toDate })
    setIsOpen(false)

    startTransition(() => {
      setDateRange({ from: fromDate, to: toDate })
    })

    setSelectedPeriod('custom')
  }

  return (
    <S.PeriodSelector>
      <S.TabList>
        <S.TabBackground
          animate={{
            x: selectedPeriod === '30days' ? 0 : '100%',
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
        <S.TabItem onClick={() => handlePeriodChange('30days')} isActive={selectedPeriod === '30days'}>
          최근 30일
        </S.TabItem>
        <DatePicker
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          onRangeSelect={handleDateRangeSelect}
          selectedRange={selectedRange}
          trigger={
            <S.TabItem onClick={() => setIsOpen(true)} isActive={selectedPeriod === 'custom'}>
              날짜선택
            </S.TabItem>
          }
        />
      </S.TabList>
    </S.PeriodSelector>
  )
}

export default PurchasePeriod
