import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

function Toggle({ value, onChange, color }) {
  return (
    <div onClick={() => onChange(!value)} style={{ width: 44, height: 24, borderRadius: 12, background: value ? color : "#64748B", cursor: "pointer", position: "relative", transition: "background 0.3s", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 3, left: value ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.3s", boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }} />
    </div>
  );
}

export default function PrivacySecurity({ t }) {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    passcode: false,
    biometric: false,
    twoFactor: false,
    loginAlerts: true,
    dataSharing: false,
    profileVisible: true,
    activityVisible: false,
  });

  const toggle = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));

  const sections = [
    {
      title: "SECURITY",
      items: [
        { key: "passcode", label: "Passcode lock", desc: "Require passcode to open Zovea", type: "toggle", color: t.blue },
        { key: "biometric", label: "Biometric login", desc: "Use fingerprint or face to log in", type: "toggle", color: t.green },
        { key: "twoFactor", label: "Two-step verification", desc: "Add an extra layer of security to your account", type: "toggle", color: t.purple },
        { key: "changePassword", label: "Change password", desc: "Update your account password", type: "link" },
        { key: "devices", label: "Devices", desc: "Manage devices logged into your account", type: "link" },
        { key: "loginAlerts", label: "Login alerts", desc: "Get notified when a new device logs in", type: "toggle", color: t.yellow },
      ]
    },
    {
      title: "PRIVACY",
      items: [
        { key: "profileVisible", label: "Public profile", desc: "Allow others to see your profile in the community", type: "toggle", color: t.green },
        { key: "activityVisible", label: "Activity status", desc: "Show when you were last active", type: "toggle", color: t.blue },
        { key: "dataSharing", label: "Data & personalisation", desc: "Allow Zovea to personalise your experience", type: "toggle", color: t.purple },
        { key: "deleteData", label: "Download my data", desc: "Get a copy of all your Zovea data", type: "link" },
        { key: "deleteAccount", label: "Delete account", desc: "Permanently delete your account and all data", type: "danger" },
      ]
    }
  ];

  return (
    <div style={{ background: t.bg, minHeight: "100vh", paddingBottom: 40 }}>

      {/* Header */}
      <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, padding: "14px 20px 16px", position: "sticky", top: 0, zIndex: 50, display: "flex", alignItems: "center", gap: 14 }}>
        <button onClick={() => navigate("/profile")} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "8px 10px", cursor: "pointer", display: "flex", alignItems: "center" }}>
          <BackIcon color={t.text} />
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 900, color: t.text, letterSpacing: -0.5 }}>Privacy & security</h1>
      </div>

      <div style={{ padding: "20px" }}>
        {sections.map(section => (
          <div key={section.title} style={{ marginBottom: 24 }}>
            <p style={{ color: t.textDim, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 10 }}>{section.title}</p>
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, overflow: "hidden", boxShadow: t.shadow }}>
              {section.items.map((item, i) => (
                <div key={item.key || item.label}>
                  <div style={{ padding: "14px 18px", display: "flex", alignItems: "center", gap: 14, cursor: item.type !== "toggle" ? "pointer" : "default" }}
                    onMouseEnter={e => item.type !== "toggle" && (e.currentTarget.style.background = t.cardHover)}
                    onMouseLeave={e => item.type !== "toggle" && (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{ flex: 1 }}>
                      <p style={{ color: item.type === "danger" ? t.red : t.text, fontSize: 15, fontWeight: 600, marginBottom: 2 }}>{item.label}</p>
                      <p style={{ color: t.textMuted, fontSize: 12, lineHeight: 1.4 }}>{item.desc}</p>
                    </div>
                    {item.type === "toggle" && (
                      <Toggle value={settings[item.key]} onChange={() => toggle(item.key)} color={item.color} />
                    )}
                    {item.type === "link" && <ChevronRight color={t.textDim} />}
                    {item.type === "danger" && <ChevronRight color={t.red} />}
                  </div>
                  {i < section.items.length - 1 && <div style={{ height: 1, background: t.border, margin: "0 18px" }} />}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}