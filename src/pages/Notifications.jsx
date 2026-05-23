import { useState } from "react";
import { useNavigate } from "react-router-dom";

const XIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M18 6L6 18M6 6l12 12" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const SettingsIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2.5"/>
    <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const generalNotifications = [
  { id: 1, title: "Study reminder", message: "Don't forget your daily study session! Your streak is at risk.", time: "2h", color: "#FF4757", read: false,
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C12 2 7 8 7 13C7 15.76 9.24 18 12 18C14.76 18 17 15.76 17 13C17 8 12 2 12 2Z" fill="#FF4757"/></svg>
  },
  { id: 2, title: "Quiz results ready", message: "You scored 80% on Mathematics — Place Value & Number Systems. Keep it up!", time: "4h", color: "#00C896", read: false,
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#00C896" fillOpacity="0.15" stroke="#00C896" strokeWidth="2"/><path d="M5 12l5 5L19 7" stroke="#00C896" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  { id: 3, title: "New content added", message: "Fractions & Decimals lesson is now available in Mathematics.", time: "1d", color: "#4B7BEC", read: true,
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="14" height="18" rx="2" fill="#4B7BEC" fillOpacity="0.15" stroke="#4B7BEC" strokeWidth="2"/><path d="M8 8H14M8 12H14M8 16H11" stroke="#4B7BEC" strokeWidth="2" strokeLinecap="round"/></svg>
  },
  { id: 4, title: "BECE countdown", message: "47 days until BECE 2026. You have completed 2 of 6 subjects.", time: "1d", color: "#FFC312", read: true,
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="8" stroke="#FFC312" strokeWidth="2"/><path d="M12 9v4l2.5 2.5" stroke="#FFC312" strokeWidth="2" strokeLinecap="round"/><path d="M9 2h6" stroke="#FFC312" strokeWidth="2.5" strokeLinecap="round"/></svg>
  },
  { id: 5, title: "Achievement unlocked", message: "You earned the First Lesson badge. Keep going to unlock more!", time: "2d", color: "#A55EEA", read: true,
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="14" r="6" fill="#FFC312" stroke="#E5A800" strokeWidth="1.5"/><path d="M9 3l3 4 3-4" fill="#FF4757" stroke="#CC0000" strokeWidth="1"/><rect x="8" y="2" width="8" height="3" rx="1" fill="#FF4757"/></svg>
  },
];

const socialNotifications = [
  { id: 1, title: "Kwame upvoted your post", message: "Your tip about reading questions first got 24 upvotes!", time: "1h", color: "#00C896", read: false,
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 19V5M5 12l7-7 7 7" stroke="#00C896" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  { id: 2, title: "New comment on your post", message: "Abena replied: \"This tip really helped me in my last practice!\"", time: "3h", color: "#4B7BEC", read: false,
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#4B7BEC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  { id: 3, title: "BECE 2026 community", message: "2 new posts in BECE 2026 Candidates you might have missed.", time: "5h", color: "#A55EEA", read: true,
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="9" cy="8" r="3" stroke="#A55EEA" strokeWidth="2"/><path d="M3 20C3 17 5.69 14 9 14C12.31 14 15 17 15 20" stroke="#A55EEA" strokeWidth="2" strokeLinecap="round"/><circle cx="17" cy="8" r="2.5" stroke="#A55EEA" strokeWidth="2"/></svg>
  },
  { id: 4, title: "Trending in Mathematics", message: "\"LCM and HCF tricks\" is trending in the Mathematics Champions community.", time: "1d", color: "#FFC312", read: true,
    Icon: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="#FFC312" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
];

export default function Notifications({ t }) {
  const [tab, setTab] = useState("general");
  const [read, setRead] = useState({});
  const navigate = useNavigate();

  const notifications = tab === "general" ? generalNotifications : socialNotifications;
  const unreadCount = notifications.filter(n => !n.read && !read[n.id]).length;

  const markAllRead = () => {
    const allRead = {};
    notifications.forEach(n => allRead[n.id] = true);
    setRead(r => ({ ...r, ...allRead }));
  };

  return (
    <div style={{ background: t.bg, minHeight: "100vh", paddingBottom: 40 }}>

      {/* Header */}
      <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, padding: "14px 20px 0", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          {/* X close button */}
          <button onClick={() => navigate("/profile")} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center" }}>
            <XIcon color={t.text} />
          </button>

          <h1 style={{ fontSize: 17, fontWeight: 900, color: t.text, letterSpacing: -0.3 }}>Notifications</h1>

          {/* Settings button */}
          <button style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center" }}>
            <SettingsIcon color={t.textMuted} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex" }}>
          {["general", "social"].map(tb => (
            <button key={tb} onClick={() => setTab(tb)} style={{
              flex: 1, background: "none", border: "none", cursor: "pointer",
              padding: "12px 0 12px",
              borderBottom: tab === tb ? `2px solid ${t.green}` : "2px solid transparent",
              marginTop: 4,
              color: tab === tb ? t.text : t.textMuted,
              fontSize: 15, fontWeight: tab === tb ? 800 : 500,
              textTransform: "capitalize", transition: "all 0.2s",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6
            }}>
              {tb === "general" ? "General" : "Social"}
              {tb === tab && unreadCount > 0 && (
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: t.green, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#fff", fontSize: 10, fontWeight: 800 }}>{unreadCount}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "16px 20px" }}>
        {/* Mark all read */}
        {unreadCount > 0 && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
            <button onClick={markAllRead} style={{ background: "none", border: "none", cursor: "pointer", color: t.green, fontSize: 13, fontWeight: 700 }}>
              Mark all as read
            </button>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {notifications.map(n => {
            const isRead = n.read || read[n.id];
            return (
              <div
                key={n.id}
                onClick={() => setRead(r => ({ ...r, [n.id]: true }))}
                style={{
                  background: isRead ? t.surface : `${n.color}08`,
                  border: `1px solid ${isRead ? t.border : `${n.color}33`}`,
                  borderRadius: 18, padding: "14px 16px",
                  display: "flex", gap: 12, alignItems: "flex-start",
                  cursor: "pointer", transition: "all 0.2s",
                  boxShadow: t.shadow
                }}
              >
                {/* Icon */}
                <div style={{ width: 42, height: 42, borderRadius: 14, background: `${n.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, position: "relative" }}>
                  <n.Icon />
                  {!isRead && (
                    <div style={{ position: "absolute", top: -3, right: -3, width: 10, height: 10, borderRadius: "50%", background: n.color, border: `2px solid ${t.bg}` }} />
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                    <p style={{ color: t.text, fontSize: 13, fontWeight: isRead ? 600 : 800, letterSpacing: -0.2 }}>{n.title}</p>
                    <span style={{ color: t.textDim, fontSize: 11, flexShrink: 0, marginLeft: 8 }}>{n.time}</span>
                  </div>
                  <p style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.5, margin: 0 }}>{n.message}</p>
                </div>
              </div>
            );
          })}
        </div>

        {notifications.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ color: t.textMuted, fontSize: 15, fontWeight: 600 }}>No notifications yet</p>
          </div>
        )}
      </div>
    </div>
  );
}