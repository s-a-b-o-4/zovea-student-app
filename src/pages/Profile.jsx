import { useNavigate } from "react-router-dom";

const SettingsIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2.5"/>
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const BellIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const HistoryIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M1 4v6h6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.51 15a9 9 0 1 0 .49-4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 7v5l3 3" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MoonIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill={color} stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const SunIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="5" fill={color} stroke={color} strokeWidth="1.5"/>
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const DownloadIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="7,10 12,15 17,10" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="12" y1="15" x2="12" y2="3" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const ShieldIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HelpIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5"/>
    <path d="M9 9a3 3 0 1 1 3 3v2" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="12" cy="17" r="1" fill={color}/>
  </svg>
);

const ChevronIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LogoutIcon = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="16,17 21,12 16,7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="21" y1="12" x2="9" y2="12" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const MedalIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="14" r="6" fill="#FFC312" stroke="#E5A800" strokeWidth="1.5"/>
    <circle cx="12" cy="14" r="4" fill="#FFD43B"/>
    <path d="M9 3l3 4 3-4" fill="#FF4757" stroke="#CC0000" strokeWidth="1"/>
    <rect x="8" y="2" width="8" height="3" rx="1" fill="#FF4757"/>
  </svg>
);

const LockIcon = ({ color }) => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="10" rx="2" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2"/>
    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="16" r="1.5" fill={color}/>
  </svg>
);



export default function Profile({ user, logout, t, toggleTheme, isDark }) {
  const initials = user.full_name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "S";

  const navigate = useNavigate();

  const menuItems = [
    { Icon: SettingsIcon, label: "Account Settings", color: t.blue, bg: t.blueBg, action: () => navigate("/account-settings") },
    { Icon: BellIcon, label: "Notifications", color: t.yellow, bg: t.yellowBg, action: () => navigate("/notifications") },
    { Icon: ShieldIcon, label: "Privacy & Security", color: t.red, bg: t.redBg, action: () => navigate("/privacy-security") },
    { Icon: HistoryIcon, label: "History", color: t.green, bg: t.greenBg, action: () => navigate("/history") },
    { Icon: isDark ? SunIcon : MoonIcon, label: isDark ? "Light Mode" : "Dark Mode", color: t.purple, bg: t.purpleBg, action: toggleTheme },
    { Icon: DownloadIcon, label: "Download for Offline", color: "#0EA5E9", bg: "#0EA5E918" },
    { Icon: HelpIcon, label: "Help & Support", color: t.textMuted, bg: t.card },
  ];

  return (
    <div style={{ background: t.bg, minHeight: "100vh", paddingBottom: 100 }}>

      {/* Header */}
      <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, padding: "14px 20px 20px",position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: `linear-gradient(135deg, ${t.green}, ${t.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#fff", boxShadow: `0 8px 24px ${t.green}33`, flexShrink: 0 }}>
            {initials}
          </div>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 900, color: t.text, letterSpacing: -0.5 }}>{user.full_name}</h2>
            <p style={{ color: t.textMuted, fontSize: 13, marginTop: 3 }}>{user.grade_level} • {user.role}</p>
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          {[
            { label: "Level 1", color: t.yellow, bg: t.yellowBg,
              Icon: () => <svg width="12" height="12" viewBox="0 0 24 24" fill={t.yellow}><polygon points="12,2 15,8.5 22,9.5 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.5 9,8.5" fill={t.yellow}/></svg>
            },
            { label: "0 XP", color: t.green, bg: t.greenBg,
              Icon: () => <svg width="12" height="12" viewBox="0 0 24 24"><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13Z" fill={t.green}/></svg>
            },
            { label: "0 Day Streak", color: t.red, bg: t.redBg,
              Icon: () => <svg width="12" height="12" viewBox="0 0 24 24"><path d="M12 2C12 2 7 8 7 13C7 15.76 9.24 18 12 18C14.76 18 17 15.76 17 13C17 8 12 2 12 2Z" fill={t.red}/></svg>
            },
          ].map(b => (
            <div key={b.label} style={{ background: b.bg, border: `1px solid ${b.color}22`, borderRadius: 20, padding: "5px 12px", display: "flex", alignItems: "center", gap: 5 }}>
              <b.Icon />
              <span style={{ color: b.color, fontSize: 12, fontWeight: 700 }}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px" }}>

        {/* Achievements */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: "18px", marginBottom: 16, boxShadow: t.shadow }}>
          <h3 style={{ fontSize: 14, fontWeight: 800, color: t.text, marginBottom: 16, letterSpacing: 0.5 }}>ACHIEVEMENTS</h3>
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { label: "First Lesson", locked: false, Icon: () => <MedalIcon /> },
              { label: "Perfect Score", locked: true, Icon: () => <LockIcon color={t.textDim} /> },
              { label: "7 Day Streak", locked: true, Icon: () => <LockIcon color={t.textDim} /> },
            ].map(a => (
              <div key={a.label} style={{ flex: 1, textAlign: "center", opacity: a.locked ? 0.4 : 1 }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}><a.Icon /></div>
                <div style={{ fontSize: 11, color: t.textMuted, fontWeight: 600, lineHeight: 1.3 }}>{a.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Menu */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, overflow: "hidden", boxShadow: t.shadow, marginBottom: 16 }}>
          {menuItems.map((item, i) => (
            <div key={item.label}
              onClick={item.action}
              style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", cursor: "pointer", borderBottom: i < menuItems.length - 1 ? `1px solid ${t.border}` : "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = t.cardHover}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ width: 38, height: 38, borderRadius: 12, background: item.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <item.Icon color={item.color} />
              </div>
              <span style={{ flex: 1, fontWeight: 600, color: t.text, fontSize: 14 }}>{item.label}</span>
              <ChevronIcon color={t.textDim} />
            </div>
          ))}
        </div>

        {/* Support Links */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, overflow: "hidden", boxShadow: t.shadow, marginBottom: 16 }}>
          {[
            {
              label: "Contact us",
              Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={t.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
              external: false
            },
            {
              label: "Community forum",
              Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke={t.textMuted} strokeWidth="2"/><path d="M3 20C3 17 5.69 14 9 14C12.31 14 15 17 15 20" stroke={t.textMuted} strokeWidth="2" strokeLinecap="round"/><circle cx="17" cy="8" r="2.5" stroke={t.textMuted} strokeWidth="2"/><path d="M15 14C16.11 14 17.5 14.5 18.5 15.5" stroke={t.textMuted} strokeWidth="2" strokeLinecap="round"/></svg>,
              external: true
            },
            {
              label: "About us",
              Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={t.textMuted} strokeWidth="2"/><path d="M12 8v4M12 16h.01" stroke={t.textMuted} strokeWidth="2.5" strokeLinecap="round"/></svg>,
              external: true
            },
          ].map((item, i, arr) => (
            <div key={item.label} style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: "18px 20px",
              borderBottom: i < arr.length - 1 ? `1px solid ${t.border}` : "none",
              cursor: "pointer", transition: "background 0.2s"
            }}
              onMouseEnter={e => e.currentTarget.style.background = t.cardHover}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ width: 36, height: 36, borderRadius: 12, background: t.card, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <item.Icon />
              </div>
              <span style={{ flex: 1, fontWeight: 600, color: t.text, fontSize: 16 }}>{item.label}</span>
              {item.external ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke={t.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="15,3 21,3 21,9" stroke={t.textDim} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="10" y1="14" x2="21" y2="3" stroke={t.textDim} strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke={t.textDim} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          ))}
        </div>


        {/* Logout */}
        <button onClick={logout} style={{ width: "100%", background: t.redBg, border: `1px solid ${t.red}22`, borderRadius: 16, padding: "15px", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, color: t.red, fontWeight: 800, fontSize: 14, cursor: "pointer" }}>
          <LogoutIcon color={t.red} /> Log Out
        </button>

      </div>
    </div>
  );
}