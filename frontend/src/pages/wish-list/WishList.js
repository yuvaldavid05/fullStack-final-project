import "./WishList.css";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Item from '../category/Item';
import Col from "react-bootstrap/esm/Col";
import Row from 'react-bootstrap/Row';
import { GeneralContext } from '../../App';


export default function WishList() {
    const [cards, setCards] = useState([])
    const [likeArray, setlikeArray] = useState(false)
    const { user, productCat, setProductCat, loader, setLoader, searchWord } = useContext(GeneralContext);

    let myRef = useRef(null);

    // const func = useCallback(() => {
    //     return myRef.current;
    // }, [myRef])

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:2222/products/`, {
                credentials: 'include',
            })
                .then(res => res.json())
                .then(data => {
                    // myRef.current = data;
                    // myRef.current = data.map(c => c.likes.includes(user._id));
                    setCards(data);
                    console.log(myRef)

                }).then(() => {
                    // if (cards.map(c => c.likes.includes(user._id)) === true) {
                    //     setlikeArray(true)
                    // } else {
                    //     setlikeArray(false)
                    // }
                    // setlikeArray(cards.map(c => c.likes.includes(user._id)))
                    // console.log(likeArray)
                })
        }

    }, [])
    return (
        <section id="wishlist" className='body-wishlist'>
            <h3>welcome to WISHLIST</h3>
            <hr></hr>

            {user ?
                <Row xs={2} md={5}>



                    {cards.filter(c => c.likes.includes(user._id)).map(x => (
                        <Col>

                            <>
                                <Item itemImage={x.img} itemName={x.productName} itemDescription={x.description} itemPrice={x.price} itemSizes={x.sizes} itemColor={x.color} itemId={x._id} itemLikesUsers={x.likes} cat={""} itemStock={x.stock} />
                            </>
                        </Col>
                    ))}
                </Row>
                : <h4 style={{ fontWeight: "lighter" }}>There are no favorite products...</h4>
            }


        </section>
    );
}