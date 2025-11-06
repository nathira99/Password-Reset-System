import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthCard from "../components/AuthCard";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      setMsg(res.data.msg);
      if (res.data.msg.includes("success")) setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Invalid credentials");
    }
  };

  return (
    <AuthCard title="Login">
      {msg && <div className={`alert ${msg.includes("success") ? "alert-success" : "alert-danger"}`}>{msg}</div>}
      <form onSubmit={handleLogin}>
        <input className="form-control mb-3" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button className="btn btn-primary w-100">Login</button>
      </form>
      <p className="text-center mt-3">
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
    </AuthCard>
  );
}
