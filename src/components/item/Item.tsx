import React, { useCallback } from 'react'
import classNamesBind from 'classnames/bind';
import { ItemProps } from '../../type'

import styles from './Item.module.scss'

const classNames = classNamesBind.bind(styles);

const Item: React.FC<ItemProps> = ({ id, onClick, selection, checked }: ItemProps) => {
  const classes = classNames({
    'item': true,
    checked, 
    [selection as string]: selection
  })
  
  const handleClick = () => onClick(id);

  return <span className={classes} onClick={handleClick} />
}

export default Item;