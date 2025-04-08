import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "react-data-grid"; 
import Navbar from "./Navbar";
import api from "../services/api"; 
import "../styles/Directory.css";
import "react-data-grid/lib/styles.css";

export default function Directory() {
  const [activeTab, setActiveTab] = useState("projects");
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError("");
    const endpoint = activeTab === "projects" ? "/projects" : "/users";
    api.get(endpoint)
      .then(res => {
        if (activeTab === "projects") {
          setProjects(res.data);
        } else {
          setUsers(res.data);
        }
      })
      .catch(err => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, [activeTab]);

  const projectColumns = [
    { key: "project_name", name: "Project Name" },
    { key: "org_name", name: "Organization" },
    { key: "semester", name: "Semester" },
    { key: "year", name: "Year" },
    { key: "contact_first_name", name: "Contact First" },
    { key: "contact_last_name", name: "Contact Last" },
    { key: "contact_email", name: "Contact Email" },
    { key: "employment_opportunities", name: "Job Opportunities" },
    { key: "committed", name: "Commitment" },
    { key: "approved", name: "Approved" },
  ];
  
  const userColumns = [
    { key: "first_name", name: "First Name" },
    { key: "last_name", name: "Last Name" },
    { key: "email", name: "Email" },
    { key: "phone", name: "Phone" },
    { key: "roles", name: "Roles" },
    { key: "ucid", name: "UCID" },
    { key: "major", name: "Major" },
    { key: "minor", name: "Minor" },
    { key: "specialization", name: "Specialization" },
    { key: "org_name", name: "Org Name" },
    { key: "org_category", name: "Org Category" },
    { key: "org_industry", name: "Org Industry" },
    { key: "org_website", name: "Org Website" },
    { key: "org_address", name: "Org Address" },
    { key: "position_title", name: "Position Title" },
  ];
  
  const handleRowClick = (args) => {
    console.log("Row clicked:", args.row);
    const row = args.row;
  
    if (activeTab === "projects") {
      navigate(`/project/${row.id}`);
    } else {
      navigate(`/user/${row.email}`);
    }
  };

  return (
    <>
      <Navbar currentPage="directory" />
      <div className="directory page">
        <h2>Directory</h2>

        <div className="tabs">
          <button className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>Projects</button>
          <button className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>Users</button>
        </div>

        {loading && <div className="loadingSpinner"></div>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && (
          <DataGrid
            columns={activeTab === "projects" ? projectColumns : userColumns}
            rows={activeTab === "projects" ? projects : users}
            onRowClick={handleRowClick}
            className="rdg-light"
            rowHeight={50}
          />
        )}
      </div>
    </>
  );
}
