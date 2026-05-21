import { useNavigate } from "react-router-dom";

// English: Thick closed book with bookmark
const BookIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="8" y="6" width="28" height="36" rx="3" fill="white" fillOpacity="0.95"/>
    <rect x="8" y="6" width="28" height="36" rx="3" stroke="white" strokeWidth="2.5"/>
    <rect x="6" y="6" width="6" height="36" rx="2" fill="white" fillOpacity="0.5"/>
    <rect x="14" y="14" width="16" height="2.5" rx="1.25" fill="#6366F1"/>
    <rect x="14" y="20" width="12" height="2.5" rx="1.25" fill="#6366F1"/>
    <path d="M30 6 L30 22 L26 19 L22 22 L22 6" fill="#6366F1" stroke="#6366F1" strokeWidth="1"/>
  </svg>
);

// Science: Beaker filled with liquid
const BeakerIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M16 8 L16 22 L8 38 C7 40 8.5 42 11 42 L37 42 C39.5 42 41 40 40 38 L32 22 L32 8" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <path d="M10 32 L38 32 L32 22 L16 22 Z" fill="white" fillOpacity="0.4"/>
    <path d="M8.5 36 L39.5 36 L37 42 L11 42 Z" fill="white" fillOpacity="0.7"/>
    <line x1="13" y1="8" x2="35" y2="8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="20" cy="35" r="2" fill="white" fillOpacity="0.9"/>
    <circle cx="28" cy="33" r="1.5" fill="white" fillOpacity="0.7"/>
    <circle cx="24" cy="37" r="1.5" fill="white" fillOpacity="0.6"/>
  </svg>
);

// ICT: Monitor with code brackets
const MonitorIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="4" y="8" width="40" height="26" rx="3" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="3"/>
    <rect x="8" y="12" width="32" height="18" rx="2" fill="white" fillOpacity="0.15"/>
    <path d="M18 18 L13 22 L18 26" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M30 18 L35 22 L30 26" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="22" y1="17" x2="26" y2="27" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <rect x="17" y="34" width="14" height="3" rx="1.5" fill="white" fillOpacity="0.6"/>
    <rect x="12" y="37" width="24" height="3" rx="1.5" fill="white" fillOpacity="0.4"/>
  </svg>
);

// Mathematics: Bold sqrt symbol with x
const MathIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M4 28 L10 28 L16 38 L26 10 L44 10" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    <line x1="26" y1="10" x2="44" y2="10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    <text x="30" y="32" fontSize="13" fill="white" fontWeight="900" fillOpacity="0.9">x</text>
  </svg>
);

// RME: Open hands holding a heart
const HandsHeartIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M8 28 C8 28 6 24 8 20 C10 16 14 18 14 18 L20 28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="white" fillOpacity="0.2"/>
    <path d="M40 28 C40 28 42 24 40 20 C38 16 34 18 34 18 L28 28" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="white" fillOpacity="0.2"/>
    <path d="M8 28 Q8 36 24 38 Q40 36 40 28 L28 28 L20 28 Z" fill="white" fillOpacity="0.3" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M24 14 C24 14 20 10 17 12 C14 14 15 18 18 20 L24 25 L30 20 C33 18 34 14 31 12 C28 10 24 14 24 14Z" fill="white" fillOpacity="0.95"/>
  </svg>
);

// Social Studies: Globe with meridians
const GlobeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="18" stroke="white" strokeWidth="3" fill="white" fillOpacity="0.1"/>
    <ellipse cx="24" cy="24" rx="8" ry="18" stroke="white" strokeWidth="2.5" fill="none"/>
    <line x1="6" y1="24" x2="42" y2="24" stroke="white" strokeWidth="2.5"/>
    <path d="M8 16 Q16 13 24 14 Q32 13 40 16" stroke="white" strokeWidth="2" fill="none" strokeOpacity="0.8"/>
    <path d="M8 32 Q16 35 24 34 Q32 35 40 32" stroke="white" strokeWidth="2" fill="none" strokeOpacity="0.8"/>
    <circle cx="24" cy="24" r="3" fill="white" fillOpacity="0.9"/>
  </svg>
);

const subjectMeta = {
  "English Language":       { Icon: BookIcon,      bg: "linear-gradient(145deg, #6366F1, #4F46E5)", shadow: "#6366F1" },
  "Mathematics":            { Icon: MathIcon,      bg: "linear-gradient(145deg, #3B82F6, #2563EB)", shadow: "#3B82F6" },
  "Integrated Science":     { Icon: BeakerIcon,    bg: "linear-gradient(145deg, #0D9488, #0F766E)", shadow: "#0D9488" },
  "Social Studies":         { Icon: GlobeIcon,     bg: "linear-gradient(145deg, #0EA5E9, #0284C7)", shadow: "#0EA5E9" },
  "Religious & Moral Education": { Icon: HandsHeartIcon, bg: "linear-gradient(145deg, #E11D48, #BE123C)", shadow: "#E11D48" },
  "Information & Communication Technology": { Icon: MonitorIcon, bg: "linear-gradient(145deg, #F59E0B, #D97706)", shadow: "#F59E0B" },
};

export default function SubjectCard({ subject, progress = 0, onClick }) {
  const navigate = useNavigate();
  const meta = subjectMeta[subject.name] || {
    Icon: BookIcon, bg: "linear-gradient(145deg, #3B82F6, #2563EB)", shadow: "#3B82F6"
  };
  const { Icon } = meta;

  const shortName = subject.name === "Religious & Moral Education" ? "RME"
    : subject.name === "Information & Communication Technology" ? "ICT"
    : subject.name;

  return (
    <div
      onClick={() => onClick ? onClick() : navigate(`/topics?id=${subject.id}`)}
      style={{
        background: meta.bg, borderRadius: 20, overflow: "hidden",
        cursor: "pointer", position: "relative",
        boxShadow: `0 6px 18px ${meta.shadow}44`,
        transition: "transform 0.2s, box-shadow 0.2s",
        aspectRatio: "1", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 8, padding: "12px 8px"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "scale(1.05)";
        e.currentTarget.style.boxShadow = `0 12px 28px ${meta.shadow}66`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = `0 6px 18px ${meta.shadow}44`;
      }}
    >
      <div style={{ position:"absolute", top:-14, right:-14, width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,0.08)" }}/>
      <div style={{ position:"absolute", bottom:-10, left:-10, width:38, height:38, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
      <div style={{ position:"relative", zIndex:1 }}><Icon /></div>
      <div style={{ position:"relative", zIndex:1, fontSize: 9.5, fontWeight: 800, color: "rgba(255,255,255,0.95)", textAlign: "center", lineHeight: 1.3, letterSpacing: 0.5 }}>
        {shortName.toUpperCase()}
      </div>
      <div style={{ position:"relative", zIndex:1, width:"75%", background:"rgba(255,255,255,0.25)", borderRadius:10, height:3 }}>
        <div style={{ width:`${progress}%`, background:"#fff", borderRadius:10, height:3 }}/>
      </div>
    </div>
  );
}