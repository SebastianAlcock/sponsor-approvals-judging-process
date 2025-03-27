import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api"; // <== use your axios instance here

export default function SignupPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    major: "",
    minor: "",
    specialization: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/register-student", formData);  // <== call backend using api instance
      setSuccess("Registration successful! Redirecting to login...");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setSuccess("");
    }
  };

  return (
    <div className="App">
      <h2>Student Signup</h2>
      <form onSubmit={handleSubmit}>
        <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required /><br />
        <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required /><br />
        <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required /><br />
        <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required /><br />
        <input name="major" placeholder="Major" value={formData.major} onChange={handleChange} /><br />
        <input name="minor" placeholder="Minor" value={formData.minor} onChange={handleChange} /><br />
        <input name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} /><br />
        <button type="submit">Register</button>
        {success && <p style={{ color: "green" }}>{success}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}
