import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "https://zovea-landing-production.up.railway.app";

const greetings = () => {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
};

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const weekData = [3, 5, 2, 7, 4, 6, 0];

const upcomingDeadlines = [
  { label: "BECE Mock Exam", date: "Jun 3", color: "#FF4757",
    Icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" fill="#FF4757" fillOpacity="0.2" stroke="#FF4757" strokeWidth="2"/><path d="M8 8H16M8 12H16M8 16H12" stroke="#FF4757" strokeWidth="2" strokeLinecap="round"/></svg>
  },
  { label: "Maths Assignment", date: "May 26", color: "#FFC312",
    Icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 20L8 9L13 16L16 12L21 20H3Z" fill="#FFC312" fillOpacity="0.2" stroke="#FFC312" strokeWidth="2" strokeLinejoin="round"/></svg>
  },
  { label: "Science Quiz", date: "May 28", color: "#00C896",
    Icon: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 3L9 13L4 20H20L15 13V3" stroke="#00C896" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="7" y1="3" x2="17" y2="3" stroke="#00C896" strokeWidth="2" strokeLinecap="round"/></svg>
  },
];

const subjectColors = {
  "English Language": "#A55EEA",
  "Mathematics": "#4B7BEC",
  "Integrated Science": "#00C896",
  "Social Studies": "#0EA5E9",
  "Religious & Moral Education": "#FF4757",
  "Information & Communication Technology": "#FFC312",
};

export default function Dashboard({ user, t }) {
  const [subjects, setSubjects] = useState([]);
  const [stats] = useState({ total_xp: 0, streak_days: 0, lessons_completed: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const maxBar = Math.max(...weekData);
  const level = Math.floor(stats.total_xp / 250) + 1;
  const firstName = user.full_name?.split(" ")[0] || "Student";

  useEffect(() => {
    axios.get(`${API}/api/subjects?level=JHS`)
      .then(res => setSubjects(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: t.bg, minHeight: "100vh", paddingBottom: 100 }}>

      {/* Header */}
      <div style={{ padding: "56px 20px 24px", background: t.surface, borderBottom: `1px solid ${t.border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <p style={{ color: t.textMuted, fontSize: 13, fontWeight: 500 }}>{greetings()}</p>
            <h1 style={{ color: t.text, fontSize: 24, fontWeight: 900, letterSpacing: -0.5, marginTop: 2 }}>{firstName}</h1>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ background: t.greenBg, border: `1px solid ${t.green}33`, borderRadius: 20, padding: "6px 14px", display: "flex", alignItems: "center", gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={t.green}><polygon points="12,2 15,8.5 22,9.5 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.5 9,8.5" fill={t.green}/></svg>
              <span style={{ color: t.green, fontSize: 13, fontWeight: 700 }}>Lvl {level}</span>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: t.textMuted, fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill={t.green}><path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13Z" fill={t.green}/></svg>
              {stats.total_xp} XP
            </span>
            <span style={{ color: t.textDim, fontSize: 12 }}>{250 - (stats.total_xp % 250)} to Level {level + 1}</span>
          </div>
          <div style={{ background: t.border, borderRadius: 10, height: 6, overflow: "hidden" }}>
            <div style={{ width: `${((stats.total_xp % 250) / 250) * 100}%`, background: `linear-gradient(90deg, ${t.green}, ${t.blue})`, borderRadius: 10, height: 6, transition: "width 0.5s" }} />
          </div>
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
          <div style={{ background: t.redBg, border: `1px solid ${t.red}22`, borderRadius: 20, padding: "5px 12px", display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24"><path d="M12 2C12 2 7 8 7 13C7 15.76 9.24 18 12 18C14.76 18 17 15.76 17 13C17 8 12 2 12 2Z" fill="#FF4757"/><path d="M12 22C10.34 22 9 20.66 9 19C9 17.5 10.5 16 12 15C13.5 16 15 17.5 15 19C15 20.66 13.66 22 12 22Z" fill="#FFC312"/></svg>
            <span style={{ color: t.red, fontSize: 11, fontWeight: 700 }}>{stats.streak_days} Day Streak</span>
          </div>
          <div style={{ background: t.blueBg, border: `1px solid ${t.blue}22`, borderRadius: 20, padding: "5px 12px", display: "flex", alignItems: "center", gap: 5 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill={t.blue} fillOpacity="0.3"/><path d="M7 8H17M7 12H17M7 16H13" stroke={t.blue} strokeWidth="2.5" strokeLinecap="round"/></svg>
            <span style={{ color: t.blue, fontSize: 11, fontWeight: 700 }}>{stats.lessons_completed} Lessons</span>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 20px 0" }}>

        {/* Continue Learning */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: "18px", marginBottom: 20, boxShadow: t.shadow }}>
          <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 12 }}>CONTINUE LEARNING</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 16, fontWeight: 800, color: t.text, letterSpacing: -0.3 }}>Mathematics</p>
              <p style={{ fontSize: 13, color: t.textMuted, marginTop: 3 }}>Place Value & Number Systems</p>
              <div style={{ marginTop: 10 }}>
                <div style={{ background: t.border, borderRadius: 10, height: 5, width: 160 }}>
                  <div style={{ width: "0%", background: t.green, borderRadius: 10, height: 5 }} />
                </div>
                <p style={{ fontSize: 11, color: t.textDim, marginTop: 5 }}>Start your first lesson</p>
              </div>
            </div>
            <button onClick={() => navigate("/topics?id=2")} style={{ background: t.green, border: "none", borderRadius: 14, padding: "10px 18px", color: "#fff", fontWeight: 800, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap", boxShadow: `0 4px 14px ${t.green}44` }}>
              Start →
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Lessons", value: stats.lessons_completed, color: t.blue,
              Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill={t.blue} fillOpacity="0.2"/><path d="M7 8H17M7 12H17M7 16H13" stroke={t.blue} strokeWidth="2.5" strokeLinecap="round"/></svg>
            },
            { label: "Streak", value: `${stats.streak_days}d`, color: t.red,
              Icon: () => <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 2C12 2 7 8 7 13C7 15.76 9.24 18 12 18C14.76 18 17 15.76 17 13C17 8 12 2 12 2Z" fill="#FF4757"/></svg>
            },
            { label: "Total XP", value: stats.total_xp, color: t.green,
              Icon: () => <svg width="18" height="18" viewBox="0 0 24 24" fill={t.green}><polygon points="12,2 15,8.5 22,9.5 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.5 9,8.5" fill={t.green}/></svg>
            },
          ].map(s => (
            <div key={s.label} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: "14px 12px", textAlign: "center", boxShadow: t.shadow }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}><s.Icon /></div>
              <div style={{ fontSize: 20, fontWeight: 900, color: t.text, letterSpacing: -0.5 }}>{s.value}</div>
              <div style={{ fontSize: 11, color: t.textMuted, marginTop: 3, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Subjects */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, color: t.text, letterSpacing: -0.3 }}>My Subjects</h2>
          <span onClick={() => navigate("/subjects")} style={{ fontSize: 13, color: t.green, fontWeight: 600, cursor: "pointer" }}>See all</span>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 40, color: t.textMuted }}>Loading...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 10, marginBottom: 24 }}>
            {subjects.map(s => {
              const color = subjectColors[s.name] || t.blue;
              const shortName = s.name === "Religious & Moral Education" ? "RME" : s.name === "Information & Communication Technology" ? "ICT" : s.name.split(" ")[0];
              return (
                <div key={s.id} onClick={() => navigate(`/topics?id=${s.id}`)}
                  style={{ background: t.surface, border: `1px solid ${color}33`, borderRadius: 16, padding: "16px 8px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", boxShadow: t.shadow }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${color}18`; e.currentTarget.style.borderColor = `${color}66`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = t.surface; e.currentTarget.style.borderColor = `${color}33`; }}
                >
                  <div style={{ width: 36, height: 36, borderRadius: 12, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: color }} />
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: t.textMuted, lineHeight: 1.3 }}>{shortName}</div>
                  <div style={{ marginTop: 8, background: t.border, borderRadius: 6, height: 3 }}>
                    <div style={{ width: "0%", background: color, borderRadius: 6, height: 3 }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Weekly Chart */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: "20px", marginBottom: 20, boxShadow: t.shadow }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontSize: 15, fontWeight: 800, color: t.text, letterSpacing: -0.3 }}>Weekly Activity</h2>
            <span style={{ fontSize: 12, color: t.textMuted, fontWeight: 600 }}>This week</span>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
            {weekData.map((val, i) => (
              <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: "100%", borderRadius: "5px 5px 0 0",
                  height: `${val === 0 ? 4 : (val / maxBar) * 64}px`,
                  background: val === 0 ? t.border : i === new Date().getDay() - 1 ? t.green : `${t.green}55`,
                  transition: "height 0.5s"
                }} />
                <span style={{ fontSize: 9, color: t.textMuted, fontWeight: 600 }}>{weekDays[i]}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 12, color: t.textMuted, display: "flex", alignItems: "center", gap: 4 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill={t.yellow}><polygon points="12,2 15,8.5 22,9.5 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.5 9,8.5" fill={t.yellow}/></svg>
              Best: Thursday
            </span>
            <span style={{ fontSize: 12, color: t.green, fontWeight: 700 }}>28 this week</span>
          </div>
        </div>

        {/* Deadlines */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: "20px", marginBottom: 24, boxShadow: t.shadow }}>
          <h2 style={{ fontSize: 15, fontWeight: 800, color: t.text, letterSpacing: -0.3, marginBottom: 16 }}>Upcoming</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {upcomingDeadlines.map((d, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", background: t.card, borderRadius: 14, border: `1px solid ${t.border}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${d.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <d.Icon />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: t.text, fontSize: 13 }}>{d.label}</div>
                  <div style={{ fontSize: 11, color: t.textMuted, marginTop: 2 }}>{d.date}</div>
                </div>
                <div style={{ background: `${d.color}18`, borderRadius: 20, padding: "4px 10px", color: d.color, fontSize: 11, fontWeight: 700 }}>{d.date}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}