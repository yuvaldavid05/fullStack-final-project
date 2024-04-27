import './StruCategory.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Item from './Item';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';




export default function StruCategory() {
    const { cat } = useParams();
    const [productCat, setProductCat] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:2222/products/category/${cat}`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setProductCat(data);
            });
    }, []);


    return (
        <section id="category" className='body-category'>
            <Container fluid>
                <div className='title-holder'>
                    <h2>Category Name</h2>
                    <div>jjdfnafnd</div>
                    <hr></hr>
                </div>
                <Row xs={2} md={5}>
                    {
                        // items.map(it => {
                        //     return (
                        //         <Col>
                        //             <div className='holder'>
                        //                 <Item itemImage={it.itemImage} itemName={it.itemName} itemColor={it.itemColor} ItemPrice={it.itemPrice} itemSizes={it.itemSizes} />
                        //             </div>
                        //         </Col>
                        //     )
                        // })

                        productCat.map(p => {
                            return (
                                <Col>
                                    <div className='holder'>
                                        <Item itemImage={p.img} itemName={p.productName} itemDescription={p.description} ItemPrice={p.price} itemSizes={p.sizes} itemColor={p.color} itemId={p._id} />
                                    </div>
                                </Col>
                            )
                        })
                    }


                    {/* <Col>
                        <div className='holder'>
                            <Item itemImage={'https://dalicanvas.co.il/wp-content/uploads/2022/10/%D7%AA%D7%9E%D7%95%D7%A0%D7%AA-%D7%A0%D7%95%D7%A3-%D7%99%D7%9D-%D7%A0%D7%A7%D7%99.jpg'} itemName={'מכנסי עור'} itemColor={['black']} ItemPrice={'100'} />
                        </div>
                    </Col>
                   */}


                </Row>
            </Container>
        </section>
    );
}