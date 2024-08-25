// App.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Feature from './components/Feature';
import Banner from './components/Banner';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import Footer from './components/Footer';


function App() {
  return (
    
      <>
        <Header />
        <Banner />

        {/* Main content area where different components will be rendered */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Feature />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>

        <Footer />
      </>
    
  );
}

export default App;
