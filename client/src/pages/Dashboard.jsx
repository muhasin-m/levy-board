import { useContext } from "react";
import SalesContext from "../context/SalesContext";
import SalesTable from "../components/SalesTable";
import ProgressCard from "../components/ProgressCard";
import { Container, Row, Col } from "react-bootstrap";

const Dashboard = () => {
  const { sales } = useContext(SalesContext);

  return (
    <Container className="my-4">
      <Row className="mb-4 text-center text-md-start">
        <Col xs={12} md={8}>
          <h4 className="text-dark fw-bold mb-1">Autolevy Sales Dashboard</h4>
          <p className="text-muted ">
            Stay on top of monthly sales performance and track progress
            effortlessly.
          </p>
        </Col>
      </Row>

      {/* Sales Data Components */}
      <ProgressCard sales={sales} />
      <SalesTable sales={sales} />
    </Container>
  );
};

export default Dashboard;
