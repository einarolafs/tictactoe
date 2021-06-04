/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useState, useEffect, useRef, SyntheticEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import classNamesBind from 'classnames/bind';
import Peer from 'peerjs';

import { paths } from './router'
import { ItemProps, User, BoardState, USER, MatchParams } from './type.d'

import styles from './App.module.scss'

const classNames = classNamesBind.bind(styles);

const { REACT_APP_DOMAIN: DOMAIN } = process.env

const CIRCLE = '\u2756'
const EX = '\u2717'

const Item: React.FC<ItemProps> = ({ id, onClick, children, checked }: ItemProps) => {
  const handleClick = useCallback(() => {
    onClick(id)
  }, [id, onClick])

  const classes = classNames({
    'item': true,
    checked, 
    [children]: children
  })

  return <span className={classes} onClick={handleClick} />
}

const userIcon = (icon: User) => (icon === USER.Ex ? EX : CIRCLE)

type CheckLineReturn = number[] | false;
const checkLines = (
  lines: number[][],
  board: BoardState[],
  user: User
): CheckLineReturn => {
  
  let foundLine: CheckLineReturn = false

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
    return user === USER.Ex ? USER.Circle : USER.Ex
  }

  return user
}

const CardsPage: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {

  const [boardState, setBoardState] = useState<BoardState[]>(
    new Array(9)
      .fill(null)
      .map((_, index): BoardState => ({
         id: index + 1,
         checked: null,
      }))
  )

  const [user, setUser] = useState<User>(USER.Ex)
  const userRef = useRef<User>(USER.Ex)
  const [lineChecked, setLineChecked] = useState<number[]>([0, 0, 0])
  const [gameOver, setGameOver] = useState<User | boolean>(false)
  const [playerTurn, setPlayerTurn] = useState<boolean>(true)
  const [playerId, setPlayerId] = useState<string>()
  const [peerId, setPeerId] = useState<string>()
  const peer = useRef<Peer>()
  const peerConnection = useRef<Peer.DataConnection>()

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

      if (boardState[id - 1].checked || gameOver || !playerTurn) {
        return
      }

      newBoardState[id - 1].checked = getPlayingUser(remote, userRef.current)

      checkStatus(newBoardState, remote)

      setBoardState(newBoardState)
    
      if (!remote) {
        if (peerConnection.current) {
          peerConnection.current.send({ selected: id })
        } else {
          throw Error('Could not send move to peer')
        }

        setPlayerTurn(false)
      }
    },
    [checkStatus, boardState, gameOver, playerTurn]
  )

  const makePeerConnection = useCallback((
    remotePlayerId: string,
    playerId?: string,
    player?: User
  ) => {
    if (peer.current) {
      peerConnection.current = peer.current.connect(remotePlayerId)
      setPeerId(remotePlayerId)

      console.log('make peer connection', peerConnection.current)
    } else {
      throw Error('Could not make a peer connection')
    }

    if (peerConnection.current) {
      peerConnection.current.on('open', () => {
        peerConnection.current?.send({ startGame: true, id: playerId, player });
      })
    } else {
      throw Error('Could not open a peer connection')
    }
  }, [])

  useEffect(() => {

    console.log(match);

    peer.current = new Peer();

    peer.current.on('open', (id: string) => {
      setPlayerId(id)

      if (match.params.playerId && !peerId) {
        makePeerConnection(match.params.playerId, id, user)
      }
    })

    peer.current.on('connection', (conn) => {
      conn.on('open', () => {
        conn.on('data', (data: {
          id?: string,
          player?: string,
          selected?: number,
          startGame?: boolean
        }) => {
          console.log('on connection', data);

          if (data.id && data.startGame) { 
            makePeerConnection(data.id)
          }

          if (data.id && data.startGame) {
              const newCurrentPlayer = data.player === USER.Ex ? USER.Circle : USER.Ex

              // console.log('Setup game from remote connection and set player to false \n')

              //console.log(newCurrentPlayer);
    
              setUser(newCurrentPlayer)
              setPeerId(data.id)
              setPlayerTurn(false)
              userRef.current = newCurrentPlayer

              return;
          }
  
          if (data.selected) {
            console.log('set remote selection and set turn as true \n')
            handleClick(data.selected, true)
            setPlayerTurn(true)
          }
        })
      });
    })
  }, [])

  const handleShareClick = useCallback((event: SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    target.select()

    document.execCommand('copy')
  }, [])

  const shareLink = playerId && paths.root.replace(':playerId?', playerId)

  const gameClasses = classNames({
    'game': true, 
    disabled: !peerId 
  })

  return (
    <div>
      {/*  <h2 styleName="player-id">Player: {playerId}</h2> */}
      {!gameOver && (
        <div className={styles.player}>
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
            {playerId && <input onClick={handleShareClick} readOnly value={`${window.location.protocol}//${DOMAIN}/#${shareLink}`} />}
            <p>
              {window.location.protocol}{'//'}{DOMAIN}/#{shareLink}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default withRouter(CardsPage)
