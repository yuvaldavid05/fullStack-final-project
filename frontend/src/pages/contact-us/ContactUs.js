import './ContactUs.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Joi from 'joi';
import { useContext, useState } from 'react';
import { GeneralContext } from '../../App';




export default function ContactUs() {
    const { user, comment, setComment, snackbarOn, accColorBackground, setAccColorBackground } = useContext(GeneralContext);
    const [commentData, setCommentData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        text: "",
    });
    const [isValid, setIsValid] = useState(false);



    const [errors, setErrors] = useState({});

    const contactSchema = Joi.object({
        firstName: Joi.string().min(2).max(10).required(),
        lastName: Joi.string().min(2).max(10).required(),
        email: Joi.string().required().email({ tlds: false }),
        text: Joi.string().min(2).max(1000).required(),
    });

    const structureFormContact = [
        { name: 'firstName', type: 'text', label: 'First Name', required: true, sm: '6' },
        { name: 'lastName', type: 'text', label: 'Last Name', required: true, sm: '6' },
        { name: 'email', type: 'email', label: 'Email', required: true, sm: '12' },
        { name: 'text', type: 'textarea', label: 'Comments', required: true, sm: '12' },

    ]

    const handleInputChange = (ev) => {
        const { id, value } = ev.target;

        let obj = {};

        if (user) {
            obj = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                [id === "text" ? "text" : ""]: value
            }
        } else {
            obj = {
                ...commentData,
                [id]: value,
            };
        }


        const schema = contactSchema.validate(obj, { abortEarly: false });
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


        setCommentData(obj);
        setErrors(err);
    };


    // בניתי פונקציה שמכניסה את נתוני השולח והמידע- אבל לא אכסנתי  
    const sendComment = ev => {
        ev.preventDefault();
        let objComment = {};

        if (commentData.firstName != "  " && commentData.lastName != "  " && commentData.email != "  " && commentData.text != "  ") {

            if (user) {
                objComment = {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    user: true,
                }

                setCommentData(objComment);
                setComment(objComment);
                snackbarOn("This form has been successfully submitted")



            } else {
                // הכנסה של הפרטים ל-OBJ
                objComment = {
                    ...commentData,
                    user: false
                }
                setCommentData(objComment);
                snackbarOn("This form has been successfully submitted")
                setComment(objComment);
            }
        } else {
            alert("All fields must be filled in")
        }

    }

    return (
        <section id="contact-us-page" className={accColorBackground ? 'text-light bg-dark contact-page-body' : 'contact-page-body'} >
            <Container fluid>
                <Row>
                    <b><h2>CONTACT US</h2></b>
                    <p>let us know what u think..</p>
                </Row>
                <Form onSubmit={sendComment}>


                    <Row className={accColorBackground ? 'text-light bg-dark contact-form' : 'contact-form'}>
                        <h4>Contact Form</h4>
                        <div className='costumer-details'>
                            <Row>
                                {structureFormContact.filter(str => str.sm).map(s => (

                                    s.type != "textarea" ?

                                        <Col sm={s.sm} key={s.name} className='col-input'>
                                            {user ?
                                                <>
                                                    <Form.Label htmlFor={s.name} name={s.name}>{s.required ? s.label + ' *' : s.label}</Form.Label>
                                                    <Form.Control
                                                        id={s.name}
                                                        type={s.type}
                                                        aria-describedby={s.name}
                                                        value={user[s.name]}
                                                        disabled
                                                        className={s.required ? (errors[s.name] ? 'fieldError' : '') : ''}
                                                        onChange={handleInputChange}
                                                    />
                                                    {s.required ? (errors[s.name] ? <div>{errors[s.name]}</div> : '') : ''}
                                                </>
                                                :
                                                <>
                                                    <Form.Label htmlFor={s.name} name={s.name}>{s.required ? s.label + ' *' : s.label}</Form.Label>
                                                    <Form.Control
                                                        id={s.name}
                                                        type={s.type}
                                                        aria-describedby={s.name}

                                                        className={s.required ? (errors[s.name] ? 'fieldError' : '') : ''}
                                                        onChange={handleInputChange}
                                                    />
                                                    {s.required ? (errors[s.name] ? <div>{errors[s.name]}</div> : '') : ''}
                                                </>
                                            }

                                        </Col>
                                        :
                                        <Col>

                                            <FloatingLabel label={s.required ? s.label + ' *' : s.label} className='textarea-input'>
                                                <Form.Control
                                                    id={s.name}
                                                    as={s.type}
                                                    placeholder="Leave a comment here"
                                                    style={{ height: '150px' }}
                                                    className={s.required ? (errors[s.name] ? 'fieldError' : '') : ''}
                                                    onChange={handleInputChange}
                                                />
                                            </FloatingLabel>
                                            {s.required ? (errors[s.name] ? <div>{errors[s.name]}</div> : '') : ''}
                                        </Col>

                                ))}
                            </Row>

                            <Button type="submit" disabled={!isValid}>
                                <a href="mailto:yuvedavid@gmail.com" style={{ color: "white" }}>submit</a></Button>
                        </div>
                        <Row className='Web-details'>
                            <Col>Our Address: <br></br>Shoham St 5, Ramat Gan</Col>
                            <Col>Our Phone: <br></br>050-8695656</Col>
                            <Col> Our Email:<br></br> Yuvedavid@gmail.com</Col>
                        </Row>
                    </Row>
                </Form>
            </Container>
        </ section >
    );
}