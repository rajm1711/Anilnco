// Navigation.jsx
import React from 'react';
import '../style/navigation.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Image } from 'react-bootstrap';
import Logo from './Logo';

function Navigation() {
    return (
        <>
            <Navbar bg="white"  expand="lg" className='shadow d-flex justify-content-evenly'>
                <Navbar.Brand as={Link} to="/" className='ms-5 lh-lg logosec'>
                    <Logo />
                    <a href="/src/App.jsx"><span className='fs-3 fw-medium '>Anil And Co</span></a>
                    
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto  me-5 fs-5 fw-semibold ">
                        <Nav.Link as={Link } to="/" className='text-danger active' >
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about" className='text-danger'>
                            About Us
                        </Nav.Link>
                        <Nav.Link as={Link} to="/product" className='text-danger'>
                            Our Products
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contact" className='text-danger'>
                            Contact Us
                        </Nav.Link>
                    </Nav>
                 <div className="cbtn mx-5">
                    <div className="btn btn-lg btn-danger">SEND MAIL</div>
                    </div>   
                </Navbar.Collapse>

            </Navbar>
            
        </>
    )
}

export default Navigation