import React, { useContext } from 'react';
import Header from '../Pages/Shared/Header/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, Outlet } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import useAdmin from '../hooks/useAdmin';
import { AuthContext } from '../context/AuthProvider';
import useSeller from '../hooks/useSeller';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);

  return (
    <div>
      <Header></Header>
      <Container>
        <Row>
          <Col sm={4} md={3} xl={2} style={{ backgroundColor: 'blue' }}>
            <ButtonGroup vertical>
              <Link
                to="/dashboard"
                className={`${isSeller || isAdmin ? 'd-none' : ''}`}
              >
                <Button>My Orders</Button>
              </Link>

              {isSeller && (
                <>
                  <Link to="/dashboard/addproduct">
                    <Button>Add A Product</Button>
                  </Link>
                  <Link to="/dashboard/myproducts">
                    <Button>My Products</Button>
                  </Link>
                </>
              )}

              {isAdmin && (
                <>
                  <Link to="/dashboard/allbuyers">
                    <Button>All Buyers</Button>
                  </Link>
                  <Link to="/dashboard/allsellers">
                    <Button>All Sellers</Button>
                  </Link>
                  <Link to="/dashboard/reporteditems">
                    <Button>Reported Items</Button>
                  </Link>
                </>
              )}
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
