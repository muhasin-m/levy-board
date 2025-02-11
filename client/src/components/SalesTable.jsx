import { useContext, useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import SalesContext from "../context/SalesContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SalesTable = () => {
  const { sales, deleteSale, updateSale } = useContext(SalesContext);
  const [editData, setEditData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (sale) => {
    setEditData(sale);
    setShowModal(true);
  };

  const handleUpdate = () => {
    updateSale(editData); // No date involved
    toast.success("Sales data updated successfully!");
    setShowModal(false);
  };

  const handleDelete = (id) => {
    deleteSale(id);
    toast.error("Sales data deleted successfully!");
  };

  // Sort months from January to December
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

  const sortedSales = [...sales].sort((a, b) => {
    return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
  });

  // Handle NaN or zero values
  const handleZeroValues = (value) => (value === 0 || isNaN(value) ? 0 : value);

  const calculateProgress = (sale) => {
    const dailyPlan = handleZeroValues(sale.plan / sale.workingDays).toFixed(2);
    const dailyActual = handleZeroValues(
      sale.actual / sale.workingDays
    ).toFixed(2);
    const progressToday = handleZeroValues(
      (dailyActual / dailyPlan) * 100
    ).toFixed(2);
    const progressTotal = handleZeroValues(
      (sale.actual / sale.plan) * 100
    ).toFixed(2);

    return { dailyPlan, dailyActual, progressToday, progressTotal };
  };

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Month</th>
            <th>Planned Sales</th>
            <th>Actual Sales</th>
            <th>Working Days</th>
            <th>Daily Plan</th>
            <th>Daily Actual</th>
            <th>Progress Today</th>
            <th>Progress Total</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sortedSales.map((sale) => {
            const { dailyPlan, dailyActual, progressToday, progressTotal } =
              calculateProgress(sale);

            return (
              <tr key={sale._id}>
                <td>{sale.month}</td>
                <td>{sale.plan}</td>
                <td>{sale.actual}</td>
                <td>{sale.workingDays}</td>
                <td>{dailyPlan}</td>
                <td>{dailyActual}</td>
                <td>{progressToday}%</td>
                <td>{progressTotal}%</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(sale)}
                    className="me-2"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(sale._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Sales Data - {editData?.month}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editData && (
            <Form>
              <Form.Group controlId="formMonth">
                <Form.Label>Month</Form.Label>
                <Form.Control type="text" value={editData.month} disabled />
              </Form.Group>

              <Form.Group controlId="formPlannedSales">
                <Form.Label>Planned Sales</Form.Label>
                <Form.Control
                  type="number"
                  value={editData.plan}
                  onChange={(e) =>
                    setEditData({ ...editData, plan: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formActualSales">
                <Form.Label>Actual Sales</Form.Label>
                <Form.Control
                  type="number"
                  value={editData.actual}
                  onChange={(e) =>
                    setEditData({ ...editData, actual: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formWorkingDays">
                <Form.Label>Working Days</Form.Label>
                <Form.Control
                  type="number"
                  value={editData.workingDays}
                  onChange={(e) =>
                    setEditData({ ...editData, workingDays: e.target.value })
                  }
                />
              </Form.Group>

              <Button
                variant="primary"
                onClick={handleUpdate}
                className="w-100"
              >
                Update
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default SalesTable;
