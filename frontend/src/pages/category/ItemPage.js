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
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';



export default function ItemPage() {
    const { id } = useParams();
    const [oneCard, setOneCard] = useState([]);
    const [colorChosenItemPage, setColorChosenItemPage] = useState("");
    const [sizeChosenItemPage, setSizeChosenItemPage] = useState("");


    useEffect(() => {
        fetch(`http://localhost:2222/products/${id}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setOneCard(data);
                console.log(oneCard);
            })
    }, [])

    function addProduct() {
        alert(colorChosenItemPage + sizeChosenItemPage);

    }

    return (
        <section id="item-page" className='item-page-body'>
            {
                oneCard.map(oneC => (

                    <Container fluid>
                        <Row xs={1} md={2} className='item-page-header'>
                            <>

                                <Col className='item-page-img-left'>
                                    <Image src={oneC.img} fluid />
                                </Col>
                                <Col className='item-page-info-right'>
                                    <h3>{oneC.productName}</h3>
                                    <div className='item-price'>{oneC.price} nis</div>
                                    <div className='item-color-div'>
                                        <Form.Select aria-label="select-sizes" onChange={(choice) => setColorChosenItemPage(choice.target.value)}>
                                            <option>choose color</option>
                                            {
                                                oneC.color.map(c => (
                                                    <>
                                                        <option value={c}>{c}</option>
                                                    </>
                                                ))
                                            }
                                        </Form.Select>
                                    </div>


                                    <div className='item-size-div'>
                                        <Form.Select aria-label="select-sizes" onChange={(choice) => setSizeChosenItemPage(choice.target.value)}>
                                            <option>choose size</option>
                                            {
                                                oneC.sizes.map(s => (
                                                    <>
                                                        <option value={s}>{s}</option>
                                                    </>
                                                ))
                                            }
                                        </Form.Select>
                                    </div>

                                    <div className='add-item-to' >
                                        <span>
                                            <IoMdHeartEmpty />
                                        </span>
                                        <Button onClick={addProduct}>+ add item</Button>
                                    </div>
                                </Col >
                            </>
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
                    </Container >

                ))
            }
        </section >
    )
}