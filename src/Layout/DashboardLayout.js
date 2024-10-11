import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { BsCartCheck } from 'react-icons/bs';
import { FaUserCircle } from 'react-icons/fa';
import { MdReportProblem } from 'react-icons/md';
import { RiUserSettingsLine, RiUserStarLine } from 'react-icons/ri';
import { TbBrandProducthunt } from 'react-icons/tb';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useSeller from '../hooks/useSeller';
import Header from '../Pages/Shared/Header/Header';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  const [isSeller] = useSeller(user?.email);

  return (
    <div>
      <Header></Header>
      <div className="dashboard-page">
        <Container>
          <Row>
            <Col
              sm={12}
              md={3}
              xl={2}
              className=" dashboard-sidebar position-relative"
            >
              <ButtonGroup className="dashboard-button-groups">
                <Link
                  to="/dashboard"

                  // className={`${isSeller || isAdmin ? 'd-none' : ''}`}
                >
                  <Button className="d-flex align-items-center btn-sign-in">
                    <BsCartCheck size={28} className="me-2" />
                    My Orders
                  </Button>
                </Link>

                {isSeller && (
                  <div className="seller-buttons">
                    <Link to="/dashboard/addproduct">
                      <Button className="d-flex align-items-center btn-sign-in">
                        <AiOutlineAppstoreAdd size={28} className="me-2" />
                        Add A Product
                      </Button>
                    </Link>
                    <Link to="/dashboard/myproducts">
                      <Button className="d-flex align-items-center btn-sign-in">
                        <TbBrandProducthunt size={28} className="me-2" />
                        My Products
                      </Button>
                    </Link>
                  </div>
                )}

                {isAdmin && (
                  <div className="admin-buttons">
                    <Link to="/dashboard/allbuyers">
                      <Button className="d-flex align-items-center btn-sign-in">
                        <RiUserSettingsLine size={28} className="me-2" />
                        All Buyers
                      </Button>
                    </Link>
                    <Link to="/dashboard/allsellers">
                      <Button className="d-flex align-items-center btn-sign-in">
                        <RiUserStarLine size={28} className="me-2" />
                        All Sellers
                      </Button>
                    </Link>
                    <Link to="/dashboard/reporteditems">
                      <Button className="d-flex align-items-center btn-sign-in">
                        <MdReportProblem size={28} className="me-2" />
                        Reported Items
                      </Button>
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
                      <p className="mb-0 fw-semibold" style={{ color: 'aqua' }}>
                        {(isAdmin && 'Admin') ||
                          (isSeller && 'Seller') ||
                          'Buyer'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={12} md={9} xl={10}>
              <Outlet></Outlet>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DashboardLayout;
