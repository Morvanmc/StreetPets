import React from 'react';


import StationForm from './components/StationForm';
import SeachFormDistance from './components/SearchFormDistance';
import RegisterButton from './components/RegisterButton';


import './global.css';
import './App.css';



function App() {
  return (
    <>
      <div id="app">
        <aside>
          <StationForm />
        </aside>

        <main>
          
        </main>

        <aside>
          <SeachFormDistance />
          <RegisterButton />
        </aside>
      </div>
   </>
  );
}

export default App;