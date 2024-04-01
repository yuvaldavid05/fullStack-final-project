import './ContactUs.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

export default function ContactUs() {
    return (
        <section id="contact-us-page" className='contact-page-body'>
            <Container fluid>
                <Row>
                    <b><h2>CONTACT US</h2></b>
                    <p>let us know what u think..</p>
                </Row>
                <Row className='contact-form'>
                    <h4>fill the inputs</h4>
                    <div className='costumer-details'>
                        <Row>
                            <Col>
                                <Form.Label htmlFor="inputPassword5">full-name</Form.Label>
                                <Form.Control
                                    type="fullName"
                                    id="inputFullName"
                                    aria-describedby="passwordHelpBlock"
                                />
                            </Col>

                            <Col>
                                <Form.Label htmlFor="inputPassword5">phone</Form.Label>
                                <Form.Control
                                    type="fullName"
                                    id="inputFullName"
                                    aria-describedby="passwordHelpBlock"
                                />
                            </Col>
                        </Row>

                        <FloatingLabel controlId="floatingTextarea2" label="Comments">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                style={{ height: '150px' }}
                            />
                        </FloatingLabel>
                        <Button>send</Button>
                    </div>
                    <Row className='Web-details'>
                        <Col>our address: <br></br>hsuhshsdha 54</Col>
                        <Col>our phone: <br></br>054-8882645</Col>
                        <Col> our email:<br></br> sdfhud@asjnjsadnd</Col>
                    </Row>
                </Row>
            </Container>
        </section >
    );
}