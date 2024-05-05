import './App.css';
import Router from './Router';
import Footer2 from './components/footer/Footer2';
import NavbarTop2 from './components/navbar/NavbarTop2';
import React, { useEffect, useState } from 'react';
import { RoleTypes } from './components/navbar/NavbarTop2';
import { Link, useNavigate } from 'react-router-dom';
import Admin from "./pages/admin/Admin";
import Loader from "./components/loader/Loader";
import Snackbar from './components/snackbar/Snackbar';

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
  const [loader, setLoader] = useState(true);
  const [snackbar, setSnackbar] = useState('');
  const [admin, setAdmin] = useState(false);
  const [searchWord, setSearchWord] = useState('')


  const snackbarOn = text => {
    setSnackbar(text);
    setTimeout(() => setSnackbar(''), 3 * 1000);
  }

  useEffect(() => {
    if (localStorage.token) {
      setLoader(true);

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
          snackbarOn(`User ${data.firstName}  is logged in!`)
          setRoleType(RoleTypes.user);

          if (data.admin) {
            setRoleType(RoleTypes.admin);
          }

          navigate('/');
          console.log(data);
        })
        .catch(err => {
          setRoleType(RoleTypes.none);
          snackbarOn("User not logged in");
          navigate('/');
        })
        .finally(() => setLoader(false));
    } else {
      setLoader(false)
      setRoleType(RoleTypes.none);
      navigate('/');
    }
  }, [roleType]);

  const logout = () => {
    localStorage.clear('token');
    setUser();
    setRoleType(RoleTypes.none);
    navigate('/');
    snackbarOn('User logged out successfully');

  }

  return (
    <GeneralContext.Provider value={{
      user, setUser, roleType, setRoleType, basket, setBasket, productCat, setProductCat, admin, setAdmin, comment, setComment, loader, setLoader, snackbarOn, searchWord, setSearchWord
    }}>


      <div className="App">
        {loader && <Loader />}
        {/* {snackbar && <Snackbar text={snackbar} />} */}
        {snackbar && <Snackbar text={snackbar} />}

        <div className='admin'>
          <Link to="/admin">click here</Link>
        </div>

        <header className="App-header">
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
          <Footer2 />
        </footer>

      </div>
    </GeneralContext.Provider>
  );
}

export default App;
