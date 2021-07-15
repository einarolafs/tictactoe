import React, { useCallback } from 'react'
import classNamesBind from 'classnames/bind';
import { ItemProps } from '../../type'

import styles from './Item.module.scss'

const classNames = classNamesBind.bind(styles);

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

export default Item;