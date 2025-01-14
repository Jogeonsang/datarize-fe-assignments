import styled from '@emotion/styled'

export const Container = styled.div`
  position: relative;
  display: inline-block;
`

export const Trigger = styled.div`
  cursor: pointer;
`

export const Content = styled.div`
  position: fixed;
  z-index: 1000;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  @media (max-width: 768px) {
    border-radius: 8px 8px 0 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  }
`
