import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      className="bg-dark text-white text-center py-3"
      style={{
        // position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Container>
        &copy; {new Date().getFullYear()} Sales Dashboard. All rights reserved.
      </Container>
    </footer>
  );
};

export default Footer;
