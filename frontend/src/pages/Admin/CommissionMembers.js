import React, { useMemo, useState } from "react";
import "./CommissionMembers.css";

const currentMembers = [
  {
    name: "Prof. Dr. Habil Kalkan",
    title: "Komisyon Başkanı",
    email: "habil.kalkan@gtu.edu.tr",
    department: "Bilgisayar Mühendisliği",
  },
  {
    name: "Doç. Dr. Ayşe Yılmaz",
    title: "Komisyon Üyesi",
    email: "ayse.yilmaz@gtu.edu.tr",
    department: "Elektronik Mühendisliği",
  },
  {
    name: "Dr. Öğr. Üyesi Mehmet Demir",
    title: "Komisyon Üyesi",
    email: "mehmet.demir@gtu.edu.tr",
    department: "Endüstri Mühendisliği",
  },
];

const oldMembers = [
  {
    name: "Prof. Dr. Ahmet Kaya",
    title: "Komisyon Başkanı",
    email: "ahmet.kaya@gtu.edu.tr",
    department: "İktisat",
  },
  {
    name: "Doç. Dr. Elif Şahin",
    title: "Komisyon Üyesi",
    email: "elif.sahin@gtu.edu.tr",
    department: "Fizik",
  },
  {
    name: "Dr. Öğr. Üyesi Canan Öz",
    title: "Komisyon Üyesi",
    email: "canan.oz@gtu.edu.tr",
    department: "Harita Mühendisliği",
  },
];

const MemberRow = ({ member }) => (
  <div className="member-item">
    <div className="member-info">
      <div className="member-name">{member.name}</div>
      {member.email && <div className="member-email">{member.email}</div>}
      {member.department && (
        <div className="member-dept">{member.department}</div>
      )}
    </div>
    <div
      className={`member-badge ${
        member.title === "Komisyon Başkanı" ? "badge-lead" : "badge-member"
      }`}
    >
      {member.title}
    </div>
  </div>
);

const CommissionMembers = () => {
  // sort by department alphabetically using Turkish locale (non-destructive)
  const sortedCurrent = [...currentMembers].sort((a, b) =>
    (a.department || "").localeCompare(b.department || "", "tr", {
      sensitivity: "base",
    })
  );

  const sortedOld = [...oldMembers].sort((a, b) =>
    (a.department || "").localeCompare(b.department || "", "tr", {
      sensitivity: "base",
    })
  );

  // filter & search state
  const [deptFilter, setDeptFilter] = useState("all");
  const [query, setQuery] = useState("");

  const departments = useMemo(() => {
    const s = new Set();
    [...currentMembers, ...oldMembers].forEach((m) => {
      if (m.department) s.add(m.department);
    });
    return Array.from(s).sort((a, b) =>
      a.localeCompare(b, "tr", { sensitivity: "base" })
    );
  }, []);

  const matchesQuery = (m, q) => {
    if (!q) return true;
    const lower = q.toLocaleLowerCase("tr");
    return (
      (m.name || "").toLocaleLowerCase("tr").includes(lower) ||
      (m.email || "").toLocaleLowerCase("tr").includes(lower) ||
      (m.department || "").toLocaleLowerCase("tr").includes(lower) ||
      (m.title || "").toLocaleLowerCase("tr").includes(lower)
    );
  };

  const filteredCurrent = sortedCurrent.filter((m) => {
    if (deptFilter !== "all" && m.department !== deptFilter) return false;
    return matchesQuery(m, query);
  });

  const filteredOld = sortedOld.filter((m) => {
    if (deptFilter !== "all" && m.department !== deptFilter) return false;
    return matchesQuery(m, query);
  });

  return (
    <div className="commission-container">
      <header className="commission-header">
        <h2>Komisyon Üye Bilgileri</h2>
        <p className="commission-sub">
          Komisyon başkanı ve üyelerini burada görebilirsiniz.
        </p>
      </header>

      <div className="controls">
        <div className="control-left">
          <label className="control-label">Bölüme göre filtrele:</label>
          <select
            className="dept-select"
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
          >
            <option value="all">Tümü</option>
            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="control-right">
          <input
            placeholder="İsim, e-posta, bölüm ara..."
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <section className="cards-grid">
        <div className="card current-card">
          <h3>Şu Anki Komisyon Üyeleri</h3>
          <div className="member-list">
            {filteredCurrent.map((m) => (
              <MemberRow key={m.name} member={m} />
            ))}
          </div>
        </div>
        <div className="card old-card">
          <h3>Eski Komisyon Üyeleri</h3>
          <div className="member-list simple-list">
            {filteredOld.map((m) => (
              <MemberRow key={m.name} member={m} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CommissionMembers;
