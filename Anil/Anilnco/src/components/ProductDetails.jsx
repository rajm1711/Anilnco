// ProductDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';  // Import Firebase Firestore instance
import { doc, getDoc } from 'firebase/firestore';
import { Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function ProductDetails() {
    const { id } = useParams();  // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log(`Product ID from URL: ${id}`);  // Debugging line
                const docRef = doc(db, 'products', id);
                console.log(`Firestore Document Reference: ${docRef.path}`);  // Debugging line
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    console.log('Product Data:', docSnap.data());  // Debugging line
                    setProduct(docSnap.data());
                } else {
                    console.log('No such product found!');
                    setError('No such product found!');
                }
            } catch (error) {
                console.error("Error fetching product details: ", error);
                setError('Error fetching product details');
            }
        };

        fetchProduct();
    }, [id]);

    if (error) {
        return <div className="text-center">{error}</div>;
    }

    if (!product) {
        return <div className="text-center">Loading...</div>;
    }

    return (
        <Container className="my-5">
            <Card>
                <Card.Img variant="top" src={product.image} alt={product.name} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        <strong>Price:</strong> {product.price} <br />
                        <strong>Capacity:</strong> {product.capacity} <br />
                        <strong>Application:</strong> {product.application} <br />
                        <strong>Treatment Technology:</strong> {product.tt} <br />
                        <strong>Delivery:</strong> {product.delivery} <br />
                    </Card.Text>
                    <Button variant="primary" onClick={() => window.history.back()}>Back</Button>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default ProductDetails;
