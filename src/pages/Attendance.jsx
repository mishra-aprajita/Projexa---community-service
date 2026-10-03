import { useEffect, useState } from "react";
import { classes, students } from "../data/mockData";
import { supabase } from "../lib/supabase";

const today = () => new Date().toISOString().slice(0, 10);

export default function Attendance() {
  const [classId, setClassId] = useState(classes[0].id);
  const [date, setDate] = useState(today());
  const [edits, setEdits] = useState({}); // changes made by teacher on screen
  const [saved, setSaved] = useState({ key: "", data: {} }); // loaded from Supabase
  const [msg, setMsg] = useState("");

  const group = students.filter((s) => s.classId === classId);
  const key = `${classId}|${date}`;

  // Load saved attendance for this class + date from Supabase
  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    supabase
      .from("attendance")
      .select("student_id,status")
      .eq("class_id", classId)
      .eq("date", date)
      .then(({ data }) => {
        if (cancelled) return;
        setSaved({
          key: `${classId}|${date}`,
          data: Object.fromEntries(
            (data || []).map((r) => [r.student_id, r.status]),
          ),
        });
      });
    return () => {
      cancelled = true;
    };
  }, [classId, date]);

  // edit on screen > saved in DB > default "Present"
  const statusOf = (id) =>
    edits[`${key}|${id}`] ??
    (saved.key === key ? saved.data[id] : undefined) ??
    "Present";

  const toggle = (id, status) => {
    setEdits((e) => ({ ...e, [`${key}|${id}`]: status }));
    setMsg("");
  };
  const markAll = (status) =>
    setEdits((e) => ({
      ...e,
      ...Object.fromEntries(group.map((s) => [`${key}|${s.id}`, status])),
    }));

  const present = group.filter((s) => statusOf(s.id) === "Present").length;

  const save = async () => {
    if (!supabase) {
      setMsg("Demo mode: Supabase keys not added, so this is not saved yet.");
      return;
    }
    const rows = group.map((s) => ({
      student_id: s.id,
      class_id: classId,
      date,
      status: statusOf(s.id),
    }));
    const { error } = await supabase
      .from("attendance")
      .upsert(rows, { onConflict: "student_id,date" });
    setMsg(error ? `Error: ${error.message}` : "Attendance saved.");
  };

  return (
    <div className="page">
      <div className="flex flex-wrap items-end gap-4 mb-5">
        <label className="flex flex-col gap-1 text-sm font-medium">
          Class
          <select
            className="rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          >
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} {c.section}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm font-medium">
          Date
          <input
            type="date"
            className="rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <div className="flex gap-2 ml-auto">
          <button
            className="rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm"
            onClick={() => markAll("Present")}
          >
            Mark all present
          </button>
          <button
            className="rounded-xl border-0 bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
            onClick={save}
          >
            Save attendance
          </button>
        </div>
      </div>

      <p className="pb-3 text-sm font-bold text-slate-500">
        {present} of {group.length} present
      </p>

      <div className="overflow-hidden rounded-3xl border border-violet-100 shadow-md bg-white">
        {group.length === 0 && (
          <p className="p-6 text-center text-slate-500">
            No students in this class.
          </p>
        )}
        {group.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between border-b border-slate-100 px-4 py-3 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <div
                className="avatar avatar-sm"
                style={{ background: s.color }}
              >
                {s.initials}
              </div>
              <div>
                <p className="font-semibold">{s.name}</p>
                <p className="text-xs text-slate-500">{s.id}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {["Present", "Absent"].map((st) => (
                <button
                  key={st}
                  onClick={() => toggle(s.id, st)}
                  className={`rounded-full border-0 px-4 py-1.5 text-sm font-medium ${
                    statusOf(s.id) === st
                      ? st === "Present"
                        ? "bg-green-600 text-white"
                        : "bg-red-500 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {st === "Present" ? "✅ " : "❌ "}{st}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {msg && <p className="pt-4 text-sm text-slate-700">{msg}</p>}
    </div>
  );
}
