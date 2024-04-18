import './App.css';
import Router from './Router';

import Footer2 from './components/footer/Footer2';

import NavbarTop2 from './components/navbar/NavbarTop2';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavbarTop2 />
        <Router />
      </header>
      <footer>
        <Footer2 />
      </footer>
    </div>
  );
}

export default App;
