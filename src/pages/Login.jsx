import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "https://zovea-landing-production.up.railway.app";

export default function Login({ setUser, t }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setLoading(true); setError("");
    try {
      const res = await axios.post(`${API}/api/auth/login`, form);
      localStorage.setItem("zovea_token", res.data.token);
      localStorage.setItem("zovea_user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: `linear-gradient(135deg, ${t.green}, ${t.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 24, color: "#fff", margin: "0 auto 16px", boxShadow: `0 8px 24px ${t.green}33` }}>Z</div>
          <h1 style={{ color: t.text, fontSize: 26, fontWeight: 900, letterSpacing: -0.5 }}>Welcome back</h1>
          <p style={{ color: t.textMuted, fontSize: 14, marginTop: 6 }}>Log in to continue learning</p>
        </div>

        {error && (
          <div style={{ background: t.redBg, border: `1px solid ${t.red}33`, borderRadius: 12, padding: "12px 16px", color: t.red, fontSize: 14, marginBottom: 20 }}>{error}</div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { name: "email", placeholder: "Email address", type: "email" },
            { name: "password", placeholder: "Password", type: "password" },
          ].map(f => (
            <input key={f.name} name={f.name} type={f.type}
              placeholder={f.placeholder} value={form[f.name]} onChange={handle}
              style={{ padding: "15px 18px", borderRadius: 14, border: `1px solid ${t.border}`, background: t.surface, color: t.text, fontSize: 15, outline: "none", letterSpacing: 0.2 }}
            />
          ))}

          <button onClick={submit} disabled={loading} style={{
            background: `linear-gradient(135deg, ${t.green}, ${t.blue})`,
            border: "none", borderRadius: 14, padding: "15px",
            color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer",
            marginTop: 6, letterSpacing: 0.3,
            boxShadow: `0 4px 16px ${t.green}33`
          }}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: 24, color: t.textMuted, fontSize: 14 }}>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")} style={{ color: t.green, fontWeight: 700, cursor: "pointer" }}>Sign up</span>
        </p>
      </div>
    </div>
  );
}