import "./AdminProductChange.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Joi from 'joi';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { GeneralContext } from '../../App';


export default function AdminProductChange() {
    const { id } = useParams();
    // const [item, setItem] = useState({});
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});
    const [isValid, setIsValid] = useState(false);
    const { loader, setLoader } = useContext(GeneralContext);
    const [colorChange, setColorChange] = useState(false)

    useEffect(() => {
        if (id === 'new-product') {
            setFormData({
                productName: "",
                description: "",
                price: "",
                sizes: [],
                color: [],
                img: "",
                category: "",
                stock: "",
                gender: [],
                fabricType: "",
                collectionP: "",
            });
        } else {
            setLoader(true);

            fetch(`http://localhost:2222/admin/products/${id}`, {
                credentials: 'include',
                headers: {
                    'Authorization': localStorage.token
                },
            })
                .then(res => res.json())
                .then(data => {
                    setFormData(data)
                })
                .finally(() => setLoader(false));
        }
    }, [id]);

    const UpdateSchema = Joi.object({
        productName: Joi.string().min(2).max(20).required(),
        description: Joi.string().min(2).max(25).required(),
        price: Joi.number().min(1).max(600).required(),
        sizes: Joi.array().items(Joi.string()).required(),
        color: Joi.array().items(Joi.string()).required(),
        img: Joi.string().min(1).max(150).required(),
        category: Joi.string().min(1).required(),
        stock: Joi.number().min(0).max(600).required(),
        gender: Joi.array().items(Joi.string()).required(),
        fabricType: Joi.string().min(1).max(10).required(),
        collectionP: Joi.string().min(1).max(15).required(),
    });

    const structureFormUpdatePro = [
        { name: 'productName', type: 'text', label: 'Product Name', required: true, sm: '6' },
        { name: 'description', type: 'text', label: 'Description', required: true, sm: '6' },
        { name: 'price', type: 'number', label: 'Price', required: true, sm: '4' },
        { name: 'sizes', type: 'array', label: 'Sizes', required: true, sm: '4' },
        { name: 'color', type: 'array', label: 'Color', required: true, sm: '4' },
        { name: 'category', type: 'text', label: 'Category', required: true, sm: '4' },
        { name: 'img', type: 'text', label: 'Img URL', required: true, sm: '4' },
        { name: 'stock', type: 'number', label: 'Stock', required: true, sm: '4' },
        { name: 'gender', type: 'array', label: 'Gender', required: true, sm: '4' },
        { name: 'fabricType', type: 'select', label: 'Fabric Type', required: true, sm: '4' },
        { name: 'collectionP', type: 'select', label: 'Collection', required: true, sm: '4' },
    ]

    const sizesStr = ["S", "M", "L", "XL"];
    const colorsStr = ["red", "gray", "pink", "brown", "green", "blue", "orange", "white", "black"];
    const genderStr = ["men", "women"];
    const fabricTypeStr = ["Linen", "silk", "wool", "leather", "cotton", "denim"];
    const collectionStr = ["New", "Sale", "Best Sellers", "Current", "Previous Season"];



    const handleInputChange = (ev) => {
        const { id, value } = ev.target;

        let obj = {};

        if (ev.target.name == "sizes") {
            const { name, value } = ev.target;
            if (ev.target.checked) {
                obj = {
                    ...formData,
                    [name]: [...formData.sizes, value],
                };

            } else if (!ev.target.checked) {
                const sizeRemoveIndex = formData.sizes.findIndex(x => x === value);
                let NewArray = formData.sizes;
                NewArray.splice(sizeRemoveIndex, 1);
                obj = {
                    ...formData,
                    [name]: NewArray,
                };
                console.log(obj)
                console.log(sizeRemoveIndex)
            }
        } else if (ev.target.name == "color") {
            const { name, value } = ev.target;
            if (ev.target.checked) {
                obj = {
                    ...formData,
                    [name]: [...formData.color, value],
                };

            } else if (!ev.target.checked) {
                const colorRemoveIndex = formData.color.findIndex(x => x === value);
                let NewArray = formData.color;
                NewArray.splice(colorRemoveIndex, 1);
                obj = {
                    ...formData,
                    [name]: NewArray,
                };

                // const colorRemoveIndex = formData.color.findIndex(x => x === ev.target.name);
                // let NewArrayC = formData.color;
                // NewArrayC.splice(colorRemoveIndex, 1);
                // obj = {
                //     ...formData,
                //     [id]: NewArrayC,
                // };
            }

        } else if (ev.target.name == "gender") {
            const { name, value } = ev.target;
            if (ev.target.checked) {
                obj = {
                    ...formData,
                    [name]: [...formData.gender, value],
                };
                console.log(obj)

            } else if (!ev.target.checked) {
                const genderRemoveIndex = formData.gender.findIndex(x => x === value);
                let NewArray = formData.gender;
                NewArray.splice(genderRemoveIndex, 1);
                obj = {
                    ...formData,
                    [name]: NewArray,
                };
                console.log(obj)
                console.log(genderRemoveIndex)
            }
        } else {
            console.log(ev.target)
            obj = {
                ...formData,
                [id]: value,
            };
            console.log(obj)

        }





        // if (id === 'sizes') {
        //     if (ev.target.checked) {
        //         obj = {
        //             ...formData,
        //             [id]: [...formData.sizes, ev.target.name],
        //         };
        //         console.log(obj)

        //     } else if (!ev.target.checked) {
        //         const sizeRemoveIndex = formData.sizes.findIndex(x => x === ev.target.name);
        //         let NewArray = formData.sizes;
        //         NewArray.splice(sizeRemoveIndex, 1);
        //         obj = {
        //             ...formData,
        //             [id]: NewArray,
        //         };
        //         console.log(obj)
        //         console.log(sizeRemoveIndex)
        //     }

        //     console.log(id, value)
        //     // כותרת הקליק
        //     console.log(ev.target.name)
        //     // אם מופעל או לא
        //     console.log(ev.target.checked)

        // } else if (id === "color") {
        //     if (ev.target.checked) {
        //         obj = {
        //             ...formData,
        //             [id]: [...formData.color, ev.target.name],
        //         };
        //         console.log(obj)

        //     } else if (!ev.target.checked) {
        //         const colorRemoveIndex = formData.color.findIndex(x => x === ev.target.name);
        //         let NewArrayC = formData.color;
        //         NewArrayC.splice(colorRemoveIndex, 1);
        //         obj = {
        //             ...formData,
        //             [id]: NewArrayC,
        //         };
        //         console.log(obj)
        //         console.log(colorRemoveIndex)
        //     }
        //     console.log(id, value)
        //     // כותרת הקליק
        //     console.log(ev.target.name)
        //     // אם מופעל או לא
        //     console.log(ev.target.checked)
        // } else {
        //     obj = {
        //         ...formData,
        //         [id]: value,
        //     };
        // }

        const schema = UpdateSchema.validate(obj, { abortEarly: false });
        const err = { ...errors, [id]: undefined };

        if (schema.error) {
            const error = schema.error.details.find(e => e.context.key === id);

            if (error) {
                err[id] = error.message;
            }
            setIsValid(false);
        } else {
            setIsValid(true);
        }

        setFormData(obj);
        setErrors(err);
    };


    const updateItem = ev => {
        ev.preventDefault();
        // setLoading(true);

        if (!formData.sizes.length || !formData.color.length || !formData.gender.length) {
            alert("have to choose size, color and gender")
        } else {



            fetch("http://localhost:2222/admin/products" + (formData._id ? `/update/${id}` : '/new-product'), {
                credentials: 'include',
                headers: {
                    'Authorization': localStorage.token
                },
                method: formData._id ? "PUT" : "POST",
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': localStorage.token
                },
                body: JSON.stringify(formData),
            })
                .then(data => {
                    if (formData._id) {
                        alert('The product has been updated successfully');
                    } else {
                        alert('The product has been successfully added');
                        console.log(data)
                    }
                    navigate('/admin');
                })
                .catch(err => {
                    alert(err.message);
                })
            // .finally(() => setLoading(false));

        }
    }

    return (

        <section id="change-item-page" className='change-item-page-body'>
            <Button className="back">
                <Link to="/admin">
                    back
                </Link>
            </Button>
            {formData &&
                <Container fluid>
                    <Form onSubmit={updateItem}>
                        <h2>{formData._id ? "Edit" : "Add"} Item</h2>
                        <Row className='frame-form-update'>
                            {structureFormUpdatePro.filter(str => str.sm).map((s, index) => (
                                <Col sm={s.sm} key={s.name} className='input-form'>
                                    <Form.Label name={s.name}>{s.required ? s.label + ' *' : s.label}</Form.Label>

                                    {s.type === "array" ?
                                        s.name === "sizes" ?

                                            <div key={`inline-checkbox-${index}`} className="mb-3">
                                                {sizesStr.map((a, i) => (
                                                    <>
                                                        <Form.Check
                                                            inline
                                                            label={a}
                                                            name="sizes"
                                                            value={a}
                                                            type="checkbox"
                                                            checked={formData._id && formData.sizes.includes(a)}
                                                            id={`inline-'checkbox'-${i}`}
                                                            onChange={handleInputChange}
                                                        />
                                                    </>
                                                ))}
                                                <div>
                                                    <Form.Text muted>
                                                        *At least one size
                                                    </Form.Text>
                                                </div>
                                            </div>
                                            : (s.name === "color" ?
                                                <>

                                                    {/* <Button onClick={() => setColorChange(true)}>change</Button> */}

                                                    <div key={"inline-checkbox"} className="mb-3">
                                                        {colorsStr.map((c, i) => (
                                                            <>

                                                                {/* <Form.Check key={i}
                                                            inline
                                                            label={a}
                                                            name={a}
                                                            type="checkbox"
                                                            checked={formData._id && formData.sizes.includes(a)}
                                                            id={s.name}
                                                            onChange={handleInputChange}
                                                        /> */}
                                                                <Form.Check
                                                                    // disabled={formData._id && !colorChange ? (formData.color.length >= 5 ? true : false) : colorChange ? false && setColorChange(true) : ""}
                                                                    inline
                                                                    label={c}
                                                                    name="color"
                                                                    value={c}
                                                                    type="checkbox"
                                                                    checked={formData._id && formData.color.includes(c)}
                                                                    id={`inline-'checkbox'-${i}`}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </>
                                                        ))}
                                                        <div>
                                                            <Form.Text muted>
                                                                *At least one color
                                                            </Form.Text>
                                                        </div>
                                                    </div>
                                                </> :
                                                s.name === "gender" &&
                                                <div key={"inline-checkbox"} className="mb-3">
                                                    {genderStr.map((g, i) => (
                                                        <>
                                                            <Form.Check
                                                                inline
                                                                label={g}
                                                                name="gender"
                                                                value={g}
                                                                type="checkbox"
                                                                checked={formData._id && formData.gender.includes(g)}
                                                                id={`inline-'checkbox'-${i}`}
                                                                onChange={handleInputChange}
                                                            />
                                                        </>
                                                    ))}
                                                    <div>
                                                        <Form.Text muted>
                                                            *At least one color
                                                        </Form.Text>
                                                    </div>
                                                </div>

                                            )
                                        : (s.type === "select" ?

                                            (s.name === "fabricType" ?

                                                <>
                                                    <Form.Select aria-label="Default select" onChange={handleInputChange} id="fabricType">
                                                        {formData._id ?
                                                            <option>{formData.fabricType}</option> :
                                                            <option>choose Fabric Type</option>
                                                        }
                                                        {/* <option>choose Fabric Type</option> */}
                                                        {fabricTypeStr.map((f, i) => (
                                                            <React.Fragment key={i}>
                                                                {formData._id && f == formData.fabricType ?
                                                                    "" :
                                                                    <option value={f}>{f}</option>
                                                                }
                                                            </React.Fragment>
                                                        ))
                                                        }
                                                    </Form.Select>


                                                </>
                                                : s.name === "collectionP" &&

                                                <>
                                                    <Form.Select aria-label="Default select" onChange={handleInputChange} id="collectionP">
                                                        {formData._id ?
                                                            <option>{formData.collectionP}</option> :
                                                            <option>choose Collection</option>
                                                        }
                                                        {/* <option>choose Collection</option> */}
                                                        {collectionStr.map((t, i) => (
                                                            <React.Fragment key={i}>
                                                                {formData._id && t == formData.collectionP ?
                                                                    "" :
                                                                    <option value={t} >{t}</option>
                                                                }
                                                            </React.Fragment>
                                                        ))
                                                        }
                                                    </Form.Select>


                                                </>

                                            )

                                            :
                                            <>

                                                <Form.Control
                                                    id={s.name}
                                                    type={s.type}
                                                    required={s.required}
                                                    value={formData[s.name]}
                                                    className={s.required ? (errors[s.name] ? 'fieldError' : '') : ''}
                                                    onChange={handleInputChange}
                                                />
                                                {s.required ? (errors[s.name] ?
                                                    <Form.Text className='fieldErrorSignup' muted>
                                                        {errors[s.name]}
                                                    </Form.Text> : "") : ""}
                                            </>
                                        )
                                    }




                                    {/* <Form.Control
                                    id={s.name}
                                    type={s.type}
                                    required={s.required}
                                    value={formData[s.name]}
                                    className={s.required ? (errors[s.name] ? 'fieldError' : '') : ''}
                                    onChange={handleInputChange}
                                />
                                {s.required ? (errors[s.name] ? <div className='fieldErrorUpdate'>{errors[s.name]}</div> : '') : ''} */}

                                </Col>
                            ))}

                        </Row>
                        <Button variant="primary" type="submit" disabled={id === 'new-product' ? !isValid : isValid}>Submit</Button>
                    </Form>
                </Container>
            }
        </section >
    )
}