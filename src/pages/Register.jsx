import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = "https://zovea-landing-production.up.railway.app";
const grades = ["Primary 1","Primary 2","Primary 3","Primary 4","Primary 5","Primary 6","JHS1","JHS2","JHS3","SHS1","SHS2","SHS3"];

export default function Register({ setUser, t }) {
  const [form, setForm] = useState({ full_name: "", email: "", phone: "", password: "", role: "student", grade_level: "JHS1" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    setLoading(true); setError("");
    try {
      const res = await axios.post(`${API}/api/auth/register`, form);
      localStorage.setItem("zovea_token", res.data.token);
      localStorage.setItem("zovea_user", JSON.stringify(res.data.user));
      setUser(res.data.user);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ width: 56, height: 56, borderRadius: 18, background: `linear-gradient(135deg, ${t.green}, ${t.blue})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 24, color: "#fff", margin: "0 auto 16px", boxShadow: `0 8px 24px ${t.green}33` }}>Z</div>
          <h1 style={{ color: t.text, fontSize: 26, fontWeight: 900, letterSpacing: -0.5 }}>Join Zovea</h1>
          <p style={{ color: t.textMuted, fontSize: 14, marginTop: 6 }}>Create your free account</p>
        </div>

        {error && (
          <div style={{ background: t.redBg, border: `1px solid ${t.red}33`, borderRadius: 12, padding: "12px 16px", color: t.red, fontSize: 14, marginBottom: 20 }}>{error}</div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { name: "full_name", placeholder: "Full name", type: "text" },
            { name: "email", placeholder: "Email address", type: "email" },
            { name: "phone", placeholder: "Phone number", type: "tel" },
            { name: "password", placeholder: "Create a password", type: "password" },
          ].map(f => (
            <input key={f.name} name={f.name} type={f.type}
              placeholder={f.placeholder} value={form[f.name]} onChange={handle}
              style={{ padding: "15px 18px", borderRadius: 14, border: `1px solid ${t.border}`, background: t.surface, color: t.text, fontSize: 15, outline: "none" }}
            />
          ))}

          <select name="grade_level" value={form.grade_level} onChange={handle}
            style={{ padding: "15px 18px", borderRadius: 14, border: `1px solid ${t.border}`, background: t.surface, color: t.text, fontSize: 15, outline: "none" }}>
            {grades.map(g => <option key={g} value={g}>{g}</option>)}
          </select>

          <button onClick={submit} disabled={loading} style={{
            background: `linear-gradient(135deg, ${t.green}, ${t.blue})`,
            border: "none", borderRadius: 14, padding: "15px",
            color: "#fff", fontWeight: 800, fontSize: 15, cursor: "pointer",
            marginTop: 6, boxShadow: `0 4px 16px ${t.green}33`
          }}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: 24, color: t.textMuted, fontSize: 14 }}>
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} style={{ color: t.green, fontWeight: 700, cursor: "pointer" }}>Log in</span>
        </p>
      </div>
    </div>
  );
}