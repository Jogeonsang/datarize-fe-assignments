import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isWithinInterval,
  isBefore,
} from 'date-fns'
import { ko } from 'date-fns/locale'
import * as S from './style'

type SingleModeProps = {
  mode: 'single'
  selectedDate?: Date | null
  onDateSelect: (date: Date) => void
  selectedRange?: never
  onRangeSelect?: never
}

type RangeModeProps = {
  mode: 'range'
  selectedRange?: { from: Date; to: Date } | null
  onRangeSelect: (range: { from: Date; to: Date } | null) => void
  selectedDate?: never
  onDateSelect?: never
}

type BaseCalendarProps = {
  availableDates?: string[]
  minDate?: Date
  maxDate?: Date
  defaultMonth?: Date
}

type CalendarProps = BaseCalendarProps & (SingleModeProps | RangeModeProps)

function Calendar({
  mode,
  selectedDate,
  selectedRange,
  onDateSelect,
  onRangeSelect,
  availableDates,
  minDate,
  maxDate,
  defaultMonth,
}: CalendarProps) {
  const today = defaultMonth || new Date()
  const firstDayOfMonth = startOfMonth(today)
  const lastDayOfMonth = endOfMonth(today)

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  })

  const startingDayIndex = firstDayOfMonth.getDay()
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']

  const isDateAvailable = (date: Date) => {
    if (!availableDates) return true
    return availableDates.includes(format(date, 'yyyy-MM-dd'))
  }

  const isDateSelectable = (date: Date) => {
    if (minDate && date < minDate) return false
    if (maxDate && date > maxDate) return false
    return isDateAvailable(date)
  }

  const isInRange = (date: Date) => {
    if (!selectedRange) return false
    return isWithinInterval(date, {
      start: selectedRange.from,
      end: selectedRange.to,
    })
  }

  const isRangeStart = (date: Date) => {
    return selectedRange?.from && isSameDay(date, selectedRange.from)
  }

  const isRangeEnd = (date: Date) => {
    return selectedRange?.to && isSameDay(date, selectedRange.to)
  }

  const handleDateClick = (date: Date) => {
    if (!isDateSelectable(date)) return

    if (mode === 'single' && onDateSelect) {
      onDateSelect(date)
      return
    }

    if (mode === 'range' && onRangeSelect) {
      if (!selectedRange) {
        onRangeSelect({ from: date, to: date })
      } else if (!selectedRange.to || isSameDay(selectedRange.from, selectedRange.to)) {
        // 첫 번째 날짜가 이미 선택된 경우
        if (isBefore(date, selectedRange.from)) {
          onRangeSelect({ from: date, to: selectedRange.from })
        } else {
          onRangeSelect({ from: selectedRange.from, to: date })
        }
      } else {
        // 새로운 범위 시작
        onRangeSelect({ from: date, to: date })
      }
    }
  }

  return (
    <S.CalendarContainer>
      <S.Header>
        <S.MonthTitle>{format(today, 'yyyy년 MM월', { locale: ko })}</S.MonthTitle>
      </S.Header>

      <S.DaysOfWeek>
        {daysOfWeek.map((day, index) => (
          <S.DayOfWeek key={day} isDayoff={index === 0 || index === 6}>
            {day}
          </S.DayOfWeek>
        ))}
      </S.DaysOfWeek>

      <S.DaysGrid>
        {Array.from({ length: startingDayIndex }).map((_, index) => (
          <S.EmptyDay key={`empty-${index}`} />
        ))}

        {daysInMonth.map((date) => {
          const isSelected =
            mode === 'single' ? (selectedDate ? isSameDay(date, selectedDate) : false) : isInRange(date)
          const selectable = isDateSelectable(date)
          const rangeStart = isRangeStart(date)
          const rangeEnd = isRangeEnd(date)

          return (
            <S.Day
              key={format(date, 'yyyy-MM-dd')}
              onClick={() => handleDateClick(date)}
              isSelected={isSelected}
              isToday={isToday(date)}
              isAvailable={selectable}
              isDayoff={date.getDay() === 0 || date.getDay() === 6}
              isRangeStart={rangeStart}
              isRangeEnd={rangeEnd}
            >
              {date.getDate()}
              {isToday(date) && <S.TodayDot>•</S.TodayDot>}
            </S.Day>
          )
        })}
      </S.DaysGrid>
    </S.CalendarContainer>
  )
}

export default Calendar
