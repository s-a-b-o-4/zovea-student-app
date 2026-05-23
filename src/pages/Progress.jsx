import TopBar from "../components/TopBar";

const subjectData = [
  { name: "English Language",   color: "#A55EEA", progress: 0,
    Icon: ({ c }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="14" height="18" rx="2" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="2"/><path d="M8 8H14M8 12H14M8 16H11" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>
  },
  { name: "Mathematics",        color: "#4B7BEC", progress: 0,
    Icon: ({ c }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 20L8 9L13 16L16 12L21 20H3Z" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="2" strokeLinejoin="round"/></svg>
  },
  { name: "Integrated Science", color: "#00C896", progress: 0,
    Icon: ({ c }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 3L9 13L4 20H20L15 13V3" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="7" y1="3" x2="17" y2="3" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>
  },
  { name: "Social Studies",     color: "#0EA5E9", progress: 0,
    Icon: ({ c }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2"/><ellipse cx="12" cy="12" rx="4" ry="9" stroke={c} strokeWidth="2"/><line x1="3" y1="12" x2="21" y2="12" stroke={c} strokeWidth="2"/></svg>
  },
  { name: "RME",                color: "#FF4757", progress: 0,
    Icon: ({ c }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 21C7 16 2 12 2 7.5A5 5 0 0 1 12 5a5 5 0 0 1 10 2.5C22 12 17 16 12 21Z" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="2"/></svg>
  },
  { name: "ICT",                color: "#FFC312", progress: 0,
    Icon: ({ c }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="14" rx="2" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="2"/><path d="M8 21H16M12 18V21" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>
  },
];

export default function Progress({ t }) {
  return (
    <div style={{ background: t.bg, minHeight: "100vh", paddingBottom: 100 }}>
      <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, padding: "14px 20px 20px", position: "sticky", top: 0, zIndex: 50 }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: t.text, letterSpacing: -0.5 }}>Progress</h1>
        <p style={{ color: t.textMuted, fontSize: 13, marginTop: 4 }}>Track your learning journey</p>
      </div>

      <div style={{ padding: "20px" }}>
        {/* Stats */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: "20px", marginBottom: 20, boxShadow: t.shadow }}>
          <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 16 }}>OVERALL</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, textAlign: "center" }}>
            {[
              { val: "0", label: "Lessons",
                Icon: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="3" fill={t.blue} fillOpacity="0.2"/><path d="M7 8H17M7 12H17M7 16H13" stroke={t.blue} strokeWidth="2.5" strokeLinecap="round"/></svg>
              },
              { val: "0", label: "Quizzes",
                Icon: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill={t.green} fillOpacity="0.15" stroke={t.green} strokeWidth="2"/><path d="M9 9a3 3 0 1 1 3 3v2" stroke={t.green} strokeWidth="2.5" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill={t.green}/></svg>
              },
              { val: "0", label: "XP",
                Icon: () => <svg width="24" height="24" viewBox="0 0 24 24" fill={t.yellow}><polygon points="12,2 15,8.5 22,9.5 17,14 18.5,21 12,17.5 5.5,21 7,14 2,9.5 9,8.5" fill={t.yellow}/></svg>
              },
            ].map(s => (
              <div key={s.label}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}><s.Icon /></div>
                <div style={{ fontSize: 24, fontWeight: 900, color: t.text, letterSpacing: -1 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: t.textMuted, marginTop: 3, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* By Subject */}
        <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 14 }}>BY SUBJECT</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {subjectData.map(s => (
            <div key={s.name} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: "14px 16px", boxShadow: t.shadow }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <s.Icon c={s.color} />
                </div>
                <span style={{ fontWeight: 700, color: t.text, fontSize: 14, flex: 1 }}>{s.name}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: s.color }}>{s.progress}%</span>
              </div>
              <div style={{ background: t.border, borderRadius: 10, height: 5 }}>
                <div style={{ width: `${s.progress}%`, background: `linear-gradient(90deg, ${s.color}, ${s.color}99)`, borderRadius: 10, height: 5, transition: "width 0.5s" }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}