import './ShoppingBasket.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { useContext, useEffect, useState } from 'react';

import { GeneralContext } from '../../App';
import Button from 'react-bootstrap/esm/Button';


// export const list = [
//     {
//         itemName: 'חולצת פסים',
//         itemPrice: 120,
//         itemImg: 'https://www.stickdecor.co.il/files/products/image1_1697_2016-09-19_10-43-16.jpg'
//     },
//     {
//         itemName: 'גינס ארוך',
//         itemPrice: 70,
//         itemImg: 'https://www.zico-fashion.co.il/wp-content/uploads/2023/07/20230705_121956-scaled.jpg'
//     },
//     {
//         itemName: 'חצאית קצרה',
//         itemPrice: 50,
//         itemImg: 'https://xversi.com/wp-content/uploads/2023/06/shskirt_black.jpg'
//     }
// ]
export default function ShoppingBasket() {
    const [sum, setSum] = useState();

    const { user, roleType, setUser, setRoleType, basket, setBasket, productCat, setProductCat } = useContext(GeneralContext);

    useEffect(() => {
        const s = basket.reduce((res, y) => res += y.item.price, 0);
        setSum(s)
        console.log(s)
        console.log(basket)
    }, [])




    return (
        <section id="basket" className='basket-page'>
            <Container fluid>
                <Row>
                    <h3>welcome to SHOPPINGBASKET</h3>
                </Row>

                <Row className='basket-body'>
                    {basket.length ?

                        <Col>
                            <ListGroup as="ol" numbered>
                                {/* {
                                list.map((x, i) => (
                                    <ListGroup.Item
                                        as="li"
                                        className="d-flex justify-content-between align-items-start"
                                        key={i}
                                    >
                                        <div className="ms-2 me-auto">
                                            <div className="fw-bold">{x.itemName}</div>
                                            {x.itemPrice} <span>ש"ח</span>
                                        </div>
                                        <div className='item-img-basket'>
                                            <Image src={x.itemImg} />
                                        </div>

                                    </ListGroup.Item>
                                ))
                            } */}
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
                        : <h4 >There are no products in the shopping basket</h4>}

                </Row>
            </Container>
        </section >
    );
}