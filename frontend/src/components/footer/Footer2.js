import './Footer2.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import { FiPhone } from "react-icons/fi";
import { MdOutlineMail } from "react-icons/md";
import { GeneralContext } from '../../App';
import { useContext } from 'react';


export default function Footer2() {
    const { accColorBackground, setAccColorBackground } = useContext(GeneralContext);
    return (
        <section id="footer-section" className={accColorBackground ? 'footer bg-dark text-light' : 'footer'}>
            <Container >
                <Row className="justify-content-md-center">
                    <Col xs lg="2">
                        <Link to="/login" className={accColorBackground ? 'text-light' : ""}>
                            login
                        </Link>
                    </Col>
                    <Col xs lg="2">
                        <Link to="/sign-up" className={accColorBackground ? 'text-light' : ""}>
                            sign up
                        </Link>
                    </Col>
                    <Col xs lg="2" >
                        <Link to="/about" className={accColorBackground ? 'text-light' : ""}>
                            about
                        </Link>
                    </Col>
                    <Col xs lg="2" >
                        <Link to="/contact-us" className={accColorBackground ? 'text-light' : ""}>
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

                    <FiPhone /><span>050-8695656</span>


                </Col>
            </Container>
        </section>
    );
} 