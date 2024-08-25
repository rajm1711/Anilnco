/* eslint-disable react-refresh/only-export-components */
import { Container } from 'react-bootstrap';
import React from 'react';
import ProductList from '../components/ProductList';

const Home = () => {
    return (
        <Container className="home-page w-100 m-0">
            <ProductList />
        </Container>
    );
};

export default React.memo(Home);
