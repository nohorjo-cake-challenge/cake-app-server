import React from 'react';

import CakesList from './components/CakesList';

import './App.scss';

function App() {

  return (
    <div className="main-page">
      <h1 className="header">Amazing Cakes!</h1>
      <article className="intro">Here at Amazing Cakes we collect data about all our favourite cakes and present them here for everyone</article>
      <CakesList/>
    </div>
  );
}

export default App;
