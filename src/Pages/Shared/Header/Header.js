import React, { useContext, useState } from 'react';
import './Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../../../assets/images/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider';
import { Button, Dropdown, DropdownButton, Image } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { useQuery } from '@tanstack/react-query';

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  // const [accountType, setAccountType] = useState('User');

  const url = `http://localhost:5000/users/${user?.email}`;
  const { data: savedUser = {}, refetch } = useQuery({
    queryKey: ['users', user?.email],
    queryFn: async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
      } catch (error) {
        console.log('Error:', error);
      }
    },
  });

  console.log(savedUser);

  const handleSellerAccount = () => {
    fetch(`http://localhost:5000/users/seller/${user?.email}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          refetch();
          toast.success('Switch as a Seller account');
        }
      });
  };

  const handleLogOut = () => {
    logOut();
    toast.warn('You just logged out!');
  };

  return (
    <>
      {['xl'].map((expand) => (
        <Navbar key={expand} expand={expand} className="py-3 navbar-container">
          <Container>
            <Link to="/">
              <Navbar.Brand>
                <img
                  alt=""
                  src={logo}
                  width="40"
                  height="40"
                  className="d-inline-block align-center me-2 mb-1"
                />
                <span className="d-inline-block fw-semibold text-white fs-4">
                  HomeTech
                </span>
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className=" text-dark bg-white"
            />
            <Navbar.Offcanvas
              className="navbar-off-canvas"
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <Link to="/">
                    <Navbar.Brand>
                      <img
                        alt=""
                        src={logo}
                        width="40"
                        height="40"
                        className="d-inline-block align-center me-2"
                      />
                      <span className="d-inline-block text-white">
                        HomeTech
                      </span>
                    </Navbar.Brand>
                  </Link>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body bg="dark" variant="dark">
                <Nav className="mx-auto pe-3 nav-items">
                  <NavLink
                    to="/home"
                    className={({ isActive }) =>
                      isActive ? 'active' : undefined
                    }
                  >
                    Home
                  </NavLink>
                  <NavLink to="/blog">Blog</NavLink>
                  {user?.email && (
                    <>
                      <NavLink to="">Dashboard</NavLink>
                    </>
                  )}
                </Nav>

                <Nav className="user-profile-and-logout mt-lg-0">
                  {user?.email ? (
                    <>
                      <Link to="/profile">
                        {user?.photoURL ? (
                          <>
                            <OverlayTrigger
                              key="bottom"
                              placement="bottom"
                              overlay={<Tooltip>{user?.displayName}</Tooltip>}
                            >
                              <Image
                                roundedCircle
                                src={user?.photoURL}
                                style={{ width: '40px', height: '40px' }}
                              ></Image>
                            </OverlayTrigger>
                          </>
                        ) : (
                          <FaUserCircle size={36} title={user?.displayName} />
                        )}
                      </Link>

                      <DropdownButton
                        id="dropdown-basic-button"
                        title={savedUser?.role}
                        className="border-0 fw-bold"
                      >
                        <>
                          <OverlayTrigger
                            key="bottom"
                            placement="bottom"
                            overlay={
                              <Tooltip>{'Default account type'}</Tooltip>
                            }
                          >
                            <Dropdown.Item>User</Dropdown.Item>
                          </OverlayTrigger>
                        </>

                        <>
                          <OverlayTrigger
                            key="bottom"
                            placement="bottom"
                            overlay={
                              <Tooltip>{'Use account as a Seller'}</Tooltip>
                            }
                          >
                            <Dropdown.Item
                              onClick={() => {
                                handleSellerAccount();
                              }}
                            >
                              Seller
                            </Dropdown.Item>
                          </OverlayTrigger>
                        </>
                      </DropdownButton>

                      <Link to="/login">
                        <Button
                          onClick={handleLogOut}
                          variant="info"
                          className="btn-log-out fw-semibold text-white"
                        >
                          Log Out
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/login">
                        <Button
                          variant="success"
                          className="btn-sign-in fw-semibold text-white"
                        >
                          Login
                        </Button>
                      </Link>
                      <Link to="/signup">
                        <Button
                          variant="info"
                          className="btn-register fw-semibold  text-white"
                        >
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
};

export default Header;

//  bg = 'dark';
//  variant = 'dark';

// navbar-dark bg-dark
