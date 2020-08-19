/* eslint-disable jsx-a11y/no-static-element-interactions, promise/avoid-new */
import React, { useCallback, useState, useEffect, useRef } from 'react'
import classcat from 'classcat'

import './cards-page.scss'

type ItemProps = {
  id: number
  onClick: (id: number) => void
  children: string
  checked: boolean
}

const circle = '\u2756'
const ex = '\u2717'

const Item: React.FC<ItemProps> = ({ id, onClick, children, checked }: ItemProps) => {
  const handleClick = useCallback(() => {
    onClick(id)
  }, [id, onClick])

  const classes = classcat(['item', { checked, [children]: children }])

  return <span styleName={classes} onClick={handleClick} />
}

type User = 'x' | 'o' | null
type BoardState = { id: number; checked: User }

const checkLines = (lines: number[][], board: [{ id: number; checked: User }], user: User): number[] | boolean => {
  let foundLine: number[] | boolean = false

  lines.forEach((line) => {
    const isLineChecked = line.every((id) => board[id - 1].checked === user)

    if (isLineChecked) {
      foundLine = line
    }
  })

  return foundLine
}

const CardsPage: React.FC = () => {
  const [boardState, setBoardState] = useState<BoardState[]>(
    new Array(9).fill(null).map((_, index): BoardState => ({ id: index + 1, checked: null }))
  )
  const [user, setUser] = useState<User>('x')
  const [lineChecked, setLineChecked] = useState<number[]>([0, 0, 0])
  const [gameOver, setGameOver] = useState<boolean>(false)

  const peerId = useRef<string>()

  const peerConnection = useRef<any>()
  const inputRef = useRef()

  useEffect(() => {
    peerConnection.current = new window.Peer()

    peerConnection.current.on('open', (id: string) => {
      console.log(id)
      peerId.current = id
    })

    peerConnection.current.on('connection', (conn) => {
      conn.on('open', function (data) {
        conn.on('data', function (data) {
          console.log('Received', data)
        })
      })
    })
  }, [])

  const onPerrClick = useCallback(() => {
    const connect = peerConnection.current.connect(inputRef.current.value)

    connect.on('open', function() {
      // Receive messages
      connect.send('Hello!')
    })

    connect.send('Hello!')
  }, [])

  const checkStatus = useCallback(
    (board) => {
      const rows = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]

      const columns = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
      ]

      const cross = [
        [1, 5, 9],
        [3, 5, 7],
      ]

      const rowChecked = checkLines(rows, board, user)
      const columnChecked = checkLines(columns, board, user)
      const crossChecked = checkLines(cross, board, user)

      console.log({ rowChecked, columnChecked, crossChecked })

      if (rowChecked instanceof Array) {
        setLineChecked(rowChecked)
        setGameOver(true)
      }

      if (columnChecked instanceof Array) {
        setLineChecked(columnChecked)
        setGameOver(true)
      }

      if (crossChecked instanceof Array) {
        setLineChecked(crossChecked)
        setGameOver(true)
      }
    },
    [user]
  )

  const handleClick = useCallback(
    (id) => {
      const newBoardState = [...boardState]

      if (boardState[id - 1].checked || gameOver) {
        return
      }

      newBoardState[id - 1].checked = user

      checkStatus(newBoardState)

      setBoardState(newBoardState)
      setUser(user === 'x' ? 'o' : 'x')
    },
    [boardState, user, checkStatus, gameOver]
  )

  const userIcon = () => user === 'x' ? ex : circle

  return (
    <div>
      {!gameOver && (
        <div styleName="player">
          Player: <span styleName="icon">{userIcon()}</span>
        </div>
      )}

      {gameOver && (
        <div styleName="game-over">
          Game Over, winner is <span styleName="icon">{userIcon()}</span>
        </div>
      )}

      <div styleName="game">
        {boardState.map(({ id, checked }) => (
          <Item onClick={handleClick} key={id} id={id} checked={lineChecked.includes(id)}>
            {checked ? checked : ''}
          </Item>
        ))}
      </div>
      <input ref={inputRef} type="text" />
      <input type="button" onClick={onPerrClick} value="click to send" />
    </div>
  )
}

export default CardsPage
