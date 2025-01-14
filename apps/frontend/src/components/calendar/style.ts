import styled from '@emotion/styled'

export const CalendarContainer = styled.div`
  padding: 20px;
  background: white;
  border-radius: 8px;
  min-width: 320px;
`

export const Header = styled.div`
  margin-bottom: 16px;
  text-align: center;
`

export const MonthTitle = styled.h2`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`

export const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 8px;
`

export const DayOfWeek = styled.div<{ isDayoff: boolean }>`
  text-align: center;
  font-size: 13px;
  color: ${({ isDayoff }) => (isDayoff ? '#ff5252' : '#000')};
`

export const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0;
  padding: 12px;
`

export const Day = styled.button<{
  isSelected: boolean
  isToday: boolean
  isAvailable: boolean
  isDayoff: boolean
  isRangeStart?: boolean
  isRangeEnd?: boolean
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  border: none;
  z-index: 1;

  background: ${({ isSelected, isRangeStart, isRangeEnd }) => {
    if (isRangeStart) return 'linear-gradient(to right, transparent 50%, rgba(249, 255, 168, 0.3) 50%)'
    if (isRangeEnd) return 'linear-gradient(to left, transparent 50%, rgba(249, 255, 168, 0.3) 50%)'
    if (isSelected) return 'rgba(249, 255, 168, 0.3)'
    return 'transparent'
  }};

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: ${({ isRangeStart, isRangeEnd }) => (isRangeStart || isRangeEnd ? '#FFE855' : 'transparent')};
    z-index: -1;
    transition: background-color 0.2s;
  }

  color: ${({ isAvailable, isDayoff, isRangeStart, isRangeEnd, isSelected }) => {
    if (!isAvailable) return '#ccc'
    if (isRangeStart || isRangeEnd) return '#000'
    if (isDayoff) return '#ff5252'
    if (isSelected) return '#666'
    return '#000'
  }};

  cursor: ${({ isAvailable }) => (isAvailable ? 'pointer' : 'default')};
  font-weight: ${({ isRangeStart, isRangeEnd }) => (isRangeStart || isRangeEnd ? '600' : 'normal')};
  font-size: 16px;

  &:hover {
    ${({ isAvailable }) =>
      isAvailable &&
      `
      &::before {
        background-color: rgba(255, 232, 85, 0.4);
      }
    `}
  }
`

export const EmptyDay = styled.div`
  aspect-ratio: 1;
`

export const TodayDot = styled.span`
  position: absolute;
  bottom: 4px;
  color: #05b0ff;
  font-size: 10px;
  font-weight: 700;
  z-index: 2;
`
