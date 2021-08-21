import React, { useState } from 'react';

import styles from './YumFactor.module.scss';

import sliceImage from '../assets/slice.png';

function YumFactor(props: {
  yumFactor: number;
  onChange?(value: number): void;
}) {
  const [currentYumFactor, setCurrentYumFactor] = useState(props.yumFactor);
  
  return (
    <div
      className={`${styles.container} ${props.onChange ? styles.clickable : ''}`} title={`Yum Factor ${props.yumFactor}`}
      onMouseOut={() => setCurrentYumFactor(props.yumFactor)}
    >
      {Array.from({length: 5}, (_, i) => (
        <img
          key={`yum${i}`}
          src={sliceImage}
          className={`${styles.sliceImage} ${i < currentYumFactor ? styles.active : ''}`}
          onMouseOver={() => props.onChange && setCurrentYumFactor(i + 1)}
          onClick={() => props.onChange?.(i + 1)}
          alt="Yum factor rating"
        />
      ))}
    </div>
  );
}

export default YumFactor;
