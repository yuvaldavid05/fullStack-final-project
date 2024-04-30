import './ButtonModalAddItem.css';
import { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Item from './Item';

import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import { GeneralContext } from '../../App';


function ButtonModalAddItem({ itemImage, itemName, itemDescription, itemColor, itemPrice, itemSizes, size, itemId }) {
    const [userChoiceSize, setUserChoiceSize] = useState("");
    const [userChoiceColor, setUserChoiceColor] = useState("");
    const [show, setShow] = useState(false);

    const { user, roleType, setUser, setRoleType, basket, setBasket, productCat, setProductCat } = useContext(GeneralContext);


    const handleClose = () => {
        setShow(false)
        // איפוס ערכים בעת סגירת המודל
        setUserChoiceSize("")
        setUserChoiceColor("");
    }

    const handleShow = () => setShow(true);

    function sendToBasket(id) {

        // בדיקה שכל התאים מלאים (מידה וצבע) והשמה של המידה מהדף קטגוריה
        if (userChoiceSize == "" && size != "" && userChoiceColor != "") {
            // להוסיף בסנאקבר הדפסה למידה והצבע
            alert(userChoiceColor + size)
        } else if (userChoiceSize != "" && size == "" && userChoiceColor != "") {
            // להוסיף בסנאקבר הדפסה למידה והצבע
            alert(userChoiceColor + userChoiceSize)
        } else {
            alert("have to pick size and color");
        }


        const item = productCat.filter(x => x._id == id);

        const selectedProduct = {
            item: item.pop(),
            size: size ? size : userChoiceSize,
            color: userChoiceColor
        }

        console.log(userChoiceColor + userChoiceSize);
        console.log(size);
        console.log(selectedProduct);

        setBasket([...basket, selectedProduct]);
        console.log(basket);
        handleClose();
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                + add item
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item To Shopping-basket</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div>
                        <Container>
                            <Image src={itemImage} fluid />
                            <h3>{itemName}</h3>
                            <p>{itemDescription}</p>
                            <p>{itemPrice} nis</p>
                            <Row>
                                <Col><b>size : </b>
                                    <Form.Select aria-label="Default select example" onChange={(choice) => setUserChoiceSize(choice.target.value)}>
                                        {size === "" ? <option>choose size</option> : <option> {size}</option>}
                                        {
                                            itemSizes.map(sItem => (
                                                <>
                                                    {size == sItem ? "" : <option value={sItem} key={sItem}>{sItem}</option>}
                                                </>
                                            ))
                                        }
                                    </Form.Select>
                                </Col>
                                <Col> <b>color :  </b>
                                    <Form.Select aria-label="Default select example" onChange={(choice) => setUserChoiceColor(choice.target.value == "choose color" ? "" : choice.target.value)}>
                                        <option>choose color</option>
                                        {
                                            itemColor.map(cItem => (
                                                <>
                                                    <option value={cItem} key={cItem}>{cItem}</option>
                                                </>
                                            ))
                                        }
                                    </Form.Select>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Modal.Body>




                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => sendToBasket(itemId)}>
                        Add To Basket
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default ButtonModalAddItem;