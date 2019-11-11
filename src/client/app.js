// src/app.js

import React from 'react';
import NavBar from './components/NavBar';
import { useAuth0 } from './react-auth0-spa';

function App() {
  const { loading } = useAuth0();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <NavBar />
  );
}

export default App;
