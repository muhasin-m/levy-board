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
        <Col xs={12} md={8} lg={12}>
          <h3 className="text-dark fw-bold mb-1">
            Autolevy Vertriebs-Dashboard
          </h3>
          <p className="text-muted ">
            Verfolgen Sie Ihre Autoverkaufsleistung mit detaillierten Daten für
            eine effektive Entscheidungsfindung.
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
