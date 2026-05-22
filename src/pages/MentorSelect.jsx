import { useState } from "react";
import { mentors } from "../mentor";

export default function MentorSelect({ t, onSelect }) {
  const [selected, setSelected] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleConfirm = () => {
    if (!selected) return;
    setAnimating(true);
    setTimeout(() => {
      localStorage.setItem("zovea_mentor", selected);
      onSelect(selected);
    }, 600);
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px", opacity: animating ? 0 : 1, transition: "opacity 0.6s" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 36, maxWidth: 360 }}>
        <div style={{ width: 60, height: 60, borderRadius: 20, background: "linear-gradient(135deg, #00C896, #4B7BEC)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 24, color: "#fff", margin: "0 auto 20px", boxShadow: "0 8px 24px #00C89633" }}>Z</div>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: t.text, letterSpacing: -0.5, marginBottom: 10 }}>Choose your mentor</h1>
        <p style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.6 }}>Your mentor will guide you through your BECE preparation. You can change this later.</p>
      </div>

      {/* Mentor Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 400, marginBottom: 28 }}>
        {Object.values(mentors).map(mentor => (
          <div
            key={mentor.id}
            onClick={() => setSelected(mentor.id)}
            style={{
              background: selected === mentor.id ? `${mentor.color}15` : t.surface,
              border: `2px solid ${selected === mentor.id ? mentor.color : t.border}`,
              borderRadius: 22, padding: "20px", cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: selected === mentor.id ? `0 8px 24px ${mentor.color}33` : t.shadow
            }}
          >
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              {/* Avatar */}
              <div style={{
                width: 60, height: 60, borderRadius: 18, flexShrink: 0,
                background: mentor.gradient,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28, boxShadow: `0 4px 16px ${mentor.color}44`
              }}>
                {mentor.emoji}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 900, color: t.text, letterSpacing: -0.3 }}>{mentor.name}</h3>
                  <span style={{ background: `${mentor.color}18`, color: mentor.color, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20 }}>{mentor.title}</span>
                </div>
                <p style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.5, margin: 0 }}>{mentor.description}</p>
              </div>
            </div>

            {/* Sample greeting */}
            {selected === mentor.id && (
              <div style={{ marginTop: 14, background: t.card, border: `1px solid ${mentor.color}22`, borderRadius: 14, padding: "12px 14px" }}>
                <p style={{ color: mentor.color, fontSize: 12, fontWeight: 700, marginBottom: 4, letterSpacing: 0.5 }}>SAMPLE GREETING</p>
                <p style={{ color: t.text, fontSize: 13, lineHeight: 1.5, margin: 0, fontStyle: "italic" }}>
                  "{mentor.greetings.evening[0]}"
                </p>
              </div>
            )}

            {/* Selected indicator */}
            {selected === mentor.id && (
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 12 }}>
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: mentor.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span style={{ color: mentor.color, fontSize: 12, fontWeight: 700 }}>Selected</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirm}
        disabled={!selected}
        style={{
          width: "100%", maxWidth: 400,
          background: selected ? `linear-gradient(135deg, ${mentors[selected]?.color || "#00C896"}, #4B7BEC)` : t.card,
          border: `1px solid ${selected ? "transparent" : t.border}`,
          borderRadius: 16, padding: "16px",
          color: selected ? "#fff" : t.textDim,
          fontWeight: 800, fontSize: 16, cursor: selected ? "pointer" : "default",
          boxShadow: selected ? `0 4px 20px ${mentors[selected]?.color || "#00C896"}44` : "none",
          transition: "all 0.3s", letterSpacing: 0.3
        }}
      >
        {selected ? `Start with ${mentors[selected]?.name} →` : "Select a mentor to continue"}
      </button>

      <p style={{ color: t.textDim, fontSize: 12, marginTop: 16, textAlign: "center" }}>You can always switch mentors in your profile settings</p>
    </div>
  );
}