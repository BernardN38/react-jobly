import React, { useState } from "react";
import "./App.css";
import Home from "./Components/Home";
import JobsList from "./Components/JobsList";
import CompaniesList from "./Components/CompaniesList";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import { Routes, Route } from "react-router-dom";
import CompanyCard from "./Components/CompanyCard";
import NavbarMain from "./Components/Navbar";
import Signout from "./Components/Signout";
import ProfileEdit from "./Components/ProfileEdit";
import { BrowserRouter, Navigate } from "react-router-dom";
function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  function RequireAuth({ children, redirectTo }) {
    return user.username ? children : <Navigate to={redirectTo} />;
  }
  return (
    <BrowserRouter>
      <NavbarMain user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="companies"
          element={
            <RequireAuth redirectTo="/login">
              <CompaniesList user={user} />
            </RequireAuth>
          }
        />
        <Route
          path="companies/:handle"
          element={
            <RequireAuth redirectTo="/login">
              <CompanyCard user={user} setUser={setUser} />
            </RequireAuth>
          }
        />
        <Route
          path="jobs"
          element={
            <RequireAuth redirectTo="/login">
              <JobsList user={user} setUser={setUser} />
            </RequireAuth>
          }
        />
        <Route path="login" element={<Login user={user} setUser={setUser} />} />
        <Route
          path="signout"
          element={<Signout user={user} setUser={setUser} />}
        />
        <Route
          path="profile"
          element={<Profile user={user} setUser={setUser} />}
        />
        <Route
          path="profile/edit"
          element={<ProfileEdit user={user} setUser={setUser} />}
        />
        <Route
          path="register"
          element={<Register user={user} setUser={setUser} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
