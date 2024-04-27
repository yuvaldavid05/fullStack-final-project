import './App.css';
import Router from './Router';
import Footer2 from './components/footer/Footer2';
import NavbarTop2 from './components/navbar/NavbarTop2';
import React, { useEffect, useState } from 'react';
import { RoleTypes } from './components/navbar/NavbarTop2';
import { useNavigate } from 'react-router-dom';


export const GeneralContext = React.createContext();

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  // const [roleType, setRoleType] = useState(RoleTypes.none);

  useEffect(() => {
    if (localStorage.token) {
      // setLoading(true);

      fetch("http://localhost:2222/users/login", {
        credentials: 'include',
        headers: {
          'Authorization': localStorage.token
        },
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return res.text().then(x => {
              throw new Error(x);
            });
          }
        })
        .then(data => {
          setUser(data);
        })
        .catch(err => {
          // snackbar('משתמש לא מחובר');
          // navigate('/');
        })
        .finally(() => {
          // setLoading(false);
        });
    } else {
      navigate('/');
    }
  }, []);

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
