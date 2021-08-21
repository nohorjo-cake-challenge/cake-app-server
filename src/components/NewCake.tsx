import React, { useState, useEffect } from 'react';
import {
  validateCakeName,
  validateCakeComment,
  validateCake,
} from 'cake-common';

import imageImage from '../assets/image.png';

import YumFactor from './YumFactor';

import { addCake } from '../services/cakeService';
import { showSuccess, showError } from '../services/modalService';

import styles from './NewCake.module.scss';

function NewCake(props: {onComplete(): void}) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [yumFactor, setYumFactor] = useState(1);
  const [imageError, setImageError] = useState(true);

  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  const cake = {
    name,
    comment,
    yumFactor,
    imageUrl,
  };

  return (
    <>
      <h1>Add Cake</h1>
      <div className={styles.container}>
        <div>
          <img
            className={styles.mainImage}
            src={imageError ? imageImage : imageUrl}
            onError={() => setImageError(true)}
            onLoad={e => (e.target as any).src === imageImage || setImageError(false)}
            alt="New cake"
          />
          <YumFactor yumFactor={yumFactor} onChange={setYumFactor}/>
        </div>
        <div className={styles.newForm}>
          <label>Name</label>
          <div>
            <input value={name} onChange={e => setName(e.target.value)}/>
            {validateCakeName(name) || (<span className={styles.errorMessage}>{name ? 'Name too long' : 'Please provide a name'}</span>) }
          </div>
          <label>Comment</label>
          <div>
            <textarea value={comment} onChange={e => setComment(e.target.value)}></textarea>
            {validateCakeComment(comment) || (<span className={styles.errorMessage}>{name ? 'Comment too long' : 'Please provide a comment'}</span>) }
          </div>
          <label>Image URL</label>
          <div>
            <input value={imageUrl} onChange={e => setImageUrl(e.target.value)}/>
            {imageError && (<span className={styles.errorMessage}>Please provide a valid image URL</span>) }
          </div>
        </div>
      </div>
      <input
        className={styles.submitButton}
        type="button"
        value="Save cake"
        disabled={imageError || !validateCake(cake)}
        onClick={() => {
          addCake(cake)
            .then(() => showSuccess('Cake added successfully!'))
            .then(props.onComplete)
            .catch(error => showError('Unable to add cake!', error.message));
        }}
      />
    </>
  );
}

export default NewCake;
