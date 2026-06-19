import { useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import "../styles/EmployeeForm.css";

const EMPTY_EDUCATION = { Course: "", Specialization: "", Institution: "", Grade: "" };
const EMPTY_WORK = { Company: "", LastDesignation: "", DurationMonths: "", Remarks: "" };

function toDateInput(val) {
  if (!val) return "";
  const d = new Date(val);
  if (isNaN(d)) return "";
  return d.toISOString().split("T")[0];
}

export default function EmployeeForm({ initialData, lookups, onSubmit, isEdit }) {
  const [form, setForm] = useState({
    FirstName: initialData?.FirstName ?? "",
    LastName: initialData?.LastName ?? "",
    PersonalEmail: initialData?.PersonalEmail ?? "",
    MobileNumber: initialData?.MobileNumber ?? "",
    DOB: toDateInput(initialData?.DOB),
    Gender: initialData?.Gender ?? "",
    BasicPay: initialData?.BasicPay ?? "",
    PostalAddress: initialData?.PostalAddress ?? "",
    City: initialData?.City ?? "",
    Country: initialData?.Country?._id ?? initialData?.Country ?? "",
    Designation: initialData?.Designation?._id ?? initialData?.Designation ?? "",
    Education: initialData?.Education?.length
      ? initialData.Education.map((e) => ({
          Course: e.Course?._id ?? e.Course ?? "",
          Specialization: e.Specialization?._id ?? e.Specialization ?? "",
          Institution: e.Institution?._id ?? e.Institution ?? "",
          Grade: e.Grade ?? "",
        }))
      : [],
    WorkExperience: initialData?.WorkExperience?.length
      ? initialData.WorkExperience.map((w) => ({
          Company: w.Company?._id ?? w.Company ?? "",
          LastDesignation: w.LastDesignation ?? "",
          DurationMonths: w.DurationMonths ?? "",
          Remarks: w.Remarks ?? "",
        }))
      : [],
  });
  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  // Education helpers
  const addEducation = () =>
    setForm((f) => ({ ...f, Education: [...f.Education, { ...EMPTY_EDUCATION }] }));
  const removeEducation = (i) =>
    setForm((f) => ({ ...f, Education: f.Education.filter((_, idx) => idx !== i) }));
  const setEdu = (i, field, value) =>
    setForm((f) => {
      const edu = [...f.Education];
      edu[i] = { ...edu[i], [field]: value };
      return { ...f, Education: edu };
    });

  // WorkExperience helpers
  const addWork = () =>
    setForm((f) => ({ ...f, WorkExperience: [...f.WorkExperience, { ...EMPTY_WORK }] }));
  const removeWork = (i) =>
    setForm((f) => ({ ...f, WorkExperience: f.WorkExperience.filter((_, idx) => idx !== i) }));
  const setWork = (i, field, value) =>
    setForm((f) => {
      const work = [...f.WorkExperience];
      work[i] = { ...work[i], [field]: value };
      return { ...f, WorkExperience: work };
    });

  const validate = () => {
    const errs = {};
    if (!form.FirstName.trim()) errs.FirstName = "First name is required.";
    else if (form.FirstName.trim().length < 3) errs.FirstName = "Min 3 characters.";
    else if (!/^[A-Za-z]+$/.test(form.FirstName.trim())) errs.FirstName = "Only alphabets allowed.";
    if (!form.LastName.trim()) errs.LastName = "Last name is required.";
    else if (!/^[A-Za-z]+$/.test(form.LastName.trim())) errs.LastName = "Only alphabets allowed.";
    if (!form.PersonalEmail.trim()) errs.PersonalEmail = "Email is required.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    const payload = {
      ...form,
      BasicPay: form.BasicPay !== "" ? Number(form.BasicPay) : undefined,
      Education: form.Education.map((ed) => ({
        ...ed,
        Grade: ed.Grade !== "" ? Number(ed.Grade) : undefined,
        Course: ed.Course || undefined,
        Specialization: ed.Specialization || undefined,
        Institution: ed.Institution || undefined,
      })),
      WorkExperience: form.WorkExperience.map((w) => ({
        ...w,
        DurationMonths: w.DurationMonths !== "" ? Number(w.DurationMonths) : undefined,
        Company: w.Company || undefined,
      })),
      Country: form.Country || undefined,
      Designation: form.Designation || undefined,
      DOB: form.DOB || undefined,
    };

    onSubmit(payload);
  };

  const { countries = [], designations = [], courses = [], specializations = [], institutions = [], companies = [] } = lookups ?? {};

  return (
    <form className="emp-form" onSubmit={handleSubmit} noValidate>

      {/* ── Personal Info ── */}
      <section className="form-section">
        <h2 className="section-title">Personal Information</h2>
        <div className="form-grid">
          <div className={`field-group ${errors.FirstName ? "has-error" : ""}`}>
            <label>First Name *</label>
            <input value={form.FirstName} onChange={(e) => set("FirstName", e.target.value)} placeholder="e.g. John" />
            {errors.FirstName && <span className="field-error">{errors.FirstName}</span>}
          </div>
          <div className={`field-group ${errors.LastName ? "has-error" : ""}`}>
            <label>Last Name *</label>
            <input value={form.LastName} onChange={(e) => set("LastName", e.target.value)} placeholder="e.g. Doe" />
            {errors.LastName && <span className="field-error">{errors.LastName}</span>}
          </div>
          <div className="field-group">
            <label>Date of Birth</label>
            <input type="date" value={form.DOB} onChange={(e) => set("DOB", e.target.value)} />
          </div>
          <div className="field-group">
            <label>Gender</label>
            <select value={form.Gender} onChange={(e) => set("Gender", e.target.value)}>
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="form-section">
        <h2 className="section-title">Contact Details</h2>
        <div className="form-grid">
          <div className={`field-group ${errors.PersonalEmail ? "has-error" : ""}`}>
            <label>Personal Email *</label>
            <input type="email" value={form.PersonalEmail} onChange={(e) => set("PersonalEmail", e.target.value)} placeholder="john@example.com" />
            {errors.PersonalEmail && <span className="field-error">{errors.PersonalEmail}</span>}
          </div>
          <div className="field-group">
            <label>Mobile Number</label>
            <input value={form.MobileNumber} onChange={(e) => set("MobileNumber", e.target.value)} placeholder="+91 9876543210" />
          </div>
          <div className="field-group field-full">
            <label>Postal Address</label>
            <input value={form.PostalAddress} onChange={(e) => set("PostalAddress", e.target.value)} placeholder="Street / Building / Area" />
          </div>
          <div className="field-group">
            <label>City</label>
            <input value={form.City} onChange={(e) => set("City", e.target.value)} placeholder="e.g. Kochi" />
          </div>
          <div className="field-group">
            <label>Country</label>
            <select value={form.Country} onChange={(e) => set("Country", e.target.value)}>
              <option value="">Select country</option>
              {countries.map((c) => <option key={c._id} value={c._id}>{c.Name}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* ── Job ── */}
      <section className="form-section">
        <h2 className="section-title">Job Details</h2>
        <div className="form-grid">
          <div className="field-group">
            <label>Designation</label>
            <select value={form.Designation} onChange={(e) => set("Designation", e.target.value)}>
              <option value="">Select designation</option>
              {designations.map((d) => <option key={d._id} value={d._id}>{d.Name}</option>)}
            </select>
          </div>
          <div className="field-group">
            <label>Basic Pay (₹)</label>
            <input type="number" min="0" value={form.BasicPay} onChange={(e) => set("BasicPay", e.target.value)} placeholder="e.g. 50000" />
          </div>
        </div>
      </section>

      {/* ── Education ── */}
      <section className="form-section">
        <div className="section-header-row">
          <h2 className="section-title">Education</h2>
          <button type="button" className="btn-add-row" onClick={addEducation}>
            <FiPlus /> Add
          </button>
        </div>

        {form.Education.length === 0 && (
          <p className="sub-empty">No education records yet. Click Add to include one.</p>
        )}

        {form.Education.map((edu, i) => (
          <div className="sub-section" key={i}>
            <div className="sub-section-head">
              <span>Education #{i + 1}</span>
              <button type="button" className="btn-remove-row" onClick={() => removeEducation(i)}>
                <FiTrash2 />
              </button>
            </div>
            <div className="form-grid">
              <div className="field-group">
                <label>Course</label>
                <select value={edu.Course} onChange={(e) => setEdu(i, "Course", e.target.value)}>
                  <option value="">Select course</option>
                  {courses.map((c) => <option key={c._id} value={c._id}>{c.Name}</option>)}
                </select>
              </div>
              <div className="field-group">
                <label>Specialization</label>
                <select value={edu.Specialization} onChange={(e) => setEdu(i, "Specialization", e.target.value)}>
                  <option value="">Select specialization</option>
                  {specializations.map((s) => <option key={s._id} value={s._id}>{s.Specialization}</option>)}
                </select>
              </div>
              <div className="field-group">
                <label>Institution</label>
                <select value={edu.Institution} onChange={(e) => setEdu(i, "Institution", e.target.value)}>
                  <option value="">Select institution</option>
                  {institutions.map((ins) => <option key={ins._id} value={ins._id}>{ins.Name}</option>)}
                </select>
              </div>
              <div className="field-group">
                <label>Grade / CGPA</label>
                <input type="number" step="0.01" min="0" max="100" value={edu.Grade} onChange={(e) => setEdu(i, "Grade", e.target.value)} placeholder="e.g. 8.5" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Work Experience ── */}
      <section className="form-section">
        <div className="section-header-row">
          <h2 className="section-title">Work Experience</h2>
          <button type="button" className="btn-add-row" onClick={addWork}>
            <FiPlus /> Add
          </button>
        </div>

        {form.WorkExperience.length === 0 && (
          <p className="sub-empty">No work experience yet. Click Add to include one.</p>
        )}

        {form.WorkExperience.map((work, i) => (
          <div className="sub-section" key={i}>
            <div className="sub-section-head">
              <span>Experience #{i + 1}</span>
              <button type="button" className="btn-remove-row" onClick={() => removeWork(i)}>
                <FiTrash2 />
              </button>
            </div>
            <div className="form-grid">
              <div className="field-group">
                <label>Company</label>
                <select value={work.Company} onChange={(e) => setWork(i, "Company", e.target.value)}>
                  <option value="">Select company</option>
                  {companies.map((c) => <option key={c._id} value={c._id}>{c.Name}</option>)}
                </select>
              </div>
              <div className="field-group">
                <label>Last Designation</label>
                <input value={work.LastDesignation} onChange={(e) => setWork(i, "LastDesignation", e.target.value)} placeholder="e.g. Senior Developer" />
              </div>
              <div className="field-group">
                <label>Duration (months)</label>
                <input type="number" min="0" value={work.DurationMonths} onChange={(e) => setWork(i, "DurationMonths", e.target.value)} placeholder="e.g. 24" />
              </div>
              <div className="field-group field-full">
                <label>Remarks</label>
                <input value={work.Remarks} onChange={(e) => setWork(i, "Remarks", e.target.value)} placeholder="Any notes about this role…" />
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="form-footer">
        <button type="submit" className="btn-submit">
          {isEdit ? "Save Changes" : "Add Employee"}
        </button>
      </div>
    </form>
  );
}
