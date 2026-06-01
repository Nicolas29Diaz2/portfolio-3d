import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "@/ui/components/Toast";
import { ZoomDisablerWrapper } from "@/ui/components/ZoomDisabler";
import PortfolioPage from "./pages/Portfolio/PortfolioPage";
import { ProductsPage } from "./pages/Products/ProductsPage";

function App() {
  return (
    <ZoomDisablerWrapper>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </BrowserRouter>
    </ZoomDisablerWrapper>
  );
}

export default App;
