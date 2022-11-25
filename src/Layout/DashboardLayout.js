import React from 'react';
import Header from '../Pages/Shared/Header/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

const DashboardLayout = () => {
  return (
    <div>
      <Header></Header>
      <Container>
        <Row>
          <Col sm={4} md={3} xl={2} style={{ backgroundColor: 'blue' }}>
            <ButtonGroup vertical>
              <Link to="/dashboard">
                <Button>My Orders</Button>
              </Link>

              <Button>Add A Product</Button>
              <Button>My Products</Button>

              <Button>All Sellers</Button>
              <Button>All Buyers</Button>
              <Button>Reported Items</Button>
            </ButtonGroup>
          </Col>
          <Col sm={8} md={9} xl={10}>
            <Outlet></Outlet>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DashboardLayout;
