import { DayPicker, DayPickerProps } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { css } from '@emotion/react'

function Calendar(props: DayPickerProps) {
  return (
    <div css={calendarStyles}>
      <DayPicker
        {...props}
        captionLayout="dropdown"
        ISOWeek
        hideNavigation
        styles={{
          day: { margin: 0 },
          day_selected: { backgroundColor: '#f9ffa8' },
          day_today: { color: '#000000' },
          day_range_start: {
            backgroundColor: '#f9ffa8 !important',
            color: 'black !important',
          },
          day_range_end: {
            backgroundColor: '#f9ffa8 !important',
            color: 'black !important',
          },
          day_range_middle: { backgroundColor: 'rgba(249, 255, 168, 0.3)' },
        }}
        modifiersStyles={{
          selected: { backgroundColor: '#f9ffa8 !important' },
          range_start: { backgroundColor: '#f9ffa8 !important' },
          range_end: { backgroundColor: '#f9ffa8 !important' },
          range_middle: { backgroundColor: 'rgba(249, 255, 168, 0.3)' },
        }}
      />
    </div>
  )
}

export default Calendar

const calendarStyles = css`
  .rdp {
    margin: 0;
    --rdp-range_start-date-background-color: #f9ffa8;
    --rdp-range_start-color: black;
    --rdp-range_end-date-background-color: #f9ffa8;
    --rdp-range_end-color: black;
  }

  .rdp-root {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rdp-months {
    background-color: white;
    border-radius: 8px;
    padding: 16px;
  }

  .rdp-selected {
    font: inherit;
  }
  .rdp-day_selected {
    background-color: #f9ffa8 !important;
    color: black !important;
  }

  .rdp-day_selected:hover {
    background-color: #f0f68c !important;
  }

  .rdp-range_start {
    color: black !important;
    background: linear-gradient(var(--rdp-gradient-direction), transparent 50%, rgba(249, 255, 168, 0.4) 50%);
  }

  .rdp-range_end {
    color: black !important;
    background: linear-gradient(var(--rdp-gradient-direction), rgba(249, 255, 168, 0.4) 50%, transparent 50%);
  }

  .rdp-range_start .rdp-day_button,
  .rdp-range_end .rdp-day_button {
    background-color: #ffe855 !important;
    color: black !important;
    border: 1px solid #ffe855 !important;
  }

  .rdp-range_middle .rdp-day_button {
    background-color: rgba(249, 255, 168, 0.2) !important;
    color: black !important;
  }

  .rdp-day:hover {
    background-color: rgba(249, 255, 168, 0.4) !important;
  }

  .rdp-day_range_middle {
    background-color: rgba(249, 255, 168, 0.3) !important;
  }

  .rdp-today:not(.rdp-outside) {
    color: #ffe855;
  }

  .rdp-chevron {
    fill: #000;
  }
`
