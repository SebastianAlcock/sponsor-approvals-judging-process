import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import "../../styles/Form.css";

export default function Approval() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedOrg, setSelectedOrg] = useState("");
  const [formData, setFormData] = useState({
    user_email: user?.email || "",
    sponsor_org: "",
    project_title: "",
    submitter_name: `${user?.first_name || ""} ${user?.last_name || ""}`,
    submitter_email: user?.email || "",
  });

  // Dummy sponsor organization data
  const sponsorProjects = {
    "Org A": ["Project A1", "Project A2"],
    "Org B": ["Project B1", "Project B2", "Project B3"],
    "Org C": ["Project C1"]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "sponsor_org") {
      setSelectedOrg(value);
      setFormData(prev => ({ ...prev, project_title: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Approval:", formData);
    alert("Approval submitted!");
    navigate("/");
  };

  return (
    <>
      <Navbar currentPage="applications" />
      <div className="proposal page">
        <h1>Capstone Sponsor Approval Form</h1>

        <form className="proposal form" onSubmit={handleSubmit}>

          <label className="label">Sponsor Organization *</label>
          <select name="sponsor_org" onChange={handleChange} value={formData.sponsor_org} required>
            <option value="">-- Select Sponsor Org --</option>
            {Object.keys(sponsorProjects).map(org => (
              <option key={org} value={org}>{org}</option>
            ))}
          </select>

          <label className="label">Project Title *</label>
          <select name="project_title" onChange={handleChange} value={formData.project_title} required disabled={!selectedOrg}>
            <option value="">-- Select Project --</option>
            {sponsorProjects[selectedOrg]?.map(title => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>

          <label className="label">Student Email *</label>
          <input type="email" name="user_email" value={formData.user_email} readOnly />

          <hr />
          <h2>Submitter Information</h2>

          <label className="label">Your Name</label>
          <input type="text" name="submitter_name" value={formData.submitter_name} readOnly />

          <label className="label">Your Email</label>
          <input type="email" name="submitter_email" value={formData.submitter_email} readOnly />

          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}
