import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API = "https://zovea-landing-production.up.railway.app";

const BackIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function StudyGuide({ content, t }) {
  if (!content) return null;
  const lines = content.split("\n");
  return (
    <div style={{ lineHeight: 1.8 }}>
      {lines.map((line, i) => {
        if (line.startsWith("## ")) return (
          <h2 key={i} style={{ fontSize: 20, fontWeight: 900, color: t.text, margin: "20px 0 10px", letterSpacing: -0.5 }}>
            {line.replace("## ", "")}
          </h2>
        );
        if (line.startsWith("### ")) return (
          <h3 key={i} style={{ fontSize: 15, fontWeight: 800, color: t.text, margin: "16px 0 8px", letterSpacing: -0.3 }}>
            {line.replace("### ", "")}
          </h3>
        );
        if (line.startsWith("- ")) return (
          <div key={i} style={{ display: "flex", gap: 10, margin: "6px 0", alignItems: "flex-start" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.green, marginTop: 9, flexShrink: 0 }} />
            <p style={{ color: t.textMuted, fontSize: 15, margin: 0, lineHeight: 1.7 }}>{line.replace("- ", "")}</p>
          </div>
        );
        if (line.trim() === "") return <div key={i} style={{ height: 8 }} />;
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} style={{ color: t.textMuted, fontSize: 15, margin: "4px 0", lineHeight: 1.7 }}>
            {parts.map((part, j) => j % 2 === 1
              ? <strong key={j} style={{ color: t.text, fontWeight: 700 }}>{part}</strong>
              : part
            )}
          </p>
        );
      })}
    </div>
  );
}

function Flashcard({ card, index, total, t }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ color: t.textMuted, fontSize: 12, fontWeight: 600, marginBottom: 16, letterSpacing: 0.5 }}>
        CARD {index + 1} OF {total}
      </p>
      <div
        onClick={() => setFlipped(!flipped)}
        style={{
          background: flipped ? `linear-gradient(135deg, ${t.green}22, ${t.blue}22)` : t.surface,
          border: `1px solid ${flipped ? t.green : t.border}`,
          borderRadius: 24, padding: "48px 28px",
          minHeight: 220, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 16,
          cursor: "pointer", transition: "all 0.3s",
          boxShadow: flipped ? `0 8px 32px ${t.green}22` : t.shadow
        }}
      >
        {!flipped ? (
          <>
            <div style={{ background: t.blueBg, border: `1px solid ${t.blue}33`, borderRadius: 20, padding: "5px 14px" }}>
              <span style={{ color: t.blue, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>TERM</span>
            </div>
            <p style={{ fontSize: 22, fontWeight: 900, color: t.text, textAlign: "center", letterSpacing: -0.5 }}>{card.term}</p>
            <p style={{ fontSize: 12, color: t.textDim }}>Tap to reveal definition</p>
          </>
        ) : (
          <>
            <div style={{ background: t.greenBg, border: `1px solid ${t.green}33`, borderRadius: 20, padding: "5px 14px" }}>
              <span style={{ color: t.green, fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>DEFINITION</span>
            </div>
            <p style={{ fontSize: 17, fontWeight: 600, color: t.text, textAlign: "center", lineHeight: 1.6 }}>{card.definition}</p>
            <p style={{ fontSize: 12, color: t.textDim }}>Tap to flip back</p>
          </>
        )}
      </div>
    </div>
  );
}

function Quiz({ questions, t, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState([]);

  const q = questions[current];
  const opts = [
    { key: "A", text: q?.option_a },
    { key: "B", text: q?.option_b },
    { key: "C", text: q?.option_c },
    { key: "D", text: q?.option_d },
  ];

  const handleSelect = (key) => {
    if (answered) return;
    setSelected(key);
    setAnswered(true);
    const correct = key === q.correct_answer;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, { correct, explanation: q.explanation }]);
  };

  const next = () => {
    const finalScore = score + (selected === q.correct_answer ? 1 : 0);
    if (current + 1 >= questions.length) {
      setFinished(true);
      onComplete(finalScore);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const getBg = (key) => {
    if (!answered) return t.surface;
    if (key === q.correct_answer) return t.greenBg;
    if (key === selected) return t.redBg;
    return t.surface;
  };

  const getBorder = (key) => {
    if (!answered) return t.border;
    if (key === q.correct_answer) return `${t.green}66`;
    if (key === selected) return `${t.red}66`;
    return t.border;
  };

  const reset = () => {
    setCurrent(0); setSelected(null); setAnswered(false);
    setScore(0); setFinished(false); setAnswers([]);
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          background: pct >= 60
            ? `linear-gradient(135deg, ${t.green}, ${t.blue})`
            : `linear-gradient(135deg, ${t.yellow}, ${t.red})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 20px", boxShadow: `0 8px 32px ${pct >= 60 ? t.green : t.red}44`
        }}>
          <span style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>{pct}%</span>
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: t.text, letterSpacing: -0.5, marginBottom: 8 }}>
          {pct >= 80 ? "Excellent!" : pct >= 60 ? "Good job!" : "Keep going!"}
        </h2>
        <p style={{ color: t.textMuted, fontSize: 15, marginBottom: 28 }}>
          {score} out of {questions.length} correct
        </p>

        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 16, padding: 18, textAlign: "left", marginBottom: 20 }}>
          <p style={{ fontWeight: 700, color: t.textMuted, fontSize: 11, letterSpacing: 1, marginBottom: 14 }}>REVIEW</p>
          {answers.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
              <div style={{ width: 20, height: 20, borderRadius: "50%", background: a.correct ? t.green : t.red, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  {a.correct
                    ? <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    : <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                  }
                </svg>
              </div>
              <p style={{ color: t.textMuted, fontSize: 13, lineHeight: 1.5, margin: 0 }}>{a.explanation}</p>
            </div>
          ))}
        </div>

        <button onClick={reset} style={{ width: "100%", background: `linear-gradient(135deg, ${t.green}, ${t.blue})`, border: "none", borderRadius: 14, padding: "15px", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: `0 4px 16px ${t.green}33` }}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ color: t.textMuted, fontSize: 12, fontWeight: 600 }}>Question {current + 1} of {questions.length}</span>
        <span style={{ color: t.green, fontSize: 12, fontWeight: 700 }}>Score: {score}</span>
      </div>
      <div style={{ background: t.border, borderRadius: 10, height: 5, marginBottom: 20 }}>
        <div style={{ width: `${((current + 1) / questions.length) * 100}%`, background: `linear-gradient(90deg, ${t.green}, ${t.blue})`, borderRadius: 10, height: 5, transition: "width 0.4s" }} />
      </div>

      <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: "20px", marginBottom: 18 }}>
        <p style={{ fontSize: 16, fontWeight: 700, color: t.text, lineHeight: 1.6, letterSpacing: -0.2 }}>{q?.question}</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
        {opts.map(opt => (
          <button key={opt.key} onClick={() => handleSelect(opt.key)} style={{
            background: getBg(opt.key), border: `1px solid ${getBorder(opt.key)}`,
            borderRadius: 14, padding: "14px 16px", cursor: answered ? "default" : "pointer",
            display: "flex", alignItems: "center", gap: 12, textAlign: "left", transition: "all 0.2s"
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 10, flexShrink: 0,
              background: answered && opt.key === q.correct_answer ? t.green
                : answered && opt.key === selected ? t.red
                : opt.key === selected ? t.blue : t.card,
              border: `1px solid ${t.border}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: (answered && (opt.key === q.correct_answer || opt.key === selected)) ? "#fff" : t.textMuted,
              fontWeight: 800, fontSize: 12, transition: "all 0.2s"
            }}>{opt.key}</div>
            <span style={{ fontSize: 14, color: t.text, fontWeight: 500, lineHeight: 1.4 }}>{opt.text}</span>
          </button>
        ))}
      </div>

      {answered && (
        <div style={{ background: selected === q.correct_answer ? t.greenBg : t.redBg, border: `1px solid ${selected === q.correct_answer ? `${t.green}44` : `${t.red}44`}`, borderRadius: 14, padding: "14px 16px", marginBottom: 18 }}>
          <p style={{ fontSize: 13, color: selected === q.correct_answer ? t.green : t.red, lineHeight: 1.6, margin: 0 }}>
            <strong>{selected === q.correct_answer ? "Correct! " : "Not quite. "}</strong>
            {q.explanation}
          </p>
        </div>
      )}

      {answered && (
        <button onClick={next} style={{ width: "100%", background: `linear-gradient(135deg, ${t.green}, ${t.blue})`, border: "none", borderRadius: 14, padding: "15px", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: `0 4px 16px ${t.green}33` }}>
          {current + 1 >= questions.length ? "See Results" : "Next Question →"}
        </button>
      )}
    </div>
  );
}

export default function Lesson({ t }) {
  const [searchParams] = useSearchParams();
  const topicId = searchParams.get("topicId");
  const [lessonData, setLessonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("guide");
  const [cardIndex, setCardIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/api/topics/${topicId}/lessons`)
      .then(res => {
        if (res.data.length > 0) return axios.get(`${API}/api/lessons/${res.data[0].id}`);
        throw new Error("No lessons");
      })
      .then(res => setLessonData(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [topicId]);

  const tabs = [
    { key: "guide", label: "Study Guide",
      Icon: ({ color }) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="14" height="18" rx="2" stroke={color} strokeWidth="2.5"/><path d="M8 8H14M8 12H14M8 16H11" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>
    },
    { key: "flashcards", label: "Flashcards",
      Icon: ({ color }) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="20" height="14" rx="3" stroke={color} strokeWidth="2.5"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={color} strokeWidth="2.5" strokeLinecap="round"/><line x1="12" y1="11" x2="12" y2="15" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="10" y1="13" x2="14" y2="13" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>
    },
    { key: "quiz", label: "Quiz",
      Icon: ({ color }) => <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2.5"/><path d="M9 9a3 3 0 1 1 3 3v2" stroke={color} strokeWidth="2.5" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill={color}/></svg>
    },
  ];

  if (loading) return (
    <div style={{ background: t.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 40, height: 40, border: `3px solid ${t.border}`, borderTop: `3px solid ${t.green}`, borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      <p style={{ color: t.textMuted, fontWeight: 600, fontSize: 14 }}>Loading lesson...</p>
    </div>
  );

  if (!lessonData) return (
    <div style={{ background: t.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, padding: 20 }}>
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill={t.card} stroke={t.border} strokeWidth="2"/>
        <path d="M12 8v4M12 16h.01" stroke={t.textMuted} strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <p style={{ color: t.textMuted, fontSize: 15, fontWeight: 600, textAlign: "center" }}>No lessons available yet</p>
      <button onClick={() => navigate(-1)} style={{ background: t.green, border: "none", borderRadius: 12, padding: "12px 24px", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 14 }}>Go Back</button>
    </div>
  );

  const { lesson, flashcards, quiz } = lessonData;

  return (
    <div style={{ background: t.bg, minHeight: "100vh", paddingBottom: 100 }}>

      {/* Header */}
      <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, padding: "56px 20px 0" }}>
        <button onClick={() => navigate(-1)} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "8px 12px", cursor: "pointer", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
          <BackIcon color={t.text} />
          <span style={{ color: t.text, fontSize: 13, fontWeight: 600 }}>Back</span>
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 900, color: t.text, letterSpacing: -0.5, marginBottom: 10 }}>{lesson.title}</h1>
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <span style={{ background: t.greenBg, border: `1px solid ${t.green}33`, color: t.green, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>+{lesson.xp_reward} XP</span>
          <span style={{ background: t.blueBg, border: `1px solid ${t.blue}33`, color: t.blue, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>{flashcards?.length || 0} Flashcards</span>
          <span style={{ background: t.purpleBg, border: `1px solid ${t.purple}33`, color: t.purple, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>{quiz?.length || 0} Questions</span>
        </div>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: 0 }}>
          {tabs.map(tb => {
            const active = tab === tb.key;
            return (
              <button key={tb.key} onClick={() => setTab(tb.key)} style={{
                flex: 1, background: "none", border: "none", cursor: "pointer",
                padding: "12px 8px", display: "flex", flexDirection: "column",
                alignItems: "center", gap: 5,
                borderBottom: active ? `2px solid ${t.green}` : `2px solid transparent`,
                color: active ? t.green : t.textMuted, transition: "all 0.2s"
              }}>
                <tb.Icon color={active ? t.green : t.textMuted} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>{tb.label.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "20px" }}>

        {tab === "guide" && (
          <div>
            <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: "22px", marginBottom: 16, boxShadow: t.shadow }}>
              <StudyGuide content={lesson.study_guide} t={t} />
            </div>
            <button onClick={() => setTab("flashcards")} style={{ width: "100%", background: `linear-gradient(135deg, ${t.green}, ${t.blue})`, border: "none", borderRadius: 14, padding: "15px", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: `0 4px 16px ${t.green}33` }}>
              Continue to Flashcards →
            </button>
          </div>
        )}

        {tab === "flashcards" && (
          <div>
            {flashcards?.length > 0 ? (
              <>
                <Flashcard card={flashcards[cardIndex]} index={cardIndex} total={flashcards.length} t={t} />
                <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                  <button onClick={() => setCardIndex(i => Math.max(0, i - 1))} disabled={cardIndex === 0}
                    style={{ flex: 1, background: cardIndex === 0 ? t.card : t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: "13px", fontWeight: 700, color: cardIndex === 0 ? t.textDim : t.text, cursor: cardIndex === 0 ? "default" : "pointer", fontSize: 14 }}>
                    ← Prev
                  </button>
                  {cardIndex < flashcards.length - 1 ? (
                    <button onClick={() => setCardIndex(i => i + 1)}
                      style={{ flex: 1, background: `linear-gradient(135deg, ${t.green}, ${t.blue})`, border: "none", borderRadius: 14, padding: "13px", fontWeight: 800, color: "#fff", cursor: "pointer", fontSize: 14 }}>
                      Next →
                    </button>
                  ) : (
                    <button onClick={() => setTab("quiz")}
                      style={{ flex: 1, background: `linear-gradient(135deg, ${t.blue}, ${t.purple})`, border: "none", borderRadius: 14, padding: "13px", fontWeight: 800, color: "#fff", cursor: "pointer", fontSize: 14 }}>
                      Take Quiz →
                    </button>
                  )}
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 16 }}>
                  {flashcards.map((_, i) => (
                    <div key={i} onClick={() => setCardIndex(i)} style={{ width: i === cardIndex ? 20 : 7, height: 7, borderRadius: 4, background: i === cardIndex ? t.green : t.border, cursor: "pointer", transition: "all 0.3s" }} />
                  ))}
                </div>
              </>
            ) : (
              <p style={{ textAlign: "center", color: t.textMuted, padding: 40 }}>No flashcards yet</p>
            )}
          </div>
        )}

        {tab === "quiz" && (
          <div>
            {quiz?.length > 0
              ? <Quiz questions={quiz} t={t} onComplete={() => {}} />
              : <p style={{ textAlign: "center", color: t.textMuted, padding: 40 }}>No quiz questions yet</p>
            }
          </div>
        )}

      </div>
    </div>
  );
}