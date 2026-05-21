const LessonsIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#3B82F6" fillOpacity="0.15"/>
    <path d="M7 8H17M7 12H17M7 16H13" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const StreakIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C12 2 7 8 7 13C7 15.76 9.24 18 12 18C14.76 18 17 15.76 17 13C17 8 12 2 12 2Z" fill="#F97316" fillOpacity="0.9"/>
    <path d="M12 22C10.34 22 9 20.66 9 19C9 17.5 10 16.5 12 15C14 16.5 15 17.5 15 19C15 20.66 13.66 22 12 22Z" fill="#FCD34D"/>
  </svg>
);

const XPIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const icons = { lessons: LessonsIcon, streak: StreakIcon, xp: XPIcon };

export default function StatCard({ type = "lessons", label, value, color }) {
  const Icon = icons[type] || LessonsIcon;
  return (
    <div style={{
      background: "#fff", borderRadius: 16, padding: "14px 10px",
      display: "flex", flexDirection: "column", alignItems: "center",
      gap: 6, boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      border: "1px solid #f0f4f8", flex: 1
    }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon />
      </div>
      <div style={{ fontSize: 18, fontWeight: 800, color: "#2c3e50" }}>{value}</div>
      <div style={{ fontSize: 11, color: "#95a5a6", fontWeight: 600, textAlign: "center" }}>{label}</div>
    </div>
  );
}