import './Item.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { IoHeartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ButtonModalAddItem from "./ButtonModalAddItem";

export default function Item({ itemImage, itemName, itemDescription, itemColor, ItemPrice, itemSizes, itemId }) {
    const [userSize, setUserSize] = useState("");
    const navigate = useNavigate();

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
                    <Card.Text> {ItemPrice} nis</Card.Text>
                    <Card.Text>
                        <Form.Select aria-label="select-sizes" onChange={(choice) => setUserSize(choice.target.value)}>
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

                        <ButtonModalAddItem itemImage={itemImage} itemName={itemName} itemDescription={itemDescription} ItemPrice={ItemPrice} itemSizes={itemSizes} itemColor={itemColor} size={userSize} />
                    </div>
                </Card.Body>
            </Card >
        </>
    )
}