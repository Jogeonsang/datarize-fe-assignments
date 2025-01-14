import styled from '@emotion/styled'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...props }, ref) => {
  return (
    <Container>
      {label && <Label>{label}</Label>}
      <StyledInput ref={ref} hasError={!!error} {...props} />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  )
})

Input.displayName = 'Input'

export default Input

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`

const Label = styled.label`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`

const StyledInput = styled.input<{ hasError?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${(props) => (props.hasError ? '#ef4444' : '#d1d5db')};
  border-radius: 8px;
  font-size: 14px;
  line-height: 20px;
  width: 100%;
  outline: none;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &::placeholder {
    color: #9ca3af;
  }

  &:hover {
    border-color: ${(props) => (props.hasError ? '#ef4444' : '#9ca3af')};
  }

  &:focus {
    border-color: ${(props) => (props.hasError ? '#ef4444' : '#2563eb')};
    box-shadow: 0 0 0 2px ${(props) => (props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(37, 99, 235, 0.1)')};
  }
`

const ErrorMessage = styled.span`
  font-size: 12px;
  color: #ef4444;
`
