import './NavbarTop2.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useResolvedPath, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../App';
import Searchbar from '../searchbar/Searchbar';
import { IoAccessibilityOutline } from "react-icons/io5";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

// משתמש רגיל - יכוללבצע הכל מלבד לעשות לייק על מוצרים
// משתמש רשום - יכול לעשות לייק - וישנט ליסט

export const RoleTypes = {
    none: 0,
    user: 1,
    admin: 2,
};

export const checkPermissions = (permissions, userRoleType) => {
    return permissions.includes(userRoleType);
}


export let pageCategory = {};

const pages = [
    { route: '/login', title: 'login', permissions: [RoleTypes.none] },
    { route: '/sign-up', title: 'Sign-Up', permissions: [RoleTypes.none] },
    { route: '/about', title: 'about' },
    { route: '/contact-us', title: 'contact us', permissions: [RoleTypes.none, RoleTypes.user, RoleTypes.admin] },
    { route: '/products', title: 'all categories' },
];

const pages2 = [
    { route: '/wish-list', title: 'WistList', permissions: [RoleTypes.user] },
    { route: '/shopping-basket', title: 'Shopping-basket', permissions: [RoleTypes.none, RoleTypes.user, RoleTypes.admin] },
];


export default function NavbarTop2() {
    const { user, roleType, setUser, setRoleType, searchWord, setSearchWord, accFontSize, setAccFontSize, accColorBackground, setAccColorBackground } = useContext(GeneralContext);
    const [products, setProducts] = useState([]);
    const path = useResolvedPath().pathname;


    // פילטור של מוצר אחד(ראשון) מכל קטגוריה
    // pageCategory = products.filter((p, i) => products.findIndex(x => x.category == p.category) === i);


    // let arrayOfCategory = [];
    useEffect(() => {
        fetch("http://localhost:2222/products", {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            });
    }, []);

    const changeFontSizeLarge = () => {
        setAccFontSize(true)
    }
    const changeFontSizeBack = () => {
        setAccFontSize(false)
    }
    const changeBackground = (ev) => {
        if (ev.target.value) {
            setAccColorBackground(!accColorBackground)
        }
    }

    return (

        <Navbar collapseOnSelect expand="lg" sticky="top" id="navbar-section" className={accColorBackground ? 'navbar-frame bg-dark' : 'navbar-frame'} >
            <Container>
                <Navbar.Brand href="/" className={accColorBackground ? 'text-light' : ''} style={{ fontSize: "larger" }}>Amour</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {pages.filter(p => !p.permissions || checkPermissions(p.permissions, roleType)).map((page) => (
                            <Nav.Link key={page.route} className={page.route === path ? 'activeColor' : ''}>
                                <Link to={page.route} className={accColorBackground ? "text-light" : ""}>
                                    {page.title}
                                </Link>
                            </Nav.Link>
                        ))}


                        <NavDropdown title="Categories" id="collapsible-nav-dropdown" className={accColorBackground && "text-light"} >
                            {
                                products.filter((p, i) => products.findIndex(x => x.category == p.category) === i).map((t) => (
                                    <NavDropdown.Item key={t._id} className={accColorBackground && "changeBackground"}>
                                        <Link to={`/products/category/${t.category}`} className={accColorBackground ? "text-light" : ""}>
                                            {t.category}
                                        </Link>
                                    </NavDropdown.Item>
                                ))
                            }
                        </NavDropdown>
                    </Nav>
                    <NavDropdown title={<IoAccessibilityOutline />} id="collapsible-nav-dropdown" className='accessibility acc-font'>
                        <div>
                            <Button className='x-large' onClick={changeFontSizeLarge}>Aa</Button>
                            <Button className='small' onClick={changeFontSizeBack}>Aa</Button>
                        </div>
                        <NavDropdown.Item >
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label="Check this switch"
                                onChange={changeBackground}
                            />
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Searchbar />
                    <Nav>
                        {pages2.filter(p => !p.permissions || checkPermissions(p.permissions, roleType)).map((page) => (
                            <Nav.Link key={page.route}>
                                <Link to={page.route} className={accColorBackground ? "text-light" : ""}>
                                    {page.title}
                                </Link>
                            </Nav.Link>
                        ))}
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}