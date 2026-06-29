import { Routes, Route } from "react-router-dom";

import Header from "./component/Header";
import Home from "./component/Home";
import Login from "./component/Login";
import AdminRegister from "./component/AdminRegister";
import EmployeeRegister from "./component/EmployeeRegister";
import AdminDashboard from "./component/AdminDashboard";
import EmployeeDashboard from "./component/EmployeeDashboard";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/employee-register" element={<EmployeeRegister />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
      </Routes>
    </>
  );
}

export default App;