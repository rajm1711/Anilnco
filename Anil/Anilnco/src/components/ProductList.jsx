// ProductList.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../firebaseConfig';  // Import Firebase Firestore instance
import { collection, getDocs } from 'firebase/firestore';
import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetch documents from the 'products' collection
                const querySnapshot = await getDocs(collection(db, 'products'));
                // Map documents to an array of product objects
                const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productList);
            } catch (error) {
                console.error("Error fetching products: ", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Container>
            <h1 className="text-center my-4">Products</h1>
            <Row>
                {products.length === 0 ? (
                    <p>No products available.</p>
                ) : (
                    products.map(product => (
                        <Col md={4} lg={3} key={product.id} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={product.profile} alt={product.name} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        Price: ${product.price}
                                    </Card.Text>
                                    <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
        </Container>
    );
}

export default ProductList;
