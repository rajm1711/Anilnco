/* eslint-disable react-refresh/only-export-components */
import { Container } from 'react-bootstrap';
import ProductForm from '../components/ProductForm';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const CreateProduct = () => {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/');
    };

    return (
        <Container className="create-contact-page">
            <ProductForm onClose={handleClose} />
        </Container>
    );
};

export default React.memo(CreateProduct);
