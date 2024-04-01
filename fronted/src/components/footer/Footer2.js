import './Footer2.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import { Link } from 'react-router-dom';

export default function Footer2() {
    return (
        <section id="footer-section" className='footer'>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="2">
                        <Link to="">
                            login
                        </Link>
                    </Col>
                    <Col xs lg="2">
                        <Link to="">
                            sign up
                        </Link>
                    </Col>
                    <Col xs lg="2">
                        <Link to="">
                            about
                        </Link>
                    </Col>
                    <Col xs lg="2">
                        <Link to="">
                            contact us
                        </Link>
                    </Col>
                </Row>

                <hr></hr>
                <div>Copyright Yuval David</div>
            </Container>
        </section>
    );
} 