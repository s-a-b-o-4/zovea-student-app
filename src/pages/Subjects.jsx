import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/TopBar";
import axios from "axios";


const API = "https://zovea-landing-production.up.railway.app";

const subjectMeta = {
  "English Language":       { color: "#A55EEA", short: "English" },
  "Mathematics":            { color: "#4B7BEC", short: "Maths" },
  "Integrated Science":     { color: "#00C896", short: "Science" },
  "Social Studies":         { color: "#0EA5E9", short: "Social" },
  "Religious & Moral Education": { color: "#FF4757", short: "RME" },
  "Information & Communication Technology": { color: "#FFC312", short: "ICT" },
};

export default function Subjects({ t }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/api/subjects?level=JHS`)
      .then(res => setSubjects(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ background: t.bg, minHeight: "100vh", paddingBottom: 100 }}>
      <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, padding: "14px 20px 20px" , position: "sticky", top: 0, zIndex: 50}}>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: t.text, letterSpacing: -0.5 }}>Subjects</h1>
        <p style={{ color: t.textMuted, fontSize: 13, marginTop: 4 }}>JHS Core Curriculum</p>
      </div>

      <div style={{ padding: "20px" }}>
        {loading ? (
          <div style={{ textAlign: "center", padding: 40, color: t.textMuted }}>Loading...</div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12 }}>
            {subjects.map(s => {
              const meta = subjectMeta[s.name] || { color: t.blue, short: s.name };
              return (
                <div key={s.id} onClick={() => navigate(`/topics?id=${s.id}`)}
                  style={{ background: t.surface, border: `1px solid ${meta.color}33`, borderRadius: 20, padding: "20px 14px", cursor: "pointer", textAlign: "center", transition: "all 0.2s", boxShadow: t.shadow }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${meta.color}12`; e.currentTarget.style.borderColor = `${meta.color}66`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = t.surface; e.currentTarget.style.borderColor = `${meta.color}33`; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ width: 52, height: 52, borderRadius: 16, background: `${meta.color}20`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: meta.color, boxShadow: `0 4px 12px ${meta.color}66` }} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: t.text, marginBottom: 4 }}>{meta.short}</div>
                  <div style={{ fontSize: 11, color: t.textMuted }}>{s.level}</div>
                  <div style={{ marginTop: 12, background: t.border, borderRadius: 6, height: 4 }}>
                    <div style={{ width: "0%", background: meta.color, borderRadius: 6, height: 4 }} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}