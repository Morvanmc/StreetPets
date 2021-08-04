import React from 'react';


import StationForm from './components/StationForm';

import './global.css';
import './App.css';
import './Sidebar.css';



function App() {
  return (
    <>
      <div id="app">
        <aside>
        <strong>Cadastrar</strong>
          <StationForm />
        </aside>

        <main>

        </main>
      </div>
   </>
  );
}

export default App;