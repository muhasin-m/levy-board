import React from "react";
import { Table } from "react-bootstrap";

const SalesTable = ({ sales }) => {
  if (!sales.length) return <div>No sales data available</div>;

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Month</th>
          <th>Plan</th>
          <th>Actual</th>
          <th>Working Days</th>
          <th>Daily Plan</th>
          <th>Daily Actual</th>
          <th>Progress Today</th>
          <th>Progress Total</th>
        </tr>
      </thead>
      <tbody>
        {sales.map((sale, index) => {
          const dailyPlan = (sale.plan / sale.workingDays).toFixed(2);
          const dailyActual = (sale.actual / sale.workingDays).toFixed(2);
          const progressToday = ((dailyActual / dailyPlan) * 100).toFixed(2);
          const progressTotal = ((sale.actual / sale.plan) * 100).toFixed(2);

          return (
            <tr key={index}>
              <td>{sale.month}</td>
              <td>{sale.plan}</td>
              <td>{sale.actual}</td>
              <td>{sale.workingDays}</td>
              <td>{dailyPlan}</td>
              <td>{dailyActual}</td>
              <td>{progressToday}%</td>
              <td>{progressTotal}%</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default SalesTable;
