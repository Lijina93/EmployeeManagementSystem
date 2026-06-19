import { useNavigate } from "react-router-dom";
import { FiEdit2, FiTrash2, FiMail, FiPhone, FiMapPin } from "react-icons/fi";
import "../styles/EmployeeCard.css";

const GENDER_COLORS = { Male: "#4f8ef7", Female: "#f76fad", Other: "#a78bfa" };

function initials(first, last) {
  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();
}

export default function EmployeeCard({ employee, onDelete }) {
  const navigate = useNavigate();
  const { _id, FirstName, LastName, PersonalEmail, MobileNumber, City, Designation, Gender } = employee;
  const color = GENDER_COLORS[Gender] ?? "#64748b";

  return (
    <div className="emp-card">
      <div className="emp-card-header" style={{ "--accent": color }}>
        <div className="emp-avatar" style={{ background: color }}>
          {initials(FirstName, LastName)}
        </div>
        <div className="emp-identity">
          <h3 className="emp-name">{FirstName} {LastName}</h3>
          <span className="emp-designation">
            {Designation?.Name ?? "—"}
          </span>
        </div>
        <span className="emp-gender-badge" style={{ background: color + "22", color }}>
          {Gender ?? "—"}
        </span>
      </div>

      <div className="emp-card-body">
        <div className="emp-info-row">
          <FiMail className="info-icon" />
          <span>{PersonalEmail}</span>
        </div>
        {MobileNumber && (
          <div className="emp-info-row">
            <FiPhone className="info-icon" />
            <span>{MobileNumber}</span>
          </div>
        )}
        {City && (
          <div className="emp-info-row">
            <FiMapPin className="info-icon" />
            <span>{City}</span>
          </div>
        )}
      </div>

      <div className="emp-card-actions">
        <button className="btn-ghost" onClick={() => navigate(`/employees/${_id}`)}>
          View
        </button>
        <button className="btn-edit" onClick={() => navigate(`/employees/edit/${_id}`)}>
          <FiEdit2 /> Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(_id)}>
          <FiTrash2 /> Delete
        </button>
      </div>
    </div>
  );
}
