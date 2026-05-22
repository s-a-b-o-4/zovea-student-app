import { useState, useEffect } from "react";
import { mentors } from "../mentor";

export default function MentorMessage({ mentorId, message, type = "default", t, onDismiss }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const mentor = mentors[mentorId] || mentors.ama;

  useEffect(() => {
    if (message) {
      setTimeout(() => setVisible(true), 100);
    }
  }, [message]);

  const handleDismiss = () => {
    setVisible(false);
    setTimeout(() => {
      setDismissed(true);
      onDismiss?.();
    }, 300);
  };

  if (!message || dismissed) return null;

  const typeStyles = {
    default:  { border: `1px solid ${mentor.color}33`, bg: `${mentor.color}10` },
    failure:  { border: `1px solid #FF475733`, bg: "#FF475710" },
    success:  { border: `1px solid #00C89633`, bg: "#00C89610" },
    close:    { border: `1px solid #4B7BEC33`, bg: "#4B7BEC10" },
  };

  const style = typeStyles[type] || typeStyles.default;

  return (
    <div style={{
      background: style.bg, border: style.border,
      borderRadius: 18, padding: "14px 16px",
      marginBottom: 16, transition: "all 0.3s",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(10px)",
    }}>
      <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
        {/* Avatar */}
        <div style={{
          width: 40, height: 40, borderRadius: 14, flexShrink: 0,
          background: mentor.gradient,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20, boxShadow: `0 4px 12px ${mentor.color}33`
        }}>
          {mentor.emoji}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
            <span style={{ color: mentor.color, fontSize: 12, fontWeight: 700, letterSpacing: 0.5 }}>{mentor.name.toUpperCase()}</span>
            <button onClick={handleDismiss} style={{ background: "none", border: "none", cursor: "pointer", padding: 2 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke={t.textDim} strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <p style={{ color: t.text, fontSize: 14, lineHeight: 1.5, margin: 0, fontWeight: 500 }}>{message}</p>
        </div>
      </div>
    </div>
  );
}