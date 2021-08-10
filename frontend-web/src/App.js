import React from 'react';


import StationForm from './components/StationForm';
import StationInfo from './components/StationInfo';


import './global.css';
import './App.css';
import './Main.css'



function App() {
  return (
    <>
      <div id="app">
        <aside>
          <StationForm />
        </aside>

        <main>
          <StationInfo />
        </main>
      </div>
   </>
  );
}

export default App;