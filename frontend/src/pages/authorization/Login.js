import './Login.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';


export default function Login() {
    return (
        <section id="login-page" className='login-page-body'>
            <Container fluid>
                <Row className='frame-form-login'>
                    <h2><u>Login Here</u></h2>
                    <Col>

                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                            <Form.Control
                                placeholder="Email"
                                aria-label="Email"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                            <Form.Control
                                placeholder="Password"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                            />
                        </InputGroup>

                        <Button variant="secondary">Login</Button>
                        <Link to='/sign-up'>Sign-up</Link>

                    </Col>
                </Row>
            </Container>
        </section >
    );
}