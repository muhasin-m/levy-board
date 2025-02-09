// import { Container } from "react-bootstrap";
// import { FaCar } from "react-icons/fa";

// const Header = () => (
//   <header
//     className="bg-dark text-white py-3 shadow-sm d-flex align-items-center justify-content-center"
//     style={{
//       position: "fixed",
//       top: 0,
//       width: "100%",
//       zIndex: 1000,
//     }}
//   >
//     <Container fluid className="text-center">
//       <h1 className="m-0 d-flex align-items-center justify-content-center">
//         <FaCar className="me-2" size={32} /> Levy Car Dealership Dashboard
//       </h1>
//     </Container>
//   </header>
// );

// export default Header;



import { Navbar, Container } from "react-bootstrap";
import { FaChartLine } from "react-icons/fa";

const Header = () => (
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="/">
        <FaChartLine className="me-2" /> Sales Dashboard
      </Navbar.Brand>
    </Container>
  </Navbar>
);

export default Header;