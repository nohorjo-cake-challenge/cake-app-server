import React, { useState } from 'react';
import { ICake } from 'cake-common';

import styles from './Cake.module.scss';

import YumFactor from './YumFactor';

import binImage from '../assets/bin.png';

function Cake(props: {
  cake: ICake;
  onDelete(id: ICake['id']): void;
}) {
  const { cake } = props;

  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <h1 onClick={() => setOpen(!open)}>{cake.name}</h1>
      <img
        className={styles.cakeImage}
        src={cake.imageUrl}
        onClick={() => setOpen(!open)}
        alt="Cake"
      />
      <div className={`${styles.extraInfo} ${open ? styles.open: ''}`}>
        <p>{cake.comment}</p>
        <img
          className={styles.deleteButton}
          src={binImage}
          onClick={() => props.onDelete(cake.id)}
          alt="Delete cake"
        />
      </div>
      <YumFactor yumFactor={cake.yumFactor}/>
    </div>
  );
}

export default Cake;
