import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import api from "../services/api";

import "../styles/Project.css";

export default function Project() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    api.get(`/project/${id}`).then(res => {
      setProject(res.data);
    }).catch(err => {
      console.error("Error fetching project:", err);
    });
  }, [id]);

  if (!project) return <div className="loadingSpinner"></div>;

  return (
    <>
      <Navbar />
      <div className="project page">
        <h1>{project.project_name}</h1>

        <table><tbody>
          <tr><th>Description</th><td><span className="long">{project.project_description}</span></td></tr>
        </tbody></table>

        <h2>Company Information:</h2>
        <table><tbody>
          <tr><th>Name</th><td>{project.org_name}</td></tr>
          <tr><th>Scope and Industry</th><td>{project.org_category}, {project.org_industry}</td></tr>
          <tr><th>Website</th><td><a href={project.org_website}>{project.org_website}</a></td></tr>
          <tr><th>Address</th><td>{project.org_address}</td></tr>
        </tbody></table>

        <h2>Contact Information:</h2>
        <table><tbody>
          <tr><th>Name</th><td>{project.contact_first_name} {project.contact_last_name}</td></tr>
          <tr><th>Email</th><td>{project.contact_email}</td></tr>
        </tbody></table>
      </div>
    </>
  );
}
