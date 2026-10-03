import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import PersonModal from "./components/PersonModal";
import AddModal from "./components/AddModal";
import Modal from "./components/Modal";
import Attendance from "./pages/Attendance";
import Profile from "./pages/Profile";
import {
  classes,
  teachers,
  students,
  syllabus,
  materials,
  admin as adminSeed,
  subjectMeta,
  addStudent,
  addTeacher,
  addMaterial,
} from "./data/mockData";

const today = new Date().toLocaleDateString("en-IN", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const titles = {
  dashboard: ["Dashboard", today],
  teachers: ["Teachers", "Manage your teaching team"],
  students: ["Students", "Student directory and records"],
  attendance: ["Attendance", "Mark daily attendance by class"],
  assignments: ["Teacher Assignments", "See each educator’s student group"],
  syllabus: ["Syllabus", "Academic plan by class and subject"],
  materials: ["Academic Materials", "Resources shared with your school"],
  profile: ["My Profile", "Your account and school details"],
};

const typeMeta = {
  Worksheet: { emoji: "📝", tone: "orange" },
  PDF: { emoji: "📄", tone: "pink" },
  Video: { emoji: "▶️", tone: "purple" },
  Image: { emoji: "🖼️", tone: "teal" },
};

const initialsOf = (name) =>
  name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase() || "AD";
const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
const greeting = () => {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
};

const Avatar = ({ p, small = false }) => (
  <div
    className={`avatar ${small ? "avatar-sm" : ""}`}
    style={{ background: p.color }}
  >
    {p.initials}
  </div>
);
const SubjectChip = ({ s }) => (
  <span className={`subject-chip tone-${subjectMeta[s]?.tone ?? "purple"}`}>
    {subjectMeta[s]?.emoji ?? "⭐"} {s}
  </span>
);
const cls = (id) => {
  const c = classes.find((x) => x.id === id);
  return c ? `${c.name} ${c.section}` : "Not assigned";
};
const Btn = ({ children, onClick, plain = false }) => (
  <button onClick={onClick} className={`button ${plain ? "plain" : ""}`}>
    {children}
  </button>
);

function Dashboard({ go, add, admin }) {
  const present = Math.round(students.length * 0.9);
  const stats = [
    [String(students.length), "Total Students", "Little learners enrolled", "🧒", "blue"],
    [String(teachers.length), "Total Teachers", "Caring educators", "👩‍🏫", "orange"],
    [String(classes.length), "Total Classes", "Nursery to Class 2", "🏫", "green"],
    [
      `${Math.round((present / students.length) * 100)}%`,
      "Today's Attendance",
      `${present} of ${students.length} present`,
      "✅",
      "purple",
    ],
  ];
  return (
    <div className="page dashboard">
      <section className="hero">
        <span className="pm-bubble b1" />
        <span className="pm-bubble b2" />
        <span className="pm-bubble b3" />
        <div>
          <p className="eyebrow light">WELCOME BACK</p>
          <h2>
            {greeting()}, {admin.name} 👋
          </h2>
          <p>Here’s a quick look at what’s happening at EduWings today.</p>
          <div className="hero-actions">
            <button className="button light" onClick={() => go("attendance")}>
              ✅ Mark attendance
            </button>
            <button className="button ghost" onClick={() => go("materials")}>
              🗂️ Study materials
            </button>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          🎒
        </div>
      </section>

      <div className="stat-grid">
        {stats.map((x) => (
          <article className={`stat-card tone-${x[4]}`} key={x[1]}>
            <div className="stat-icon">{x[3]}</div>
            <p>{x[1]}</p>
            <h2>{x[0]}</h2>
            <small>{x[2]}</small>
          </article>
        ))}
      </div>

      <div className="content-grid">
        <section className="panel activity">
          <div className="panel-head">
            <div>
              <h3>Recent teacher activity</h3>
              <p>A quick look at today’s updates</p>
            </div>
            <button className="text-button" onClick={() => go("teachers")}>
              View all
            </button>
          </div>
          {[
            ["Updated LKG A weekly plan", "10 min ago"],
            ["Added Numbers 1–50 Worksheet", "45 min ago"],
            ["Marked Class 1 attendance", "1 hr ago"],
          ].map(([action, time], i) => (
            <div className="activity-row" key={action}>
              <Avatar p={teachers[i]} small />
              <div>
                <strong>{teachers[i].name}</strong>
                <p>{action}</p>
              </div>
              <time>{time}</time>
            </div>
          ))}
        </section>
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Class overview</h3>
              <p>All active classrooms</p>
            </div>
            <button className="text-button" onClick={() => go("assignments")}>
              View classes
            </button>
          </div>
          {classes.map((c, i) => (
            <div className="class-row" key={c.id}>
              <i className={`class-dot dot-${i % 5}`} />
              <div>
                <strong>
                  {c.name} {c.section}
                </strong>
                <p>{teachers.find((t) => t.id === c.teacherId)?.name}</p>
              </div>
              <span>
                {plural(students.filter((s) => s.classId === c.id).length, "student")}
              </span>
            </div>
          ))}
        </section>
      </div>
      <div className="content-grid lower">
        <section className="panel">
          <div className="panel-head">
            <div>
              <h3>Recent student additions</h3>
              <p>Newly enrolled learners</p>
            </div>
            <button className="text-button" onClick={() => go("students")}>
              View all
            </button>
          </div>
          <div className="student-mini-grid">
            {students
              .slice(-4)
              .reverse()
              .map((s) => (
                <div className="student-mini" key={s.id}>
                  <Avatar p={s} />
                  <strong>{s.name}</strong>
                  <small>{cls(s.classId)}</small>
                </div>
              ))}
          </div>
        </section>
        <section className="quick-actions">
          <p className="eyebrow light">GET STARTED</p>
          <h3>Quick actions</h3>
          <p>Keep your school information current.</p>
          <div>
            <Btn onClick={() => add("student")}>＋ Add Student</Btn>
            <Btn plain onClick={() => add("teacher")}>
              ＋ Add Teacher
            </Btn>
            <Btn plain onClick={() => go("attendance")}>
              ✅ Mark Attendance
            </Btn>
            <Btn plain onClick={() => go("materials")}>
              🗂️ Manage Materials
            </Btn>
          </div>
        </section>
      </div>
    </div>
  );
}

function Teachers({ pick, add }) {
  const [q, setQ] = useState("");
  const [f, setF] = useState("All");
  const items = teachers.filter(
    (t) =>
      (t.name.toLowerCase().includes(q.toLowerCase()) ||
        t.id.toLowerCase().includes(q.toLowerCase())) &&
      (f === "All" || t.status === f),
  );
  return (
    <div className="page">
      <div className="toolbar">
        <div className="search">
          🔍
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search teachers by name or ID"
          />
        </div>
        <select value={f} onChange={(e) => setF(e.target.value)}>
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <Btn onClick={() => add("teacher")}>＋ Add Teacher</Btn>
      </div>
      <p className="result-note">Showing {plural(items.length, "educator")}</p>
      <div className="teacher-grid">
        {items.map((t) => (
          <button
            className="teacher-card"
            key={t.id}
            onClick={() => pick(t, "teacher")}
          >
            <div className="teacher-card-top" style={{ background: t.color }}>
              <span
                className={`status ${t.status === "Active" ? "active" : ""}`}
              >
                {t.status}
              </span>
            </div>
            <div className="teacher-card-body">
              <Avatar p={t} />
              <h3>{t.name}</h3>
              <p className="id-label">{t.id}</p>
              <div className="teacher-meta">
                <span>🏫 {cls(t.assignedClassId)}</span>
                <span>🎓 {t.role}</span>
                <span>📞 {t.phone}</span>
              </div>
              <div className="subjects">
                {t.subjects.map((x) => (
                  <SubjectChip key={x} s={x} />
                ))}
              </div>
              <span className="view-profile">
                View profile <b>→</b>
              </span>
            </div>
          </button>
        ))}
        {!items.length && (
          <div className="empty-state">
            <span>🔍</span>
            <h3>No teachers found</h3>
            <p>Try a different name or filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function Students({ pick, add }) {
  const [q, setQ] = useState("");
  const [c, setC] = useState("All classes");
  const [t, setT] = useState("All teachers");
  const items = students.filter(
    (s) =>
      (s.name.toLowerCase().includes(q.toLowerCase()) ||
        s.id.toLowerCase().includes(q.toLowerCase())) &&
      (c === "All classes" || s.classId === c) &&
      (t === "All teachers" || s.teacherId === t),
  );
  return (
    <div className="page">
      <div className="toolbar student-toolbar">
        <div className="search">
          🔍
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search student by name or ID"
          />
        </div>
        <select value={c} onChange={(e) => setC(e.target.value)}>
          <option>All classes</option>
          {classes.map((x) => (
            <option value={x.id} key={x.id}>
              {x.name} {x.section}
            </option>
          ))}
        </select>
        <select value={t} onChange={(e) => setT(e.target.value)}>
          <option>All teachers</option>
          {teachers.map((x) => (
            <option value={x.id} key={x.id}>
              {x.name}
            </option>
          ))}
        </select>
        <Btn onClick={() => add("student")}>＋ Add Student</Btn>
      </div>
      <p className="result-note">Showing {plural(items.length, "student")}</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Student ID</th>
              <th>Class</th>
              <th>Teacher</th>
              <th>Parent / Guardian</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => (
              <tr key={s.id} onClick={() => pick(s, "student")}>
                <td>
                  <div className="table-person">
                    <Avatar p={s} small />
                    <strong>{s.name}</strong>
                  </div>
                </td>
                <td>{s.id}</td>
                <td>
                  <span className="chip">{cls(s.classId)}</span>
                </td>
                <td>{teachers.find((x) => x.id === s.teacherId)?.name}</td>
                <td>{s.guardian}</td>
                <td>
                  <span
                    className={`status ${s.status === "Active" ? "active" : ""}`}
                  >
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
            {!items.length && (
              <tr className="no-hover">
                <td colSpan={6} className="empty-cell">
                  No students found. Try a different search or filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Assignments() {
  const [id, setId] = useState("T001");
  const t = teachers.find((x) => x.id === id),
    group = students.filter((x) => x.teacherId === id);
  return (
    <div className="page assignment-page">
      <section className="assignment-select">
        <p className="eyebrow">SELECT AN EDUCATOR</p>
        <h3>Teacher assignments</h3>
        <div className="teacher-picker">
          {teachers.map((x) => (
            <button
              className={id === x.id ? "picked" : ""}
              onClick={() => setId(x.id)}
              key={x.id}
            >
              <Avatar p={x} small />
              <span>
                {x.name}
                <small>
                  {plural(students.filter((s) => s.teacherId === x.id).length, "student")}
                </small>
              </span>
            </button>
          ))}
        </div>
      </section>
      <section className="assignment-detail">
        <div className="assignment-head">
          <Avatar p={t} />
          <div>
            <p className="eyebrow">TEACHER → CLASS → STUDENTS</p>
            <h2>{t.name}</h2>
            <p>
              {t.role} · {cls(t.assignedClassId)}
            </p>
          </div>
          <span className="student-count">
            {group.length}
            <small>Assigned students</small>
          </span>
        </div>
        <div className="subjects pad">
          {t.subjects.map((x) => (
            <SubjectChip key={x} s={x} />
          ))}
        </div>
        <div className="connection">
          <div className="connection-label">
            <span>🏫</span>
            <div>
              <small>CLASS</small>
              <strong>{cls(t.assignedClassId)}</strong>
            </div>
          </div>
          <div className="connector" />
          {group.length ? (
            <div className="assignment-students">
              {group.map((s) => (
                <div className="assigned-student" key={s.id}>
                  <Avatar p={s} small />
                  <div>
                    <strong>{s.name}</strong>
                    <small>
                      {s.id} · {s.guardian}
                    </small>
                  </div>
                  <span>Active</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="empty">
              No students are currently assigned to this teacher.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

const ClassTabs = ({ value, onChange }) => (
  <div className="class-selector">
    {Object.keys(syllabus).map((x) => (
      <button
        className={x === value ? "current" : ""}
        onClick={() => onChange(x)}
        key={x}
      >
        {x}
      </button>
    ))}
  </div>
);

function Syllabus() {
  const [g, setG] = useState("UKG"),
    [open, setOpen] = useState("English");
  const subs = syllabus[g];
  return (
    <div className="page">
      <div className="page-intro">
        <p className="eyebrow">ACADEMIC FRAMEWORK</p>
        <h2>Class syllabus</h2>
        <p>Choose a class to explore its subject plan and learning topics.</p>
      </div>
      <ClassTabs
        value={g}
        onChange={(x) => {
          setG(x);
          setOpen(Object.keys(syllabus[x])[0]);
        }}
      />
      <section className="syllabus-panel">
        <div className="panel-head">
          <div>
            <p className="eyebrow">CLASS {g.toUpperCase()}</p>
            <h3>{g} curriculum</h3>
          </div>
          <span className="chip">{plural(Object.keys(subs).length, "subject")}</span>
        </div>
        {Object.entries(subs).map(([s, topics]) => (
          <div
            className={`accordion tone-${subjectMeta[s]?.tone ?? "purple"} ${open === s ? "is-open" : ""}`}
            key={s}
          >
            <button onClick={() => setOpen(open === s ? "" : s)}>
              <em className="subject-emoji">{subjectMeta[s]?.emoji ?? "⭐"}</em>
              <span>
                <b>{s}</b>
                <small>{plural(topics.length, "learning topic")}</small>
              </span>
              <b className="acc-toggle">{open === s ? "−" : "+"}</b>
            </button>
            {open === s && (
              <ul>
                {topics.map((x) => (
                  <li key={x}>
                    <span>✓</span>
                    {x}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}

function Materials({ preview, add }) {
  const [g, setG] = useState("UKG"),
    [s, setS] = useState("English");
  const subjects = Object.keys(syllabus[g]);
  const found = materials.filter((x) => x.className === g && x.subject === s);
  const countFor = (sub) =>
    materials.filter((x) => x.className === g && x.subject === sub).length;
  return (
    <div className="page">
      <div className="materials-header">
        <div>
          <p className="eyebrow">RESOURCE LIBRARY</p>
          <h2>Academic materials</h2>
          <p>Organised teaching resources for every classroom.</p>
        </div>
        <Btn onClick={() => add("material")}>＋ Add Material</Btn>
      </div>
      <ClassTabs
        value={g}
        onChange={(x) => {
          setG(x);
          setS(Object.keys(syllabus[x])[0]);
        }}
      />
      <div className="subject-tabs">
        {subjects.map((sub) => (
          <button
            key={sub}
            className={`subject-tab tone-${subjectMeta[sub]?.tone ?? "purple"} ${
              sub === s ? "current" : ""
            }`}
            onClick={() => setS(sub)}
          >
            {subjectMeta[sub]?.emoji} {sub}
            <i>{countFor(sub)}</i>
          </button>
        ))}
      </div>
      <div className="material-grid">
        {found.map((m) => (
          <article
            className={`material-card tone-${typeMeta[m.type]?.tone ?? "purple"}`}
            key={m.id}
          >
            <div className="material-icon">{typeMeta[m.type]?.emoji ?? "📄"}</div>
            <div className="material-type">{m.type}</div>
            <h3>{m.title}</h3>
            <p>
              {m.subject} · {m.className}
            </p>
            <div className="material-footer">
              <small>
                Added {m.date}
                <br />
                by {m.teacher}
              </small>
              <Btn plain onClick={() => preview(m)}>
                View →
              </Btn>
            </div>
          </article>
        ))}
        {!found.length && (
          <div className="empty-state">
            <span>📭</span>
            <h3>No materials yet</h3>
            <p>Resources for this class and subject will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const page = pathname.slice(1) || "dashboard";
  const setPage = (p) => navigate(p === "dashboard" ? "/" : `/${p}`);
  const [menu, setMenu] = useState(false),
    [person, setPerson] = useState(),
    [adding, setAdding] = useState(null),
    [preview, setPreview] = useState(),
    [info, setInfo] = useState(adminSeed),
    [toastMsg, setToastMsg] = useState(""),
    [, setTick] = useState(0);
  const me = { ...info, initials: initialsOf(info.name) };
  const title = titles[page] || titles.dashboard;
  const pick = (p, kind) => setPerson({ p, kind });

  useEffect(() => {
    if (!toastMsg) return;
    const t = setTimeout(() => setToastMsg(""), 2600);
    return () => clearTimeout(t);
  }, [toastMsg]);

  const save = (kind, data) => {
    if (kind === "student") addStudent(data);
    if (kind === "teacher") addTeacher(data);
    if (kind === "material") addMaterial(data);
    setAdding(null);
    setTick((n) => n + 1);
    setToastMsg(
      kind === "student"
        ? "Student added 🎉"
        : kind === "teacher"
          ? "Teacher added 🎉"
          : "Material added 🎉",
    );
  };

  return (
    <div className="app-shell">
      <Sidebar
        page={page}
        setPage={setPage}
        open={menu}
        close={() => setMenu(false)}
        admin={me}
      />
      <main>
        <header>
          <button
            className="menu-button"
            onClick={() => setMenu(true)}
            aria-label="Open navigation"
          >
            ☰
          </button>
          <div>
            <h1>{title[0]}</h1>
            <p>{title[1]}</p>
          </div>
          <div className="header-tools">
            <button
              aria-label="Notifications"
              onClick={() => setToastMsg("You’re all caught up 🎉")}
            >
              🔔<i />
            </button>
            <button
              className="header-avatar"
              onClick={() => setPage("profile")}
              aria-label="Open my profile"
              title="My profile"
            >
              {me.initials}
            </button>
          </div>
        </header>
        <Routes>
          <Route
            path="/"
            element={<Dashboard go={setPage} add={setAdding} admin={me} />}
          />
          <Route path="/teachers" element={<Teachers pick={pick} add={setAdding} />} />
          <Route path="/students" element={<Students pick={pick} add={setAdding} />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/syllabus" element={<Syllabus />} />
          <Route
            path="/materials"
            element={<Materials preview={setPreview} add={setAdding} />}
          />
          <Route
            path="/profile"
            element={<Profile admin={me} setAdmin={setInfo} toast={setToastMsg} />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {person && (
        <PersonModal
          person={person.p}
          kind={person.kind}
          onClose={() => setPerson()}
        />
      )}
      {adding && (
        <AddModal kind={adding} onClose={() => setAdding(null)} onSave={save} />
      )}
      {preview && (
        <Modal title="Material preview" onClose={() => setPreview()}>
          <div
            className={`preview-top tone-${typeMeta[preview.type]?.tone ?? "purple"}`}
          >
            <span>{typeMeta[preview.type]?.emoji ?? "📄"}</span>
          </div>
          <div className="preview-body">
            <p className="eyebrow">
              {preview.type} · {preview.subject}
            </p>
            <h2>{preview.title}</h2>
            <p className="preview-meta">
              {preview.className} · added {preview.date} by {preview.teacher}
            </p>
            <div className="preview-sheet">
              <i />
              <i />
              <i />
              <i />
            </div>
            <p className="form-note">
              Real file preview will work once Supabase Storage is connected.
            </p>
          </div>
          <div className="modal-foot">
            <Btn onClick={() => setPreview()}>Close preview</Btn>
          </div>
        </Modal>
      )}
      {toastMsg && <div className="toast">{toastMsg}</div>}
    </div>
  );
}
