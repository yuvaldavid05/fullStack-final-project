import './StruCategory.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Item from './Item';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GeneralContext } from '../../App';
import { search } from "../../components/searchbar/Searchbar";
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import ButtonModalAddItem from './ButtonModalAddItem';
// דף של מבנה קטגוריה

export default function StruCategory() {
    const { cat } = useParams();
    const { productCat, setProductCat, loader, setLoader, searchWord } = useContext(GeneralContext);
    const myRef = useRef();
    const colorsStr = ["red", "gray", "pink", "brown", "green", "blue", "orange", "white", "black"];
    const [changeView, setChangeView] = useState(false);

    useEffect(() => {
        // setLoader(true);
        fetch(`http://localhost:2222/products/` + (cat ? `category/${cat}` : ""), {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                // myRef.current = data;
                setProductCat(data);
                console.log(data)
            })
        // .finally(() => setLoader(false));
    }, [cat]);

    const array = [];
    // let c = "";
    const handleInputChange = (ev) => {
        const { value } = ev.target;

        if (ev.target.checked) {
            array.push(value);
            console.log(array)
            // c = value;

        } else if (!ev.target.checked) {
            const i = array.findIndex(x => x === value);
            array.splice(i, 1);
            console.log(array)
            console.log(i)
            // c = "";
        }
    }

    const handleInputChangeView = (ev) => {
        console.log(ev.target.value)
        if (ev.target.value) {
            setChangeView(!changeView);
        }
    }

    const sTableHeader = [
        { name: 'productName', type: 'text', label: 'product Name', required: true, sm: '6' },
        { name: 'description', type: 'text', label: 'Description', required: true, sm: '6' },
        { name: 'price', type: 'number', label: 'Price', required: true, sm: '12' },
        { name: 'sizes', type: 'array', label: 'Sizes', required: true, sm: '12' },
        { name: 'color', type: 'array', label: 'Color', required: true, sm: '4' },
        { name: 'img', type: 'text', label: 'Img URL', required: true, sm: '4' },
        { name: 'category', type: 'text', label: 'Category', required: true, sm: '4' },
    ]

    return (
        <section id="category" className='body-category'>
            <Container fluid>
                <div className='title-holder'>
                    <h2>{cat ? cat : "All Categories"}</h2>
                    <div>{cat ? `Our  ${cat} collection` : ""}</div>
                    <hr></hr>

                    <Form className="change-view">
                        <Form.Check
                            type="switch"
                            id="custom-switch"
                            label="Table"
                            onChange={handleInputChangeView}
                        />
                    </Form>


                    <div key={`inline-'checkbox'`} className="mb-3">
                        <h5>color:</h5>
                        {colorsStr.map((g, i) => (

                            <Form.Check
                                inline
                                label={g}
                                name="color"
                                value={g}
                                type='checkbox'
                                id={`inline-'checkbox'-${i}`}
                                onChange={handleInputChange}
                            />
                        ))}
                    </div>
                </div>
                {!changeView ?


                    <Row xs={2} md={5}>
                        {/* filter((y, i) => y.color.find(x => x == c)) */}
                        {
                            productCat.filter(c => search(searchWord, c.productName, c.description)).map((p, i) =>
                            (
                                <Col key={i}>
                                    <div className='holder'>
                                        <Item itemImage={p.img} itemName={p.productName} itemDescription={p.description} itemPrice={p.price} itemSizes={p.sizes} itemColor={p.color} itemId={p._id} itemLikesUsers={p.likes} cat={cat ? cat : ""} itemStock={p.stock} />

                                    </div>


                                </Col>
                            ))
                        }
                    </Row> : ""
                }
                {changeView ?

                    <div >

                        <Table striped bordered hover className='table-pro align-middle'>
                            <thead>
                                <tr>
                                    <th className="align-middle">#</th>
                                    {sTableHeader.map((st, i) => (

                                        <th key={i} className="align-middle">{st.name}</th>
                                    ))}
                                    {/* <th className="align-middle">Like</th> */}
                                    <th className="align-middle">add</th>

                                </tr>
                            </thead>
                            <tbody>
                                {productCat.filter(c => search(searchWord, c.productName, c.description)).map((t, i) => (
                                    <tr>
                                        <td>{i + 1}</td>
                                        <td>{t.productName}</td>
                                        <td>{t.description}</td>
                                        <td>{t.price}</td>
                                        <td>{t.sizes.join(", ")}</td>
                                        <td className='color'>{t.color.map(c => (
                                            <div className="color-div" style={{ backgroundColor: c }}></div>
                                        ))}</td>
                                        <td>
                                            <Image src={t.img} rounded />
                                        </td>
                                        <td>{t.category}</td>
                                        {/* <td>
                                        <IoMdHeartEmpty />
                                    </td> */}
                                        <td>
                                            <ButtonModalAddItem itemImage={t.img} itemName={t.productName} itemDescription={t.description} itemPrice={t.price} itemSizes={t.sizes} itemColor={t.color} size={""} itemId={t._id} itemStock={t.stock} />
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    </div>
                    : ""}


            </Container>
        </section >
    );
}