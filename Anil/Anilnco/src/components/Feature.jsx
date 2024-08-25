// Feature.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductList from './ProductList';

function Feature() {
    return (
        <>

            <section className="featured">
                <Container>
                    <Row className='text-center m-5 text-danger '>
                        <ProductList />
                            

                       
                    </Row>
                </Container>
            </section>

        </>
    )
}

export default Feature