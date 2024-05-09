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
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";

// דף של מבנה קטגוריה

export default function StruCategory() {
    const { cat } = useParams();
    const { productCat, setProductCat, loader, setLoader, searchWord } = useContext(GeneralContext);
    const myRef = useRef();
    const [changeView, setChangeView] = useState(false);

    const [col, setCol] = useState("");

    const genderStr = ["men", "women", "all"];
    const colorsStr = ["red", "gray", "pink", "brown", "green", "blue", "orange", "white", "black"];

    useEffect(() => {
        setLoader(true);
        fetch(`http://localhost:2222/products/` + (cat ? `category/${cat}` : ""), {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setProductCat(data);
            })
            .finally(() => setLoader(false));
    }, [cat, col]);


    const handleInputChange = (ev) => {
        const { value } = ev.target;

        if (ev.target.checked) {
            if (value == "all") {
                setCol("");
            } else {
                setCol(value);
            }
        }
    }


    const handleInputChangeView = (ev) => {
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

                    <div>
                        <Form className="change-view">
                            <Form.Check
                                type="switch"
                                id="custom-switch"
                                label="Table"
                                onChange={handleInputChangeView}
                            />
                        </Form>
                    </div>


                    <div key={`inline-'radio'`} className="mb-3">
                        <h5>gender:</h5>

                        {genderStr.map((g, i) => (

                            <Form.Check key={i}
                                inline
                                label={g}
                                name="gender"
                                value={g}
                                type='radio'
                                id={`inline-'radio'-${i}`}
                                onChange={handleInputChange}
                            />
                        ))}

                    </div>
                </div>
                {!changeView ?


                    <Row xs={2} md={5}>
                        {
                            productCat.filter(c => search(searchWord, c.productName, c.description)).filter(x => col ? x.gender.includes(col) : x.gender.length).map((p, i) =>

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
                                    <th className="align-middle"> favorite</th>
                                    <th className="align-middle">add</th>

                                </tr>
                            </thead>
                            <tbody>
                                {productCat.filter(c => search(searchWord, c.productName, c.description)).filter(x => col ? x.gender.includes(col) : x.gender.length).map((t, i) => (
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
                                        <td>
                                            {t.likes.length ? <IoMdHeart /> : <IoMdHeartEmpty />}

                                        </td>
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
