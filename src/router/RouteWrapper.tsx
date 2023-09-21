import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import { PAGE_ROUTES } from "./Routes";
import Home from "../pages/Home";

export function RoutesWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGE_ROUTES.home} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
