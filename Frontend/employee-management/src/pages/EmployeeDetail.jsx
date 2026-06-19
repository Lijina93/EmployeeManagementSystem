import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEmployeeById, deleteEmployee } from "../api/employeeApi";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import "../styles/EmployeeDetail.css";

function Field({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="detail-field">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  );
}

function formatDate(val) {
  if (!val) return null;
  const d = new Date(val);
  if (isNaN(d)) return val;
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emp, setEmp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    getEmployeeById(id)
      .then((res) => setEmp(res.data?.data))
      .catch(() =>
        setToast({ message: "Failed to load employee.", type: "error" }),
      )
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteEmployee(id);
      navigate("/");
    } catch {
      setToast({ message: "Delete failed.", type: "error" });
      setShowDelete(false);
    }
  };

  if (loading)
    return (
      <div className="detail-page">
        <div className="detail-skeleton" />
      </div>
    );
  if (!emp)
    return (
      <div className="detail-page">
        <p>Employee not found.</p>
      </div>
    );

  const name = `${emp.FirstName} ${emp.LastName}`;
  const initials =
    `${emp.FirstName?.[0] ?? ""}${emp.LastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="detail-page">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {showDelete && (
        <ConfirmDialog
          message={`Delete ${name}? This cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}

      <div className="detail-topbar">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
        <div className="detail-actions">
          <button
            className="btn-edit"
            onClick={() => navigate(`/employees/edit/${id}`)}
          >
            <FiEdit2 /> Edit
          </button>
          <button className="btn-delete" onClick={() => setShowDelete(true)}>
            <FiTrash2 /> Delete
          </button>
        </div>
      </div>

      <div className="detail-hero">
        <div className="detail-avatar">{initials}</div>
        <div>
          <h1 className="detail-name">{name}</h1>
          <p className="detail-desig">{emp.Designation?.Name ?? "—"}</p>
        </div>
      </div>

      <div className="detail-sections">
        <div className="detail-card">
          <h2>Personal</h2>
          <Field label="Date of Birth" value={formatDate(emp.DOB)} />
          <Field label="Gender" value={emp.Gender} />
          <Field
            label="Basic Pay"
            value={
              emp.BasicPay ? `₹ ${emp.BasicPay.toLocaleString("en-IN")}` : null
            }
          />
        </div>

        <div className="detail-card">
          <h2>Contact</h2>
          <Field label="Email" value={emp.PersonalEmail} />
          <Field label="Mobile" value={emp.MobileNumber} />
          <Field label="Address" value={emp.PostalAddress} />
          <Field label="City" value={emp.City} />
          <Field label="Country" value={emp.Country?.Name} />
        </div>

        {emp.Education?.length > 0 && (
          <div className="detail-card detail-card-full">
            <h2>Education</h2>
            <div className="sub-table">
              <div className="sub-table-head">
                <span>Course</span>
                <span>Specialization</span>
                <span>Institution</span>
                <span>Grade</span>
              </div>
              {emp.Education.map((e, i) => (
                <div className="sub-table-row" key={i}>
                  <span>{e.Course?.Name ?? "—"}</span>
                  <span>{e.Specialization?.Specialization ?? "—"}</span>
                  <span>{e.Institution?.Name ?? "—"}</span>
                  <span>{e.Grade ?? "—"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {emp.WorkExperience?.length > 0 && (
          <div className="detail-card detail-card-full">
            <h2>Work Experience</h2>
            <div className="sub-table">
              <div className="sub-table-head">
                <span>Company</span>
                <span>Last Designation</span>
                <span>Duration</span>
                <span>Remarks</span>
              </div>
              {emp.WorkExperience.map((w, i) => (
                <div className="sub-table-row" key={i}>
                  <span>{w.Company?.Name ?? "—"}</span>
                  <span>{w.LastDesignation ?? "—"}</span>
                  <span>
                    {w.DurationMonths ? `${w.DurationMonths} months` : "—"}
                  </span>
                  <span>{w.Remarks ?? "—"}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
