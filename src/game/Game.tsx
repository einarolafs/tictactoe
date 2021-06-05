/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useState, useEffect, useRef } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import classNamesBind from 'classnames/bind';
import Peer from 'peerjs';

import { User, BoardState, USER, MatchParams, PeerData, Cells } from './type.d'

import { Item } from './Item';
import { userIcon, checkLines, getPlayingUser, createBoard, gameCheck } from './utils'
import Invite from './invite'

import styles from './Game.module.scss'

const classNames = classNamesBind.bind(styles);

const Game: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {

  const [boardState, setBoardState] = useState<BoardState[]>(createBoard())

  const [user, setUser] = useState<User>(USER.Ex)
  const userRef = useRef<User>(USER.Ex)
  const [lineChecked, setLineChecked] = useState<Cells[]>([0, 0, 0])
  const [gameOver, setGameOver] = useState<User | boolean>(false)
  const [playerTurn, setPlayerTurn] = useState<boolean>(true)
  const [playerId, setPlayerId] = useState<string>()
  const [peerId, setPeerId] = useState<string>()
  const peer = useRef<Peer>()
  const peerConnection = useRef<Peer.DataConnection>()

  const checkStatus = useCallback((board: BoardState[], remote: boolean) => {
    const currentUser = getPlayingUser(remote, userRef.current)

    const rowChecked    = checkLines(gameCheck.rows, board, currentUser)
    const columnChecked = checkLines(gameCheck.columns, board, currentUser)
    const crossChecked  = checkLines(gameCheck.cross, board, currentUser)

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
    (id: Cells, remote = false) => {
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
    peer.current = new Peer();

    peer.current.on('open', (id: string) => {
      setPlayerId(id)

      if (match.params.playerId && !peerId) {
        makePeerConnection(match.params.playerId, id, user)
      }
    })

    peer.current.on('connection', (conn) => {
      conn.on('open', () => {
        conn.on('data', (data: PeerData) => {
          if (data.id && data.startGame) { 
            makePeerConnection(data.id)
          }

          if (data.id && data.startGame) {
              const newCurrentPlayer = data.player === USER.Ex ? USER.Circle : USER.Ex
    
              setUser(newCurrentPlayer)
              setPeerId(data.id)
              setPlayerTurn(false)
              userRef.current = newCurrentPlayer

              return;
          }
  
          if (data.selected) {
            handleClick(data.selected, true)
            setPlayerTurn(true)
          }
        })
      });
    })
  }, [])

  const gameClasses = classNames({'game': true, disabled: !peerId})

  return (
    <div>
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
      {!peerId && !match.params.playerId && playerId && (
        <Invite playerId={playerId} />
      )}
    </div>
  )
}

export default withRouter(Game)
