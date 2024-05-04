import "./AdminProductChange.css";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import Joi from 'joi';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function AdminProductChange() {
    const { id } = useParams();
    // const [item, setItem] = useState({});
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({});

    useEffect(() => {
        if (id === 'new-product') {
            setFormData({
                // publishDate: moment().format("YYYY-MM-DD"),
                productName: "",
                description: "",
                price: "",
                sizes: [],
                color: [],
                img: "",
                category: "",
                stock: "",
                likes: "",
            });
        } else {
            // setLoading(true);

            fetch(`http://localhost:2222/admin/products/${id}`, {
                credentials: 'include',
            })
                .then(res => res.json())
                .then(data => setFormData(data))
            // .finally(() => setLoading(false));
        }
    }, [id]);

    const UpdateSchema = Joi.object({
        productName: Joi.string().min(2).max(20).required(),
        description: Joi.string().min(2).max(30).required(),
        price: Joi.number().min(1).max(600).required(),
        sizes: Joi.array().items(Joi.string()).required(),
        color: Joi.array().items(Joi.string()).required(),
        img: Joi.string().min(1).max(150).required(),
        category: Joi.string().min(1),
        stock: Joi.number().min(0).max(600).required(),
        likes: Joi.array().items(Joi.string()).required(),
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
    ]

    const sizesStr = ["S", "M", "L", "XL"];
    const colorsStr = ["red", "gray", "pink", "brown", "green", "blue", "orange", "white", "black"];



    const handleInputChange = (ev) => {
        const { id, value } = ev.target;

        let obj = {};

        if (id === 'sizes') {
            if (ev.target.checked) {
                obj = {
                    ...formData,
                    [id]: [...formData.sizes, ev.target.name],
                };
                console.log(obj)

            } else if (!ev.target.checked) {
                const sizeRemoveIndex = formData.sizes.findIndex(x => x === ev.target.name);
                let NewArray = formData.sizes;
                NewArray.splice(sizeRemoveIndex, 1);
                obj = {
                    ...formData,
                    [id]: NewArray,
                };
                console.log(obj)
                console.log(sizeRemoveIndex)
            }
            console.log(id, value)
            // כותרת הקליק
            console.log(ev.target.name)
            // אם מופעל או לא
            console.log(ev.target.checked)

        } else if (id === "color") {
            if (ev.target.checked) {
                obj = {
                    ...formData,
                    [id]: [...formData.color, ev.target.name],
                };
                console.log(obj)

            } else if (!ev.target.checked) {
                const colorRemoveIndex = formData.color.findIndex(x => x === ev.target.name);
                let NewArrayC = formData.color;
                NewArrayC.splice(colorRemoveIndex, 1);
                obj = {
                    ...formData,
                    [id]: NewArrayC,
                };
                console.log(obj)
                console.log(colorRemoveIndex)
            }
            console.log(id, value)
            // כותרת הקליק
            console.log(ev.target.name)
            // אם מופעל או לא
            console.log(ev.target.checked)
        } else {
            obj = {
                ...formData,
                [id]: value,
            };
        }

        const schema = UpdateSchema.validate(obj, { abortEarly: false });
        const err = { ...errors, [id]: undefined };

        if (schema.error) {
            const error = schema.error.details.find(e => e.context.key === id);

            if (error) {
                err[id] = error.message;
            }

        }

        setFormData(obj);
        setErrors(err);
    };


    const updateItem = ev => {
        ev.preventDefault();
        // setLoading(true);

        fetch("http://localhost:2222/admin/products" + (formData._id ? `/update/${id}` : '/new-product'), {
            credentials: 'include',
            method: formData._id ? "PUT" : "POST",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(data => {
                // if (formData.id) {
                //     alert('הכתבה נשמרה בהצלחה');
                // } else {
                //     alert('הכתבה נוספה בהצלחה');
                // }
                console.log(data)
                navigate('/admin');
            })
            .catch(err => {
                alert(err.message);
            })
        // .finally(() => setLoading(false));

        // alert("something")
    }

    return (

        <section id="change-item-page" className='change-item-page-body'>
            <Button>
                <Link to="/admin">
                    back
                </Link>
            </Button>
            {formData &&
                <Container fluid>
                    <Form onSubmit={updateItem}>
                        <h2>{formData._id ? "Edit" : "Add"} Item</h2>
                        <Row className='frame-form-update'>
                            {structureFormUpdatePro.filter(str => str.sm).map(s => (
                                <Col sm={s.sm} key={s.name} className='input-form'>
                                    <Form.Label name={s.name}>{s.required ? s.label + ' *' : s.label}</Form.Label>

                                    {s.name === "sizes" || s.name === "color" ?
                                        s.name === "sizes" ?
                                            <>
                                                <div key={"inline-checkbox"} className="mb-3">
                                                    {sizesStr.map((a, i) => (
                                                        <>

                                                            <Form.Check key={i}
                                                                inline
                                                                label={a}
                                                                name={a}
                                                                type="checkbox"
                                                                // checked={formData._id ? formData.sizes.map(e => e == a) : ""}
                                                                checked={formData._id ? formData.sizes.includes(a) : ""}

                                                                id={s.name}
                                                                onChange={handleInputChange}
                                                            />


                                                            {/* {s.required ? (errors[s.name] ? <div className='fieldErrorUpdate'>{errors[s.name]}</div> : '') : ''} */}
                                                        </>
                                                    ))}
                                                    <div>
                                                        <Form.Text muted>
                                                            *At least one size
                                                        </Form.Text>
                                                    </div>
                                                </div>
                                            </> : <div key={"inline-checkbox"} className="mb-3">
                                                {colorsStr.map((a, i) => (
                                                    <>

                                                        <Form.Check key={i}
                                                            inline
                                                            label={a}
                                                            name={a}
                                                            type="checkbox"
                                                            // checked={formData._id ? formData.color.map(e => e === a) : ""}
                                                            checked={formData._id ? formData.color.includes(a) : ""}
                                                            id={s.name}
                                                            onChange={handleInputChange}
                                                        />
                                                        {s.required ? (errors[s.name] ? <div className='fieldErrorUpdate'>{errors[s.name]}</div> : '') : ''}
                                                    </>
                                                ))}
                                                <div>
                                                    <Form.Text muted>
                                                        *At least one color
                                                    </Form.Text>
                                                </div>
                                            </div>
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
                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Container>
            }
        </section >
    )
}