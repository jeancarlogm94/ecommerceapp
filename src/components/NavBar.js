import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../store/slices/cart.slice';
import Cart from './Cart';

const NavBar = () => {
  // const logOut = () => {
  //   localStorage.setItem("token", "");
  //   alert("Closed session");
  // };

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setShow(true);
    } else {
      navigate('/login');
    }
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  return (
    <div>
      <Navbar
        style={{ fontSize: '20px' }}
        className="rounded p-3"
        collapseOnSelect
        expand="lg"
        bg="primary"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="/">
            <i className="fa-xl fa-solid fa-dumpster "></i>{' '}
            <span style={{ fontSize: '25px' }}>e-commerce</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              <Nav.Link href="/#/user">User</Nav.Link>
              <Nav.Link href="/#/purchases">Purchases</Nav.Link>
              <Nav.Link onClick={handleShow} role="button">
                Cart
              </Nav.Link>
              {/* <Nav.Link href="/#/login" onClick={logOut}>
                Log Out
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Cart show={show} handleClose={handleClose} />
    </div>
  );
};

export default NavBar;
