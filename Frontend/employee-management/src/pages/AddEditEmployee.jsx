import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployeeById,
  createEmployee,
  updateEmployee,
  getCountries,
  getDesignations,
  getCourses,
  getSpecializations,
  getInstitutions,
  getCompanies,
} from "../api/employeeApi";
import EmployeeForm from "../components/EmployeeForm";
import Toast from "../components/Toast";
import "../styles/AddEditEmployee.css";

export default function AddEditEmployee() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [lookups, setLookups] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const [
          countries,
          designations,
          courses,
          specializations,
          institutions,
          companies,
        ] = await Promise.all([
          getCountries(),
          getDesignations(),
          getCourses(),
          getSpecializations(),
          getInstitutions(),
          getCompanies(),
        ]);

        setLookups({
          countries: countries.data?.data ?? [],
          designations: designations.data?.data ?? [],
          courses: courses.data?.data ?? [],
          specializations: specializations.data?.data ?? [],
          institutions: institutions.data?.data ?? [],
          companies: companies.data?.data ?? [],
        });

        if (isEdit) {
          const empRes = await getEmployeeById(id);
          setInitialData(empRes.data?.data);
        }
      } catch {
        setToast({ message: "Failed to load required data.", type: "error" });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, isEdit]);

  const handleSubmit = async (formData) => {
    try {
      if (isEdit) {
        await updateEmployee(id, formData);
        setToast({
          message: "Employee updated successfully.",
          type: "success",
        });
      } else {
        await createEmployee(formData);
        setToast({ message: "Employee added successfully.", type: "success" });
      }
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      const msg =
        err.response?.data?.error ??
        err.response?.data?.message ??
        "Save failed. Check the form and try again.";
      setToast({ message: msg, type: "error" });
    }
  };

  return (
    <div className="addedit-page">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="addedit-header">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
        <h1>{isEdit ? "Edit Employee" : "Add New Employee"}</h1>
      </div>

      {loading ? (
        <div className="form-skeleton" />
      ) : (
        <EmployeeForm
          initialData={initialData}
          lookups={lookups}
          onSubmit={handleSubmit}
          isEdit={isEdit}
        />
      )}
    </div>
  );
}
