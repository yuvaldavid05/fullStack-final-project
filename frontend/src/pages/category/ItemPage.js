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
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { GeneralContext } from '../../App';



export default function ItemPage() {
    const { id } = useParams();
    const [oneCard, setOneCard] = useState([]);
    const [colorChosenItemPage, setColorChosenItemPage] = useState("");
    const [sizeChosenItemPage, setSizeChosenItemPage] = useState("");
    const { user, roleType, setUser, setRoleType, basket, setBasket, productCat, setProductCat, loader, setLoader, snackbarOn } = useContext(GeneralContext);
    const navigate = useNavigate();


    useEffect(() => {
        setLoader(true);
        fetch(`http://localhost:2222/products/${id}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setOneCard(data);
                console.log(oneCard);
            })
            .finally(() => setLoader(false))
    }, [])

    function addProduct() {
        if ((colorChosenItemPage == "choose color") || (sizeChosenItemPage == "choose size") || (colorChosenItemPage == "choose color" && sizeChosenItemPage == "choose size")) {

            alert("have to pick size and color");
        } else {
            // alert(colorChosenItemPage + sizeChosenItemPage);
            snackbarOn(`The product has been added to the shopping cart, size: ${sizeChosenItemPage} color: ${colorChosenItemPage}`);
        }

        // const item = productCat.filter(x => x._id == itemId);

        const selectedProduct = {
            item: oneCard.pop(),
            size: sizeChosenItemPage,
            color: colorChosenItemPage
        }

        console.log(colorChosenItemPage + sizeChosenItemPage);
        console.log(selectedProduct);

        setBasket([...basket, selectedProduct]);
        console.log(basket);
        navigate("/products")
    }

    // function sendToBasket(id) {

    //     // בדיקה שכל התאים מלאים (מידה וצבע) והשמה של המידה מהדף קטגוריה
    //     if (userChoiceSize == "" && size != "" && userChoiceColor != "") {
    //         // להוסיף בסנאקבר הדפסה למידה והצבע
    //         alert(userChoiceColor + size)
    //     } else if (userChoiceSize != "" && size == "" && userChoiceColor != "") {
    //         // להוסיף בסנאקבר הדפסה למידה והצבע
    //         alert(userChoiceColor + userChoiceSize)
    //     } else {
    //         alert("have to pick size and color");
    //     }


    //     const item = productCat.filter(x => x._id == id);

    //     const selectedProduct = {
    //         item: item.pop(),
    //         size: size ? size : userChoiceSize,
    //         color: userChoiceColor
    //     }

    //     console.log(userChoiceColor + userChoiceSize);
    //     console.log(size);
    //     console.log(selectedProduct);

    //     setBasket([...basket, selectedProduct]);
    //     console.log(basket);
    //     handleClose();
    // }


    return (
        <section id="item-page" className='item-page-body'>
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
                                        <Form.Select aria-label="select-sizes" onChange={(choice) => setColorChosenItemPage(choice.target.value)}>
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
                                        <Button onClick={addProduct} disabled={oneC.stock == 0 ? true : false}>
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
                                            <Image src="https://bodyandsoul.mu/media/size_chart/menwebcom.jpg" fluid />
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