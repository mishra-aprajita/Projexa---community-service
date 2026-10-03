import { useState } from "react";
import Modal from "./Modal";
import { classes, syllabus, allSubjects, subjectMeta } from "../data/mockData";

const Field = ({ label, error, children }) => (
  <label className={`field ${error ? "has-error" : ""}`}>
    <span>{label}</span>
    {children}
    {error && <em>{error}</em>}
  </label>
);

const COPY = {
  student: ["🧒", "Add a new student", "Welcome a new little learner to the class."],
  teacher: ["👩‍🏫", "Add a new teacher", "Add an educator to your teaching team."],
  material: ["🗂️", "Add study material", "Share a worksheet, video or notes with a class."],
};

export default function AddModal({ kind, onClose, onSave }) {
  const [f, setF] = useState({
    name: "",
    classId: classes[0].id,
    guardian: "",
    phone: "",
    dob: "",
    role: "",
    email: "",
    subjects: [],
    assignClass: "",
    title: "",
    className: Object.keys(syllabus)[0],
    subject: "English",
    type: "Worksheet",
  });
  const [tried, setTried] = useState(false);
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const [icon, title, sub] = COPY[kind];

  const mainValue = kind === "material" ? f.title : f.name;
  const error = tried && !mainValue.trim() ? "This field is required" : "";

  const toggleSubject = (s) =>
    set(
      "subjects",
      f.subjects.includes(s) ? f.subjects.filter((x) => x !== s) : [...f.subjects, s],
    );

  const submit = (e) => {
    e.preventDefault();
    setTried(true);
    if (!mainValue.trim()) return;
    if (kind === "student")
      onSave(kind, {
        name: f.name.trim(),
        classId: f.classId,
        guardian: f.guardian.trim(),
        parentPhone: f.phone.trim(),
        dob: f.dob,
      });
    if (kind === "teacher")
      onSave(kind, {
        name: f.name.trim(),
        role: f.role.trim(),
        classId: f.assignClass,
        subjects: f.subjects,
        phone: f.phone.trim(),
        email: f.email.trim(),
      });
    if (kind === "material")
      onSave(kind, {
        title: f.title.trim(),
        className: f.className,
        subject: f.subject,
        type: f.type,
      });
  };

  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={submit} noValidate>
        <div className="form-head">
          <span className="form-icon">{icon}</span>
          <div>
            <h2>{title}</h2>
            <p>{sub}</p>
          </div>
        </div>

        <div className="form-body">
          {kind === "student" && (
            <>
              <Field label="Student name *" error={error}>
                <input
                  value={f.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  autoFocus
                />
              </Field>
              <div className="form-row">
                <Field label="Class">
                  <select
                    value={f.classId}
                    onChange={(e) => set("classId", e.target.value)}
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} {c.section}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Date of birth">
                  <input
                    type="date"
                    value={f.dob}
                    onChange={(e) => set("dob", e.target.value)}
                  />
                </Field>
              </div>
              <div className="form-row">
                <Field label="Parent / guardian">
                  <input
                    value={f.guardian}
                    onChange={(e) => set("guardian", e.target.value)}
                    placeholder="Parent name"
                  />
                </Field>
                <Field label="Parent phone">
                  <input
                    value={f.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </Field>
              </div>
            </>
          )}

          {kind === "teacher" && (
            <>
              <Field label="Teacher name *" error={error}>
                <input
                  value={f.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  autoFocus
                />
              </Field>
              <div className="form-row">
                <Field label="Role">
                  <input
                    value={f.role}
                    onChange={(e) => set("role", e.target.value)}
                    placeholder="e.g. Primary Teacher"
                  />
                </Field>
                <Field label="Assign to class (optional)">
                  <select
                    value={f.assignClass}
                    onChange={(e) => set("assignClass", e.target.value)}
                  >
                    <option value="">Not assigned yet</option>
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name} {c.section}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
              <div className="field">
                <span>Subjects</span>
                <div className="pick-row">
                  {allSubjects.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => toggleSubject(s)}
                      className={`subject-chip tone-${subjectMeta[s].tone} ${
                        f.subjects.includes(s) ? "on" : ""
                      }`}
                    >
                      {subjectMeta[s].emoji} {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-row">
                <Field label="Phone">
                  <input
                    value={f.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={f.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="name@eduwings.in"
                  />
                </Field>
              </div>
            </>
          )}

          {kind === "material" && (
            <>
              <Field label="Title *" error={error}>
                <input
                  value={f.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. Numbers 1–20 Worksheet"
                  autoFocus
                />
              </Field>
              <div className="form-row">
                <Field label="Class">
                  <select
                    value={f.className}
                    onChange={(e) => {
                      set("className", e.target.value);
                      set("subject", Object.keys(syllabus[e.target.value])[0]);
                    }}
                  >
                    {Object.keys(syllabus).map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Subject">
                  <select
                    value={f.subject}
                    onChange={(e) => set("subject", e.target.value)}
                  >
                    {Object.keys(syllabus[f.className]).map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Type">
                <select value={f.type} onChange={(e) => set("type", e.target.value)}>
                  {["Worksheet", "PDF", "Video", "Image"].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <p className="form-note">
                📎 File upload will be connected with Supabase Storage.
              </p>
            </>
          )}
        </div>

        <div className="modal-foot">
          <p className="form-note">Saved for this session. Supabase will make it permanent.</p>
          <button type="button" className="button plain" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="button">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
