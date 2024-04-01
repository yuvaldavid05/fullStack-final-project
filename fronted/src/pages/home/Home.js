import './Home.css';
import Image from 'react-bootstrap/Image';
import { MdPlace } from "react-icons/md";
import { IoShirt } from "react-icons/io5";
import { GiSkirt } from "react-icons/gi";
import { PiPantsFill } from "react-icons/pi";
import { PiPants } from "react-icons/pi";
import { IoShirtOutline } from "react-icons/io5";
import { PiCoatHanger } from "react-icons/pi";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { TiPhoneOutline } from "react-icons/ti";


export default function Home() {
    return (
        <section id="home-page" className='home-page-body'>
            <Container fluid>
                <Row className='homeDiv' >
                    {/* <Image src="https://i.pinimg.com/564x/83/56/f1/8356f10495c8ff75d1f8989b8fd625c7.jpg" /> */}
                    <p>start here!</p>
                </Row>

                <Row className='homePageIcons'>
                    <Col><PiCoatHanger /></Col>
                    <Col><PiPantsFill /></Col>
                    <Col><PiPants /></Col>
                    <Col><IoShirt /></Col>
                    <Col><IoShirtOutline /></Col>
                    <Col><GiSkirt /> </Col>
                    <Col><PiCoatHanger /> </Col>
                </Row>

                <Row className='homePageNewCol'>
                    <div>for our new collection click here!</div>
                </Row>
                <Row className='homePageContactUs'>
                    <Row>
                        <Col>for more info u can contact us and get 15% off! <TiPhoneOutline /></Col>
                    </Row>

                    <Row>
                        <Col></Col>
                        <Col xs={5}>
                            fasdasdasd
                        </Col>
                        <Col></Col>
                    </Row>
                </Row>
            </Container>
        </section>
    )
}