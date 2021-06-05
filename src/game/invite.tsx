import React, { useCallback, SyntheticEvent } from 'react'

import { paths } from '../router'

import styles from './Game.module.scss'

const { REACT_APP_DOMAIN: DOMAIN } = process.env

const Invite: React.FunctionComponent<{playerId: string}> = ({ playerId }) => {
  const handleShareClick = useCallback((event: SyntheticEvent) => {
    let target = event.target as HTMLInputElement;
    target.select()

    document.execCommand('copy')
  }, [])

  const shareLink = playerId && paths.root.replace(':playerId?', playerId)

  return (
    <div className={styles.invite}>
      <div>
        <h2>Share with a friend to start playing</h2>
        {playerId && <input onClick={handleShareClick} readOnly value={`${window.location.protocol}//${DOMAIN}/#${shareLink}`} />}
        <p>
          {window.location.protocol}{'//'}{DOMAIN}/#{shareLink}
        </p>
      </div>
    </div>
  )
}

export default Invite;