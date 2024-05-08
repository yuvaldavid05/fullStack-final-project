import './Footer2.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";

export default function Footer2() {
    return (
        <section id="footer-section" className='footer'>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="2">
                        <Link to="/login">
                            login
                        </Link>
                    </Col>
                    <Col xs lg="2">
                        <Link to="/sign-up">
                            sign up
                        </Link>
                    </Col>
                    <Col xs lg="2">
                        <Link to="/about">
                            about
                        </Link>
                    </Col>
                    <Col xs lg="2">
                        <Link to="/contact-us">
                            contact us
                        </Link>
                    </Col>
                </Row>

                <hr></hr>
                <Col className='footer-copyright'>
                    <MdOutlineMail /><span>Yuvedavid@gmail.com</span> |
                    Copyright Yuval David

                    <Image src="https://i.pinimg.com/564x/5f/ca/ef/5fcaef10f68b851551429e32183dd955.jpg" className="img-footer" rounded />
                    |

                    <FiPhone /><span>050-8695665</span>


                </Col>
            </Container>
        </section>
    );
} 