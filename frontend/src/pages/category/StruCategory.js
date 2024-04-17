import './StruCategory.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Item from './Item';
import React, { useEffect, useState } from 'react';


export const GeneralContext = React.createContext();
// export const items = [
//     {
//         itemImage: "https://media.terminalx.com/pub/media/catalog/product/cache/f112238e8de94b6d480bd02e7a9501b8/w/0/w041110001-11690953404.jpg",
//         itemName: 'black-pants',
//         itemDescription: "hhhhhh",
//         itemColor: ['black'],
//         itemPrice: '80',
//         itemSizes: ['S', 'M', 'L']
//     },
//     {
//         itemImage: "https://img.fruugo.com/product/4/09/513051094_max.jpg",
//         itemName: 'red-shirt',
//         itemDescription: "gggggg",
//         itemColor: ['red'],
//         itemPrice: '60',
//         itemSizes: ['S', 'L']
//     },
// ]

export default function StruCategory() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch("http://localhost:2222/products", {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data);
            });
    }, []);


    return (
        <GeneralContext.Provider value={{ products, setProducts }}>
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

                            products.map(p => {
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
        </GeneralContext.Provider>


    );
}