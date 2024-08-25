// Footer.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
function Footer() {
    return (
        <>

            <footer className="footer bg-danger ">
                <Container>
                    
                
                    <div className="footer d-flex fw-bolder text-white justify-content-between  justify-content-center fs-5">
                        <div className="a"> Contact</div>
                        <div className="a"> Services</div>
                        <div className="a"> Home </div>
                        <div className="a">Products</div>
                        <div className="a">About Us</div>
                    </div>
                    <div className='me-auto '>&copy; 2023 Anil N Co </div>
                </Container>
            </footer>

        </>
    )
}

export default Footer