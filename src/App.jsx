import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
// import HomePage from "./pages/HomePage/HomePage";
// import CatalogPage from "./pages/CatalogPage/CatalogPage";
import Header from "./components/Header/Header";
// import DetailsPage from "./pages/DetailsPage/DetailsPage";
// import FeaturesById from "./components/FeaturesById/FeaturesById";
// import Reviews from "./components/Reviews/Reviews";
import { ToastContainer } from "react-toastify";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const DetailsPage = lazy(() => import("./pages/DetailsPage/DetailsPage"));
const FeaturesById = lazy(() =>
  import("./components/FeaturesById/FeaturesById")
);
const Reviews = lazy(() => import("./components/Reviews/Reviews"));

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<DetailsPage />}>
            <Route path="features" element={<FeaturesById />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
