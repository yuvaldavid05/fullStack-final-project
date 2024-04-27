import './NavbarTop2.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../App';



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
    const { user, roleType, setUser, setRoleType } = useContext(GeneralContext);
    const [products, setProducts] = useState([]);

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


    return (

        <Navbar collapseOnSelect expand="lg" sticky="top" id="navbar-section" className='navbar-frame'>
            <Container>
                <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {pages.filter(p => !p.permissions || checkPermissions(p.permissions, roleType)).map((page) => (
                            <Nav.Link>
                                <Link to={page.route} key={page.route}>
                                    {page.title}
                                </Link>
                            </Nav.Link>
                        ))}


                        <NavDropdown title="Categories" id="collapsible-nav-dropdown">
                            {
                                products.filter((p, i) => products.findIndex(x => x.category == p.category) === i).map((t) => (
                                    <NavDropdown.Item>
                                        <Link to={`/products/category/${t.category}`} key={t._id}>
                                            {t.category}
                                        </Link>
                                    </NavDropdown.Item>
                                ))
                            }
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        {pages2.filter(p => !p.permissions || checkPermissions(p.permissions, roleType)).map((page) => (
                            <Nav.Link>
                                <Link to={page.route} key={page.route}>
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