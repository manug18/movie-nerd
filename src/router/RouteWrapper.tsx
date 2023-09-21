import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import { PAGE_ROUTES } from "./Routes";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";

export function RoutesWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGE_ROUTES.home} element={<Home />} />
        <Route path={PAGE_ROUTES.movieDetails} element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
