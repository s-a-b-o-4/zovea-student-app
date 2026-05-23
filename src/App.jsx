import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { darkTheme, lightTheme } from "./theme";
import MentorSelect from "./pages/MentorSelect";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import Practice from "./pages/Practice";
import Progress from "./pages/Progress";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TopicList from "./pages/TopicList";
import Lesson from "./pages/Lesson";
import PracticeSession from "./pages/PracticeSession";
import BottomNav from "./components/BottomNav";
import Social from "./pages/Social";
import History from "./pages/History";
import Notifications from "./pages/Notifications";
import AccountSettings from "./pages/AccountSettings";
import PrivacySecurity from "./pages/PrivacySecurity";

export default function App() {
  const [user, setUser] = useState(null);
  const [isDark, setIsDark] = useState(true);
  const [mentor, setMentor] = useState(null);
  const t = isDark ? darkTheme : lightTheme;

 useEffect(() => {
  const stored = localStorage.getItem("zovea_user");
  if (stored) setUser(JSON.parse(stored));
  const savedTheme = localStorage.getItem("zovea_theme");
  if (savedTheme) setIsDark(savedTheme === "dark");
  const savedMentor = localStorage.getItem("zovea_mentor");
  if (savedMentor) setMentor(savedMentor);
}, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("zovea_theme", next ? "dark" : "light");
  };

  const logout = () => {
    localStorage.removeItem("zovea_user");
    localStorage.removeItem("zovea_token");
    setUser(null);
  };

  if (!user) {
    return (
      <div style={{ background: t.bg, minHeight: "100vh" }}>
        <Routes>
          <Route path="/login" element={<Login setUser={setUser} t={t} />} />
          <Route path="/register" element={<Register setUser={setUser} t={t} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    );
  }

  if (!mentor) {
    return <MentorSelect t={t} onSelect={(m) => setMentor(m)} />;
  }
  return (
    <div style={{ background: t.bg, minHeight: "100vh", maxWidth: "100%", position: "relative", paddingBottom: 80 }}>
      <Routes>
        <Route path="/" element={<Dashboard user={user} t={t} />} />
        <Route path="/subjects" element={<Subjects user={user} t={t} />} />
        <Route path="/topics" element={<TopicList user={user} t={t} />} />
        <Route path="/lesson" element={<Lesson user={user} t={t} />} />
        <Route path="/practice" element={<Practice user={user} t={t} />} />
        <Route path="/practice/session" element={<PracticeSession user={user} t={t} />} />
        <Route path="/progress" element={<Progress user={user} t={t} />} />
        <Route path="/profile" element={<Profile user={user} logout={logout} t={t} toggleTheme={toggleTheme} isDark={isDark} />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/social" element={<Social user={user} t={t} />} />
        <Route path="/history" element={<History t={t} />} />
        <Route path="/notifications" element={<Notifications t={t} />} />
        <Route path="/account-settings" element={<AccountSettings t={t} user={user} />} />
        <Route path="/privacy-security" element={<PrivacySecurity t={t} />} />
      </Routes>
      <BottomNav t={t} />
    </div>
  );
}