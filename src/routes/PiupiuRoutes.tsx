import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { MainLayout } from "../pages/MainLayout";
import { Home } from "../pages/Home";
import { useAuth } from "../context/authContext";
import { SignUp } from "../pages/SignUp";
import { SinglePiupiu } from "../pages/SinglePiupiu";

export const PiupiuRoutes = () => {
  const {isAuthenticated} = useAuth()
 
  return (
    <Routes>
      <Route index element={!isAuthenticated ? <Login /> : <Navigate to="/home" />} />

      <Route path="/" element={isAuthenticated ? <MainLayout /> : <Navigate to="/" />}>
        <Route path="/home" element={<Home />} />
        <Route path="/following" element={<Home />} />
        <Route path="/singlePiupiu()" element={<SinglePiupiu />} />
      </Route>

      <Route path="/signup" element={ <SignUp /> } />
    </Routes>
  );
};