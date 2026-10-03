import Modal from "./Modal";
import { classes, teachers, students, subjectMeta } from "../data/mockData";

const Tile = ({ icon, label, children, wide }) => (
  <div className={`info-tile ${wide ? "wide" : ""}`}>
    <span className="info-icon">{icon}</span>
    <div>
      <small>{label}</small>
      <strong>{children}</strong>
    </div>
  </div>
);

export default function PersonModal({ person, kind, onClose }) {
  const isTeacher = kind === "teacher";
  const assignedClass = classes.find(
    (item) => item.id === person.assignedClassId || item.id === person.classId,
  );
  const className = assignedClass
    ? `${assignedClass.name} ${assignedClass.section}`
    : "Not assigned yet";
  const teacher = teachers.find((item) => item.id === person.teacherId);
  const count = students.filter((item) => item.teacherId === person.id).length;
  const pct = parseInt(person.attendance, 10);

  return (
    <Modal onClose={onClose} title={`${person.name} profile`}>
      <div className="pm-banner">
        <span className="pm-bubble b1" />
        <span className="pm-bubble b2" />
        <span className="pm-bubble b3" />
      </div>
      <div className="pm-head">
        <div className="avatar avatar-xl" style={{ background: person.color }}>
          {person.initials}
        </div>
        <div className="pm-title">
          <p className="eyebrow">
            {isTeacher ? "Educator profile" : "Student information"}
          </p>
          <h2>{person.name}</h2>
          <div className="pm-chips">
            <span className="chip">{person.id}</span>
            <span className="chip">🏫 {className}</span>
            <span
              className={`status ${person.status === "Active" ? "active" : ""}`}
            >
              {person.status}
            </span>
          </div>
        </div>
      </div>

      <div className="pm-body">
        {isTeacher ? (
          <>
            <p className="pm-label">Subjects</p>
            <div className="subjects">
              {person.subjects.map((s) => (
                <span
                  key={s}
                  className={`subject-chip tone-${subjectMeta[s]?.tone ?? "purple"}`}
                >
                  {subjectMeta[s]?.emoji ?? "⭐"} {s}
                </span>
              ))}
            </div>
            <div className="info-grid">
              <Tile icon="🎓" label="Role">
                {person.role}
              </Tile>
              <Tile icon="🧒" label="Students under care">
                {count} students
              </Tile>
              <Tile icon="📞" label="Contact">
                {person.phone}
              </Tile>
              <Tile icon="✉️" label="Email" wide>
                {person.email}
              </Tile>
              <Tile icon="📅" label="Date of joining">
                {person.joined}
              </Tile>
            </div>
          </>
        ) : (
          <>
            <p className="pm-label">Attendance this term</p>
            <div className="meter">
              <div className="meter-bar">
                <i style={{ width: `${Number.isNaN(pct) ? 0 : pct}%` }} />
              </div>
              <strong>{Number.isNaN(pct) ? "No data yet" : person.attendance}</strong>
            </div>
            <div className="info-grid">
              <Tile icon="👩‍🏫" label="Class teacher">
                {teacher?.name ?? "—"}
              </Tile>
              <Tile icon="👨‍👩‍👧" label="Parent / guardian">
                {person.guardian}
              </Tile>
              <Tile icon="📞" label="Parent contact">
                {person.parentPhone}
              </Tile>
              <Tile icon="🎂" label="Date of birth">
                {person.dob}
              </Tile>
              <Tile icon="📅" label="Enrollment date">
                {person.enrolled}
              </Tile>
            </div>
          </>
        )}
      </div>
      <div className="modal-foot">
        <button className="button" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}
