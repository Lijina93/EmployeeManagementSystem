import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiUsers, FiUserPlus, FiLogOut } from "react-icons/fi";
import "../styles/Navbar.css";

export default function Navbar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">⬡</span>
        <span className="brand-name">EmpTrack</span>
      </div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <FiUsers /> Employees
        </NavLink>
        <NavLink to="/employees/add" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <FiUserPlus /> Add Employee
        </NavLink>
      </div>
      <div className="navbar-right">
        {user?.username && <span className="nav-user">{user.username}</span>}
        <button className="logout-btn" onClick={handleLogout}>
          <FiLogOut /> Logout
        </button>
      </div>
    </nav>
  );
}
