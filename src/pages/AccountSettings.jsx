import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BackIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const EditIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const grades = ["Primary 1","Primary 2","Primary 3","Primary 4","Primary 5","Primary 6","JHS1","JHS2","JHS3","SHS1","SHS2","SHS3"];

export default function AccountSettings({ t, user }) {
  const [tab, setTab] = useState("personal");
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  const tabs = ["Personal details", "Account info"];

  const personalFields = [
    { key: "full_name", label: "FULL NAME", value: user?.full_name || "—", editable: false },
    { key: "dob", label: "DATE OF BIRTH", value: "Not set", editable: true },
    { key: "phone", label: "MOBILE PHONE", value: user?.phone || "Not set", editable: true },
    { key: "region", label: "REGION", value: "Not set", editable: true },
    { key: "school", label: "SCHOOL", value: "Not set", editable: true },
  ];

  const accountFields = [
    { key: "email", label: "EMAIL", value: user?.email || "Not set", editable: true },
    { key: "grade_level", label: "GRADE LEVEL", value: user?.grade_level || "—", editable: true },
    { key: "role", label: "ROLE", value: user?.role || "student", editable: false },
    { key: "joined", label: "MEMBER SINCE", value: "May 2026", editable: false },
  ];

  const fields = tab === "personal" ? personalFields : accountFields;

  return (
    <div style={{ background: t.bg, minHeight: "100vh", paddingBottom: 40 }}>

      {/* Header */}
      <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, padding: "14px 20px 0", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <button onClick={() => navigate("/profile")} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center" }}>
            <BackIcon color={t.text} />
          </button>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: t.text, letterSpacing: -0.5 }}>My account</h1>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", overflowX: "auto", scrollbarWidth: "none" }}>
          {tabs.map(tb => (
            <button key={tb} onClick={() => setTab(tb === "Personal details" ? "personal" : "account")} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "10px 16px 14px", whiteSpace: "nowrap",
              borderBottom: (tab === "personal" && tb === "Personal details") || (tab === "account" && tb === "Account info") ? `2px solid ${t.green}` : "2px solid transparent",
              color: (tab === "personal" && tb === "Personal details") || (tab === "account" && tb === "Account info") ? t.text : t.textMuted,
              fontSize: 14, fontWeight: 700, transition: "all 0.2s"
            }}>{tb}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        {/* Profile avatar */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 72, height: 72, borderRadius: 22, background: "linear-gradient(135deg, #00C896, #4B7BEC)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 900, color: "#fff", margin: "0 auto 12px", boxShadow: "0 8px 24px #00C89633" }}>
            {user?.full_name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "S"}
          </div>
          <p style={{ color: t.text, fontSize: 16, fontWeight: 800, marginBottom: 2 }}>{user?.full_name}</p>
          <p style={{ color: t.textMuted, fontSize: 13 }}>{user?.grade_level} • {user?.role}</p>
        </div>

        {/* Fields */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, overflow: "hidden", boxShadow: t.shadow }}>
          {fields.map((field, i) => (
            <div key={field.key}>
              <div style={{ padding: "16px 20px" }}>
                <p style={{ color: t.textDim, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 6 }}>{field.label}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {editing === field.key && field.editable ? (
                    field.key === "grade_level" ? (
                      <select
                        defaultValue={field.value}
                        style={{ background: t.card, border: `1px solid ${t.green}`, borderRadius: 10, padding: "8px 12px", color: t.text, fontSize: 15, flex: 1, outline: "none" }}
                        onBlur={() => setEditing(null)}
                      >
                        {grades.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    ) : (
                      <input
                        defaultValue={field.value}
                        autoFocus
                        style={{ background: t.card, border: `1px solid ${t.green}`, borderRadius: 10, padding: "8px 12px", color: t.text, fontSize: 15, flex: 1, outline: "none" }}
                        onBlur={() => setEditing(null)}
                      />
                    )
                  ) : (
                    <p style={{ color: field.value === "Not set" ? t.textDim : t.text, fontSize: 15, fontWeight: 500 }}>{field.value}</p>
                  )}
                  {field.editable && editing !== field.key && (
                    <button onClick={() => setEditing(field.key)} style={{ background: "none", border: "none", cursor: "pointer", padding: "4px", marginLeft: 12 }}>
                      <EditIcon color={t.textMuted} />
                    </button>
                  )}
                </div>
              </div>
              {i < fields.length - 1 && <div style={{ height: 1, background: t.border, margin: "0 20px" }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}