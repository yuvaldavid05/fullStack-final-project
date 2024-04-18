import './NavbarTop2.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

// משתמש רגיל - יכוללבצע הכל מלבד לעשות לייק על מוצרים
// משתמש רשום - יכול לעשות לייק - וישנט ליסט

export default function NavbarTop2() {

    const category2 = [
        { name: '/dresses', title: 'dresses', number: '0' },
        { name: '/jeans', title: 'jeans', number: '1' },
        { name: '/shirts', title: 'shirts', number: '2' },
        { name: '/shoes', title: 'shoes', number: '3' },
        { name: '/category', title: 'category', number: '4' },
        { name: '/contact-us', title: 'contact-us', number: '5' },
    ]

    return (

        <Navbar collapseOnSelect expand="lg" sticky="top" id="navbar-section" className='navbar-frame'>
            <Container>
                <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/login">login</Nav.Link>
                        <Nav.Link href="/sign-up">Sign-Up</Nav.Link>
                        <Nav.Link href="/about">about</Nav.Link>
                        <Nav.Link href="/contact-us">contact us</Nav.Link>
                        <NavDropdown title="Categories" id="collapsible-nav-dropdown">
                            {
                                category2.map((c) => (
                                    <NavDropdown.Item>
                                        <Link to={c.name}>
                                            {c.title}
                                        </Link>
                                    </NavDropdown.Item>
                                ))
                            }
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <Nav.Link>
                            <Link to="/wish-list">
                                WistList
                            </Link>
                        </Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            <Link to="/shopping-basket">
                                shopping-basket
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

    );
}