import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import { SalesProvider } from "./context/SalesContext";

function App() {
  return (
    <BrowserRouter>
      <SalesProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </SalesProvider>
    </BrowserRouter>
  );
}

export default App;
