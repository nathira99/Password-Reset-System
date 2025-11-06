import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthCard from "../components/AuthCard";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset/${token}`, { newPassword: password });
      setMsg(res.data.msg);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMsg(err.response?.data?.msg || "Error updating password");
    }
  };

  return (
    <AuthCard title="Reset Password">
      {msg && <div className="alert alert-info text-center">{msg}</div>}
      <form onSubmit={handleReset}>
        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-success w-100">Update Password</button>
      </form>
    </AuthCard>
  );
}
