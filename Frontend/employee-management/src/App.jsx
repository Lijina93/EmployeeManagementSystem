import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import EmployeeList from "./pages/EmployeeList";
import AddEditEmployee from "./pages/AddEditEmployee";
import EmployeeDetail from "./pages/EmployeeDetail";
import "./styles/App.css";

function PrivateRoute({ children }) {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isAuth } = useAuth();
  return (
    <>
      {isAuth && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><EmployeeList /></PrivateRoute>} />
        <Route path="/employees/add" element={<PrivateRoute><AddEditEmployee /></PrivateRoute>} />
        <Route path="/employees/edit/:id" element={<PrivateRoute><AddEditEmployee /></PrivateRoute>} />
        <Route path="/employees/:id" element={<PrivateRoute><EmployeeDetail /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
