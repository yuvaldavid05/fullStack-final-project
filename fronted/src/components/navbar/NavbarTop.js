import './NavbarTop.css';
import './NavbarTop2.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { BsBagPlus } from "react-icons/bs";
import { BsBookmarkHeart } from "react-icons/bs";
import { TiPhoneOutline } from 'react-icons/ti';

import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavbarTop() {
    const category = [
        { name: '/dresses', title: 'dresses', number: '0' },
        { name: '/jeans', title: 'jeans', number: '1' },
        { name: '/shirts', title: 'shirts', number: '2' },
        { name: '/shoes', title: 'shoes', number: '3' },
        { name: '/category', title: 'category', number: '4' },
        { name: '/contact-us', title: 'contact-us', number: '5' },
    ]

    return (
        <>
            <div className='top d-flex '>
                <div className='flex-grow-1'>
                    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                </div>
                <div className='contactUsIcon'>
                    <Link to="contact-us">
                        <TiPhoneOutline />
                    </Link>
                </div>
            </div>

            <Navbar collapseOnSelect expand="lg" className="mainNav" sticky="top">
                <Container>
                    <Navbar.Brand>
                        {/* React-Bootstrap */}
                        <Nav.Link>
                            <Link to="shopping-basket">
                                <BsBagPlus />
                            </Link>
                        </Nav.Link>
                        <span>|</span>
                        <Nav.Link>
                            <Link to="wish-list">
                                <BsBookmarkHeart />
                            </Link>
                        </Nav.Link>
                    </Navbar.Brand >

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto justify-content-center flex-grow-1 ">
                            {
                                category.map((c, i) => (
                                    <Nav.Link key={i} className=' text-break fw-bolder'>
                                        <Link to={c.name} className='linkCategory text-decoration-none'>{c.title}</Link>
                                    </Nav.Link>
                                )
                                )
                            }


                        </Nav>
                    </Navbar.Collapse>
                </Container >
            </Navbar >
        </>

    );
}
