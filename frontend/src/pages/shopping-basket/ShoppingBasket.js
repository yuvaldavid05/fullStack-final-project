import './ShoppingBasket.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import { useContext, useEffect, useRef, useState } from 'react';

import { GeneralContext } from '../../App';
import Button from 'react-bootstrap/esm/Button';
import { BsTrash3 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export default function ShoppingBasket() {
    const [sum, setSum] = useState();
    // const [paymentUser, setPaymentUser] = useState("");
    // const [deliveryUser, setDeliveryUser] = useState("");
    const [userOrder, setUserOrder] = useState({
        payment: "",
        delivery: ""
    })
    const [next, setNext] = useState(false);

    const { user, roleType, setUser, setRoleType, basket, setBasket, productCat, setProductCat } = useContext(GeneralContext);

    let myRef = useRef(null);

    const payment = ["PayPal", "Bit", "credit card"];
    const delivery = ["Home Delivery", "Self Collection"];

    const structureFormOrder = [
        { name: 'firstName', type: 'text', label: 'First Name', required: true, sm: '4' },
        { name: 'lastName', type: 'text', label: 'Last Name', required: true, sm: '4' },
        { name: 'email', type: 'email', label: 'Email', required: true, sm: '4' },
        { name: 'phone', type: 'tel', label: 'Phone', required: true, sm: '4' },
        { name: 'country', type: 'text', label: 'country', required: true, sm: '4' },
        { name: 'city', type: 'text', label: 'city', required: true, sm: '4' },
        { name: 'street', type: 'text', label: 'street', required: true, sm: '2' },
        { name: 'houseNumber', type: 'number', label: 'house Number', required: true, sm: '2' },
        { name: 'zip', type: 'number', label: 'zip', required: false, sm: '2' },
    ]

    useEffect(() => {
        const s = basket.reduce((res, y) => res += y.item.price, 0);
        setSum(s)

        let objBasket = JSON.parse(sessionStorage.getItem('basketDate'));
        console.log(objBasket)
        myRef = basket;
        setBasket(objBasket);
        console.log(s)
        console.log(basket)
    }, [myRef, setBasket])


    function deleteItem(itemId, itemColorPicked, itemSizePicked, itemIndex) {
        const itemDeleteIndex = basket.findIndex((t, i) => t.item._id === itemId && t.color === itemColorPicked && t.size === itemSizePicked && i === itemIndex);

        if (!window.confirm("Delete This Item?")) {
            return;
        }

        basket.splice(itemDeleteIndex, 1);
        let tmp = JSON.parse(sessionStorage.getItem('basketDate'));
        tmp.splice(itemDeleteIndex, 1)
        if (tmp.length) {
            sessionStorage.setItem('basketDate', JSON.stringify(tmp))
        } else {
            sessionStorage.removeItem('basketDate');
        }
        setBasket([...basket]);
        console.log(basket)
    }

    const nextPage = () => {
        setNext(true);
    }

    const handleInputChange = ev => {
        const { name, value } = ev.target;
        setUserOrder({
            ...userOrder,
            [name]: value
        })

        console.log(userOrder)
    }

    function sendOrder() {
        if (userOrder.payment == "" || userOrder.delivery == "" || (userOrder.payment == "" && userOrder.delivery == "")) {
            alert("have to fill Payment && Delivery")
        } else {
            setUserOrder({
                ...userOrder,
                basket: basket,
            })
        }
        // setUserOrder({
        //     ...userOrder,
        //     basket: basket,
        // })

        // console.log(userOrder)
        const order = userOrder;
        sendRequste(order);
        // fetch(`http://localhost:2222/users/update-order/${user._id}`, {
        //     credentials: 'include',
        //     method: 'PUT',
        //     headers: {
        //         'Content-type': 'application/json',
        //         // 'Authorization': localStorage.token
        //     },
        //     body: JSON.stringify(order),
        // })
        //     .then(data => {
        //         console.log(data)
        //         console.log(user.orders)
        //         alert("Succeeded")
        //         console.log(user);
        //     });
        // user.orders.push(userOrder);
    }

    const sendRequste = (order) => {
        // מטרות - להוסיף להזמנות של להיוזר
        // להוריד מהמלאי של המוצרים אחד או יותר
        console.log(userOrder)
        console.log(order)

        // fetch(`http://localhost:2222/users/update-order/${user._id}`, {
        //     credentials: 'include',
        //     method: 'PUT',
        //     headers: {
        //         'Content-type': 'application/json',
        //         // 'Authorization': localStorage.token
        //     },
        //     body: JSON.stringify(order),
        // })
        //     .then(data => {
        //         console.log(data)
        //         console.log(user.orders)
        //         alert("Succeeded")
        //         console.log(user);
        //     });
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
                                    <Button variant="secondary" onClick={nextPage}>checkout ({basket.length})</Button>
                                </div>
                            </Col>
                        </>
                        : <h4 >There are no products in the shopping basket</h4>}

                </Row>

                {next ?

                    <Row>
                        <div>
                            <p> Do you have a user? -  <span><Link to="/login">Connect</Link></span></p>
                            {/* <br></br> */}
                            <p> Not registered with us? - <span><Link to="/sign-up">Sign up</Link></span></p>

                        </div>
                    </Row> : ""
                }
                <hr></hr>
                <Row>
                    <Col>
                        <h3>Order summary : </h3>
                        <div className='basketUserData'>

                            <div>Items Total : ({basket.length}) </div>
                            <div>Total : {sum} nis </div>
                        </div>
                        <div>

                            {user ?
                                <>
                                    <h5><u>Customer Details:</u></h5>
                                    <Row className='formUserData'>
                                        {structureFormOrder.filter(str => str.sm).map(s => (
                                            <Col sm={s.sm} key={s.name} >
                                                <Form.Label name={s.name}>{s.required ? s.label + ' *' : s.label}</Form.Label>
                                                <Form.Control
                                                    disabled
                                                    id={s.name}
                                                    type={s.type}
                                                    aria-describedby={s.name}
                                                    value={user[s.name]}

                                                />
                                            </Col>
                                        ))}
                                    </Row>
                                </>
                                : ""
                            }


                        </div>
                        <div className='paymentUser'>
                            <h5><u>Payment Options</u></h5>
                            <Col>
                                {payment.map((p, i) => (
                                    <Form.Check
                                        inline
                                        label={p}
                                        value={p}
                                        name="payment"
                                        type="radio"
                                        id={`inline-'radio'-${i}`}
                                        onChange={handleInputChange}
                                    />
                                ))}
                            </Col>
                        </div>
                        <div className='deliveryUser'>
                            <h5><u>Delivery Options</u></h5>
                            <Col>

                                {delivery.map((d, i) => (
                                    <Form.Check
                                        inline
                                        label={d}
                                        value={d}
                                        name="delivery"
                                        type="radio"
                                        id={`inline-'radio'-${i}`}
                                        onChange={handleInputChange}
                                    />
                                ))}
                            </Col>
                        </div>
                        <Button variant="primary" onClick={sendOrder}>finish</Button>
                    </Col>
                </Row>
            </Container>
        </section >
    );
}