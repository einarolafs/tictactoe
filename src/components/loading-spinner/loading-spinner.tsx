import React from 'react'

import './loading-spinner.scss'

interface LoadingSpinnerProps {
  className?: string
  /* eslint-disable-next-line react/no-unused-prop-types */
  styleName?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ className }: LoadingSpinnerProps) => (
  <div styleName="spinner" className={className} />
)

export default LoadingSpinner
