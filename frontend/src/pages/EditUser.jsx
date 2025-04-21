import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "./Navbar";
import "../styles/Form.css";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await api.get(`/user/${id}`);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user details.");
      }
    }
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.patch(`/user/${id}`, formData);
      setSuccess("User updated successfully! Redirecting...");
      setError("");
      setTimeout(() => navigate(`/user/${id}`), 2000);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong");
      setSuccess("");
    }
  };

  if (!formData) return <div className="loadingSpinner"></div>;

  const isStudent = formData.roles.includes("student");
  const isSponsor = formData.roles.includes("sponsor");

  return (
    <>
      <Navbar currentPage="directory" />
      <div className="proposal page">
        <h1>Edit User</h1>

        <form className="proposal form" onSubmit={handleSubmit}>
          <h2>General Information</h2>

          <label className="label">First Name *</label>
          <input name="first_name" value={formData.first_name} onChange={handleChange} required />

          <label className="label">Last Name *</label>
          <input name="last_name" value={formData.last_name} onChange={handleChange} required />

          <label className="label">Email *</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />

          <label className="label">Phone *</label>
          <input name="phone" value={formData.phone} onChange={handleChange} required />

          {isStudent && (
            <>
              <h2>Student Information</h2>

              <label className="label">UCID</label>
              <input name="ucid" value={formData.ucid || ""} onChange={handleChange} />

              <label className="label">Major</label>
              <input name="major" value={formData.major || ""} onChange={handleChange} />

              <label className="label">Minor</label>
              <input name="minor" value={formData.minor || ""} onChange={handleChange} />

              <label className="label">Specialization</label>
              <input name="specialization" value={formData.specialization || ""} onChange={handleChange} />
            </>
          )}

          {isSponsor && (
            <>
              <h2>Organization Information</h2>

              <label className="label">Organization Name</label>
              <input name="org_name" value={formData.org_name || ""} onChange={handleChange} />

              <label className="label">Organization Category</label>
              <input name="org_category" value={formData.org_category || ""} onChange={handleChange} />

              <label className="label">Organization Industry</label>
              <input name="org_industry" value={formData.org_industry || ""} onChange={handleChange} />

              <label className="label">Organization Website</label>
              <input name="org_website" value={formData.org_website || ""} onChange={handleChange} />

              <label className="label">Organization Address</label>
              <input name="org_address" value={formData.org_address || ""} onChange={handleChange} />

              <label className="label">Position Title</label>
              <input name="position_title" value={formData.position_title || ""} onChange={handleChange} />
            </>
          )}

          <div style={{ marginTop: "20px" }}>
            <button type="submit">Save Changes</button>
          </div>

          {success && <p style={{ color: "green" }}>{success}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </>
  );
}
