import './App.css';
import Router from './Router';
import Footer2 from './components/footer/Footer2';
import NavbarTop2 from './components/navbar/NavbarTop2';
import React, { useEffect, useState } from 'react';
import { RoleTypes } from './components/navbar/NavbarTop2';
import { Link, useNavigate } from 'react-router-dom';
import Admin from "./pages/admin/Admin";



export const GeneralContext = React.createContext();

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [roleType, setRoleType] = useState(RoleTypes.none);
  const [basket, setBasket] = useState([]);
  const [productCat, setProductCat] = useState([]);
  const [comment, setComment] = useState([]);
  // const [commentData, setCommentData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   text: "",
  // });;

  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (localStorage.token) {
      // setLoading(true);

      fetch("http://localhost:2222/auth/login", {
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
          setRoleType(RoleTypes.user);

          if (data.admin) {
            setRoleType(RoleTypes.admin);
          }

          navigate('/');
          console.log(data);
        })
        .catch(err => {
          setRoleType(RoleTypes.none);
          // snackbar('משתמש לא מחובר');
          navigate('/');
        })
        .finally(() => {
          // setLoading(false);
        });
    } else {
      setRoleType(RoleTypes.none);
      navigate('/');
    }
  }, [roleType]);

  const logout = () => {
    localStorage.clear('token');
    setUser();
    setRoleType(RoleTypes.none);
    navigate('/');
    // snackbar('המשתמש התנתק בהצלחה');

  }

  return (
    <GeneralContext.Provider value={{
      user, setUser, roleType, setRoleType, basket, setBasket, productCat, setProductCat, admin, setAdmin, comment, setComment
    }}>
      <div className='admin'>
        <Link to="/admin">click here</Link>
        {/* <Admin /> */}

      </div>

      <div className="App">

        <header className="App-header">
          {/* {!admin ? <NavbarTop2 /> : ""} */}
          <NavbarTop2 />
          <Router />
        </header>
        {user ?
          <body>
            <div className='userName'>
              Hey
              <br></br>
              <span><b>{user.firstName + " " + user.lastName}</b></span>!
              <br></br>
              <button className='logout' onClick={logout}><u>Logout</u></button>
            </div>
          </body> :
          ""
        }

        <footer>
          {/* {!admin ? <Footer2 /> : ""} */}
          <Footer2 />
        </footer>

      </div>
    </GeneralContext.Provider>
  );
}

export default App;
