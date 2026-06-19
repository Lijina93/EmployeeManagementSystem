import { useState, useEffect } from "react";
import { getEmployees, deleteEmployee } from "../api/employeeApi";
import EmployeeCard from "../components/EmployeeCard";
import Pagination from "../components/Pagination";
import ConfirmDialog from "../components/ConfirmDialog";
import Toast from "../components/Toast";
import { FiSearch, FiUsers, FiChevronUp, FiChevronDown } from "react-icons/fi";
import "../styles/EmployeeList.css";

const SORT_FIELDS = [
  { label: "First Name", value: "FirstName" },
  { label: "Last Name", value: "LastName" },
  { label: "City", value: "City" },
  { label: "Basic Pay", value: "BasicPay" },
];

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("FirstName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [deleteId, setDeleteId] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await getEmployees(page, 10, sortField, sortOrder);
        const data = res.data;

        const list =
          data.employees ?? data.data ?? (Array.isArray(data) ? data : []);

        const pages =
          data.totalPages ??
          data.pagination?.totalPages ??
          Math.ceil((data.total ?? list.length) / 10) ??
          1;

        setEmployees(list);
        setTotalPages(pages);
        setTotal(data.total ?? list.length);
      } catch {
        setToast({ message: "Failed to load employees.", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [page, sortField, sortOrder]);

  // Reset to page 1 when sort changes
  const handleSortField = (f) => {
    setSortField(f);
    setPage(1);
  };
  const toggleSortOrder = () => {
    setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    setPage(1);
  };

  const handleDelete = async () => {
    try {
      await deleteEmployee(deleteId);
      setToast({ message: "Employee deleted successfully.", type: "success" });
      setDeleteId(null);
      // Refresh the current page
      const res = await getEmployees(page, 10, sortField, sortOrder);
      const data = res.data;
      const list = data.data ?? [];
      setEmployees(list);
    } catch {
      setToast({ message: "Delete failed. Please try again.", type: "error" });
      setDeleteId(null);
    }
  };

  const filtered = employees.filter((e) => {
    const q = search.toLowerCase();
    return (
      e.FirstName?.toLowerCase().includes(q) ||
      e.LastName?.toLowerCase().includes(q) ||
      e.PersonalEmail?.toLowerCase().includes(q) ||
      e.City?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="list-page">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      {deleteId && (
        <ConfirmDialog
          message="Are you sure you want to delete this employee? This cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
        />
      )}

      <div className="list-header">
        <div className="list-title">
          <FiUsers className="title-icon" />
          <div>
            <h1>Employees</h1>
            <p>{total} total records</p>
          </div>
        </div>

        <div className="list-controls">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name, email, city…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="sort-controls">
            <select
              value={sortField}
              onChange={(e) => handleSortField(e.target.value)}
              className="sort-select"
            >
              {SORT_FIELDS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
            <button
              className="sort-order-btn"
              onClick={toggleSortOrder}
              title={sortOrder === "asc" ? "Ascending" : "Descending"}
            >
              {sortOrder === "asc" ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton-card" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🗂️</span>
          <p>No employees found{search ? ` for "${search}"` : ""}.</p>
        </div>
      ) : (
        <div className="emp-grid">
          {filtered.map((emp) => (
            <EmployeeCard key={emp._id} employee={emp} onDelete={setDeleteId} />
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
