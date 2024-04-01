import './App.css';
import Router from './Router';
import Fotter from './components/footer/Footer';
import Footer2 from './components/footer/Footer2';
// import Navbar from './components/navbar/NavbarTop';
import NavbarTop2 from './components/navbar/NavbarTop2';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Navbar /> */}
        <NavbarTop2 />
        <Router />
      </header>
      <footer>
        {/* <Fotter /> */}
        <Footer2 />
      </footer>
    </div>
  );
}

export default App;
