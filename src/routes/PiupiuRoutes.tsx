import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { MainLayout } from "../pages/MainLayout";
import { Home } from "../pages/Home";
import { useAuth } from "../context/authContext";

export const PiupiuRoutes = () => {
  const {isAuthenticated} = useAuth()
  // const isLogged = false;
  return (
    <Routes>
      <Route index element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />

      <Route path="/" element={isAuthenticated ? <MainLayout /> : <Navigate to="/" />}>
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};
