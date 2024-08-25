// Banner.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../style/banner.css'
import Slider from './Slider';



function Banner() {
    return (
        <>
            <section className="hero">
                <Container fluid>
                    <Row>
                       <Slider />
                    </Row>
                </Container> 
            </section>

        </>
    )
}

export default Banner;