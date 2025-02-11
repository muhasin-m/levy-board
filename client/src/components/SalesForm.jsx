import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion"; // For animations
import SalesContext from "../context/SalesContext";
import "react-toastify/dist/ReactToastify.css";

const SalesForm = () => {
  const { sales, addSale } = useContext(SalesContext);

  const months = [
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

  const [formData, setFormData] = useState({
    month: "",
    plan: "",
    actual: "",
    workingDays: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ month: "", plan: "", actual: "", workingDays: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const monthExists = sales.some((sale) => sale.month === formData.month);

    if (monthExists) {
      toast.warn(`${formData.month} sales data already exists!`, {
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
      addSale(formData); // Date is no longer included

      toast.success("Sales data added successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
      });

      resetForm();
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form onSubmit={handleSubmit} className="mb-4 p-3 border rounded shadow">
        <h4 className="text-center mb-3">Add Sales Data</h4>

        {/* Month Picker Dropdown */}
        <Form.Group className="mb-3">
          <Form.Label>Select Month</Form.Label>
          <Form.Control
            as="select"
            name="month"
            value={formData.month}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Month --</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Planned Sales</Form.Label>
          <Form.Control
            type="number"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
            placeholder="Enter Planned Sales"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Actual Sales</Form.Label>
          <Form.Control
            type="number"
            name="actual"
            value={formData.actual}
            onChange={handleChange}
            placeholder="Enter Actual Sales"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Working Days</Form.Label>
          <Form.Control
            type="number"
            name="workingDays"
            value={formData.workingDays}
            onChange={handleChange}
            placeholder="Enter Working Days"
            required
          />
        </Form.Group>

        <motion.div
          whileTap={{ scale: 0.95 }}
          animate={isSubmitting ? { scale: [1, 1.05, 1] } : {}}
          transition={{ duration: 0.3, repeat: 2 }}
        >
          <Button variant="primary" type="submit" className="w-100">
            {isSubmitting ? "Adding..." : "Add Sale"}
          </Button>
        </motion.div>
      </Form>

      {/* Toast Notification Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
        theme="colored"
      />
    </motion.div>
  );
};

export default SalesForm;
