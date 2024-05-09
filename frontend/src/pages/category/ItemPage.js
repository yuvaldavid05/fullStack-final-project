import './ItemPage.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Accordion from 'react-bootstrap/Accordion';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GeneralContext } from '../../App';



export default function ItemPage() {
    const { id } = useParams();
    const [oneCard, setOneCard] = useState([]);
    const [colorChosenItemPage, setColorChosenItemPage] = useState("");
    const [sizeChosenItemPage, setSizeChosenItemPage] = useState("");
    const { basket, setBasket, loader, setLoader, snackbarOn } = useContext(GeneralContext);
    const navigate = useNavigate();



    useEffect(() => {
        setLoader(true);
        fetch(`http://localhost:2222/products/${id}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setOneCard(data);
            })
            .finally(() => setLoader(false))
    }, [])

    function addProduct() {

        snackbarOn(`The product has been added to the shopping cart, size: ${sizeChosenItemPage} color: ${colorChosenItemPage}`);

        const selectedProduct = {
            item: oneCard.pop(),
            size: sizeChosenItemPage,
            color: colorChosenItemPage
        }

        setBasket([...basket, selectedProduct]);
        navigate("/products")
    }



    return (
        <section id="item-page" className='item-page-body'>
            <Button className='button-back'>
                <Link to="/products">Back To "All Categories"</Link>

            </Button>
            {
                oneCard.map((oneC, index) => (

                    <Container fluid key={index}>
                        <Row xs={1} md={2} key={oneC.productName} className='item-page-header'>
                            <>

                                <Col className='item-page-img-left'>
                                    <Image src={oneC.img} fluid />
                                </Col>
                                <Col className='item-page-info-right'>
                                    <h3>{oneC.productName}</h3>
                                    <div className='item-price'>{oneC.price} nis</div>
                                    <div className='item-color-div'>
                                        <Form.Select aria-label="select-sizes" onChange={(choice) => setColorChosenItemPage(choice.target.value == "choose color" ? "" : choice.target.value)}>
                                            <option>choose color</option>
                                            {
                                                oneC.color.map((c, i) => (
                                                    <>
                                                        <option key={i} value={c}>{c}</option>
                                                    </>
                                                ))
                                            }
                                        </Form.Select>
                                    </div>


                                    <div className='item-size-div'>
                                        <Form.Select aria-label="select-sizes" onChange={(choice) => setSizeChosenItemPage(choice.target.value == "choose size" ? "" : choice.target.value)}>
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
                                        <Button onClick={addProduct} disabled={oneC.stock == 0 ? true : false || ((sizeChosenItemPage == "") || (colorChosenItemPage == "")) || (sizeChosenItemPage == "" && colorChosenItemPage == "")}>
                                            {oneC.stock == 0 ? "Out Of Stock " : " + add item"}
                                        </Button>
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
                                            <Row className='accordion-row-info'>
                                                <Col> <b> Gender :</b>  {oneC.gender.join(', ')}</Col>|
                                                <Col><b>Fabric Type : </b>{oneC.fabricType}</Col>|
                                                <Col> <b>collection :</b>  {oneC.collectionP}</Col>
                                            </Row>

                                            <br></br>

                                            <br></br>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Size Chart By Item</Accordion.Header>
                                        <Accordion.Body>
                                            {oneC.gender.includes("men") ?
                                                <Image src="https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-2.webp" fluid />
                                                : oneC.gender.includes("women") ?
                                                    <Image src="https://cdn.sportdirect.com/files/website-images/Stanno/Stanno-Size-chart-2024-3.webp" fluid /> :

                                                    ""

                                            }
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