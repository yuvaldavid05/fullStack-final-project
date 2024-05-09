import "./WishList.css";
import { useContext, useEffect, useState } from "react";
import Item from '../category/Item';
import Col from "react-bootstrap/esm/Col";
import Row from 'react-bootstrap/Row';
import { GeneralContext } from '../../App';
import { search } from "../../components/searchbar/Searchbar";


export default function WishList() {
    const [cards, setCards] = useState([])
    const { user, loader, setLoader, searchWord } = useContext(GeneralContext);


    useEffect(() => {
        if (user) {
            fetch(`http://localhost:2222/products/`, {
                credentials: 'include',
            })
                .then(res => res.json())
                .then(data => {
                    setCards(data);
                }).then(() => {

                })
        }

    }, [setCards])
    return (
        <section id="wishlist" className='body-wishlist'>
            <h3>welcome to WISHLIST</h3>
            <hr></hr>

            {user ?
                <Row xs={2} md={5}>



                    {cards.filter(c => c.likes.includes(user._id)).filter(c => search(searchWord, c.productName, c.description)).map(x => (

                        <Col>
                            <>
                                <Item itemImage={x.img} itemName={x.productName} itemDescription={x.description} itemPrice={x.price} itemSizes={x.sizes} itemColor={x.color} itemId={x._id} itemLikesUsers={x.likes} cat={""} itemStock={x.stock} />
                            </>
                        </Col>

                    ))}
                </Row>
                : ""
            }


        </section>
    );
}