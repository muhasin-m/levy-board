import React, { useContext } from "react";
import SalesContext from "../context/SalesContext";
import SalesTable from "../components/SalesTable";
import ProgressCard from "../components/ProgressCard";
import { Container } from "react-bootstrap";

const Dashboard = () => {
  const { sales } = useContext(SalesContext);

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Sales Dashboard</h1>
      <ProgressCard sales={sales} />
      <SalesTable sales={sales} />
    </Container>
  );
};

export default Dashboard;
