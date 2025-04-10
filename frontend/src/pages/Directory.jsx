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
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, [activeTab]);

  const projectColumns = [
    { key: "project_name", name: "Project Name" },
    { key: "org_name", name: "Organization Name" },
    { key: "semester", name: "Semester" },
    { key: "year", name: "Year" },
    { key: "contact_first_name", name: "Contact First Name" },
    { key: "contact_last_name", name: "Contact Last Name" },
    { key: "contact_email", name: "Contact Email" },
    { key: "employment_opportunities", name: "Employment Opportunities" },
    { key: "committed", name: "Commitment Status" },
    { key: "approved", name: "Approval Status" },
    {
      key: "view",
      name: "Action",
      renderCell: ({ row }) => (
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent row click from firing
            navigate(`/project/${row.id}`);
          }}
          style={{
            padding: "6px 12px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          View
        </button>
      )
    }
  ];

  const studentColumns = [
    { key: "first_name", name: "First Name" },
    { key: "last_name", name: "Last Name" },
    { key: "email", name: "Email" },
    { key: "phone", name: "Phone" },
    { key: "ucid", name: "UCID" },
    { key: "major", name: "Major" },
    { key: "minor", name: "Minor" },
    { key: "specialization", name: "Specialization" },
  ];

  const sponsorColumns = [
    { key: "first_name", name: "First Name" },
    { key: "last_name", name: "Last Name" },
    { key: "email", name: "Email" },
    { key: "phone", name: "Phone" },
    { key: "org_name", name: "Organization Name" },
    { key: "org_category", name: "Organization Category" },
    { key: "org_industry", name: "Industry" },
    { key: "org_website", name: "Website URL" },
    { key: "org_address", name: "Organization Address" },
    { key: "position_title", name: "Position Title" },
  ];

  const handleRowClick = (args) => {
    const row = args.row;
    if (activeTab === "projects") {
      navigate(`/project/${row.id}`);
    } else {
      navigate(`/user/${row.email}`);
    }
  };

  const filteredUsers = (role) => users.filter(user => user.roles === role);

  return (
    <>
      <Navbar currentPage="directory" />
      <div className="directory page">
        <div className="tabs">
          <button className={activeTab === "projects" ? "active" : ""} onClick={() => setActiveTab("projects")}>Projects</button>
          <button className={activeTab === "students" ? "active" : ""} onClick={() => setActiveTab("students")}>Students</button>
          <button className={activeTab === "sponsors" ? "active" : ""} onClick={() => setActiveTab("sponsors")}>Sponsors</button>
        </div>

        {loading && <div className="loadingSpinner"></div>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && (
          <DataGrid
            columns={
              activeTab === "projects"
                ? projectColumns
                : activeTab === "students"
                ? studentColumns
                : sponsorColumns
            }
            rows={
              activeTab === "projects"
                ? projects
                : activeTab === "students"
                ? filteredUsers("student")
                : filteredUsers("sponsor")
            }
            onRowClick={handleRowClick}
            className="rdg-light"
            rowHeight={50}
          />
        )}
      </div>
    </>
  );
}
