import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BackIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const activityData = [
  { id: 1, type: "lesson", title: "Place Value & Number Systems", subject: "Mathematics", subjectColor: "#4B7BEC", date: "Today", time: "09:14 AM", xp: "+15 XP", icon: "📖" },
  { id: 2, type: "quiz", title: "Quiz Completed", subject: "Mathematics", subjectColor: "#4B7BEC", date: "Today", time: "09:32 AM", xp: "+10 XP", score: "4/5", icon: "✅" },
  { id: 3, type: "streak", title: "Streak Maintained", subject: "Daily Goal", subjectColor: "#FF4757", date: "Today", time: "09:35 AM", xp: "+5 XP", icon: "🔥" },
  { id: 4, type: "lesson", title: "Comprehension & Summary", subject: "English Language", subjectColor: "#A55EEA", date: "Yesterday", time: "07:45 PM", xp: "+15 XP", icon: "📖" },
  { id: 5, type: "quiz", title: "Quiz Attempted", subject: "English Language", subjectColor: "#A55EEA", date: "Yesterday", time: "08:10 PM", xp: "+5 XP", score: "2/5", icon: "📝" },
  { id: 6, type: "lesson", title: "Fractions & Decimals", subject: "Mathematics", subjectColor: "#4B7BEC", date: "May 20", time: "04:22 PM", xp: "+15 XP", icon: "📖" },
];

const practiceData = [
  { id: 1, subject: "Mathematics", subjectColor: "#4B7BEC", mode: "Practice", score: 4, total: 5, pct: 80, time: "6m 32s", date: "Today", clock: "09:32 AM" },
  { id: 2, subject: "Mathematics", subjectColor: "#4B7BEC", mode: "Exam", score: 3, total: 5, pct: 60, time: "8m 15s", date: "Yesterday", clock: "08:10 PM" },
  { id: 3, subject: "English Language", subjectColor: "#A55EEA", mode: "Practice", score: 2, total: 5, pct: 40, time: "5m 44s", date: "May 20", clock: "04:55 PM" },
  { id: 4, subject: "Mathematics", subjectColor: "#4B7BEC", mode: "Exam", score: 5, total: 5, pct: 100, time: "7m 02s", date: "May 19", clock: "06:30 PM" },
];

const loginData = [
  { id: 1, device: "Chrome — Windows", location: "Accra, Ghana", date: "Today", time: "09:10 AM", current: true },
  { id: 2, device: "Safari — iPhone", location: "Accra, Ghana", date: "Yesterday", time: "07:40 PM", current: false },
  { id: 3, device: "Chrome — Windows", location: "Accra, Ghana", date: "May 20", time: "04:18 PM", current: false },
  { id: 4, device: "Chrome — Windows", location: "Kumasi, Ghana", date: "May 18", time: "11:02 AM", current: false },
  { id: 5, device: "Chrome — Android", location: "Accra, Ghana", date: "May 15", time: "08:33 PM", current: false },
];

const achievementsData = [
  { id: 1, name: "First Lesson", desc: "Completed your very first lesson", date: "Today", time: "09:32 AM", color: "#FFC312", locked: false,
    Icon: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="14" r="6" fill="#FFC312" stroke="#E5A800" strokeWidth="1.5"/><path d="M9 3l3 4 3-4" fill="#FF4757" stroke="#CC0000" strokeWidth="1"/><rect x="8" y="2" width="8" height="3" rx="1" fill="#FF4757"/></svg>
  },
  { id: 2, name: "Quiz Warrior", desc: "Completed 5 quizzes in total", date: "Today", time: "09:32 AM", color: "#4B7BEC", locked: false,
    Icon: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#4B7BEC" fillOpacity="0.2" stroke="#4B7BEC" strokeWidth="2"/><path d="M9 9a3 3 0 1 1 3 3v2" stroke="#4B7BEC" strokeWidth="2.5" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill="#4B7BEC"/></svg>
  },
  { id: 3, name: "Comeback Kid", desc: "Corrected a topic you previously failed", date: "—", time: "—", color: "#00C896", locked: true,
    Icon: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M1 4v6h6M3.51 15a9 9 0 1 0 .49-4" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  },
  { id: 4, name: "Night Owl", desc: "Completed a session after 10PM", date: "—", time: "—", color: "#A55EEA", locked: true,
    Icon: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="#94A3B8" fillOpacity="0.3" stroke="#94A3B8" strokeWidth="2"/></svg>
  },
  { id: 5, name: "7 Day Streak", desc: "Studied 7 days in a row", date: "—", time: "—", color: "#FF4757", locked: true,
    Icon: () => <svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C12 2 7 8 7 13C7 15.76 9.24 18 12 18C14.76 18 17 15.76 17 13C17 8 12 2 12 2Z" fill="#94A3B8" fillOpacity="0.5"/></svg>
  },
  { id: 6, name: "Perfect Score", desc: "Got 100% on 3 quizzes in a row", date: "—", time: "—", color: "#FFC312", locked: true,
    Icon: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><polygon points="12,2 15,8.5 22,9.5 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.5 9,8.5" fill="#94A3B8" fillOpacity="0.4" stroke="#94A3B8" strokeWidth="1.5"/></svg>
  },
];

const tabs = ["Activity", "Practice", "Logins", "Achievements"];

function DeviceIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="4" width="20" height="14" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <path d="M8 21H16M12 18V21" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

function MobileIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="2" width="14" height="20" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="2"/>
      <circle cx="12" cy="17" r="1" fill={color}/>
    </svg>
  );
}

export default function History({ t }) {
  const [tab, setTab] = useState("Activity");
  const navigate = useNavigate();

  return (
    <div style={{ background: t.bg, minHeight: "100vh", paddingBottom: 40 }}>

      {/* Header */}
      <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, padding: "14px 20px 0", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <button onClick={() => navigate("/profile")} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center" }}>
            <BackIcon color={t.text} />
          </button>
          <h1 style={{ fontSize: 20, fontWeight: 900, color: t.text, letterSpacing: -0.5 }}>History</h1>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", overflowX: "auto", gap: 0, scrollbarWidth: "none" }}>
          {tabs.map(tb => (
            <button key={tb} onClick={() => setTab(tb)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "10px 18px 14px", whiteSpace: "nowrap",
              borderBottom: tab === tb ? `2px solid ${t.green}` : "2px solid transparent",
              color: tab === tb ? t.text : t.textMuted,
              fontSize: 14, fontWeight: tab === tb ? 800 : 500,
              transition: "all 0.2s"
            }}>{tb}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px" }}>

        {/* ACTIVITY TAB */}
        {tab === "Activity" && (
          <div>
            <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 14 }}>RECENT ACTIVITY</p>
            {Object.entries(
              activityData.reduce((acc, item) => {
                if (!acc[item.date]) acc[item.date] = [];
                acc[item.date].push(item);
                return acc;
              }, {})
            ).map(([date, items]) => (
              <div key={date} style={{ marginBottom: 24 }}>
                <p style={{ color: t.textDim, fontSize: 12, fontWeight: 700, marginBottom: 10 }}>{date}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {items.map(item => (
                    <div key={item.id} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, boxShadow: t.shadow }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: `${item.subjectColor}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          {item.type === "lesson" && <><rect x="4" y="3" width="14" height="18" rx="2" fill={item.subjectColor} fillOpacity="0.2" stroke={item.subjectColor} strokeWidth="2"/><path d="M8 8H14M8 12H14M8 16H11" stroke={item.subjectColor} strokeWidth="2" strokeLinecap="round"/></>}
                          {item.type === "quiz" && <><circle cx="12" cy="12" r="9" fill={item.subjectColor} fillOpacity="0.15" stroke={item.subjectColor} strokeWidth="2"/><path d="M9 9a3 3 0 1 1 3 3v2" stroke={item.subjectColor} strokeWidth="2.5" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill={item.subjectColor}/></>}
                          {item.type === "streak" && <path d="M12 2C12 2 7 8 7 13C7 15.76 9.24 18 12 18C14.76 18 17 15.76 17 13C17 8 12 2 12 2Z" fill="#FF4757"/>}
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{item.title}</p>
                        <p style={{ color: t.textMuted, fontSize: 11 }}>{item.subject} • {item.time}</p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <span style={{ background: "#00C89618", color: t.green, fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 20 }}>{item.xp}</span>
                        {item.score && <p style={{ color: t.textMuted, fontSize: 11, marginTop: 4 }}>{item.score}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PRACTICE TAB */}
        {tab === "Practice" && (
          <div>
            <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 14 }}>PRACTICE SESSIONS</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {practiceData.map(p => (
                <div key={p.id} style={{ background: t.surface, border: `1px solid ${p.pct >= 60 ? `${t.green}33` : `${t.border}`}`, borderRadius: 18, padding: "16px", boxShadow: t.shadow }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                        <span style={{ background: `${p.subjectColor}18`, color: p.subjectColor, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{p.subject}</span>
                        <span style={{ background: p.mode === "Exam" ? "#FFC31218" : "#00C89618", color: p.mode === "Exam" ? "#FFC312" : t.green, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{p.mode}</span>
                      </div>
                      <p style={{ color: t.textMuted, fontSize: 12 }}>{p.date} • {p.clock}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 22, fontWeight: 900, color: p.pct >= 60 ? t.green : "#FF4757", letterSpacing: -1 }}>{p.pct}%</p>
                      <p style={{ color: t.textMuted, fontSize: 11, marginTop: 2 }}>{p.score}/{p.total} correct</p>
                    </div>
                  </div>
                  <div style={{ background: t.border, borderRadius: 10, height: 6, marginBottom: 10 }}>
                    <div style={{ width: `${p.pct}%`, background: p.pct >= 60 ? `linear-gradient(90deg, ${t.green}, ${t.blue})` : `linear-gradient(90deg, #FFC312, #FF4757)`, borderRadius: 10, height: 6, transition: "width 0.5s" }} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="13" r="8" stroke={t.textMuted} strokeWidth="2"/>
                      <path d="M12 9v4l2 2" stroke={t.textMuted} strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span style={{ color: t.textMuted, fontSize: 12 }}>Time taken: {p.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* LOGINS TAB */}
        {tab === "Logins" && (
          <div>
            <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 14 }}>LOGIN HISTORY</p>
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, overflow: "hidden", boxShadow: t.shadow }}>
              {loginData.map((login, i) => {
                const isMobile = login.device.includes("iPhone") || login.device.includes("Android");
                return (
                  <div key={login.id} style={{ padding: "16px 18px", borderBottom: i < loginData.length - 1 ? `1px solid ${t.border}` : "none", display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 12, background: login.current ? `${t.green}18` : t.card, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {isMobile
                        ? <MobileIcon color={login.current ? t.green : t.textMuted} />
                        : <DeviceIcon color={login.current ? t.green : t.textMuted} />
                      }
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                        <p style={{ color: t.text, fontSize: 13, fontWeight: 700 }}>{login.device}</p>
                        {login.current && (
                          <span style={{ background: `${t.green}18`, color: t.green, fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 20 }}>CURRENT</span>
                        )}
                      </div>
                      <p style={{ color: t.textMuted, fontSize: 11 }}>{login.location} • {login.date} {login.time}</p>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke={t.textDim} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                );
              })}
            </div>
            <p style={{ color: t.textDim, fontSize: 12, textAlign: "center", marginTop: 16, lineHeight: 1.6 }}>If you see a login you don't recognise, change your password immediately.</p>
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {tab === "Achievements" && (
          <div>
            <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 14 }}>YOUR BADGES</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {achievementsData.map(a => (
                <div key={a.id} style={{ background: t.surface, border: `1px solid ${a.locked ? t.border : `${a.color}33`}`, borderRadius: 18, padding: "16px", display: "flex", alignItems: "center", gap: 14, opacity: a.locked ? 0.5 : 1, boxShadow: t.shadow }}>
                  <div style={{ width: 48, height: 48, borderRadius: 16, background: a.locked ? t.card : `${a.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <a.Icon />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: t.text, fontSize: 14, fontWeight: 800, marginBottom: 3 }}>{a.name}</p>
                    <p style={{ color: t.textMuted, fontSize: 12, lineHeight: 1.4 }}>{a.desc}</p>
                    {!a.locked && (
                      <p style={{ color: t.green, fontSize: 11, fontWeight: 700, marginTop: 4 }}>Earned {a.date} • {a.time}</p>
                    )}
                  </div>
                  {a.locked ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="5" y="11" width="14" height="10" rx="2" fill={t.textDim} fillOpacity="0.2" stroke={t.textDim} strokeWidth="2"/>
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke={t.textDim} strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: a.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}