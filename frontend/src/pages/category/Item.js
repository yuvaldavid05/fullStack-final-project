import './Item.css';
import Card from 'react-bootstrap/Card';
import { IoMdHeartEmpty } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ButtonModalAddItem from "./ButtonModalAddItem";

export const GeneralContext = React.createContext();

export default function Item({ itemImage, itemName, itemDescription, itemColor, itemPrice, itemSizes, itemId }) {
    const [userSize, setUserSize] = useState("");
    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log(userSize)
    // }, [userSize])

    return (
        <>
            <Card>
                <Card.Img variant="top" src={itemImage} />
                <div className='like'>
                    <IoMdHeartEmpty />
                </div>
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