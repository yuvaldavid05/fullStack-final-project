import './App.css';
import Router from './Router';
import Footer2 from './components/footer/Footer2';
import NavbarTop2 from './components/navbar/NavbarTop2';
import React, { useState } from 'react';

export const GeneralContext = React.createContext();

function App() {
  const [user, setUser] = useState();


  return (
    <GeneralContext.Provider value={{
      user, setUser
    }}>
      <div className="App">
        <header className="App-header">
          <NavbarTop2 />
          <Router />
        </header>
        <footer>
          <Footer2 />
        </footer>
      </div>
    </GeneralContext.Provider>
  );
}

export default App;
