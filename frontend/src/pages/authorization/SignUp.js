import './SignUp.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Joi from 'joi';
import { JOI_HEBREW } from '../../joi-hebrew';


export default function SignUp() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});

    const loginSchema = Joi.object({
        firstName: Joi.string().min(2).max(10).required(),
        middleName: Joi.string().min(2).max(10),
        lastName: Joi.string().min(2).max(10).required(),
        phone: Joi.string().regex(/^[0-9]{10,15}$/).messages({ 'string.pattern.base': `"phone" must be at least 10 digits` }).required(),
        password: Joi.string().min(8).max(32).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=(.*?[0-9]){4})(?=.*?[#?!@$%^&*-]).{8,}$/).required().messages({
            "string.pattern.base": "The password must include at least one uppercase letter and one lowercase letter, at least four numbers and a special character from the following characters (!@%$#^&*-_*)",
        }),
        email: Joi.string().required().email({ tlds: false }),
    });

    const structureForm = [
        { name: 'firstName', type: 'text', label: 'First Name', required: true, block: false, sm: '6' },
        { name: 'lastName', type: 'text', label: 'Last Name', required: true, block: false, sm: '6' },
        { name: 'phone', type: 'tel', label: 'Phone', required: true, block: false, sm: '12' },
        { name: 'email', type: 'email', label: 'Email', required: true, block: false, sm: '12' },
        { name: 'password', type: 'password', label: 'Password', required: true, block: true, sm: '12' },
    ]

    const handleInputChange = (ev) => {
        const { id, value } = ev.target;
        let obj = {};

        obj = {
            ...formData,
            [id]: value,
        };

        const schema = loginSchema.validate(obj, { abortEarly: false, errors: { language: 'len' } });
        const err = { ...errors, [id]: undefined };

        if (schema.error) {
            const error = schema.error.details.find(e => e.context.key === id);

            if (error) {
                err[id] = error.message;
            }

            setFormData(obj);
            setErrors(err);
        }
    }


    return (
        <section id="sign-up-page" className='sign-up-page-body'>
            <Container fluid>
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
                            {s.required ? (errors[s.name] ?
                                <Form.Text id="passwordHelpBlock" muted>
                                    {errors[s.name]}
                                </Form.Text> : "") : ""
                            }
                        </Col>
                    )
                    )}
                </Row>
            </Container>
        </section>
    )
}