/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';
import { productPostAsync, productSelectAsync, productUpdateAsync } from '../store/action/anilAction';

const UpdateForm = () => {
    const { id } = useParams();
    const { product } = useSelector(state => state.productReducer);

    const dispatch = useDispatch();
    const navigateTo = useNavigate();

    const [profile, setProfile] = useState(null);

    const [input, setInput] = useState({
        id: '',
        profile: '',
        name: '',
        price: '',
        capacity: '',
        application: '',
        tt: '',
        delivery: '',
    });

    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handleProfileChange = (e) => {
        const file = e.target.files[0];
        setProfile(file);
        setInput({
            ...input,
            profile: file,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let updatedInput = { ...input };

            if (profile && typeof profile !== 'string') {
                const uploadedFile = await dispatch(uploadFile(profile, updatedInput));
                updatedInput = {
                    ...updatedInput,
                    profile: uploadedFile.url,
                };
            }

            if (id) {
                dispatch(productUpdateAsync(updatedInput));
            } else {
                dispatch(productPostAsync(updatedInput));
            }

            setIsSubmit(true);
        } catch (error) {
            console.error("Error creating or updating contact:", error);
        }
    };

    // useEffect(() => {
    //     if (contact) {
    //         setInput(contact);
    //     }
    // }, [contact]);

    useEffect(() => {
        if (id) {
            dispatch(productSelectAsync(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (product) {
            setInput(product);
            if (product.profile) {
                setProfile(product.profile);
            }
        }
    }, [product]);

    useEffect(() => {
        if (isSubmit) {
            navigateTo('/');
        }
    }, [isSubmit, navigateTo]);
    
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <Container className="create-contact">
            <Row className="justify-content-md-center">
                <Col md={8}>
                    <Form.Control className="input" type="text" name='id' value={input.id} onChange={handleChange} hidden />
                    <h2>Create New Product</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formProfilePicture" className="mb-3">
                            <Form.Label>Product Picture</Form.Label>
                            <Form.Control
                                type="file"
                                name="profile"
                                onChange={handleProfileChange}
                                required
                            />
                        </Form.Group>\\

                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control
                                className='text-capitalize'
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={handleChange}
                                placeholder="Enter name"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Approx. Price</Form.Label>
                            <Form.Control
                                type="text"
                                name="price"
                                value={input.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formContactNumber" className="mb-3">
                            <Form.Label>Capacity (KLD/MLD)</Form.Label>
                            <Form.Control
                                type="text"
                                name="capacity"
                                value={input.capacity}
                                onChange={handleChange}
                                placeholder="Enter capacity"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formAddress" className="mb-3">
                            <Form.Label>Application Industry</Form.Label>
                            <Form.Control
                                type="text"
                                name="application"
                                value={input.application}
                                onChange={handleChange}
                                placeholder="Enter application"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formNotes" className="mb-3">
                            <Form.Label>Treatement Technology</Form.Label>
                            <Form.Control
                                type="text"
                                name="tt"
                                value={input.tt}
                                onChange={handleChange}
                                placeholder="Enter notes"
                            />
                        </Form.Group>
                        <Form.Group controlId="formNotes" className="mb-3">
                            <Form.Label>Deliver Type</Form.Label>
                            <Form.Control
                                type="text"
                                name="delivery"
                                value={input.delivery}
                                onChange={handleChange}
                                placeholder="Enter notes"
                            />
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Update Product
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default React.memo(UpdateForm);
