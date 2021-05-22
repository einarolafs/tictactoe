import React from 'react'
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import { User, USER } from '../../type.d';
import { userIcon } from '../../utils';

import styles from './board-header.module.scss'

export const BoardHeader: React.FC<{gameOver?: User}>  = ({ gameOver }) => {
  const {id: playerId, role: user = USER.Ex } = useSelector((state: RootState) => state.user)

  return (
  <>
  <h2 className={styles['player-id']}>Player: {playerId}</h2>
    {!gameOver && (
      <div className={styles.player}>
        Player: <span className={styles.icon}>{userIcon(user)}</span>
      </div>
    )}
    {gameOver && (
      <div className={styles['game-over']}>
        Game Over, winner is <span className={styles.icon}>{userIcon(gameOver)}</span>
      </div>
    )}
  </>
)}