import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TargetIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" strokeOpacity="0.5"/>
    <circle cx="12" cy="12" r="6" stroke="white" strokeWidth="2" strokeOpacity="0.7"/>
    <circle cx="12" cy="12" r="2.5" fill="white"/>
  </svg>
);

const TimerIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="13" r="8" stroke="white" strokeWidth="2" strokeOpacity="0.8"/>
    <path d="M12 9v4l2.5 2.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 2h6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const ChevronRight = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const subjects = [
  { id: 2, name: "Mathematics",        color: "#4B7BEC",
    Icon: ({ c }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 20L8 9L13 16L16 12L21 20H3Z" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="2" strokeLinejoin="round"/></svg>,
    years: [2021, 2020, 2019], questions: 5
  },
  { id: 1, name: "English Language",   color: "#A55EEA",
    Icon: ({ c }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="14" height="18" rx="2" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="2"/><path d="M8 8H14M8 12H14M8 16H11" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
    years: [2021, 2020, 2019], questions: 0
  },
  { id: 3, name: "Integrated Science", color: "#00C896",
    Icon: ({ c }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 3L9 13L4 20H20L15 13V3" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><line x1="7" y1="3" x2="17" y2="3" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg>,
    years: [2021, 2020, 2019], questions: 0
  },
  { id: 4, name: "Social Studies",     color: "#0EA5E9",
    Icon: ({ c }) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke={c} strokeWidth="2"/><ellipse cx="12" cy="12" rx="4" ry="9" stroke={c} strokeWidth="2"/><line x1="3" y1="12" x2="21" y2="12" stroke={c} strokeWidth="2"/></svg>,
    years: [2021, 2020, 2019], questions: 0
  },
];

export default function Practice({ t }) {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState("practice");

  return (
    <div style={{ background: t.bg, minHeight: "100vh", paddingBottom: 100 }}>
      <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, padding: "56px 20px 20px" }}>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: t.text, letterSpacing: -0.5 }}>BECE Practice</h1>
        <p style={{ color: t.textMuted, fontSize: 13, marginTop: 4 }}>Past questions by subject</p>
      </div>

      <div style={{ padding: "20px" }}>
        {/* Mode selector */}
        <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 12 }}>SELECT MODE</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          <div
            onClick={() => setSelectedMode("practice")}
            style={{ background: selectedMode === "practice" ? `linear-gradient(135deg, ${t.green}, ${t.blue})` : t.surface, border: `1px solid ${selectedMode === "practice" ? "transparent" : t.border}`, borderRadius: 20, padding: "20px 16px", cursor: "pointer", boxShadow: selectedMode === "practice" ? `0 6px 20px ${t.green}33` : t.shadow, transition: "all 0.2s" }}
          >
            <div style={{ marginBottom: 10 }}><TargetIcon /></div>
            <div style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>Practice</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 4, lineHeight: 1.5 }}>See answers after each question</div>
          </div>
          <div
            onClick={() => setSelectedMode("exam")}
            style={{ background: selectedMode === "exam" ? `linear-gradient(135deg, ${t.yellow}, ${t.red})` : t.surface, border: `1px solid ${selectedMode === "exam" ? "transparent" : t.border}`, borderRadius: 20, padding: "20px 16px", cursor: "pointer", boxShadow: selectedMode === "exam" ? `0 6px 20px ${t.yellow}33` : t.shadow, transition: "all 0.2s" }}
          >
            <div style={{ marginBottom: 10 }}><TimerIcon /></div>
            <div style={{ fontWeight: 800, fontSize: 15, color: selectedMode === "exam" ? "#fff" : t.text }}>Exam Mode</div>
            <div style={{ fontSize: 12, color: selectedMode === "exam" ? "rgba(255,255,255,0.8)" : t.textMuted, marginTop: 4, lineHeight: 1.5 }}>Timed — results at the end</div>
          </div>
        </div>

        <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 14 }}>CHOOSE SUBJECT</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {subjects.map(s => (
            <div
              key={s.id}
              onClick={() => s.questions > 0 && navigate(`/practice/session?subjectId=${s.id}&subject=${encodeURIComponent(s.name)}&mode=${selectedMode}`)}
              style={{ background: t.surface, border: `1px solid ${s.questions > 0 ? `${s.color}33` : t.border}`, borderRadius: 16, padding: "14px 16px", cursor: s.questions > 0 ? "pointer" : "default", opacity: s.questions > 0 ? 1 : 0.5, boxShadow: t.shadow, transition: "all 0.2s" }}
              onMouseEnter={e => s.questions > 0 && (e.currentTarget.style.borderColor = `${s.color}66`)}
              onMouseLeave={e => s.questions > 0 && (e.currentTarget.style.borderColor = `${s.color}33`)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <s.Icon c={s.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: t.text, fontSize: 14 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: t.textMuted, marginTop: 3 }}>
                    {s.questions > 0 ? `${s.questions} questions available • ${s.years.join(", ")}` : "Coming soon"}
                  </div>
                </div>
                {s.questions > 0 && <ChevronRight color={t.textDim} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}