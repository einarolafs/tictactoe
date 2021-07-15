/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useState, useEffect, useRef, SyntheticEvent } from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'

import classNamesBind from 'classnames/bind';
import Peer from 'peerjs';

import { paths } from '../../router'
import { RootState, userSlice, peerSlice, boardSlice } from '../../store'
import { User, BoardState, USER, MatchParams } from '../../type.d'
import { checkLines, getPlayingUser, userIcon } from '../../utils';
import Item from '../item';
import { rows, columns, cross } from './utils';

import styles from './Board.module.scss'

const classNames = classNamesBind.bind(styles);

const { REACT_APP_DOMAIN: DOMAIN } = process.env

const Board: React.FC<RouteComponentProps<MatchParams>> = ({ match }) => {
  const {id: playerId, role: user = USER.Ex} = useSelector((state: RootState) => state.user)

  const {id: peerId} = useSelector((state: RootState) => state.peer)

 const { board } = useSelector((state: RootState) => state.board)

  const dispatch = useDispatch();

  const [lineChecked, setLineChecked] = useState<number[]>([0, 0, 0])
  const [gameOver, setGameOver] = useState<User | boolean>(false)
  const [playerTurn, setPlayerTurn] = useState<boolean>(true)
  const peer = useRef<Peer>()
  const peerConnection = useRef<Peer.DataConnection>()

  const checkStatus = useCallback((board: BoardState[], remote: boolean) => {
    const currentUser = getPlayingUser(remote, user)

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
      const newBoardState = board.map(item => ({...item}))

      if (board[id - 1].checked || gameOver || !playerTurn) {
        return
      }

      newBoardState[id - 1].checked = getPlayingUser(remote, user)

      checkStatus(newBoardState, remote)

      dispatch(boardSlice.actions.setBoard(newBoardState))
    
      if (!remote) {
        if (peerConnection.current) {
          peerConnection.current.send({ selected: id })
        } else {
          throw Error('Could not send move to peer')
        }

        setPlayerTurn(false)
      }
    },
    [checkStatus, board, gameOver, playerTurn, dispatch, user]
  )

  const makePeerConnection = useCallback((
    remotePlayerId: string,
    playerId?: string,
    player?: User
  ) => {
    if (peer.current) {

      peerConnection.current = peer.current.connect(remotePlayerId)

      dispatch(peerSlice.actions.setPeer({ id: remotePlayerId }));

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
  }, [dispatch])

  useEffect(() => {
    peer.current = new Peer();

    peer.current.on('open', (id: string) => {
      dispatch(userSlice.actions.setUser({ id }));

      if (match.params.playerId && !peerId) {
        dispatch(userSlice.actions.setUser({role: USER.Circle}))
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
          if (data.id && data.startGame) { 
            makePeerConnection(data.id)
            setPlayerTurn(false)
          }

          if (data.id && data.startGame) {
              dispatch(peerSlice.actions.setPeer({ id: data.id }));
              setPlayerTurn(false)

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
          Player: <span className={styles.icon}>{userIcon(user)}</span>
        </div>
      )}
      {gameOver && (
        <div className={styles["game-over"]}>
          Game Over, winner is <span className={styles.icon}>{userIcon(gameOver as User)}</span>
        </div>
      )}
      <div className={gameClasses}>
        {board.map(({ id, checked }) => (
          <Item 
            onClick={handleClick} 
            key={id} 
            id={id} 
            checked={lineChecked.includes(id)}
            selection={checked}
          />
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

export default withRouter(Board)
