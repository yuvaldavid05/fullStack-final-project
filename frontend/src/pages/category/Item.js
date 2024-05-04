import './Item.css';
import Card from 'react-bootstrap/Card';
import { IoMdHeartEmpty } from "react-icons/io";
import React, { useRef, useContext, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ButtonModalAddItem from "./ButtonModalAddItem";
import { GeneralContext } from '../../App';
import { IoMdHeart } from "react-icons/io";

// דף מבנה של מוצר

export default function Item({ itemImage, itemName, itemDescription, itemColor, itemPrice, itemSizes, itemId, itemLikesUsers, cat }) {
    const [userSize, setUserSize] = useState("");
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState(false);

    const { user, roleType, setUser, setRoleType, basket, setBasket, productCat, setProductCat } = useContext(GeneralContext);

    // if (user) {
    //     let u = {
    //         id: user._id
    //     };
    // }

    const myRef = useRef();


    useEffect(() => {
        if (itemLikesUsers.length && user) {
            const array = itemLikesUsers.filter(x => x === user._id);
            console.log(array)
            if (array.length && array[0] == user._id) {
                setFavorite(true);
            } else {
                setFavorite(false);
            }
        }
        console.log(favorite);
    }, [])

    const changeFavorite = (itemId) => {
        const u = {
            id: user._id
        };

        if (!favorite) {
            setFavorite(true);
            fetch(`http://localhost:2222/products/${itemId}/favorite`, {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': localStorage.token
                },
                body: JSON.stringify(u),
            })
                .then(() => {
                    alert("succsed")
                });
        } else if (favorite) {
            setFavorite(false);
            fetch(`http://localhost:2222/products/${itemId}/unfavorite`, {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': localStorage.token
                },
                body: JSON.stringify(u),
            })
                .then(() => {
                    alert("succsed unlike")
                });
        }
    }

    return (
        <>
            <Card>
                <Card.Img variant="top" src={itemImage} />
                {user ?
                    <div className='like' onClick={() => changeFavorite(itemId)}>
                        {!favorite ? <IoMdHeartEmpty /> : <IoMdHeart />}

                    </div> : ""}

                <Card.Body>
                    <Card.Title>{itemName}</Card.Title>
                    <Card.Text> {itemDescription}</Card.Text>
                    <Card.Text> {itemPrice} nis</Card.Text>
                    <Card.Text>
                        <Form.Select aria-label="select-sizes" onChange={(choice) => setUserSize(choice.target.value == "sizes" ? "" : choice.target.value)}>
                            <option>sizes</option>
                            {
                                itemSizes.map(s => (
                                    <>
                                        <option value={s}>{s}</option>
                                    </>
                                ))
                            }
                        </Form.Select>
                    </Card.Text>
                    <Card.Text className='itemColors'>
                        {
                            itemColor.map(c => (
                                <div className="divColor">
                                    <div className="color" style={{ backgroundColor: c }}></div>
                                    <span>{c}</span>
                                </div>
                            ))
                        }

                    </Card.Text>
                    <div className='footerCard'>
                        <div onClick={() => navigate(`/products/${itemId}`)}>

                            <u>more info</u>

                        </div>

                        <ButtonModalAddItem itemImage={itemImage} itemName={itemName} itemDescription={itemDescription} itemPrice={itemPrice} itemSizes={itemSizes} itemColor={itemColor} size={userSize} itemId={itemId} />
                    </div>
                </Card.Body>
            </Card >
        </>
    )
}