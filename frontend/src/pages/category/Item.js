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

export default function Item({ itemImage, itemName, itemDescription, itemColor, itemPrice, itemSizes, itemId, itemLikesUsers, cat, itemStock }) {
    const [userSize, setUserSize] = useState("");
    const navigate = useNavigate();
    const [favorite, setFavorite] = useState(false);
    const { user, setLoader, snackbarOn } = useContext(GeneralContext);
    const [u, setU] = useState({});


    useEffect(() => {
        if (user) {
            if (itemLikesUsers.includes(user._id)) {
                setFavorite(true);
            } else {
                setFavorite(false);
            }
        }

        if (user) {
            setU({
                id: user._id,
            })
        }
    }, [itemLikesUsers, cat])


    const changeFavorite = (itemId) => {
        if (!favorite) {
            setLoader(true);
            setFavorite(true);
            fetch(`http://localhost:2222/products/${itemId}/favorite`, {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(u),
            })
                .then(() => {
                    snackbarOn("Added to favorites");
                })
                .finally(() => setLoader(false));

        } else if (favorite) {
            setLoader(true);
            setFavorite(false);
            fetch(`http://localhost:2222/products/${itemId}/unfavorite`, {
                credentials: 'include',
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(u),
            })
                .then(data => {
                    snackbarOn("Removed from favorites");
                })
                .finally(() => setLoader(false));
        }
    }

    return (
        <div className='holder'>
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
                        <Form.Select aria-label="select-size" onChange={(choice) => setUserSize(choice.target.value == "sizes" ? "" : choice.target.value)}>
                            <option>sizes</option>
                            {
                                itemSizes.map((s, i) => (
                                    <React.Fragment key={i}>
                                        <option value={s}>{s}</option>
                                    </React.Fragment>
                                ))
                            }
                        </Form.Select>
                    </Card.Text>
                    <Card.Text className='itemColors' >
                        {
                            itemColor.map((c, index) => (
                                <div className="divColor" key={index} >
                                    <div className="color" style={{ backgroundColor: c }}></div>
                                    {itemColor.length >= 5 ? "" : <span>{c}</span>}
                                </div>
                            ))
                        }

                    </Card.Text>
                    <div className='footerCard'>
                        <div onClick={() => navigate(`/products/${itemId}`)}>

                            <u>more info</u>

                        </div>

                        <ButtonModalAddItem itemImage={itemImage} itemName={itemName} itemDescription={itemDescription} itemPrice={itemPrice} itemSizes={itemSizes} itemColor={itemColor} size={userSize} itemId={itemId} itemStock={itemStock} />
                    </div>
                </Card.Body>
            </Card >
        </div>
    )
}