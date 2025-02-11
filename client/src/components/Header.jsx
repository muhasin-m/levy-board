import { Navbar, Container } from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";

const Header = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">
        <FaChartLine className="me-2" /> LEVY BOARD
      </Navbar.Brand>
    </Container>
  </Navbar>
);

export default Header;
