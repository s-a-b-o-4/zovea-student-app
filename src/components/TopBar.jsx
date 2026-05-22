import { useNavigate } from "react-router-dom";

const BellIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="18" cy="6" r="3" fill="#FF4757"/>
  </svg>
);

export default function TopBar({ t, user, title }) {
  const navigate = useNavigate();
  const initials = user?.full_name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "S";

  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "56px 20px 16px",
      background: t.surface, borderBottom: `1px solid ${t.border}`
    }}>
      {/* Profile avatar */}
      <button
        onClick={() => navigate("/profile")}
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <div style={{
          width: 38, height: 38, borderRadius: 14,
          background: "linear-gradient(135deg, #00C896, #4B7BEC)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 900, color: "#fff",
          boxShadow: "0 4px 12px #00C89633"
        }}>
          {initials}
        </div>
      </button>

      {/* Title */}
      <h1 style={{ fontSize: 17, fontWeight: 900, color: t.text, letterSpacing: -0.3 }}>{title}</h1>

      {/* Notification bell */}
      <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
        <BellIcon color={t.textMuted} />
      </button>
    </div>
  );
}