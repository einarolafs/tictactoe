/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {useState, useCallback, useRef} from 'react'
import Peer from 'peerjs';

import styles from './text.module.scss'
import { useEffect } from 'react';

const handleMessage = (data: Record<string, number | string | boolean>) => {
  console.log({data});
}

const TextComponent: React.FC = () => {
  const [localId, setLocalId] = useState<string>()
  const inputRef = useRef<HTMLInputElement>(null)
  const textRef = useRef<HTMLTextAreaElement>(null)
  const receivedRef = useRef<HTMLTextAreaElement>(null)
  const peer = useRef<Peer>();
  const connection = useRef<Peer.DataConnection>();

  useEffect(() => {
    peer.current = new Peer({
      host: 'localhost',
      port: 9000,
      path: '/tictactoe'
    });

    peer.current.on('open', () => {
      setLocalId(peer.current?.id);
    });

    peer.current?.on('connection', (connection) => {

      connection.on('data', handleMessage);
      
      console.log({connection});
    });

  peer.current?.on('error', (err) => {
      console.error(err);
    });

  }, [])

  const handleClick = useCallback(() => {
    /* @ts-ignore */
    const { value } = inputRef.current

    if (value) {
      connection.current = peer.current?.connect(value);
      
      connection.current?.on('data', handleMessage);
    }
    else {
      alert("You need to provide a peer to connect with !");
      return false;
    }
  }, [])

  const handleSend = useCallback(() => {
    connection.current?.send(textRef.current?.value)
  }, [])

  return (
    <div className={styles.container}>

      <p>Current ID: {localId}</p>

      <div className={styles.text}>
        <textarea ref={textRef}></textarea>
        <textarea ref={receivedRef} readOnly></textarea>
      </div>

      <button onClick={handleSend} type="button">Connect</button>

      <br />

      <input className={styles.input} ref={inputRef} type="text"></input>
      <button onClick={handleClick} type="button">Connect</button>
    </div>

  )
}

export default TextComponent