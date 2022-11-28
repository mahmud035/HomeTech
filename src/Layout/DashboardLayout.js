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
import './DashboardLayout.css';
import { FaUserCircle } from 'react-icons/fa';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);

  return (
    <div>
      <Header></Header>
      <Container>
        <Row>
          <Col
            sm={4}
            md={3}
            xl={2}
            className=" dashboard-sidebar position-relative"
          >
            <ButtonGroup className="dashboard-button-groups">
              <Link
                to="/dashboard"
                // className={`${isSeller || isAdmin ? 'd-none' : ''}`}
              >
                <Button>My Orders</Button>
              </Link>

              {isSeller && (
                <div className="seller-buttons">
                  <Link to="/dashboard/addproduct">
                    <Button>Add A Product</Button>
                  </Link>
                  <Link to="/dashboard/myproducts">
                    <Button>My Products</Button>
                  </Link>
                </div>
              )}

              {isAdmin && (
                <div className="admin-buttons">
                  <Link to="/dashboard/allbuyers">
                    <Button>All Buyers</Button>
                  </Link>
                  <Link to="/dashboard/allsellers">
                    <Button>All Sellers</Button>
                  </Link>
                  <Link to="/dashboard/reporteditems">
                    <Button>Reported Items</Button>
                  </Link>
                </div>
              )}
            </ButtonGroup>

            {/* Current Login User */}
            <div>
              <div className="current-login-user  ">
                <div className="d-flex gap-3 align-items-center">
                  {user?.photoURL ? (
                    <img src={user?.photoURL} alt="" />
                  ) : (
                    <FaUserCircle size={65} />
                  )}

                  <div>
                    <p className="mb-0 d-flex align-items-center">
                      <strong>{user?.displayName.toUpperCase()}</strong>
                    </p>
                    <p className="mb-0">
                      {(isAdmin && 'Admin') ||
                        (isSeller && 'Seller') ||
                        'Buyer'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
