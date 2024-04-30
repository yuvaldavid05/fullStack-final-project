import './ShoppingBasket.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { useContext, useEffect, useState } from 'react';

import { GeneralContext } from '../../App';
import Button from 'react-bootstrap/esm/Button';
import { BsTrash3 } from "react-icons/bs";


export default function ShoppingBasket() {
    const [sum, setSum] = useState();

    const { user, roleType, setUser, setRoleType, basket, setBasket, productCat, setProductCat } = useContext(GeneralContext);

    useEffect(() => {
        const s = basket.reduce((res, y) => res += y.item.price, 0);
        setSum(s)
        console.log(s)
        console.log(basket)
    }, [basket, setBasket])

    function deleteItem(itemId, itemColorPicked, itemSizePicked, itemIndex) {
        const itemDeleteIndex = basket.findIndex((t, i) => t.item._id === itemId && t.color === itemColorPicked && t.size === itemSizePicked && i === itemIndex);

        if (!window.confirm("Delete This Item?")) {
            return;
        }

        basket.splice(itemDeleteIndex, 1);
        setBasket([...basket]);
        console.log(basket)
    }


    return (
        <section id="basket" className='basket-page'>
            <Container fluid>
                <Row>
                    <h3>welcome to SHOPPINGBASKET</h3>
                </Row>

                <Row className='basket-body'>
                    {basket.length ?
                        <>

                            <Col>
                                <ListGroup as="ol" numbered>
                                    {
                                        basket.map((x, i) => (
                                            <ListGroup.Item
                                                as="li"
                                                className="d-flex justify-content-between align-items-start"
                                                key={i}
                                            >
                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">{x.item.productName}</div>
                                                    {x.item.price} <span>nis</span>
                                                    <div className="icon-trash" onClick={() => deleteItem(x.item._id, x.color, x.size, i)}>
                                                        <BsTrash3 />
                                                    </div>
                                                </div>

                                                <div className="ms-2 me-auto">
                                                    <div className="fw-bold">{x.color}</div>
                                                    <div className="fw-bold">{x.size}</div>


                                                </div>
                                                <div className='item-img-basket'>
                                                    <Image src={x.item.img} />
                                                </div>

                                            </ListGroup.Item>

                                        ))
                                    }
                                </ListGroup>

                                <div className=" fw-bold sum-div">
                                    <div>Items Total : ({basket.length}) </div>
                                    <div>Total : {sum} nis </div>
                                    <Button variant="secondary">checkout ({basket.length})</Button>
                                </div>
                            </Col>
                        </>
                        : <h4 >There are no products in the shopping basket</h4>}

                </Row>
            </Container>
        </section >
    );
}