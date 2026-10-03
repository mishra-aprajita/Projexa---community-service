const nav = [
  ["dashboard", "Dashboard", "🏠"],
  ["teachers", "Teachers", "👩‍🏫"],
  ["students", "Students", "🧒"],
  ["attendance", "Attendance", "✅"],
  ["assignments", "Teacher Assignments", "🧩"],
  ["syllabus", "Syllabus", "📖"],
  ["materials", "Academic Materials", "🗂️"],
];
export default function Sidebar({ page, setPage, open, close, admin }) {
  return (
    <>
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <div className="brand">
          <span className="brand-mark">e</span>
          <span>EduWings</span>
        </div>
        <p className="nav-label">MAIN MENU</p>
        <nav>
          {nav.map(([id, label, icon]) => (
            <button
              key={id}
              className={page === id ? "selected" : ""}
              onClick={() => {
                setPage(id);
                close();
              }}
            >
              <i>{icon}</i>
              {label}
            </button>
          ))}
        </nav>
        <div className="side-help">
          <span>🌈</span>
          <div>
            <strong>Learning is fun!</strong>
            <small>Little steps, big wings</small>
          </div>
        </div>
        <button
          className={`side-user ${page === "profile" ? "selected" : ""}`}
          onClick={() => {
            setPage("profile");
            close();
          }}
          aria-label="Open my profile"
        >
          <div className="avatar">{admin.initials}</div>
          <div>
            <strong>{admin.name}</strong>
            <small>My profile</small>
          </div>
          <span>›</span>
        </button>
      </aside>
      {open && (
        <button
          className="sidebar-scrim"
          onClick={close}
          aria-label="Close navigation"
        />
      )}
    </>
  );
}
