import { useState } from "react";

const BellIcon = ({ color }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const HeartIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M12 21C7 16 2 12 2 7.5A5 5 0 0 1 12 5a5 5 0 0 1 10 2.5C22 12 17 16 12 21Z" stroke={color} strokeWidth="2" fill="none"/>
  </svg>
);

const CommentIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ArrowUpIcon = ({ color }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M12 19V5M5 12l7-7 7 7" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ExternalIcon = ({ color }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="15,3 21,3 21,9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <line x1="10" y1="14" x2="21" y2="3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const feedPosts = [
  {
    id: 1,
    author: "Kwame A.",
    avatar: "KA",
    avatarColor: "#6366F1",
    time: "2h ago",
    subject: "Mathematics",
    subjectColor: "#4B7BEC",
    content: "Just finished the Number Systems topic and scored 100% on the quiz! The place value section really clicked after doing the flashcards 3 times.",
    upvotes: 24,
    comments: 8,
    tag: "WIN"
  },
  {
    id: 2,
    author: "Abena M.",
    avatar: "AM",
    avatarColor: "#00C896",
    time: "4h ago",
    subject: "Integrated Science",
    subjectColor: "#0D9488",
    content: "Does anyone else find Photosynthesis confusing? I keep mixing up the inputs and outputs. Any tips?",
    upvotes: 12,
    comments: 15,
    tag: "QUESTION"
  },
  {
    id: 3,
    author: "Kofi B.",
    avatar: "KB",
    avatarColor: "#F59E0B",
    time: "6h ago",
    subject: "English Language",
    subjectColor: "#A55EEA",
    content: "Pro tip for comprehension: always read the questions BEFORE reading the passage. You'll know exactly what to look for. Saved me so much time in mock exams.",
    upvotes: 47,
    comments: 11,
    tag: "TIP"
  },
  {
    id: 4,
    author: "Esi D.",
    avatar: "ED",
    avatarColor: "#E11D48",
    time: "1d ago",
    subject: "Social Studies",
    subjectColor: "#0EA5E9",
    content: "BECE 2021 Social Studies Paper was actually easier than I expected after practicing here. The questions on Ghana's government kept coming up!",
    upvotes: 31,
    comments: 6,
    tag: "INSIGHT"
  },
];

const communities = [
  { id: 1, name: "BECE 2026 Candidates", members: "2.4K", color: "#00C896", description: "Students preparing for BECE 2026. Share resources, tips and encouragement.", joined: true },
  { id: 2, name: "Mathematics Champions", members: "1.8K", color: "#4B7BEC", description: "Deep dive into Maths topics. Past questions, tricks and step-by-step solutions.", joined: false },
  { id: 3, name: "Science Squad", members: "1.2K", color: "#0D9488", description: "Biology, Chemistry and Physics discussions for JHS students.", joined: true },
  { id: 4, name: "English Language Hub", members: "980", color: "#A55EEA", description: "Grammar, comprehension, essay writing and oral tips.", joined: false },
  { id: 5, name: "Night Owls Study Group", members: "634", color: "#FFC312", description: "For students who study late. Accountability and motivation after 9PM.", joined: false },
  { id: 6, name: "BECE Past Questions", members: "3.1K", color: "#FF4757", description: "Every BECE past question discussed and explained by subject.", joined: true },
];

const tagColors = {
  WIN:     { bg: "#00C89618", color: "#00C896" },
  QUESTION:{ bg: "#4B7BEC18", color: "#4B7BEC" },
  TIP:     { bg: "#FFC31218", color: "#FFC312" },
  INSIGHT: { bg: "#A55EEA18", color: "#A55EEA" },
};

function Feed({ t }) {
  const [upvoted, setUpvoted] = useState({});

  return (
    <div style={{ padding: "16px 20px" }}>
      {/* Announcement banner */}
      <div style={{ background: "linear-gradient(135deg, #00C89618, #4B7BEC18)", border: "1px solid #00C89633", borderRadius: 16, padding: "14px 16px", marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #00C896, #4B7BEC)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p style={{ color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 2 }}>BECE 2026 is in 47 days</p>
          <p style={{ color: t.textMuted, fontSize: 12 }}>2,847 students are studying with Zovea today</p>
        </div>
      </div>

      {/* Hot conversations label */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF4757">
          <path d="M12 2C12 2 7 8 7 13C7 15.76 9.24 18 12 18C14.76 18 17 15.76 17 13C17 8 12 2 12 2Z" fill="#FF4757"/>
        </svg>
        <span style={{ color: t.text, fontSize: 15, fontWeight: 800, letterSpacing: -0.3 }}>Hot conversations</span>
      </div>

      {/* Posts */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {feedPosts.map(post => {
          const tag = tagColors[post.tag];
          return (
            <div key={post.id} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, padding: "16px", boxShadow: t.shadow }}>
              {/* Post header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 12, background: post.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#fff", flexShrink: 0 }}>
                    {post.avatar}
                  </div>
                  <div>
                    <p style={{ color: t.text, fontSize: 13, fontWeight: 700, marginBottom: 1 }}>{post.author}</p>
                    <p style={{ color: t.textMuted, fontSize: 11 }}>{post.time}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span style={{ background: tag.bg, color: tag.color, fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 20, letterSpacing: 0.5 }}>{post.tag}</span>
                  <span style={{ background: `${post.subjectColor}18`, color: post.subjectColor, fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 20 }}>{post.subject}</span>
                </div>
              </div>

              {/* Content */}
              <p style={{ color: t.textMuted, fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>{post.content}</p>

              {/* Actions */}
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <button
                  onClick={() => setUpvoted(u => ({ ...u, [post.id]: !u[post.id] }))}
                  style={{ display: "flex", alignItems: "center", gap: 5, background: upvoted[post.id] ? "#00C89618" : "none", border: `1px solid ${upvoted[post.id] ? "#00C89644" : t.border}`, borderRadius: 20, padding: "5px 12px", cursor: "pointer", transition: "all 0.2s" }}
                >
                  <ArrowUpIcon color={upvoted[post.id] ? "#00C896" : t.textMuted} />
                  <span style={{ color: upvoted[post.id] ? "#00C896" : t.textMuted, fontSize: 12, fontWeight: 700 }}>{post.upvotes + (upvoted[post.id] ? 1 : 0)}</span>
                </button>
                <button style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: `1px solid ${t.border}`, borderRadius: 20, padding: "5px 12px", cursor: "pointer" }}>
                  <CommentIcon color={t.textMuted} />
                  <span style={{ color: t.textMuted, fontSize: 12, fontWeight: 700 }}>{post.comments}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Community({ t }) {
  const [joined, setJoined] = useState({ 1: true, 3: true, 6: true });

  return (
    <div style={{ padding: "16px 20px" }}>
      <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 14 }}>COMMUNITIES</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {communities.map(c => (
          <div key={c.id} style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 18, padding: "16px", boxShadow: t.shadow }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: `${c.color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: 18, height: 18, borderRadius: "50%", background: c.color, boxShadow: `0 4px 10px ${c.color}66` }} />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: t.text, fontSize: 14, fontWeight: 800, marginBottom: 2, letterSpacing: -0.2 }}>{c.name}</p>
                <p style={{ color: t.textMuted, fontSize: 11 }}>{c.members} members</p>
              </div>
              <button
                onClick={() => setJoined(j => ({ ...j, [c.id]: !j[c.id] }))}
                style={{
                  background: joined[c.id] ? t.card : `linear-gradient(135deg, ${c.color}, ${c.color}cc)`,
                  border: `1px solid ${joined[c.id] ? t.border : "transparent"}`,
                  borderRadius: 20, padding: "7px 16px",
                  color: joined[c.id] ? t.textMuted : "#fff",
                  fontSize: 12, fontWeight: 700, cursor: "pointer",
                  transition: "all 0.2s", flexShrink: 0
                }}
              >
                {joined[c.id] ? "Joined" : "Join"}
              </button>
            </div>
            <p style={{ color: t.textMuted, fontSize: 12, lineHeight: 1.5, marginTop: 10 }}>{c.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Social({ t, user }) {
  const [tab, setTab] = useState("feed");
  const initials = user?.full_name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "S";

  return (
    <div style={{ background: t.bg, minHeight: "100vh", paddingBottom: 100 }}>

      {/* Top Bar */}
      <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, padding: "56px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #00C896, #4B7BEC)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: "#fff" }}>
            {initials}
          </div>
          <h1 style={{ fontSize: 18, fontWeight: 900, color: t.text, letterSpacing: -0.5 }}>Social</h1>
          <button style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}>
            <BellIcon color={t.textMuted} />
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 0 }}>
          {["feed", "community"].map(tb => (
            <button key={tb} onClick={() => setTab(tb)} style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "12px 20px 14px",
              borderBottom: tab === tb ? `2px solid ${t.green}` : "2px solid transparent",
              color: tab === tb ? t.text : t.textMuted,
              fontSize: 15, fontWeight: tab === tb ? 800 : 500,
              letterSpacing: -0.2, transition: "all 0.2s",
              textTransform: "capitalize"
            }}>
              {tb === "feed" ? "Feed" : "Community"}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {tab === "feed" ? <Feed t={t} /> : <Community t={t} />}
    </div>
  );
}