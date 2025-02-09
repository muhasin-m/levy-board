import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/", { replace: true });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 text-center">
      <Container>
        <div className="d-flex flex-column align-items-center">
          <FaExclamationTriangle size={60} className="text-warning mb-3" />
          <h1 className="fw-bold display-4">404 - Page Not Found</h1>
          <p className="text-muted fs-5">
            The page you are looking for does not exist or has been moved.
          </p>
          <Button variant="primary" size="lg" onClick={handleGoBack}>
            Go Back to Dashboard
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
