import Image from 'react-bootstrap/Image';

export default function About() {
    return (
        <section id="about" className='about-page'>
            <h1 style={{ margin: "35px auto" }}>About us...</h1>
            <p>We are a new clothing store that sells clothes of all kinds, special and unique collections and in a variety of sizes.
                <br></br>
                Join us to enjoy a wide variety of clothes, an excellent shopping experience and affordable prices!
                looking forward to see you :)</p>

            {/* <Image src="https://i.pinimg.com/564x/66/f8/8e/66f88e2817a1f806b1c2908b841c878b.jpg" fluid />; */}
            {/* <Image src="https://i.pinimg.com/736x/f5/bf/5e/f5bf5ecc0623ecc4516523014ba064e8.jpg" fluid /> */}
        </section>
    )
}