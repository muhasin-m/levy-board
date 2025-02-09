import { createContext, useState, useEffect } from "react";
import axios from "axios";

const SalesContext = createContext();

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const res = await axios.get("http://localhost:8000/api/sales");
      setSales(res.data);
    };
    fetchSales();
  }, []);

  return (
    <SalesContext.Provider value={{ sales }}>{children}</SalesContext.Provider>
  );
};

export default SalesContext;
