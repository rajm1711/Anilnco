import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { productDeleteAsync, productGetAsync, productSelectAsync } from '../store/action/anilAction';

const ProductList = () => {
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const products = useSelector((state) => state.productReducer.products);

    const handleUpdate = (id) => {
        console.log("Product ID to Update:", id);
        dispatch(productSelectAsync(id));
        navigateTo(`/update/${id}`);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(productDeleteAsync(id));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(productGetAsync());
            } catch (err) {
                setError('Failed to fetch products.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="contacts-list w-100">
            <h2 className="mb-4">Products</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Pr</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Capacity</th>
                        <th>Application</th>
                        <th>Treatment</th>
                        <th>Delivery Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length > 0 ? products.map((product) => (
                            <tr key={product.id}>
                                <td><img src={product.profile} alt="profile" className="contact-image" /></td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.capacity}</td>
                                <td>{product.application}</td>
                                <td>{product.tt}</td>
                                <td>{product.delivery}</td>
                                <td>
                                    <Button variant="secondary" className="me-2" onClick={() => handleUpdate(product.id)}>
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(product.id)}>
                                        <FontAwesomeIcon icon={faTrash} /> Delete
                                    </Button>
                                </td>
                            </tr>
                        )) : <tr><td colSpan="8">No products available</td></tr>
                    }
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(ProductList);
