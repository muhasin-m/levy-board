import { useState, useContext } from "react";
import {
  Card,
  Dropdown,
  Row,
  Col,
  ProgressBar,
  Container,
} from "react-bootstrap";
import { Bar, Pie, Line } from "react-chartjs-2";
import SalesContext from "../context/SalesContext";
import "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";

const ProgressCard = () => {
  const { sales } = useContext(SalesContext);

  // Correct month sorting order
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

  const barData = {
    labels: ["Planned Sales", "Actual Sales"],
    datasets: [
      {
        label: "Sales Data",
        data: [filteredData?.plan || 0, filteredData?.actual || 0],
        backgroundColor: ["#4e79a7", "#f28e2b"],
        borderRadius: 8,
      },
    ],
  };

  const pieData = {
    labels: ["Planned Sales", "Actual Sales"],
    datasets: [
      {
        data: [filteredData?.plan || 0, filteredData?.actual || 0],
        backgroundColor: ["#76b7b2", "#e15759"],
        borderWidth: 2,
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
        borderColor: "#59a14f",
        fill: false,
        tension: 0.4,
      },
      {
        label: "Daily Actual",
        data: [
          filteredData
            ? filteredData.actual / filteredData.workingDays || 0
            : 0,
        ],
        borderColor: "#edc949",
        fill: false,
        tension: 0.4,
      },
    ],
  };

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column mt-4">
      <Card
        className="p-4 shadow-lg w-100"
        style={{ maxWidth: "900px", borderRadius: "15px" }}
      >
        <h4 className="text-center mb-4 text-primary">
          Sales Progress Overview
        </h4>

        {/* Month Selection Dropdown */}
        <Dropdown onSelect={(e) => setSelectedMonth(e)}>
          <Dropdown.Toggle variant="outline-dark" className="w-100">
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
          <Row className="mt-4">
            <Col md={6} sm={12} className="mb-4">
              <h5 className="text-secondary">Sales Performance Overview</h5>
              <Bar data={barData} />
            </Col>
            <Col md={6} sm={12} className="mb-4">
              <h5 className="text-secondary">Sales Distribution</h5>
              <Pie data={pieData} />
            </Col>
          </Row>
        ) : (
          <p className="text-center mt-4 text-danger">
            No sales data available for {selectedMonth}.
          </p>
        )}

        {filteredData && (
          <Row>
            <Col md={6} sm={12} className="mb-4">
              <h5 className="text-secondary">Trend Analysis</h5>
              <Line data={lineData} />
            </Col>
            <Col md={6} sm={12} className="mb-4">
              <h5 className="text-secondary">Overall Sales Progress</h5>
              <ProgressBar
                now={isNaN(progressTotal) ? 0 : progressTotal}
                label={`${isNaN(progressTotal) ? 0 : progressTotal}%`}
                striped
                animated
                variant="info"
                className="shadow-sm"
              />
            </Col>
          </Row>
        )}
      </Card>
    </Container>
  );
};

export default ProgressCard;
