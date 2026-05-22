import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const API = "https://zovea-landing-production.up.railway.app";

const BackIcon = ({ color }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const TimerIcon = ({ color }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="13" r="8" stroke={color} strokeWidth="2.5"/>
    <path d="M12 9v4l2.5 2.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 2h6" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

export default function PracticeSession({ t }) {
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get("subjectId");
  const subjectName = searchParams.get("subject");
  const mode = searchParams.get("mode"); // "practice" or "exam"
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);

  const isExam = mode === "exam";

  useEffect(() => {
    axios.get(`${API}/api/past-questions/${subjectId}?limit=10`)
      .then(res => {
        setQuestions(res.data);
        if (isExam) setTimeLeft(res.data.length * 60); // 1 min per question
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [subjectId]);

  // Exam timer
  useEffect(() => {
    if (!isExam || finished || loading || questions.length === 0) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setFinished(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [isExam, finished, loading, questions.length]);

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const q = questions[current];
  const opts = q ? [
    { key: "A", text: q.option_a },
    { key: "B", text: q.option_b },
    { key: "C", text: q.option_c },
    { key: "D", text: q.option_d },
  ] : [];

  const handleSelect = (key) => {
    if (answered) return;
    setSelected(key);
    if (!isExam) {
      setAnswered(true);
      if (key === q.correct_answer) setScore(s => s + 1);
      setAnswers(a => [...a, { selected: key, correct: key === q.correct_answer, correctAnswer: q.correct_answer, explanation: q.explanation, question: q.question }]);
    }
  };

  const handleExamNext = () => {
    const correct = selected === q.correct_answer;
    if (correct) setScore(s => s + 1);
    setAnswers(a => [...a, { selected, correct, correctAnswer: q.correct_answer, explanation: q.explanation, question: q.question }]);
    if (current + 1 >= questions.length) {
      clearInterval(timerRef.current);
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
    }
  };

  const handlePracticeNext = () => {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(c => c + 1);
      setSelected(null);
      setAnswered(false);
    }
  };

  const getBg = (key) => {
    if (isExam) return selected === key ? `${t.blue}22` : t.surface;
    if (!answered) return t.surface;
    if (key === q.correct_answer) return t.greenBg;
    if (key === selected) return t.redBg;
    return t.surface;
  };

  const getBorder = (key) => {
    if (isExam) return selected === key ? `${t.blue}88` : t.border;
    if (!answered) return selected === key ? `${t.blue}66` : t.border;
    if (key === q.correct_answer) return `${t.green}66`;
    if (key === selected) return `${t.red}66`;
    return t.border;
  };

  if (loading) return (
    <div style={{ background: t.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
      <div style={{ width: 40, height: 40, border: `3px solid ${t.border}`, borderTop: `3px solid ${t.green}`, borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      <p style={{ color: t.textMuted, fontWeight: 600, fontSize: 14 }}>Loading questions...</p>
    </div>
  );

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const passed = pct >= 50;
    return (
      <div style={{ background: t.bg, minHeight: "100vh", paddingBottom: 40 }}>
        {/* Result Header */}
        <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, padding: "56px 20px 24px", textAlign: "center" }}>
          <div style={{
            width: 90, height: 90, borderRadius: "50%",
            background: passed ? `linear-gradient(135deg, ${t.green}, ${t.blue})` : `linear-gradient(135deg, ${t.yellow}, ${t.red})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 16px", boxShadow: `0 8px 32px ${passed ? t.green : t.red}44`
          }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>{pct}%</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 900, color: t.text, letterSpacing: -0.5, marginBottom: 6 }}>
            {pct >= 80 ? "Excellent!" : pct >= 60 ? "Good job!" : pct >= 50 ? "You passed!" : "Keep practicing!"}
          </h1>
          <p style={{ color: t.textMuted, fontSize: 14 }}>{score} of {questions.length} correct • {subjectName}</p>

          <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 16, flexWrap: "wrap" }}>
            <div style={{ background: t.greenBg, border: `1px solid ${t.green}33`, borderRadius: 20, padding: "6px 14px" }}>
              <span style={{ color: t.green, fontSize: 13, fontWeight: 700 }}>✓ {score} Correct</span>
            </div>
            <div style={{ background: t.redBg, border: `1px solid ${t.red}33`, borderRadius: 20, padding: "6px 14px" }}>
              <span style={{ color: t.red, fontSize: 13, fontWeight: 700 }}>✗ {questions.length - score} Wrong</span>
            </div>
            {isExam && (
              <div style={{ background: t.blueBg, border: `1px solid ${t.blue}33`, borderRadius: 20, padding: "6px 14px" }}>
                <span style={{ color: t.blue, fontSize: 13, fontWeight: 700 }}>
                  ⏱ {formatTime(questions.length * 60 - timeLeft)} used
                </span>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: "20px" }}>
          {/* Review */}
          <p style={{ color: t.textMuted, fontSize: 11, fontWeight: 700, letterSpacing: 1.2, marginBottom: 14 }}>REVIEW</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {answers.map((a, i) => (
              <div key={i} style={{ background: t.surface, border: `1px solid ${a.correct ? `${t.green}33` : `${t.red}33`}`, borderRadius: 16, padding: "16px", boxShadow: t.shadow }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 22, height: 22, borderRadius: "50%", background: a.correct ? t.green : t.red, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      {a.correct
                        ? <path d="M5 12l5 5L19 7" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        : <path d="M18 6L6 18M6 6l12 12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                      }
                    </svg>
                  </div>
                  <p style={{ color: t.text, fontSize: 13, fontWeight: 600, lineHeight: 1.5, margin: 0 }}>{a.question}</p>
                </div>
                {!a.correct && (
                  <div style={{ background: t.greenBg, border: `1px solid ${t.green}22`, borderRadius: 10, padding: "8px 12px", marginBottom: 8 }}>
                    <p style={{ color: t.green, fontSize: 12, fontWeight: 700, margin: 0 }}>Correct: {a.correctAnswer}</p>
                  </div>
                )}
                <p style={{ color: t.textMuted, fontSize: 12, lineHeight: 1.5, margin: 0 }}>{a.explanation}</p>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => navigate("/practice")} style={{ flex: 1, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 14, padding: "14px", color: t.text, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
              Back
            </button>
            <button onClick={() => { setCurrent(0); setSelected(null); setAnswered(false); setScore(0); setFinished(false); setAnswers([]); if (isExam) setTimeLeft(questions.length * 60); }}
              style={{ flex: 2, background: `linear-gradient(135deg, ${t.green}, ${t.blue})`, border: "none", borderRadius: 14, padding: "14px", color: "#fff", fontWeight: 800, fontSize: 14, cursor: "pointer", boxShadow: `0 4px 16px ${t.green}33` }}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: t.bg, minHeight: "100vh", paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ background: t.surface, borderBottom: `1px solid ${t.border}`, padding: "56px 20px 16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <button onClick={() => navigate("/practice")} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
            <BackIcon color={t.text} />
            <span style={{ color: t.text, fontSize: 13, fontWeight: 600 }}>Exit</span>
          </button>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {isExam && (
              <div style={{ background: timeLeft < 60 ? t.redBg : t.blueBg, border: `1px solid ${timeLeft < 60 ? t.red : t.blue}33`, borderRadius: 20, padding: "6px 12px", display: "flex", alignItems: "center", gap: 6 }}>
                <TimerIcon color={timeLeft < 60 ? t.red : t.blue} />
                <span style={{ color: timeLeft < 60 ? t.red : t.blue, fontSize: 13, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>{formatTime(timeLeft)}</span>
              </div>
            )}
            <div style={{ background: isExam ? t.yellowBg : t.greenBg, border: `1px solid ${isExam ? t.yellow : t.green}33`, borderRadius: 20, padding: "6px 12px" }}>
              <span style={{ color: isExam ? t.yellow : t.green, fontSize: 12, fontWeight: 700 }}>{isExam ? "EXAM" : "PRACTICE"}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ color: t.textMuted, fontSize: 12, fontWeight: 600 }}>{subjectName}</span>
          <span style={{ color: t.textMuted, fontSize: 12, fontWeight: 600 }}>{current + 1} / {questions.length}</span>
        </div>
        <div style={{ background: t.border, borderRadius: 10, height: 5 }}>
          <div style={{ width: `${((current + 1) / questions.length) * 100}%`, background: isExam ? `linear-gradient(90deg, ${t.yellow}, ${t.red})` : `linear-gradient(90deg, ${t.green}, ${t.blue})`, borderRadius: 10, height: 5, transition: "width 0.4s" }} />
        </div>
      </div>

      <div style={{ padding: "20px" }}>
        {/* Year badge */}
        {q?.year && (
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            <span style={{ background: t.purpleBg, border: `1px solid ${t.purple}33`, color: t.purple, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20 }}>BECE {q.year}</span>
            <span style={{ background: t.card, border: `1px solid ${t.border}`, color: t.textMuted, fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>{q.grade}</span>
          </div>
        )}

        {/* Question */}
        <div style={{ background: t.surface, border: `1px solid ${t.border}`, borderRadius: 20, padding: "20px", marginBottom: 18, boxShadow: t.shadow }}>
          <p style={{ fontSize: 16, fontWeight: 700, color: t.text, lineHeight: 1.6, letterSpacing: -0.2 }}>{q?.question}</p>
        </div>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
          {opts.map(opt => (
            <button key={opt.key} onClick={() => handleSelect(opt.key)} style={{
              background: getBg(opt.key), border: `1px solid ${getBorder(opt.key)}`,
              borderRadius: 14, padding: "14px 16px", cursor: (!isExam && answered) ? "default" : "pointer",
              display: "flex", alignItems: "center", gap: 12, textAlign: "left", transition: "all 0.2s",
              boxShadow: t.shadow
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                background: !answered && selected === opt.key ? t.blue
                  : answered && opt.key === q.correct_answer ? t.green
                  : answered && opt.key === selected ? t.red
                  : isExam && selected === opt.key ? t.blue
                  : t.card,
                border: `1px solid ${t.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: selected === opt.key || (answered && (opt.key === q.correct_answer || opt.key === selected)) ? "#fff" : t.textMuted,
                fontWeight: 800, fontSize: 12, transition: "all 0.2s"
              }}>{opt.key}</div>
              <span style={{ fontSize: 14, color: t.text, fontWeight: 500, lineHeight: 1.4 }}>{opt.text}</span>
            </button>
          ))}
        </div>

        {/* Practice mode explanation */}
        {!isExam && answered && (
          <div style={{ background: selected === q.correct_answer ? t.greenBg : t.redBg, border: `1px solid ${selected === q.correct_answer ? `${t.green}44` : `${t.red}44`}`, borderRadius: 14, padding: "14px 16px", marginBottom: 18 }}>
            <p style={{ fontSize: 13, color: selected === q.correct_answer ? t.green : t.red, lineHeight: 1.6, margin: 0 }}>
              <strong>{selected === q.correct_answer ? "Correct! " : "Not quite. "}</strong>
              {q.explanation}
            </p>
          </div>
        )}

        {/* Next button */}
        {isExam ? (
          <button onClick={handleExamNext} disabled={!selected} style={{
            width: "100%", background: selected ? `linear-gradient(135deg, ${t.yellow}, ${t.red})` : t.card,
            border: `1px solid ${selected ? "transparent" : t.border}`,
            borderRadius: 14, padding: "15px", color: selected ? "#fff" : t.textDim,
            fontWeight: 800, fontSize: 15, cursor: selected ? "pointer" : "default",
            boxShadow: selected ? `0 4px 16px ${t.yellow}33` : "none",
            transition: "all 0.2s"
          }}>
            {current + 1 >= questions.length ? "Finish Exam" : "Next Question →"}
          </button>
        ) : answered && (
          <button onClick={handlePracticeNext} style={{ width: "100%", background: `linear-gradient(135deg, ${t.green}, ${t.blue})`, border: "none", borderRadius: 14, padding: "15px", color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer", boxShadow: `0 4px 16px ${t.green}33` }}>
            {current + 1 >= questions.length ? "See Results" : "Next Question →"}
          </button>
        )}
      </div>
    </div>
  );
}