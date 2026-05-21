import { useNavigate, useLocation } from "react-router-dom";

const HomeIcon = ({ active, t }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M3 9.5L12 3L21 9.5V20C21 20.55 20.55 21 20 21H15V15H9V21H4C3.45 21 3 20.55 3 20V9.5Z"
      fill={active ? t.green : "none"}
      stroke={active ? t.green : t.textMuted}
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SubjectsIcon = ({ active, t }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="8" height="10" rx="2"
      fill={active ? t.green : "none"}
      stroke={active ? t.green : t.textMuted} strokeWidth="2"/>
    <rect x="13" y="3" width="8" height="10" rx="2"
      fill={active ? t.green : "none"}
      stroke={active ? t.green : t.textMuted} strokeWidth="2"/>
    <rect x="3" y="15" width="8" height="6" rx="2"
      fill={active ? t.green : "none"}
      stroke={active ? t.green : t.textMuted} strokeWidth="2"/>
    <rect x="13" y="15" width="8" height="6" rx="2"
      fill={active ? t.green : "none"}
      stroke={active ? t.green : t.textMuted} strokeWidth="2"/>
  </svg>
);

const PracticeIcon = ({ active, t }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="4" y="3" width="16" height="18" rx="2"
      fill={active ? t.green : "none"}
      stroke={active ? t.green : t.textMuted} strokeWidth="2"/>
    <path d="M8 8H16M8 12H16M8 16H12"
      stroke={active ? "#fff" : t.textMuted} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const ProgressIcon = ({ active, t }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="3" width="18" height="18" rx="2"
      fill={active ? t.green : "none"}
      stroke={active ? t.green : t.textMuted} strokeWidth="2"/>
    <rect x="7" y="13" width="2.5" height="5" rx="1" fill={active ? "#fff" : t.textMuted}/>
    <rect x="11" y="9" width="2.5" height="9" rx="1" fill={active ? "#fff" : t.textMuted}/>
    <rect x="15" y="6" width="2.5" height="12" rx="1" fill={active ? "#fff" : t.textMuted}/>
  </svg>
);

const ProfileIcon = ({ active, t }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="8" r="4"
      fill={active ? t.green : "none"}
      stroke={active ? t.green : t.textMuted} strokeWidth="2"/>
    <path d="M4 20C4 17 7.58 14 12 14C16.42 14 20 17 20 20"
      stroke={active ? t.green : t.textMuted} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const tabs = [
  { path: "/", label: "Home", Icon: HomeIcon },
  { path: "/subjects", label: "Subjects", Icon: SubjectsIcon },
  { path: "/practice", label: "Practice", Icon: PracticeIcon },
  { path: "/progress", label: "Progress", Icon: ProgressIcon },
  { path: "/profile", label: "Profile", Icon: ProfileIcon },
];

export default function BottomNav({ t }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{
      position: "fixed", bottom: 0, left: 0, right: 0,
      background: t.nav, borderTop: `1px solid ${t.navBorder}`,
      display: "flex", justifyContent: "space-around", alignItems: "center",
      padding: "10px 0 18px", zIndex: 100,
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
    }}>
      {tabs.map(({ path, label, Icon }) => {
        const active = location.pathname === path;
        return (
          <button key={path} onClick={() => navigate(path)} style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: 5, background: "none", border: "none", cursor: "pointer",
            padding: "4px 16px", position: "relative"
          }}>
            {active && (
              <div style={{
                position: "absolute", top: -10, left: "50%",
                transform: "translateX(-50%)",
                width: 28, height: 3, borderRadius: 10, background: t.green
              }} />
            )}
            <Icon active={active} t={t} />
            <span style={{
              fontSize: 10, fontWeight: active ? 700 : 500,
              color: active ? t.green : t.textMuted,
              letterSpacing: 0.3
            }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}