import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { MainLayout } from "../pages/MainLayout";
import { Home } from "../pages/Home";
import { useAuth } from "../context/authContext";
import { SignUp } from "../pages/SignUp";
import { ProfileLayout } from "../pages/ProfileLayout";
import { routes } from ".";
import { SinglePiupiu } from "../pages/SinglePiupiu";
import { Profile } from "../pages/Profile";

export const PiupiuRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        index
        element={!isAuthenticated ? <Login /> : <Navigate to="/home" />}
      />
      <Route path="/signup" element={<SignUp />} />

      <Route
        path="/"
        element={isAuthenticated ? <MainLayout /> : <Navigate to="/" />}
      >
        <Route path="/home" element={<Home />} />
        <Route path="/following" element={<Home />} />
        <Route path={routes.singlePiupiu()} element={<SinglePiupiu />} />

        <Route element={<ProfileLayout />}>
          <Route
            path={routes.userLikes()}
            element={<Profile postsRoute="likes" />}
          />
          <Route
            path={routes.profile()}
            element={<Profile postsRoute="posts" />}
          />
        </Route>
      </Route>
    </Routes>
  );
};
