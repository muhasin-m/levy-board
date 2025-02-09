import React from "react";
import { Card, ProgressBar } from "react-bootstrap";

const ProgressCard = ({ sales }) => {
  if (!sales.length) return null; // If no sales data, do not render the card.

  const latestSale = sales[sales.length - 1]; // Assuming the most recent sale data is the last one.

  const goalProgress = (latestSale.actual / latestSale.plan) * 100;

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{latestSale.month} Sales Progress</Card.Title>
        <ProgressBar now={goalProgress} label={`${goalProgress.toFixed(2)}%`} />
        <div className="mt-2">
          <strong>Plan:</strong> {latestSale.plan} vehicles
          <br />
          <strong>Actual:</strong> {latestSale.actual} vehicles
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProgressCard;
