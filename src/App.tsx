/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useState, useEffect, useRef, SyntheticEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import classcat from 'classcat'

import { paths } from './router'
// import config from '../../config'

import styles from './App.scss'

const { DOMAIN } = process.env

interface ItemProps {
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

  return <span className={classes} onClick={handleClick} />
}

type User = 'x' | 'o' | null
type BoardState = { id: number; checked: User }

const checkLines = (lines: number[][], board: BoardState[], user: User): number[] | boolean => {
  let foundLine: number[] | boolean = false

  lines.forEach((line) => {
    const isLineChecked = line.every((id) => board[id - 1].checked === user)

    if (isLineChecked) {
      foundLine = line
    }
  })

  return foundLine
}

const getPlayingUser = (remote: boolean, user: User) => {
  if (remote) {
    return user === 'x' ? 'o' : 'x'
  }

  return user
}

interface MatchParams {
  playerId: string
}

const CardsPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }: RouteComponentProps<MatchParams>) => {
  const [boardState, setBoardState] = useState<BoardState[]>(
    new Array(9).fill(null).map((_, index): BoardState => ({ id: index + 1, checked: null }))
  )
  const [user, setUser] = useState<User>('x')
  const userRef = useRef<User>('x')
  const [lineChecked, setLineChecked] = useState<number[]>([0, 0, 0])
  const [gameOver, setGameOver] = useState<User | boolean>(false)
  const [playerTurn, setPlayerTurn] = useState<boolean>(true)

  const [playerId, setPlayerId] = useState<string>()

  const [peerId, setPeerId] = useState<string>()

  const peer = useRef<any>()
  const peerConnection = useRef<any>()

  const checkStatus = useCallback((board: BoardState[], remote: boolean) => {
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

    const currentUser = getPlayingUser(remote, userRef.current)

    const rowChecked = checkLines(rows, board, currentUser)
    const columnChecked = checkLines(columns, board, currentUser)
    const crossChecked = checkLines(cross, board, currentUser)

    // console.log({ rowChecked, columnChecked, crossChecked })

    if (rowChecked instanceof Array) {
      setLineChecked(rowChecked)
      setGameOver(currentUser)
    }

    if (columnChecked instanceof Array) {
      setLineChecked(columnChecked)
      setGameOver(currentUser)
    }

    if (crossChecked instanceof Array) {
      setLineChecked(crossChecked)
      setGameOver(currentUser)
    }
  }, [])

  const handleClick = useCallback(
    (id: number, remote = false) => {
      const newBoardState = [...boardState]

      console.log(boardState[id - 1].checked, gameOver, playerTurn)

      if (boardState[id - 1].checked || gameOver || !playerTurn) {
        return
      }

      newBoardState[id - 1].checked = getPlayingUser(remote, userRef.current)

      checkStatus(newBoardState, remote)

      console.log('set board state')

      setBoardState(newBoardState)

      if (!remote) {
        peerConnection.current.send({ selected: id })
        setPlayerTurn(false)
      }
    },
    [checkStatus, setPlayerTurn, boardState, gameOver, playerTurn]
  )

  const makePeerConnection = useCallback((id: string, currentPlayerId?: string, player?: User) => {
    peerConnection.current = peer.current.connect(id)
    setPeerId(id)

    peerConnection.current.on('open', () => {
      peerConnection.current.send({ startGame: true, id: currentPlayerId, player })
    })
  }, [])

  useEffect(() => {
    /* @ts-expect-error */
    peer.current = new window.Peer()

    peer.current.on('open', (id: string) => {
      setPlayerId(id)

      if (match.params.playerId) {
        makePeerConnection(match.params.playerId, id, user)
      }
    })

    peer.current.on('connection', (conn: any) => {
      conn.on('open', () => {
        conn.on('data', (data: any) => {
          console.log(data)
          if (data.id) {
            if (data.player && !userRef.current) {
              const newCurrentPlayer = data.player === 'x' ? 'o' : 'x'

              setUser(newCurrentPlayer)
              setPlayerTurn(false)
              userRef.current = newCurrentPlayer
            }

            makePeerConnection(data.id)
          }
          if (data.selected) {
            console.log('is selected')
            handleClick(data.selected, true)
            setPlayerTurn(true)
          }
        })
      })
    })
  }, [handleClick, makePeerConnection, match.params.playerId, user])

  const handleShareClick = useCallback((event: SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    target.select()

    document.execCommand('copy')
  }, [])

  const userIcon = (icon: User) => (icon === 'x' ? ex : circle)

  const shareLink = playerId && paths.game.replace(':playerId?', playerId)

  const gameClasses = classcat(['game', { [styles.disabled]: !peerId }])

  return (
    <div>
      {/*  <h2 styleName="player-id">Player: {playerId}</h2> */}
      {!gameOver && (
        <div className="player">
          Player: <span className={styles.icon}>{userIcon(userRef.current)}</span>
        </div>
      )}
      {gameOver && (
        <div className={styles["game-over"]}>
          Game Over, winner is <span className={styles.icon}>{userIcon(gameOver as User)}</span>
        </div>
      )}
      <div className={gameClasses}>
        {boardState.map(({ id, checked }) => (
          <Item 
            onClick={handleClick} 
            key={id} 
            id={id} 
            checked={lineChecked.includes(id)}>
            {checked ? checked : ''}
          </Item>
        ))}
      </div>
      {!peerId && !match.params.playerId && (
        <div className={styles.invite}>
          <div>
            <h2>Share with a friend to start playing</h2>
            {playerId && <input onClick={handleShareClick} readOnly value={`${DOMAIN}/#${shareLink}`} />}
            <p>
              {DOMAIN}/#${shareLink}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default withRouter(CardsPage)
