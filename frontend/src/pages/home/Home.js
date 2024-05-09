import './Home.css';
import Image from 'react-bootstrap/Image';
import { IoShirt } from "react-icons/io5";
import { GiSkirt } from "react-icons/gi";
import { PiPantsFill } from "react-icons/pi";
import { PiPants } from "react-icons/pi";
import { IoShirtOutline } from "react-icons/io5";
import { PiCoatHanger } from "react-icons/pi";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { FaRegHandPointRight } from "react-icons/fa";
import { FaRegHandPointLeft } from "react-icons/fa";

export default function Home() {
    return (
        <section id="home-page" className='home-page-body'>
            <Container fluid>
                <Row className='homeDiv' >
                    <h1>Welcome To Our Wedsite <br></br><span>Amour</span></h1>
                    <p>We are a new clothing company that offers many collections...</p>

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
                    <Col xs={4}>
                        <Image src="https://i.pinimg.com/564x/a3/a4/41/a3a441cfcb766953430410527e6edf12.jpg" />
                    </Col>
                    <Col xs={8}>
                        You Can Start Now!
                        <div>Just sign-in, Pick Your Clothes And Order!</div>
                        <Button variant="secondary">
                            <Link to="/products">Click here for all categories <span><FaRegHandPointRight /></span></Link>
                        </Button>
                    </Col>

                </Row>
                <Row className='homePageSaleCol'>

                    <Col xs={8}>

                        <div>For our Basic collection you can click...</div>
                        <Button variant="secondary">
                            <Link to="/products/category/basic">Click here  <span><FaRegHandPointLeft /></span></Link>
                        </Button>
                    </Col>
                    <Col xs={4}>
                        <Image src="https://i.pinimg.com/564x/5b/3a/12/5b3a12fe0a34f9123c6b85b1a8ac3143.jpg" />
                    </Col>
                </Row>
            </Container>
        </section >
    )
}