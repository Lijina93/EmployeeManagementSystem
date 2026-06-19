import api from "./axios";

// ── Auth ──────────────────────────────────────────────────────────────────────
// POST /api/login  →  { token: string }
export const login = (credentials) => api.post("/login", credentials);

// ── Employees ─────────────────────────────────────────────────────────────────
// GET  /api/employee                         → array of all employees
// GET  /api/employee/:id                     → single employee (populated refs)
// GET  /api/employee/{pageSize}/{pageNum}/{sortField}/{sortOrder}
//      e.g. /api/employee/10/1/FirstName/asc → paginated + sorted
// POST /api/employee                         → create
// PUT  /api/employee/:id                     → update
// DELETE /api/employee/:id                   → delete

export const getEmployees = (
  page = 1,
  limit = 10,
  sortField = "FirstName",
  sortOrder = "asc",
) => api.get(`/employee/${limit}/${page}/${sortField}/${sortOrder}`);

export const getEmployeeById = (id) => api.get(`/employee/${id}`);

export const createEmployee = (data) => api.post("/employee", data);

export const updateEmployee = (id, data) => api.put(`/employee/${id}`, data);

export const deleteEmployee = (id) => api.delete(`/employee/${id}`);

// ── Lookups ───────────────────────────────────────────────────────────────────
// Collection: "Countries"               fields: { Code, Name }
export const getCountries = () => api.get("/countries");

// Collection: "Designations"            fields: { Name }
export const getDesignations = () => api.get("/designations");

// Collection: "Courses"                 fields: { Name }
export const getCourses = () => api.get("/courses");

// Collection: "Specializations"         fields: { Specialization }  ← not "Name"
export const getSpecializations = () => api.get("/specializations");

// Collection: "EducationalInstitutions" fields: { Name, Code }
export const getInstitutions = () => api.get("/institutions");

// Collection: "Companies"               fields: { Name, Code }
export const getCompanies = () => api.get("/companies");
