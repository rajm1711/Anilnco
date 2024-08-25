import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { productPostAsync, uploadFile } from '../store/action/anilAction';

const CreateProduct = () => {
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

            if (profile) {
                const uploadedFileUrl = await dispatch(uploadFile(profile, input));
                updatedInput = {
                    ...input,
                    profile: uploadedFileUrl, // Set the uploaded image URL in input data
                };
            }

            await dispatch(productPostAsync(updatedInput));
            setIsSubmit(true);
        } catch (error) {
            console.error("Error creating product:", error);
        }
    };

    useEffect(() => {
        if (isSubmit) {
            navigateTo('/');
        }
    }, [isSubmit, navigateTo]);

    return (
        <Container className="create-contact">
            <Row className="justify-content-md-center">
                <Col md={8}>
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
                        </Form.Group>

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

                        <Form.Group controlId="formPrice" className="mb-3">
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

                        <Form.Group controlId="formCapacity" className="mb-3">
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

                        <Form.Group controlId="formApplication" className="mb-3">
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

                        <Form.Group controlId="formTechnology" className="mb-3">
                            <Form.Label>Treatment Technology</Form.Label>
                            <Form.Control
                                type="text"
                                name="tt"
                                value={input.tt}
                                onChange={handleChange}
                                placeholder="Enter technology"
                            />
                        </Form.Group>

                        <Form.Group controlId="formDelivery" className="mb-3">
                            <Form.Label>Delivery Type</Form.Label>
                            <Form.Control
                                type="text"
                                name="delivery"
                                value={input.delivery}
                                onChange={handleChange}
                                placeholder="Enter delivery type"
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Save Product
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CreateProduct;
