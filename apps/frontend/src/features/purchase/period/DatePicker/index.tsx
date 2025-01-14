import { useCallback, useState } from 'react'
import Calendar from '~/components/calendar'
import BottomSheet from '~/components/bottom-sheet'
import Popover from '~/components/popover'
import useResponsive from '~/hooks/useResponsive'

type RangeModeProps = {
  selectedRange?: { from?: Date; to?: Date } | null
  onRangeSelect: (range: { from?: Date; to?: Date } | undefined) => void
}

type DatePickerProps = {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  defaultMonth?: Date
  trigger: React.ReactNode
} & RangeModeProps

function DatePicker({ isOpen, onOpenChange, selectedRange, onRangeSelect, trigger }: DatePickerProps) {
  const { isMobile } = useResponsive()
  const [tempRange, setTempRange] = useState<{ from?: Date; to?: Date } | null>(null)

  const handleRangeSelect = useCallback(
    (range: { from?: Date; to?: Date } | null) => {
      if (!range) {
        setTempRange(null)
        onRangeSelect(undefined)
        return
      }

      if (!tempRange?.from) {
        setTempRange({ from: range.from, to: undefined })
        onRangeSelect({ from: range.from, to: undefined })
      } else {
        const finalRange = {
          from: tempRange.from,
          to: range.to,
        }
        setTempRange(null)
        onRangeSelect(finalRange)
      }
    },
    [tempRange, onRangeSelect],
  )

  const renderCalendar = useCallback(
    () => (
      <Calendar
        mode="range"
        selectedRange={
          tempRange?.from
            ? {
                from: tempRange.from,
                to: tempRange.to || tempRange.from,
              }
            : selectedRange?.from
            ? {
                from: selectedRange.from,
                to: selectedRange.to || selectedRange.from,
              }
            : null
        }
        onRangeSelect={handleRangeSelect}
        defaultMonth={new Date(2024, 6)}
      />
    ),
    [selectedRange, tempRange, handleRangeSelect],
  )

  if (isMobile) {
    return (
      <>
        {trigger}
        <BottomSheet isOpen={isOpen} onClose={() => onOpenChange(false)}>
          {renderCalendar()}
        </BottomSheet>
      </>
    )
  }

  return <Popover isOpen={isOpen} onOpenChange={onOpenChange} trigger={trigger} content={renderCalendar()} />
}

export default DatePicker
