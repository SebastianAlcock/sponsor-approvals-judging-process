import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import api from "../../services/api";
import "../../styles/Form.css";

export default function Approval() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [availableStudents, setAvailableStudents] = useState([]);

  const [formData, setFormData] = useState({
    user_email: "",
    sponsor_org: "",
    project_title: "",
    submitter_name: `${user?.first_name || ""} ${user?.last_name || ""}`,
    submitter_email: user?.email || "",
  });

  useEffect(() => {
    api.get("/projects").then(res => setProjects(res.data));
    api.get("/users").then(res => setUsers(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "sponsor_org") {
      setSelectedOrg(value);
      setFormData(prev => ({ ...prev, sponsor_org: value, project_title: "", user_email: "" }));
      setAvailableStudents([]);
      setSelectedProject("");
    } else if (name === "project_title") {
      setSelectedProject(value);
      setFormData(prev => ({ ...prev, project_title: value, user_email: "" }));

      // Find the project
      const project = projects.find(p => p.project_name === value);
      const applied = JSON.parse(project?.applied_students || "[]");

      const studentObjs = users.filter(u => applied.includes(u.id));
      setAvailableStudents(studentObjs);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Get all unique orgs from all projects
  const allOrgs = [...new Set(projects.map(p => p.org_name).filter(Boolean))];

  // Get all projects for the selected org
  const projectsForOrg = projects
    .filter(p => p.org_name === selectedOrg)
    .map(p => p.project_name);

  return (
    <>
      <Navbar currentPage="applications" />
      <div className="proposal page">
        <h1>Capstone Sponsor Approval Form</h1>

        <form className="proposal form" onSubmit={(e) => {
          e.preventDefault();
          console.log("Submitted Approval:", formData);
          alert("✅ Approval submitted!");
          navigate("/");
        }}>

          <label className="label">Sponsor Organization *</label>
          <select name="sponsor_org" onChange={handleChange} value={formData.sponsor_org} required>
            <option value="">-- Select Sponsor Org --</option>
            {allOrgs.map(org => (
              <option key={org} value={org}>{org}</option>
            ))}
          </select>

          <label className="label">Project Title *</label>
          <select
            name="project_title"
            onChange={handleChange}
            value={formData.project_title}
            required
            disabled={!selectedOrg}
          >
            <option value="">-- Select Project --</option>
            {projectsForOrg.map(title => (
              <option key={title} value={title}>{title}</option>
            ))}
          </select>

          <label className="label">Student to Approve *</label>
          <select
            name="user_email"
            onChange={handleChange}
            value={formData.user_email}
            required
            disabled={availableStudents.length === 0}
          >
            <option value="">-- Select Student --</option>
            {availableStudents.map(s => (
              <option key={s.email} value={s.email}>
                {s.first_name} {s.last_name} ({s.email})
              </option>
            ))}
          </select>

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
