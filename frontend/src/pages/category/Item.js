import './Item.css';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { IoHeartOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';

export default function Item({ itemImage, itemName, itemColor, ItemPrice, itemSizes }) {
    useEffect(() => {

        // itemColor.forEach(col => console.log(col))
        // itemColor.map(col => console.log(col))
        // console.log(itemColor);
        // console.log(itemColor.length);

    }, []);

    return (
        <>
            <Card>
                <Card.Img variant="top" src={itemImage} />
                <div className='like'>
                    {/* <IoHeartOutline /> */}
                    <IoMdHeartEmpty />
                </div>
                <Card.Body>
                    <Card.Title>{itemName}</Card.Title>
                    <Card.Text> {ItemPrice} nis</Card.Text>
                    <Card.Text>
                        <Form.Select aria-label="select-sizes">
                            {/* <option>sizes  </option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option> */}
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
                        {/* עובד רק לצבע אחד */}
                        <div className="divColor">
                            <div className="color" style={{ backgroundColor: itemColor }}></div>
                            <span>{itemColor}</span>
                        </div>
                        {/* {
                            itemColor.forEach((col, i) => {
                                console.log(col, i);
                                return (
                                    <div className="divColor">
                                        <div className="color" style={{ backgroundColor: col }}></div>
                                        <span>{col}</span>
                                    </div>
                                );
                            })
                        } */}

                    </Card.Text>
                    <div className='footerCard'>
                        <Link to="/item-page">
                            more info
                        </Link>
                        <Button variant="primary">+ add item</Button>
                    </div>
                </Card.Body>
            </Card >
        </>
    )
}