import './SignUp.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi';
// import { JOI_HEBREW } from '../../joi-hebrew';


export default function SignUp() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();


    const signUpSchema = Joi.object({
        firstName: Joi.string().min(2).max(10).required(),
        lastName: Joi.string().min(2).max(10).required(),
        email: Joi.string().required().email({ tlds: false }),
        phone: Joi.string().regex(/^[0-9]{10,15}$/).messages({ 'string.pattern.base': `"phone" must be at least 10 digits` }).required(),
        password: Joi.string().min(8).max(32).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=(.*?[0-9]){4})(?=.*?[#?!@$%^&*-]).{8,}$/).required().messages({
            "string.pattern.base": "The password must include at least one uppercase letter and one lowercase letter, at least four numbers and a special character from the following characters (!@%$#^&*-_*)",
        }),
    });

    const structureForm = [
        { name: 'firstName', type: 'text', label: 'First Name', required: true, block: false, sm: '6' },
        { name: 'lastName', type: 'text', label: 'Last Name', required: true, block: false, sm: '6' },
        { name: 'email', type: 'email', label: 'Email', required: true, block: false, sm: '12' },
        { name: 'phone', type: 'tel', label: 'Phone', required: true, block: false, sm: '12' },
        { name: 'password', type: 'password', label: 'Password', required: true, block: true, sm: '12' },
    ]

    const handleInputChange = (ev) => {
        const { id, value } = ev.target;

        let obj = {};

        obj = {
            ...formData,
            [id]: value,
        };

        const schema = signUpSchema.validate(obj, { abortEarly: false });
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

    const signup = ev => {
        // setLoader(true);
        ev.preventDefault();

        fetch(`http://localhost:2222/auth/signup`, {
            credentials: 'include',
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.text().then(x => {
                        throw new Error(x);
                    });
                }
            })
            .then(() => {
                navigate('/login');
                // snackbarOn('המשתמש נרשם בהצלחה')
                const u = formData;
                delete u.password;
                console.log(u);
                alert('המשתמש נרשם')
            })
            .catch(err => {
                alert(err.message);
            })
        // .finally(() => setLoader(false))
    }


    return (
        <section id="sign-up-page" className='sign-up-page-body'>
            <Container fluid>
                <Form onSubmit={signup}>
                    <Row className='frame-form-sign-up'>
                        <h2><u>Sign Up Here</u></h2>
                        {structureForm.filter(str => str.sm).map(s => (

                            <Col sm={s.sm} key={s.name} className='input-form'>
                                <Form.Label name={s.name}>{s.required ? s.label + ' *' : s.label}</Form.Label>

                                <Form.Control
                                    id={s.name}
                                    type={s.type}
                                    required={s.required}
                                    className={s.required ? (errors[s.name] ? 'fieldError' : '') : ''}
                                    onChange={handleInputChange}
                                />
                                {/* {s.required ? (errors[s.name] ? <div className='fieldErrorSignup'>{errors[s.name]}</div> : '') : ''} */}
                                {s.name === "password"

                                    ?
                                    (s.required ?
                                        (errors[s.name] ?
                                            <Form.Text className='fieldErrorSignup' muted>
                                                {errors[s.name]}
                                            </Form.Text> :
                                            <Form.Text muted>
                                                The password must include at least one uppercase letter and one lowercase letter, at least four numbers and a special character from the following characters (!@%$#^&*-_*)
                                            </Form.Text>)
                                        : "")

                                    :
                                    (s.required ? (errors[s.name] ?
                                        <Form.Text className='fieldErrorSignup' muted>
                                            {errors[s.name]}
                                        </Form.Text> : "") : "")
                                }
                                {/* {s.required ? (errors[s.name] ?
                                    <Form.Text className='fieldErrorSignup' muted>
                                        {errors[s.name]}
                                    </Form.Text> : "") : ""
                                } */}

                            </Col>
                        )
                        )}
                        <Button variant="primary" type="submit">submit</Button>
                    </Row>
                </Form>
            </Container>
        </section >
    )
}