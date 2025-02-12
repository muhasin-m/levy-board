import { useState } from "react";
import { Navbar, Container, Nav, Button, Modal } from "react-bootstrap";
import SalesForm from "./SalesForm";

const Header = () => {
  const [showForm, setShowForm] = useState(false);

  // Toggle function for showing the SalesForm modal
  const handleShow = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        sticky="top"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand href="/">AUTOLEVY </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              <Button variant="outline-light" onClick={handleShow}>
                Add Monthly Sales
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* SalesForm Modal */}
      <Modal show={showForm} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Monthly Sales Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SalesForm handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Header;
