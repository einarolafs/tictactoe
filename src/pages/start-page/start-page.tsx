import React from 'react'
import { Link } from 'react-router-dom'

import { paths } from '../../router'

const StartPage: React.FC = () => (
  <div>
    <h1>Welcome to the Card Triage app</h1>
    <Link to={paths.CARDS}>Click here to continue</Link>
  </div>
)

export default StartPage
