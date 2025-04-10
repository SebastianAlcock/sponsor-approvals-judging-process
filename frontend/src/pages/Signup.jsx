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
                  <input name="org_website" placeholder="Website URL" value={formData.org_website} onChange={handleChange} />
                  <input name="org_address" placeholder="Address" value={formData.org_address} onChange={handleChange} required />
                  <label className="label">Which best describes your organization or affiliation? *</label>
                  <select name="org_category" value={formData.org_category} onChange={handleChange} required>
                    <option value="">-- please select --</option>
                    <option value="Public Service">Public Service</option>
                    <option value="EDC Company">EDC Company</option>
                    <option value="Small Business">Small Business</option>
                    <option value="Medium Size Business">Medium Size Business</option>
                    <option value="Large Business">Large Business</option>
                    <option value="Fortune 500 Company">Fortune 500 Company</option>
                    <option value="Fortune 1000 Company">Fortune 1000 Company</option>
                    <option value="Student Entrepreneur">Student Entrepreneur</option>
                    <option value="External Entrepreneur">External Entrepreneur</option>
                    <option value="NJIT Faculty">NJIT Faculty</option>
                    <option value="NJIT Department">NJIT Department</option>
                    <option value="Other University">Other University</option>
                    <option value="Other Non-Profit Organization">Other Non-Profit Organization</option>
                  </select>

                  <label className="label">Which best describes your industry? *</label>
                  <select name="org_industry" value={formData.org_industry} onChange={handleChange} required>
                    <option value="">-- please select --</option>
                    <option value="Manufacturing/R">Manufacturing/R</option>
                    <option value="Non-Profit/Charity">Non-Profit/Charity</option>
                    <option value="Web/IT Professional Services">Web/IT Professional Services</option>
                    <option value="Education">Education</option>
                    <option value="Advertising/Marketing/PR">Advertising/Marketing/PR</option>
                    <option value="Government/Military/Aerospace">Government/Military/Aerospace</option>
                    <option value="Finance/Insurance/Real Estate">Finance/Insurance/Real Estate</option>
                    <option value="Travel/Transportation/Hospitality">Travel/Transportation/Hospitality</option>
                    <option value="Media/Entertainment/Arts">Media/Entertainment/Arts</option>
                    <option value="Workforce Development/Professional Training">Workforce Development/Professional Training</option>
                    <option value="Retail/Wholesale/Trade">Retail/Wholesale/Trade</option>
                    <option value="Healthcare/Pharmaceutical/Biotech">Healthcare/Pharmaceutical/Biotech</option>
                  </select>
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
