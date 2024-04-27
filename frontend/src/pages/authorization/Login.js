import './Login.css';
import Container from "react-bootstrap/esm/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Joi from 'joi';
import { GeneralContext } from '../../App';
import { RoleTypes } from '../../components/navbar/NavbarTop2';





export default function Login() {
    const { user, setUser, roleType, setRoleType } = useContext(GeneralContext);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });


    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const loginSchema = Joi.object({
        email: Joi.string().required().email({ tlds: false }),
        password: Joi.string().min(8).max(32).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=(.*?[0-9]){4})(?=.*?[#?!@$%^&*-]).{8,}$/).required().messages({
            "string.pattern.base": "The password must include at least one uppercase letter and one lowercase letter, at least four numbers and a special character from the following characters (!@%$#^&*-_*)",
        }),
    });

    const structureFormLogin = [
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

        const schema = loginSchema.validate(obj, { abortEarly: false });
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

    const login = ev => {
        // setLoader(true);
        ev.preventDefault();

        fetch(`http://localhost:2222/auth/login`, {
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
            .then(data => {
                setUser(data);
                // שמירה לפי התוקן של היוזר
                localStorage.token = data.token;
                setRoleType(RoleTypes.user);

                if (data.admin) {
                    setRoleType(RoleTypes.admin);
                }

                // snackbarOn('המשתמש התחבר בהצלחה')
                navigate('/');

                console.log(data);
            })
            .catch(err => {
                alert(err.message);
                console.log(err.message);
            })
        // .finally(() => setLoader(false))

    }


    return (
        <section id="login-page" className='login-page-body'>
            <Container fluid>
                <Form onSubmit={login}>
                    <Row className='frame-form-login'>
                        <h2><u>Login Here</u></h2>
                        {structureFormLogin.filter(str => str.sm).map(s => (

                            <Col sm={s.sm} key={s.name} >
                                <InputGroup>
                                    <InputGroup.Text id="basic-addon1">{s.name === "email" ? "@" : "#"}</InputGroup.Text>
                                    <Form.Control
                                        id={s.name}
                                        placeholder={s.name}
                                        aria-label={s.name}
                                        type={s.type}
                                        aria-describedby="basic-addon1"
                                        className={s.required ? (errors[s.name] ? 'fieldError' : '') : ''}
                                        onChange={handleInputChange}
                                    />
                                </InputGroup>
                                {/* <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">#</InputGroup.Text>
                                <Form.Control
                                    placeholder="Password"
                                    aria-label="Password"
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup> */}


                            </Col>
                        ))}
                        <Button variant="secondary" type="submit">Login</Button>
                        <Link to='/sign-up'>Sign-up</Link>
                    </Row>
                </Form>
            </Container>
        </section >
    );
}