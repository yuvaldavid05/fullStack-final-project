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
import { RiAdminLine } from "react-icons/ri";

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
  const [accFontSize, setAccFontSize] = useState(false);
  const [accColorBackground, setAccColorBackground] = useState(false);


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
          // sessionStorage.removeItem("basketData")
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
    // sessionStorage.removeItem("basketData")


  }

  return (
    <GeneralContext.Provider value={{
      user, setUser, roleType, setRoleType, basket, setBasket, productCat, setProductCat, admin, setAdmin, comment, setComment, loader, setLoader, snackbarOn, searchWord, setSearchWord, accFontSize, setAccFontSize, accColorBackground, setAccColorBackground
    }}>


      <div className={accFontSize ? "App change" : (accColorBackground ? "App background" : "App")} >
        {loader && <Loader />}
        {snackbar && <Snackbar text={snackbar} />}

        {(user && user.admin == true) ?

          <div className='admin'>
            <Link to="/admin">Admin Click Here
              <RiAdminLine />
            </Link>
          </div> : ""
        }

        <header className={accFontSize ? "App-header change" : (accColorBackground ? "App-header bg-dark text-light" : "App-header")}>
          <NavbarTop2 />
          <Router />
        </header>

        {/* {user.firstName + " " + user.lastName} */}

        {user ?
          <body>
            <div className='userName'>
              Hey
              <br></br>
              <span><b>{user.firstName}</b></span>!
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
