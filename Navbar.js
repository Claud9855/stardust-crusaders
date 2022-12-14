import React, { useState } from "react";
import { Form, Button, Alert , Navbar,Container,Nav,Modal, Tab} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import LoginForm from './client/src/components/LoginForm';
import SignupForm from "./client/src/components/SignupForm";
import { loginUser } from './client/src/utils/API'
import Auth from "./client/src/utils/auth";


const AppNavbar = () => {
    const [showModal, setShowModal] = useState(false);
    return (
      <>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container fluid>
            <Navbar.Brand as={Link} to='/'>
              Video game search
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='navbar' />
            <Navbar.Collapse id='navbar'>
              <Nav className='ml-auto'>
                <Nav.Link as={Link} to='/'>
                  Search For Books
                </Nav.Link>
                {Auth.loggedIn() ? (
                  <>
                    <Nav.Link as={Link} to='/saved'>
                      See Your Games
                    </Nav.Link>
                    <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                  </>
                ) : (
                  <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Modal
          size='lg'
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby='signup-modal'>
          {/* tab container to do either signup or login component */}
          <Tab.Container defaultActiveKey='login'>
            <Modal.Header closeButton>
              <Modal.Title id='signup-modal'>
                <Nav variant='pills'>
                  <Nav.Item>
                    <Nav.Link eventKey='login'>Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Tab.Content>
                <Tab.Pane eventKey='login'>
                  <LoginForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
                <Tab.Pane eventKey='signup'>
                  <SignupForm handleModalClose={() => setShowModal(false)} />
                </Tab.Pane>
              </Tab.Content>
            </Modal.Body>
          </Tab.Container>
        </Modal>
      </>
    );
  };
  
  export default AppNavbar;