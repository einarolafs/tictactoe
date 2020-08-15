/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/anchor-is-valid */
import React, { ReactChildren, ReactChild } from 'react'

import './error-boundary.scss'

type ErrorBoundaryProps = {
  children: ReactChildren | ReactChild
}

type ErrorBoundaryState = {
  hasError: string | boolean
  showError: boolean
}

class ErrorBoundary extends React.Component {
  static getDerivedStateFromError(error: Error): { hasError: string } {
    return { hasError: error.toString() }
  }

  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      showError: false,
    }
    this.props = props
  }

  state: ErrorBoundaryState
  props: ErrorBoundaryProps

  handleReload = (event: React.SyntheticEvent): void => {
    event.preventDefault()

    window.location.reload()
  }

  handleShowError = (event: React.SyntheticEvent): void => {
    const { showError } = this.state

    event.preventDefault()

    this.setState({ showError: !showError })
  }

  render(): React.ReactChildren | React.ReactChild | JSX.Element {
    const { hasError, showError } = this.state
    const { children } = this.props

    if (hasError) {
      return (
        <div styleName="error-container">
          <div styleName="content">
            <h1>Something went wrong.</h1>
            <p>
              Something seem to have failed in the application, try again by{' '}
              <a href="#" onClick={this.handleReload}>
                reloading
              </a>
            </p>
            <p>
              If the issue persists, contact the developer <a href="mailto:einsiol@gmail.com">contact the developer</a>{' '}
            </p>
            <a href="#" onClick={this.handleShowError}>
              {showError ? 'Hide error' : 'Show Error'}
            </a>
            {showError && <pre styleName="error">{hasError.toString()}</pre>}
          </div>
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundary
