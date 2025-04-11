import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "react-data-grid"; 
import Navbar from "./Navbar";
import api from "../services/api"; 
import "../styles/Directory.css";
import "react-data-grid/lib/styles.css";
import { FaEye } from "react-icons/fa";

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
    {
      key: "view",
      name: "Info",
      width: "min-content",
      renderCell: ({ row }) => (
        <FaEye
          onClick={(e) => {
            e.stopPropagation(); // prevent row click from firing
            navigate(`/project/${row.id}`);
          }}
          className="eye"
        />
      )
    },
    { key: "project_name", name: "Project Name" },
    { key: "org_name", name: "Organization Name" },
    {
      key: "contact_name",
      name: "Contact Name",
      renderCell: ({ row }) => (
        `${row.contact_first_name} ${row.contact_last_name}`
      )
    },
    { key: "contact_email", name: "Contact Email" },
    { key: "contact_phone", name: "Contact Phone" }
  ];

  const studentColumns = [
    {
      key: "view",
      name: "Info",
      width: "min-content",
      renderCell: ({ row }) => (
        <FaEye
          onClick={(e) => {
            e.stopPropagation(); // prevent row click from firing
            navigate(`/user/${row.id}`);
          }}
          className="eye"
        />
      )
    },
    {
      key: "name",
      name: "Name",
      renderCell: ({ row }) => (
        `${row.first_name} ${row.last_name}`
      )
    },
    { key: "email", name: "Email" },
    { key: "phone", name: "Phone" },
    { key: "ucid", name: "UCID" },
    { key: "major", name: "Major" },
    { key: "minor", name: "Minor" },
    { key: "specialization", name: "Specialization" },
  ];

  const sponsorColumns = [
    {
      key: "view",
      name: "Info",
      width: "min-content",
      renderCell: ({ row }) => (
        <FaEye
          onClick={(e) => {
            e.stopPropagation(); // prevent row click from firing
            navigate(`/user/${row.id}`);
          }}
          className="eye"
        />
      )
    },
    {
      key: "name",
      name: "Name",
      renderCell: ({ row }) => (
        `${row.first_name} ${row.last_name}`
      )
    },
    { key: "email", name: "Email" },
    { key: "phone", name: "Phone" },
    { key: "position_title", name: "Position Title" },
    { key: "org_name", name: "Organization Name" },
    { key: "org_category", name: "Organization Size"},
    { key: "org_industry", name: "Organization Industry" },
    { key: "org_website", name: "Website URL" },
    { key: "org_address", name: "Organization Address" },
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

        <div className="tab-bottom"></div>

        {loading && <div className="loadingSpinner"></div>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="datagridContainer">
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
      </div>
    </>
  );
}
