import React from 'react'
import { Link } from 'react-router-dom'

import { paths } from '../../router'

const StartPage: React.FC = () => (
  <div>
    <h1>Welcome to a Tic Tac Toe game</h1>
    <Link to={paths.game.split('/:')[0]}>Click here to start</Link>
  </div>
)

export default StartPage
