import {
  Component,
  ComponentPropsWithoutRef,
  ComponentType,
  ErrorInfo,
  forwardRef,
  PropsWithChildren,
  PropsWithRef,
  ReactNode,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { ErrorBoundaryGroupContext } from './error-boundary-group'
import { ComponentPropsWithoutChildren } from './types/index'

import { isDifferentArray } from '~utils/isDifferntArray'

type RenderFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType
  reset: () => void
}

type RenderFallbackType = <ErrorType extends Error>(props: RenderFallbackProps<ErrorType>) => ReactNode
type IgnoreErrorType = <ErrorType extends Error = Error>(error: ErrorType) => boolean

type Props<ErrorType extends Error = Error> = {
  resetKeys?: unknown[]
  onReset?(): void
  renderFallback: RenderFallbackType
  onError?(error: ErrorType, info: ErrorInfo): void
  ignoreError?: IgnoreErrorType
}

interface State<ErrorType extends Error = Error> {
  error: ErrorType | null
}

const initialState: State = {
  error: null,
}

class BaseErrorBoundary extends Component<PropsWithRef<PropsWithChildren<Props>>, State> {
  state = initialState

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const { onError, ignoreError } = this.props

    if (ignoreError?.(error)) {
      throw error
    }

    onError?.(error, info)
  }

  resetErrorBoundary = () => {
    this.props.onReset?.()
    this.setState(initialState)
  }

  componentDidUpdate(prevProps: Props) {
    if (this.state.error == null) {
      return
    }

    if (isDifferentArray(prevProps.resetKeys, this.props.resetKeys)) {
      this.resetErrorBoundary()
    }
  }

  render() {
    const { children, renderFallback } = this.props
    const { error } = this.state

    if (error != null) {
      return renderFallback({
        error,
        reset: this.resetErrorBoundary,
      })
    }

    return children
  }
}

export const ErrorBoundary = forwardRef<{ reset(): void }, ComponentPropsWithoutRef<typeof BaseErrorBoundary>>(
  (props, resetRef) => {
    const group = useContext(ErrorBoundaryGroupContext) ?? { resetKey: 0 }
    const resetKeys = [group.resetKey, ...(props.resetKeys || [])]

    const ref = useRef<BaseErrorBoundary>(null)
    useImperativeHandle(resetRef, () => ({
      reset: () => ref.current?.resetErrorBoundary(),
    }))

    return <BaseErrorBoundary {...props} resetKeys={resetKeys} ref={ref} />
  },
)

if (process.env.NODE_ENV !== 'production') {
  ErrorBoundary.displayName = 'ErrorBoundary'
}

export const useErrorBoundary = <ErrorType extends Error>() => {
  const [error, setError] = useState<ErrorType | null>(null)

  if (error != null) {
    throw error
  }

  return setError
}

export const withErrorBoundary = <Props extends Record<string, unknown>>(
  Component: ComponentType<Props>,
  errorBoundaryProps: ComponentPropsWithoutChildren<typeof ErrorBoundary>,
) => {
  const Wrapped = (props: Props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      {/* @ts-expect-error - Props type inference limitation with HOC */}
      <Component {...props} />
    </ErrorBoundary>
  )

  if (process.env.NODE_ENV !== 'production') {
    const name = Component.displayName || Component.name || 'Component'
    Wrapped.displayName = `withErrorBoundary(${name})`
  }

  return Wrapped
}
