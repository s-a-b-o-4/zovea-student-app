import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API = "https://zovea-landing-production.up.railway.app";

const subjectMeta = {
  1: { name: "English Language",   color: "#A55EEA" },
  2: { name: "Mathematics",        color: "#4B7BEC" },
  3: { name: "Integrated Science", color: "#00C896" },
  4: { name: "Social Studies",     color: "#0EA5E9" },
  5: { name: "RME",                color: "#FF4757" },
  6: { name: "ICT",                color: "#FFC312" },
};

const BackIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRight = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LockIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="11" width="14" height="10" rx="2" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="2"/>
    <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function TopicList({ t }) {
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get("id");
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const meta = subjectMeta[subjectId] || { name: "Subject", color: "#4B7BEC" };

  useEffect(() => {
    if (!subjectId) return;
    axios.get(`${API}/api/subjects/${subjectId}/topics`)
      .then(res => setTopics(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [subjectId]);

  return (
    <div style={{ background: t.bg, minHeight: "100vh", paddingBottom: 100 }}>

      {/* Header */}
      <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, padding: "56px 20px 24px" }}>
        <button
          onClick={() => navigate("/subjects")}
          style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "8px 12px", cursor: "pointer", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}
        >
          <BackIcon color={t.text} />
          <span style={{ color: t.text, fontSize: 13, fontWeight: 600 }}>Back</span>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 16, background: `${meta.color}20`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: meta.color, boxShadow: `0 4px 12px ${meta.color}66` }} />
          </div>
          <div>
            <h1 style={{ color: t.text, fontSize: 22, fontWeight: 900, letterSpacing: -0.5 }}>{meta.name}</h1>
            <p style={{ color: t.textMuted, fontSize: 13, marginTop: 2 }}>{topics.length} topics • JHS Curriculum</p>
          </div>
        </div>

        {/* Progress */}
        <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 14, padding: "12px 16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: t.textMuted, fontSize: 12, fontWeight: 600 }}>Your progress</span>
            <span style={{ color: meta.color, fontSize: 12, fontWeight: 700 }}>0%</span>
          </div>
          <div style={{ background: t.border, borderRadius: 10, height: 6 }}>
            <div style={{ width: "0%", background: meta.color, borderRadius: 10, height: 6 }} />
          </div>
        </div>
      </div>

      {/* Topics */}
      <div style={{ padding: "20px" }}>
        <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 14 }}>TOPICS</p>

        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: t.textMuted }}>
            <div style={{ width: 36, height: 36, border: `3px solid ${t.border}`, borderTop: `3px solid ${meta.color}`, borderRadius: "50%", animation: "spin 1s linear infinite", margin: "0 auto 14px" }} />
            Loading topics...
          </div>
        ) : topics.length === 0 ? (
          <div style={{ textAlign: "center", padding: 60 }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ display: "block", margin: "0 auto 16px" }}>
              <circle cx="12" cy="12" r="10" fill={t.card} stroke={t.border} strokeWidth="2"/>
              <path d="M12 8v4M12 16h.01" stroke={t.textMuted} strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            <p style={{ color: t.textMuted, fontSize: 15, fontWeight: 600 }}>No topics yet</p>
            <p style={{ color: t.textDim, fontSize: 13, marginTop: 6 }}>Content coming soon</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {topics.map((topic, index) => (
              <div
                key={topic.id}
                onClick={() => index === 0 && navigate(`/lesson?topicId=${topic.id}&subjectId=${subjectId}`)}
                style={{
                  background: t.surface, border: `1px solid ${index === 0 ? `${meta.color}44` : t.border}`,
                  borderRadius: 18, padding: "16px 18px",
                  cursor: index === 0 ? "pointer" : "default",
                  opacity: index === 0 ? 1 : 0.6,
                  transition: "all 0.2s", boxShadow: t.shadow,
                  display: "flex", alignItems: "center", gap: 14
                }}
                onMouseEnter={e => index === 0 && (e.currentTarget.style.borderColor = `${meta.color}77`)}
                onMouseLeave={e => index === 0 && (e.currentTarget.style.borderColor = `${meta.color}44`)}
              >
                {/* Number badge */}
                <div style={{
                  width: 40, height: 40, borderRadius: 14, flexShrink: 0,
                  background: index === 0 ? meta.color : t.card,
                  border: `1px solid ${index === 0 ? meta.color : t.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: index === 0 ? "#fff" : t.textDim }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: t.text, fontSize: 14, letterSpacing: -0.2 }}>{topic.title}</div>
                  <div style={{ fontSize: 12, color: t.textMuted, marginTop: 3, lineHeight: 1.4 }}>
                    {topic.description?.slice(0, 55)}...
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    <span style={{ background: `${meta.color}18`, color: meta.color, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>{topic.grade}</span>
                    <span style={{ background: t.card, color: t.textMuted, fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 20, border: `1px solid ${t.border}` }}>Term {topic.term}</span>
                  </div>
                </div>

                <div style={{ flexShrink: 0 }}>
                  {index === 0
                    ? <ChevronRight color={meta.color} />
                    : <LockIcon color={t.textDim} />
                  }
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}