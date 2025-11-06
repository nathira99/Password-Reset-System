import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthCard from "../components/AuthCard";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, { name, email, password });
      setMsg(res.data.msg);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error registering");
    }
  };

  return (
    <AuthCard title="Register">
      {msg && <div className="alert alert-info text-center">{msg}</div>}
      <form onSubmit={handleRegister}>
        <input className="form-control mb-3" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} required />
        <input className="form-control mb-3" type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button className="btn btn-primary w-100">Register</button>
      </form>
      <p className="text-center mt-3">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </AuthCard>
  );
}
