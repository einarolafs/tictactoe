import React, { ChangeEvent, useState } from 'react'
import { validate as uuidValidate }  from 'uuid';
import Board from './components/board'

import style from './App.module.scss'

const App: React.FC = () => {
  const [ startGame, setStart ] = useState<boolean>(false);
  const [ error, setError ] = useState<boolean>(false);
  const [ sharedId, setSharedId ] = useState<string>();

  const handleClick = () => {
    setStart(true);
  }

  const handleJoin = ({target}: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;

    var uuid = uuidValidate(value);

    console.log(uuid, value)

    if(!uuid) {
      setError(true);
    } else {
      setSharedId(value);
      setStart(true);
    }
  }

  return (
    <div>
      <h1>Tic tac Toe</h1>
      {!startGame && (
        <div className={style.start}>
          <input 
            type="button" 
            value="Start Game" 
            onClick={handleClick} 
          />
        
          <label>Join Game</label>
          <input 
            type="text" 
            placeholder="4e39bfab-0b5a-403d..." 
            onInput={handleJoin}
          />
          {error && (<p>Incorrect sharing token</p>)}
        </div>
      )}

      {startGame && (
        <Board sharedId={sharedId} />
      )}
    </div>
  )
}

export default App
