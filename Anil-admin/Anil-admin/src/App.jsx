import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Col, Container, Row } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import UpdateForm from './components/UpdateForm';
import '/src/App.css'
import '/src/style/Productform.css'
import '/src/style/Productitem.css'
import '/src/style/Productlist.css'
import '/src/style/Productform.css'
import '/src/style/Header.css'
import '/src/style/Home.css'
import '/src/style/Sidebar.css'
import '/src/style/Updateform.css'
import CreateProduct from './pages/CreateProduct';

function App() {
  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Sidebar />
          <Col md={{ span: 8, offset: 2 }} className="main-content w-100 m-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/create" element={<CreateProduct />} />
              <Route path="/update/:id" element={<UpdateForm />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
