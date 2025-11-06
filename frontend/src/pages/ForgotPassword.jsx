import axios from "axios";
import { useState } from "react";
import AuthCard from "../components/AuthCard";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/forgot", { email });
      setMsg(res.data.msg);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error sending reset link");
    }
  };

  return (
    <AuthCard title="Forgot Password">
      {msg && <div className="alert alert-info text-center">{msg}</div>}
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control mb-3" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <button className="btn btn-primary w-100">Send Reset Link</button>
      </form>
    </AuthCard>
  );
}
