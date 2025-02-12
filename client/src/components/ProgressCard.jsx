import { useState, useContext } from "react";
import {
  Card,
  Dropdown,
  Row,
  Col,
  ProgressBar,
  Container,
} from "react-bootstrap";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import SalesContext from "../context/SalesContext";
import { motion } from "framer-motion";
import "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";

const ProgressCard = () => {
  const { sales } = useContext(SalesContext);

  if (!sales || sales.length === 0) {
    return (
      <Container className="d-flex justify-content-center align-items-center flex-column mt-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-100 text-center"
        >
          <Card
            className="p-4 shadow-sm w-100 text-center"
            style={{
              borderRadius: "5px",
              background: "#f8f9fa",
            }}
          >
            <Card.Body className="d-flex flex-column align-items-center">
              <Card.Title className="text-center">
                Verkaufsdaten nicht verfügbar
              </Card.Title>
              <p className="text-muted text-center">
                Es gibt derzeit keine Verkaufsdaten für dieses Jahr.
              </p>
            </Card.Body>
          </Card>
        </motion.div>
      </Container>
    );
  }

  const monthOrder = [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];

  const sortedMonths = sales
    .map((sale) => sale.month)
    .sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));

  const [selectedMonth, setSelectedMonth] = useState(
    sortedMonths[0] || "Januar"
  );
  const filteredData =
    sales.find((sale) => sale.month === selectedMonth) || null;
  const progressTotal = filteredData
    ? ((filteredData.actual / filteredData.plan) * 100).toFixed(2)
    : "0.00";

  const barData = {
    labels: ["Geplante Verkäufe", "Tatsächliche Verkäufe"],
    datasets: [
      {
        label: "Verkaufsdaten",
        data: [filteredData?.plan || 0, filteredData?.actual || 0],
        backgroundColor: ["#007bff", "#28a745"],
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ["Geplante Verkäufe", "Tatsächliche Verkäufe"],
    datasets: [
      {
        data: [filteredData?.plan || 0, filteredData?.actual || 0],
        backgroundColor: ["#17a2b8", "#ffc107"],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const lineData = {
    labels: ["Arbeitstage"],
    datasets: [
      {
        label: "Tagesplan",
        data: [
          filteredData ? filteredData.plan / filteredData.workingDays || 0 : 0,
        ],
        borderColor: "#6f42c1",
        fill: true,
        backgroundColor: "rgba(111, 66, 193, 0.2)",
        tension: 0.4,
      },
      {
        label: "Daily Actual",
        data: [
          filteredData
            ? filteredData.actual / filteredData.workingDays || 0
            : 0,
        ],
        borderColor: "#dc3545",
        fill: true,
        backgroundColor: "rgba(220, 53, 69, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column mt-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-100"
      >
        <Card
          className="p-4 shadow-sm w-100"
          style={{
            maxWidth: "100%",
            borderRadius: "5px",
            background: "#f8f9fa",
          }}
        >
          <Card.Body>
            <Card.Title>Monatliche Übersicht</Card.Title>
            <Card.Header className="p-2">
              Rückblick auf {selectedMonth}
            </Card.Header>

            <Dropdown onSelect={(e) => setSelectedMonth(e)} className="mt-3">
              <Dropdown.Toggle variant="dark" className="w-25">
                {selectedMonth}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {sortedMonths.map((month) => (
                  <Dropdown.Item key={month} eventKey={month}>
                    {month}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {filteredData ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Row className="mt-4">
                  <Col md={6} sm={12} className="mb-4">
                    <h5 className="text-secondary">📈 Verkaufsübersicht</h5>
                    <Bar data={barData} />
                  </Col>
                  <Col md={6} sm={12} className="mb-4">
                    <h5 className="text-secondary">📊 Umsatzaufteilung</h5>
                    <Doughnut data={doughnutData} />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col md={6} sm={12} className="mb-4">
                    <h5 className="text-secondary">📉 Umsatzentwicklung</h5>
                    <Line data={lineData} />
                  </Col>
                  <Col md={6} sm={12} className="mb-4">
                    <h5 className="text-secondary">
                      ⚡ Allgemeine Fortschritte
                    </h5>
                    <ProgressBar
                      now={progressTotal}
                      label={`${progressTotal}%`}
                      striped
                      animated
                      variant="success"
                      className="shadow-sm"
                    />
                    <p className="mt-2 text-muted">
                      {progressTotal >= 100
                        ? "🚀  Ausgezeichnet! Sie haben das Verkaufsziel übertroffen!"
                        : progressTotal >= 75
                        ? "✅ Gut gemacht! Sie sind nahe am Ziel."
                        : "📉 Weiter Druck machen! Mehr Verkäufe nötig."}
                    </p>
                  </Col>
                </Row>
              </motion.div>
            ) : (
              <p className="text-center mt-4 text-danger">
                ❌ Keine Verkaufsdaten verfügbar für {selectedMonth}.
              </p>
            )}
          </Card.Body>
        </Card>
      </motion.div>
    </Container>
  );
};

export default ProgressCard;
