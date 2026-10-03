import { useState } from "react";
import { classes, teachers, students, allSubjects, subjectMeta } from "../data/mockData";

export default function Profile({ admin, setAdmin, toast }) {
  const [form, setForm] = useState({
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
  });
  const set = (k, v) => setForm((x) => ({ ...x, [k]: v }));
  const save = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return toast("Name cannot be empty");
    setAdmin((a) => ({ ...a, ...form, name: form.name.trim() }));
    toast("Profile updated ✨");
  };

  const stats = [
    ["🧒", students.length, "Students", "blue"],
    ["👩‍🏫", teachers.length, "Teachers", "orange"],
    ["🏫", classes.length, "Classes", "green"],
  ];

  return (
    <div className="page profile-page">
      <section className="profile-hero">
        <span className="pm-bubble b1" />
        <span className="pm-bubble b2" />
        <div className="avatar avatar-xl">{admin.initials}</div>
        <div>
          <p className="eyebrow light">MY PROFILE</p>
          <h2>{admin.name}</h2>
          <p>
            {admin.role} · {admin.school}
          </p>
        </div>
        <div className="profile-stats">
          {stats.map(([icon, n, label, tone]) => (
            <div key={label} className={`mini-stat tone-${tone}`}>
              <span>{icon}</span>
              <strong>{n}</strong>
              <small>{label}</small>
            </div>
          ))}
        </div>
      </section>

      <div className="profile-grid">
        <form className="panel" onSubmit={save}>
          <div className="panel-head">
            <div>
              <h3>Personal details</h3>
              <p>Update how your name and contact appear</p>
            </div>
          </div>
          <div className="form-body">
            <label className="field">
              <span>Full name</span>
              <input value={form.name} onChange={(e) => set("name", e.target.value)} />
            </label>
            <div className="form-row">
              <label className="field">
                <span>Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </label>
              <label className="field">
                <span>Phone</span>
                <input value={form.phone} onChange={(e) => set("phone", e.target.value)} />
              </label>
            </div>
            <label className="field">
              <span>Role</span>
              <input value={admin.role} disabled />
            </label>
          </div>
          <div className="modal-foot left">
            <button type="submit" className="button">
              Save changes
            </button>
          </div>
        </form>

        <div className="profile-side">
          <section className="panel">
            <div className="panel-head">
              <div>
                <h3>School details</h3>
                <p>Academic session {admin.session}</p>
              </div>
            </div>
            <div className="detail-row">
              <span>School</span>
              <strong>{admin.school}</strong>
            </div>
            <div className="detail-row">
              <span>Classes</span>
              <strong>Nursery to Class 2</strong>
            </div>
            <p className="pm-label">Subjects taught</p>
            <div className="subjects">
              {allSubjects.map((s) => (
                <span key={s} className={`subject-chip tone-${subjectMeta[s].tone}`}>
                  {subjectMeta[s].emoji} {s}
                </span>
              ))}
            </div>
          </section>

          <section className="panel">
            <div className="panel-head">
              <div>
                <h3>Account</h3>
                <p>Login and security</p>
              </div>
            </div>
            <div className="account-actions">
              <button
                className="button plain"
                onClick={() => toast("Password change arrives with Supabase login")}
              >
                🔒 Change password
              </button>
              <button
                className="button plain danger"
                onClick={() => toast("Sign out arrives with Supabase login")}
              >
                ↪ Sign out
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
