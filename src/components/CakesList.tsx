import React, { useState, useEffect } from 'react';
import { ICake } from 'cake-common';

import styles from './CakesList.module.scss';

import Cake from './Cake';
import NewCake from './NewCake';

import * as CakeService from '../services/cakeService';
import * as ModalService from '../services/modalService';

function CakesList() {
  const [cakes, setCakes] = useState<ICake[]>([]);

  useEffect(() => {
    loadCakes();
  }, []);

  return (
    <div className={styles.container}>
      {cakes.length ? cakes.map(cake => (
        <Cake
          key={cake.id}
          cake={cake}
          onDelete={(id: ICake['id']) => deleteCake(id)}
        />
      )) : (
        <h1>There are no cakes</h1>
      )}
      <div className={styles.addButton}>
        <input
          type="button"
          value="Add a new cake"
          onClick={() => ModalService.modal(
            <NewCake onComplete={() => {
              ModalService.closeModal();
              loadCakes();
            }}/>
          )}
        />
      </div>
    </div>
  );
  
  function loadCakes() {
    CakeService.getAllCakes().then(setCakes).catch(err => {
      ModalService.showError('Error getting cakes data', err.message);
    });
  }

  function deleteCake(id: ICake['id']) {
    ModalService.confirm('Are you sure you want to delete this cake?').then(confirmed => {
      if (confirmed) {
        CakeService.deleteCake(id).then(loadCakes).catch(err => {
          ModalService.showError('Error deleting cake', err.message);
        });
      }
    });
  }
}

export default CakesList;
