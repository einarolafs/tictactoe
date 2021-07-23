/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNamesBind from 'classnames/bind';
import Peer from 'peerjs';

import { RootState, userSlice, peerSlice, boardSlice } from '../../store'
import { User, BoardState, USER, PeerData } from '../../type.d'
import { checkLines, getPlayingUser } from '../../utils';
import Item from '../item';
import { rows, columns, cross } from './utils';

import styles from './Board.module.scss'
import { BoardHeader } from './board-header';

const classNames = classNamesBind.bind(styles);

const Board: React.FC<{sharedId?: string}> = ({ sharedId }) => {
  const dispatch = useDispatch();

  const {id: playerId, role: user = USER.Ex, active } = useSelector((state: RootState) => state.user)
  const peerInfo = useSelector((state: RootState) => state.peer)
  const { board, lineChecked } = useSelector((state: RootState) => state.board)

  const [gameOver, setGameOver] = useState<User>()
  const peer = useRef<Peer>()
  const peerConnection = useRef<Peer.DataConnection>()

  const checkStatus = useCallback((board: BoardState[], remote: boolean) => {
    const currentUser = getPlayingUser(remote, user)

    const rowChecked = checkLines(rows, board, currentUser)
    const columnChecked = checkLines(columns, board, currentUser)
    const crossChecked = checkLines(cross, board, currentUser)

    if (rowChecked instanceof Array) {
      dispatch(boardSlice.actions.setLineChecked(rowChecked))
      setGameOver(currentUser)
    }

    if (columnChecked instanceof Array) {
      dispatch(boardSlice.actions.setLineChecked(columnChecked))
      setGameOver(currentUser)
    }

    if (crossChecked instanceof Array) {
      dispatch(boardSlice.actions.setLineChecked(crossChecked))
      setGameOver(currentUser)
    }
  }, [dispatch, user])

  const handleClick = useCallback(
    (id: number, remote = false) => {
      const newBoardState = board.map(item => ({...item}))

      if (board[id - 1].checked || gameOver || !active) { return }

      newBoardState[id - 1].checked = getPlayingUser(remote, user)

      checkStatus(newBoardState, remote)

      dispatch(boardSlice.actions.setBoard({index: id - 1, player: getPlayingUser(remote, user)}))

      try {
        if (!remote) {
          if (peerConnection.current) {
            peerConnection.current.send({ selected: id } as PeerData)
          } else {
            throw Error('Could not send move to peer')
          }

          dispatch(userSlice.actions.setUser({ active: false }))
        }
      } catch (error) {
        console.error(error)
      }
    },
    [checkStatus, board, gameOver, active, dispatch, user]
  )

  const makePeerConnection = useCallback((remotePlayerId: string, id?: string) => {
    try {
      if (peer.current) {

        peerConnection.current = peer.current.connect(remotePlayerId)

        dispatch(peerSlice.actions.setPeer({ id: remotePlayerId }));

      } else {
        throw Error('Could not make a peer connection')
      }

      if (peerConnection.current && id && sharedId) {

        peerConnection.current.on('open', () => {
          peerConnection.current?.send({ startGame: true, id } as PeerData);
        })

      } else {
        throw Error('Could not send data to the peer')
      }
    }  catch (error) {
      console.error(error)
    }
  }, [dispatch, sharedId])

  useEffect(() => {
    try {
      peer.current = new Peer();

      peer.current.on('open', (id: string) => {
        dispatch(userSlice.actions.setUser({ id }));

        if (sharedId && !peerInfo.id) {
          makePeerConnection(sharedId, id)
          dispatch(userSlice.actions.setUser({ role: USER.Circle }))
          dispatch(peerSlice.actions.setPeer({ role: USER.Ex }))
          return
        }
    
        dispatch(userSlice.actions.setUser({ role: USER.Ex }))
        dispatch(peerSlice.actions.setPeer({ role: USER.Circle }))
      })

      peer.current.on('connection', (conn) => {
        conn.on('open', () => {
          conn.on('data', (data: PeerData) => {
            if (data.id && data.startGame) { 
              makePeerConnection(data.id, playerId)
              dispatch(userSlice.actions.setUser({ active: false }))
              dispatch(peerSlice.actions.setPeer({ id: data.id }))

              return;
            }
    
            if (data.selected) {
              handleClick(data.selected, true)
              dispatch(userSlice.actions.setUser({ active: true }))
            }
          })
        });
      })
    } catch (error) {
      console.error(error)
    }
  }, [])

  const gameClasses = classNames({
    'game': true, 
    disabled: !peerInfo.id
  })

  return (
    <div>
      <BoardHeader gameOver={gameOver} />
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
    </div>
  )
}

export default Board
