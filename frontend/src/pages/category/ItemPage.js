import './ItemPage.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { IoHeartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import Accordion from 'react-bootstrap/Accordion';


export default function ItemPage() {
    return (
        <section id="item-page" className='item-page-body'>
            <Container fluid>
                <Row xs={1} md={2} className='item-page-header'>
                    <Col className='item-page-img-left'>
                        <Image src="https://kides.co.il/wp-content/uploads/2017/09/12484-01d561b95ed55a495d26ee450bc4cf46.jpg" fluid />
                    </Col>
                    <Col className='item-page-info-right'>
                        <h3>item Name</h3>
                        <div className='item-price'> 50 nis</div>
                        <div className='item-color-div'>
                            <div>color :</div>
                            <span className='the-color'></span>
                        </div>

                        <div className='item-size-div'>
                            <div>S</div>
                            <div>M</div>
                            <div>L</div>
                        </div>

                        <div className='add-item-to' >
                            <span>
                                {/* <IoHeartOutline /> */}
                                <IoMdHeartEmpty />
                            </span>
                            <Button>+ add item</Button>
                        </div>
                        {/* <Form.Select aria-label="select-sizes">
                            <option>sizes  </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select> */}
                    </Col>
                </Row>

                <Row className='footer-item-page'>
                    <h3>More Information</h3>
                    <Col></Col>
                    <Col xs={8}>
                        <Accordion defaultActiveKey={['0']} alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Product information</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Accordion Item #2</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Col>

                </Row>
            </Container>
        </section >
    )
}