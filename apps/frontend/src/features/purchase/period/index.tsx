import * as S from './style'
import Popover from '~/components/popover'
import { PeriodType } from '../type'
import Calendar from '~/components/calendar'
import { DateRange } from 'react-day-picker'
import { useState, useTransition } from 'react'

type PurchasePeriodProps = {
  selectedPeriod: PeriodType
  setSelectedPeriod: (period: PeriodType) => void
  setDateRange: (range: DateRange) => void
}

function PurchasePeriod({ selectedPeriod, setSelectedPeriod, setDateRange }: PurchasePeriodProps) {
  const [selectedRange, setSelectedRange] = useState<DateRange>({ from: undefined, to: undefined })
  const [isOpen, setIsOpen] = useState(false)
  const [, startTransition] = useTransition()

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period)
    if (period === '30days') {
      setDateRange({ from: undefined, to: undefined })
    }
  }

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    if (!range || !range.to || range.from === range.to) {
      setSelectedRange({ from: range?.from, to: undefined })
      return
    }

    if (range.from && range.to) {
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
  }

  const disabledDays = (day: Date) => {
    if (day.getFullYear() !== 2024 || day.getMonth() !== 6) {
      return true
    }

    if (selectedRange.from) {
      const startDate = new Date(selectedRange.from)
      const maxDate = new Date(startDate)
      maxDate.setDate(startDate.getDate() + 29)
      const minDate = new Date(startDate)
      minDate.setDate(startDate.getDate() - 29)

      return day > maxDate || day < minDate
    }
    return false
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
        <Popover
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          trigger={
            <S.TabItem
              onClick={() => {
                setIsOpen(true)
              }}
              isActive={selectedPeriod === 'custom'}
            >
              날짜선택
            </S.TabItem>
          }
          content={
            <Calendar
              mode="range"
              defaultMonth={new Date(2024, 6)}
              selected={selectedRange}
              onSelect={handleDateRangeSelect}
              disabled={disabledDays}
            />
          }
        />
      </S.TabList>
    </S.PeriodSelector>
  )
}

export default PurchasePeriod
