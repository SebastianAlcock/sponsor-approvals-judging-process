import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "./Navbar";
import "../styles/Form.css"; // optional for shared styling

export default function Signup() {
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    ucid: "",
    email: "",
    phone: "",
    password: "",
    major: "",
    minor: "",
    specialization: "",
    org_name: "",
    position_title: "",
    org_category: "",
    org_industry: "",
    org_website: "",
    org_address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = role === "student" ? "/register-student" : "/register-sponsor";

    try {
      await api.post(endpoint, { ...formData });
      setSuccess("Registration successful! Redirecting to login...");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
      setSuccess("");
    }
  };

  return (
    <>
      <Navbar currentPage="signup" />

      <div className="signup page">
        <h2>Sign Up</h2>

        {!role ? (
          <div className="role-select-container">
            <p>Choose your role to begin:</p>
            <div className="role-buttons">
              <button onClick={() => setRole("student")}>🎓 I'm a Student</button>
              <button onClick={() => setRole("sponsor")}>🏢 I'm a Sponsor</button>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <h3>{role.charAt(0).toUpperCase() + role.slice(1)} Registration</h3>

              <input name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
              <input name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
              <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
              <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required />

              {role === "student" && (
                <>
                  <input name="ucid" placeholder="UCID" value={formData.ucid} onChange={handleChange} required />
                  <input name="major" placeholder="Major" value={formData.major} onChange={handleChange} />
                  <input name="minor" placeholder="Minor" value={formData.minor} onChange={handleChange} />
                  <input name="specialization" placeholder="Specialization" value={formData.specialization} onChange={handleChange} />
                </>
              )}

              {role === "sponsor" && (
                <>
                  <input name="position_title" placeholder="Position Title" value={formData.position_title} onChange={handleChange} required />
                  <input name="org_name" placeholder="Organization Name" value={formData.org_name} onChange={handleChange} required />
                  <input name="org_category" placeholder="Organization Category" value={formData.org_category} onChange={handleChange} required />
                  <input name="org_industry" placeholder="Industry" value={formData.org_industry} onChange={handleChange} required />
                  <input name="org_website" placeholder="Website URL" value={formData.org_website} onChange={handleChange} />
                  <input name="org_address" placeholder="Address" value={formData.org_address} onChange={handleChange} required />
                </>
              )}

              <button type="submit">Register</button>
              <button type="button" onClick={() => setRole("")} className="secondary">⬅ Back</button>
              {success && <p style={{ color: "green" }}>{success}</p>}
              {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
          </>
        )}

        <br />
        Have an account already? <Link to="/login">Log In Here</Link>
      </div>
    </>
  );
}
