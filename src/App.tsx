import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "@/ui/components/Toast";
import { ZoomDisablerWrapper } from "@/ui/components/ZoomDisabler";
import HomePage from "./pages/Home/HomePage";

const PortfolioPage = lazy(() => import("./pages/Portfolio/PortfolioPage"));
const ProductsPage = lazy(() =>
  import("./pages/Products/ProductsPage").then((m) => ({ default: m.ProductsPage }))
);

function App() {
  return (
    <ZoomDisablerWrapper>
      <ToastContainer />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/3d"
            element={
              <Suspense
                fallback={
                  <div
                    style={{
                      minHeight: "100vh",
                      backgroundColor: "#05070a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#38bdf8",
                      fontFamily: "system-ui, sans-serif",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                    }}
                  >
                    Loading 3D Experience...
                  </div>
                }
              >
                <PortfolioPage />
              </Suspense>
            }
          />
          <Route path="/portfolio" element={<Navigate to="/3d" replace />} />
          <Route
            path="/products"
            element={
              <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "#05070a" }} />}>
                <ProductsPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ZoomDisablerWrapper>
  );
}

export default App;

