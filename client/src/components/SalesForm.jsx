import { useState, useContext } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import SalesContext from "../context/SalesContext";
import "react-toastify/dist/ReactToastify.css";

const SalesForm = ({ handleClose }) => {
  const { sales, addSale } = useContext(SalesContext);

  const months = [
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

  const [formData, setFormData] = useState({
    month: "",
    plan: "",
    actual: "",
    workingDays: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    if (
      e.target.name === "plan" ||
      e.target.name === "actual" ||
      e.target.name === "workingDays"
    ) {
      if (e.target.value < 0) return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ month: "", plan: "", actual: "", workingDays: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const monthExists = sales.some((sale) => sale.month === formData.month);

    if (monthExists) {
      toast.warn(`${formData.month} Verkaufsdaten sind bereits vorhanden!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });
      resetForm();
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      addSale(formData);

      toast.success("Verkaufsdaten erfolgreich hinzugefügt!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });

      resetForm();
      setIsSubmitting(false);
      handleClose(); // Close the form after successful submission
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Row className="justify-content-center">
        <Col xs={12} md={12} lg={12}>
          <Form
            onSubmit={handleSubmit}
            className="p-4 border rounded shadow-sm bg-light"
          >
            {/* Month Picker Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Monat auswählen</Form.Label>
              <Form.Control
                as="select"
                name="month"
                value={formData.month}
                onChange={handleChange}
                required
              >
                <option value="">-- Monat auswählen --</option>
                {months.map((month, index) => (
                  <option key={index} value={month}>
                    {month}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Planned Sales Input */}
            <Form.Group className="mb-3">
              <Form.Label>Geplante verkaufte Fahrzeuge</Form.Label>
              <Form.Control
                type="number"
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                placeholder="Geplante Zahl eingeben"
                min="0"
                required
              />
            </Form.Group>

            {/* Actual Sales Input */}
            <Form.Group className="mb-3">
              <Form.Label>Tatsächlich verkaufte Fahrzeuge</Form.Label>
              <Form.Control
                type="number"
                name="actual"
                value={formData.actual}
                onChange={handleChange}
                placeholder="Aktuelle Zahl eingeben"
                min="0"
                required
              />
            </Form.Group>

            {/* Working Days Input */}
            <Form.Group className="mb-3">
              <Form.Label>Arbeitstage</Form.Label>
              <Form.Control
                type="number"
                name="workingDays"
                value={formData.workingDays}
                onChange={handleChange}
                placeholder="Anzahl der Arbeitstage im Monat eingeben"
                min="0"
                required
              />
            </Form.Group>

            {/* Submit Button */}
            <Button variant="dark" type="submit" className="w-100">
              {isSubmitting ? "Hinzufügen..." : "Verkauf hinzufügen"}
            </Button>
          </Form>
        </Col>
      </Row>

      <ToastContainer
        position="top-left"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        closeButton
      />
    </motion.div>
  );
};

export default SalesForm;
