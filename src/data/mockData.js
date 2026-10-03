export const classes = [
  {
    id: "CLS01",
    name: "Nursery",
    section: "A",
    teacherId: "T004",
    strength: 4,
  },
  { id: "CLS02", name: "LKG", section: "A", teacherId: "T001", strength: 4 },
  { id: "CLS03", name: "UKG", section: "A", teacherId: "T002", strength: 4 },
  {
    id: "CLS04",
    name: "Class 1",
    section: "A",
    teacherId: "T003",
    strength: 4,
  },
  {
    id: "CLS05",
    name: "Class 2",
    section: "A",
    teacherId: "T005",
    strength: 4,
  },
];

export const teachers = [
  {
    id: "T001",
    name: "Priya Sharma",
    initials: "PS",
    color: "#dce9ff",
    role: "Early Years Educator",
    subjects: ["English", "Hindi", "Art & Craft"],
    assignedClassId: "CLS02",
    phone: "+91 98765 43210",
    email: "priya.sharma@eduwings.in",
    joined: "12 Jun 2022",
    status: "Active",
  },
  {
    id: "T002",
    name: "Meera Iyer",
    initials: "MI",
    color: "#fbe2df",
    role: "Lead Educator",
    subjects: ["Mathematics", "EVS", "General Knowledge"],
    assignedClassId: "CLS03",
    phone: "+91 98765 43211",
    email: "meera.iyer@eduwings.in",
    joined: "04 Apr 2021",
    status: "Active",
  },
  {
    id: "T003",
    name: "Kavita Verma",
    initials: "KV",
    color: "#e6f3df",
    role: "Primary Teacher",
    subjects: ["English", "Hindi", "EVS"],
    assignedClassId: "CLS04",
    phone: "+91 98765 43212",
    email: "kavita.verma@eduwings.in",
    joined: "19 Jul 2023",
    status: "Active",
  },
  {
    id: "T004",
    name: "Rhea Kapoor",
    initials: "RK",
    color: "#eee5fa",
    role: "Nursery Educator",
    subjects: ["English", "Hindi", "Mathematics", "EVS"],
    assignedClassId: "CLS01",
    phone: "+91 98765 43213",
    email: "rhea.kapoor@eduwings.in",
    joined: "08 Jan 2024",
    status: "Active",
  },
  {
    id: "T005",
    name: "Anita Das",
    initials: "AD",
    color: "#fff0d8",
    role: "Primary Teacher",
    subjects: ["Mathematics", "English", "General Knowledge"],
    assignedClassId: "CLS05",
    phone: "+91 98765 43214",
    email: "anita.das@eduwings.in",
    joined: "21 Aug 2022",
    status: "Inactive",
  },
];

const PASTELS = ["#dce9ff", "#fbe2df", "#e6f3df", "#eee5fa", "#fff0d8", "#dff4f3"];
const teacherOf = (classId) => classes.find((c) => c.id === classId)?.teacherId;
const initialsOf = (name) =>
  name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
const todayText = () =>
  new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
const pad = (n) => String(n).padStart(3, "0");

// [id, name, classId, guardian, dob, enrolled, attendance, status]
const studentRows = [
  ["S001", "Aarav Sharma", "CLS02", "Rohit Sharma", "14 Feb 2021", "02 Apr 2025", "94%", "Active"],
  ["S002", "Anaya Gupta", "CLS02", "Neha Gupta", "28 Oct 2020", "02 Apr 2025", "97%", "Active"],
  ["S003", "Vihaan Singh", "CLS02", "Karan Singh", "05 May 2021", "02 Apr 2025", "91%", "Active"],
  ["S004", "Ira Mehta", "CLS03", "Sneha Mehta", "12 Jan 2020", "02 Apr 2024", "96%", "Active"],
  ["S005", "Arjun Rao", "CLS03", "Manish Rao", "22 Mar 2020", "02 Apr 2024", "93%", "Active"],
  ["S006", "Myra Nair", "CLS03", "Divya Nair", "09 Aug 2020", "02 Apr 2024", "98%", "Active"],
  ["S007", "Advait Jain", "CLS04", "Pooja Jain", "17 Dec 2019", "02 Apr 2024", "95%", "Active"],
  ["S008", "Saanvi Patel", "CLS04", "Nitin Patel", "30 Jun 2019", "02 Apr 2024", "89%", "Active"],
  ["S009", "Kabir Malhotra", "CLS01", "Aditi Malhotra", "03 Sep 2021", "02 Apr 2025", "92%", "Active"],
  ["S010", "Tara Bansal", "CLS05", "Rishi Bansal", "11 Nov 2018", "02 Apr 2024", "87%", "Inactive"],
  ["S011", "Riya Kulkarni", "CLS01", "Mohan Kulkarni", "21 Jan 2022", "02 Apr 2025", "95%", "Active"],
  ["S012", "Zoya Khan", "CLS01", "Imran Khan", "15 Jul 2021", "02 Apr 2025", "90%", "Active"],
  ["S013", "Dev Arora", "CLS01", "Simran Arora", "08 Dec 2021", "02 Apr 2025", "93%", "Active"],
  ["S014", "Mishti Roy", "CLS02", "Arnab Roy", "19 Apr 2021", "02 Apr 2025", "96%", "Active"],
  ["S015", "Krish Pillai", "CLS03", "Anand Pillai", "02 Feb 2020", "02 Apr 2024", "94%", "Active"],
  ["S016", "Navya Reddy", "CLS04", "Sunil Reddy", "25 Sep 2019", "02 Apr 2024", "97%", "Active"],
  ["S017", "Shaurya Bhatia", "CLS04", "Kiran Bhatia", "14 Mar 2019", "02 Apr 2024", "92%", "Active"],
  ["S018", "Aadhya Menon", "CLS05", "Suresh Menon", "06 Jun 2018", "02 Apr 2024", "95%", "Active"],
  ["S019", "Rudra Chauhan", "CLS05", "Vikas Chauhan", "27 Aug 2018", "02 Apr 2024", "90%", "Active"],
  ["S020", "Kiara Sethi", "CLS05", "Anjali Sethi", "13 Jan 2019", "02 Apr 2024", "98%", "Active"],
];

export const students = studentRows.map((r, i) => ({
  id: r[0],
  name: r[1],
  initials: initialsOf(r[1]),
  color: PASTELS[i % PASTELS.length],
  classId: r[2],
  teacherId: teacherOf(r[2]),
  guardian: r[3],
  parentPhone: `+91 99887 11${pad(i + 1)}`,
  dob: r[4],
  enrolled: r[5],
  attendance: r[6],
  status: r[7],
}));

export const admin = {
  name: "Admin",
  role: "School Admin",
  email: "admin@eduwings.in",
  phone: "+91 98765 00000",
  school: "EduWings Early Learning School",
  session: "2026 – 27",
};

// Colour + emoji for every subject (used on chips, cards and accordions)
export const subjectMeta = {
  English: { emoji: "🔤", tone: "blue" },
  Hindi: { emoji: "अ", tone: "orange" },
  Mathematics: { emoji: "🔢", tone: "green" },
  EVS: { emoji: "🌱", tone: "teal" },
  "General Knowledge": { emoji: "🌍", tone: "purple" },
  "Art & Craft": { emoji: "🎨", tone: "pink" },
};
export const allSubjects = Object.keys(subjectMeta);

export const syllabus = {
  Nursery: {
    English: ["Rhymes and sound recognition", "Picture reading", "Pre-writing strokes"],
    Hindi: ["स्वर पहचान", "चित्र देखकर बोलना", "आसान बाल कविताएँ"],
    Mathematics: ["Counting 1–10", "Big and small", "Basic shapes"],
    EVS: ["My family", "Colours around us", "Healthy habits"],
    "Art & Craft": ["Finger painting", "Paper tearing and pasting", "Clay play"],
  },
  LKG: {
    English: ["Alphabet recognition", "Phonics sounds", "Three-letter words"],
    Hindi: ["स्वर परिचय", "चित्र पहचान", "अ से अनार"],
    Mathematics: ["Numbers 1–30", "Comparison", "Patterns and shapes"],
    EVS: ["Plants and animals", "Community helpers", "Good habits"],
    "Art & Craft": ["Colouring within lines", "Paper folding", "Leaf printing"],
  },
  UKG: {
    English: ["Phonics and blends", "Sight words", "Simple sentences"],
    Hindi: ["व्यंजन परिचय", "दो अक्षर के शब्द", "सरल वाक्य"],
    Mathematics: ["Numbers 1–100", "Addition", "Subtraction", "Shapes"],
    EVS: ["Our body", "Seasons", "Transport"],
    "General Knowledge": ["India and symbols", "Amazing animals", "National festivals"],
    "Art & Craft": ["Drawing with shapes", "Origami basics", "Poster colours"],
  },
  "Class 1": {
    English: ["Reading fluency", "Grammar basics", "Creative writing"],
    Hindi: ["वाक्य रचना", "कहानी पठन", "मात्राएँ"],
    Mathematics: ["Place value", "Addition and subtraction", "Measurement"],
    EVS: ["Food and shelter", "Our neighbourhood", "Water and air"],
    "General Knowledge": ["Famous monuments", "Days and months", "Good manners"],
    "Art & Craft": ["Collage making", "Mask making", "Nature drawing"],
  },
  "Class 2": {
    English: ["Comprehension", "Parts of speech", "Writing paragraphs"],
    Hindi: ["व्याकरण", "अनुच्छेद लेखन", "संज्ञा और सर्वनाम"],
    Mathematics: ["Multiplication", "Division", "Time and money"],
    EVS: ["Our earth", "Safety and first aid", "Plants around us"],
    "General Knowledge": ["Our country", "Sports and games", "Inventions"],
    "Art & Craft": ["Craft with waste", "Landscape drawing", "Rangoli designs"],
  },
};

export const materials = [
  { id: "M001", title: "Numbers 1–50 Worksheet", subject: "Mathematics", className: "UKG", type: "Worksheet", date: "18 Sep 2026", teacher: "Meera Iyer" },
  { id: "M002", title: "Addition Practice Set", subject: "Mathematics", className: "UKG", type: "PDF", date: "14 Sep 2026", teacher: "Meera Iyer" },
  { id: "M003", title: "Shapes Around Us", subject: "Mathematics", className: "UKG", type: "Video", date: "10 Sep 2026", teacher: "Meera Iyer" },
  { id: "M004", title: "Phonics Sound Cards", subject: "English", className: "LKG", type: "Image", date: "16 Sep 2026", teacher: "Priya Sharma" },
  { id: "M005", title: "Counting Garden Activity", subject: "Mathematics", className: "LKG", type: "Worksheet", date: "12 Sep 2026", teacher: "Priya Sharma" },
];

// Make sure every class + subject has study material to show
const TYPES = ["Worksheet", "PDF", "Video", "Image"];
const SUFFIX = { Worksheet: "Worksheet", PDF: "Notes", Video: "Video Lesson", Image: "Picture Cards" };
const DATES = ["20 Sep 2026", "17 Sep 2026", "13 Sep 2026", "09 Sep 2026", "05 Sep 2026", "01 Sep 2026"];
let n = materials.length;
Object.entries(syllabus).forEach(([className, subjects]) => {
  const teacherId = classes.find((c) => c.name === className)?.teacherId;
  const teacher = teachers.find((t) => t.id === teacherId)?.name ?? "—";
  Object.entries(subjects).forEach(([subject, topics], si) => {
    const have = materials.filter((m) => m.className === className && m.subject === subject).length;
    if (have >= 2) return;
    topics.slice(0, 3).forEach((topic, ti) => {
      const type = TYPES[(si + ti) % TYPES.length];
      n += 1;
      materials.push({
        id: `M${pad(n)}`,
        title: `${topic} ${SUFFIX[type]}`,
        subject,
        className,
        type,
        date: DATES[(si + ti) % DATES.length],
        teacher,
      });
    });
  });
});

// ---- Demo "add" helpers (kept in memory until Supabase is connected) ----
export const addStudent = ({ name, classId, guardian, parentPhone, dob }) => {
  const i = students.length;
  students.push({
    id: `S${pad(i + 1)}`,
    name,
    initials: initialsOf(name),
    color: PASTELS[i % PASTELS.length],
    classId,
    teacherId: teacherOf(classId),
    guardian: guardian || "—",
    parentPhone: parentPhone || "—",
    dob: dob
      ? new Date(dob).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
      : "—",
    enrolled: todayText(),
    attendance: "—",
    status: "Active",
  });
};

export const addTeacher = ({ name, role, classId, subjects, phone, email }) => {
  const i = teachers.length;
  const id = `T${pad(i + 1)}`;
  if (classId) {
    // give this class to the new teacher
    teachers.forEach((t) => {
      if (t.assignedClassId === classId) t.assignedClassId = "";
    });
    const c = classes.find((x) => x.id === classId);
    if (c) c.teacherId = id;
    students.forEach((s) => {
      if (s.classId === classId) s.teacherId = id;
    });
  }
  teachers.push({
    id,
    name,
    initials: initialsOf(name),
    color: PASTELS[i % PASTELS.length],
    role: role || "Educator",
    subjects: subjects.length ? subjects : ["General"],
    assignedClassId: classId || "",
    phone: phone || "—",
    email: email || "—",
    joined: todayText(),
    status: "Active",
  });
};

export const addMaterial = ({ title, className, subject, type }) => {
  const teacherId = classes.find((c) => c.name === className)?.teacherId;
  materials.unshift({
    id: `M${pad(materials.length + 1)}`,
    title,
    subject,
    className,
    type,
    date: todayText(),
    teacher: teachers.find((t) => t.id === teacherId)?.name ?? "—",
  });
};
