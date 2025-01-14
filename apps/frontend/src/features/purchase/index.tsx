import { useState } from 'react'
import PurchaseChart from './chart'
import PurchasePeriod from './period'
import * as S from './style'

import { PeriodType } from './type'
import { DateRange } from 'react-day-picker'

function Purchase() {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('30days')
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  })

  return (
    <S.Container>
      <PurchasePeriod
        selectedPeriod={selectedPeriod}
        setSelectedPeriod={setSelectedPeriod}
        setDateRange={setDateRange}
      />
      <PurchaseChart dateRange={dateRange} />
    </S.Container>
  )
}

export default Purchase
