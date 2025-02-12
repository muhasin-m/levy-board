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

  // Month sorting order
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const sortedMonths = sales
    .map((sale) => sale.month)
    .sort((a, b) => monthOrder.indexOf(a) - monthOrder.indexOf(b));

  const [selectedMonth, setSelectedMonth] = useState(
    sortedMonths[0] || "January"
  );

  const filteredData =
    sales.find((sale) => sale.month === selectedMonth) || null;

  const progressTotal = filteredData
    ? ((filteredData.actual / filteredData.plan) * 100).toFixed(2)
    : "0.00";

  // Chart Data
  const barData = {
    labels: ["Planned Sales", "Actual Sales"],
    datasets: [
      {
        label: "Sales Data",
        data: [filteredData?.plan || 0, filteredData?.actual || 0],
        backgroundColor: ["#007bff", "#28a745"],
        borderRadius: 8,
      },
    ],
  };

  const doughnutData = {
    labels: ["Planned Sales", "Actual Sales"],
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
    labels: ["Working Days"],
    datasets: [
      {
        label: "Daily Plan",
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
            <Card.Title>Monthly Overview</Card.Title>
            <Card.Header className="p-2">{selectedMonth} in Review</Card.Header>

            {/* Month Selection Dropdown */}
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
                    <h5 className="text-secondary">📈 Sales Overview</h5>
                    <Bar data={barData} />
                  </Col>
                  <Col md={6} sm={12} className="mb-4">
                    <h5 className="text-secondary">📊 Sales Breakdown</h5>
                    <Doughnut data={doughnutData} />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md={6} sm={12} className="mb-4">
                    <h5 className="text-secondary">📉 Sales Trend</h5>
                    <Line data={lineData} />
                  </Col>
                  <Col md={6} sm={12} className="mb-4">
                    <h5 className="text-secondary">⚡ Overall Progress</h5>
                    <ProgressBar
                      now={isNaN(progressTotal) ? 0 : progressTotal}
                      label={`${isNaN(progressTotal) ? 0 : progressTotal}%`}
                      striped
                      animated
                      variant="success"
                      className="shadow-sm"
                    />
                    <p className="mt-2 text-muted">
                      {progressTotal >= 100
                        ? "🚀 Excellent! You've exceeded the sales target!"
                        : progressTotal >= 75
                        ? "✅ Good job! You're close to the target."
                        : "📉 Keep pushing! More sales needed."}
                    </p>
                  </Col>
                </Row>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center mt-4 text-danger"
              >
                ❌ No sales data available for {selectedMonth}.
              </motion.p>
            )}
          </Card.Body>
        </Card>
      </motion.div>
    </Container>
  );
};

export default ProgressCard;
