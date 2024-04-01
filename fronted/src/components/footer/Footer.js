import './Footer.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { RiLoginBoxLine } from "react-icons/ri";
import { FaInfo } from "react-icons/fa";
import Button from 'react-bootstrap/esm/Button';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import { CiCircleInfo } from "react-icons/ci";

export default function Footer() {

    return (
        <section id="footer-section" className='footer'>
            <Container fluid>
                {/* <Row className='footer-div'>
                    <Col xs={12} md={3} className='divs' >
                        <h4>my account</h4>

                        <ListGroup>
                            <ListGroup.Item><Link to="">
                                login
                            </Link></ListGroup.Item>
                            <ListGroup.Item><Link to="">
                                signup
                            </Link></ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        </ListGroup>

                    </Col>
                    <Col xs={6} md={3} className='divs' >
                        <h4>about</h4>
                        <ListGroup>
                            <ListGroup.Item>
                                <Link to=""> click here to page "about us"</Link>
                            </ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col xs={6} md={3} className='divs'>
                        <h4>contact us</h4>
                        <ListGroup>
                            <ListGroup.Item>
                                <Link to="/contact-us">click here to get the page</Link>
                            </ListGroup.Item>
                            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                        </ListGroup>

                    </Col>
                    <Col xs={12} md={3} className='divs'>
                        <h4>4</h4>
                    </Col>
                </Row > */}
            </Container>
        </section>
    );
}