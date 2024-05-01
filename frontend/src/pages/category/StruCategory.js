import './StruCategory.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Item from './Item';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { GeneralContext } from '../../App';



export default function StruCategory() {
    const { cat } = useParams();
    const { user, roleType, setUser, setRoleType, basket, setBasket, productCat, setProductCat } = useContext(GeneralContext);

    useEffect(() => {
        fetch(`http://localhost:2222/products/` + (cat ? `category/${cat}` : ""), {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setProductCat(data);
                console.log(data)
            });
    }, [cat]);


    return (
        <section id="category" className='body-category'>
            <Container fluid>
                <div className='title-holder'>
                    <h2>{cat}</h2>
                    <div>{cat ? `Our  ${cat} collection` : "All Categories"}</div>
                    <hr></hr>
                </div>
                <Row xs={2} md={5}>
                    {
                        productCat.map((p, i) => {
                            return (
                                <Col key={i}>
                                    <div className='holder'>
                                        <Item itemImage={p.img} itemName={p.productName} itemDescription={p.description} itemPrice={p.price} itemSizes={p.sizes} itemColor={p.color} itemId={p._id} itemLikesUsers={p.likes} />
                                    </div>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </section>
    );
}