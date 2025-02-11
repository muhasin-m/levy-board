import { createContext, useState, useEffect } from "react";
import axios from "axios";

const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    const res = await axios.get("http://localhost:8000/api/sales");
    setSales(res.data);
  };

  const addSale = async (sale) => {
    const res = await axios.post(
      "http://localhost:8000/api/sales/add-data",
      sale
    );
    setSales([...sales, res.data]);
  };

  const updateSale = async (updatedSale) => {
    await axios.put(
      `http://localhost:8000/api/sales/update-data/${updatedSale._id}`,
      updatedSale
    );
    setSales(sales.map((s) => (s._id === updatedSale._id ? updatedSale : s)));
  };

  const deleteSale = async (id) => {
    await axios.delete(`http://localhost:8000/api/sales/delete-data/${id}`);
    setSales(sales.filter((s) => s._id !== id));
  };

  return (
    <SalesContext.Provider value={{ sales, addSale, updateSale, deleteSale }}>
      {children}
    </SalesContext.Provider>
  );
};

export default SalesContext;
