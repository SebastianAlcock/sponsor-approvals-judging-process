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

  var applied_students = null;
  if ("applied_students" in project && project.applied_students) applied_students = project.applied_students.split(',');
  var approved_students = null;
  if ("approved_students" in project && project.approved_students) approved_students = project.approved_students.split(',');
  var confirmed_students = null;
  if ("confirmed_students" in project && project.confirmed_students) confirmed_students = project.confirmed_students.split(',');

  return (
    <>
      <Navbar />
      <div className='project page'>
        <h1>
          {project.project_name}
        </h1>
        <table><tbody>
          
          <tr>
            <th>
              Description
            </th>
            <td>
              <span className='long'>
                {project.project_description.split(/\r\n|\r|\n/).map(p => {return <div key={p}>{p}</div>})}
              </span>
            </td>
          </tr>
          
          <tr>
            <th>
              Project Completion Criteria
            </th>
            <td>
              <span className='long'>
                {project.project_criteria.split(/\r\n|\r|\n/).map(p => {return <div key={p}>{p}</div>})}
              </span>
            </td>
          </tr>
          
          <tr>
            <th>
              Expected Skillset / Background
            </th>
            <td>
              <span className='long'>
                {project.project_skillset.split(/\r\n|\r|\n/).map(p => {return <div key={p}>{p}</div>})}
              </span>
            </td>
          </tr>
          
          <tr>
            <th>
              Special Instructions or Concerns
            </th>
            <td>
              <span className='long'>
                {project.project_instructions.split(/\r\n|\r|\n/).map(p => {return <div key={p}>{p}</div>})}
              </span>
            </td>
          </tr>
        
        </tbody></table>

        <h2>
          Company Information:
        </h2>

        <table><tbody>

          <tr>
            <th>
              Name
            </th>
            <td>
              {project.org_name}
            </td>
          </tr>

          <tr>
            <th>
              Scope and Industry
            </th>
            <td>
              {project.org_category}, {project.org_industry}
            </td>
          </tr>
          
          <tr>
            <th>
              Website
            </th>
            <td>
              <a href={project.org_website}>{project.org_website}</a>
            </td>
          </tr>
          
          <tr>
            <th>
              Address
            </th>
            <td>
              {project.org_address}
            </td>
          </tr>
        
        </tbody></table>

        <h2>
          Contact Information:
        </h2>
        
        <table><tbody>

          <tr>
            <th>
              Name
            </th>
            <td>
              {project.contact_first_name} {project.contact_last_name}
            </td>
          </tr>
          
          <tr>
            <th>
              Position
            </th>
            <td>
              {project.contact_position_title}
            </td>
          </tr>
          
          <tr>
            <th>
              Email
            </th>
            <td>
              {project.contact_email}
            </td>
          </tr>
          
          <tr>
            <th>
              Phone
            </th>
            <td>
              {project.contact_phone}
            </td>
          </tr>
        
        </tbody></table>

        <h2>
          Student Application Information:
        </h2>
        
        <table><tbody>
          
          <tr>
            <th>
              Applied Students:
            </th>
            <td>
              <ul>
                {
                  applied_students.map(student => {
                    return <li key={student.id}>{student.first_name} {student.last_name}</li>
                  })
                }
              </ul>
            </td>
          </tr>
          
          <tr>
            <th>
              Approved Students:
            </th>
            <td>
              <ul>
                {
                  approved_students.map(student => {
                    return <li key={student.id}>{student.first_name} {student.last_name}</li>
                  })
                }
              </ul>
            </td>
          </tr>
          
          <tr>
            <th>
              Confirmed Students:
            </th>
            <td>
              <ul>
                {
                  confirmed_students.map(student => {
                    return <li key={student.id}>{student.first_name} {student.last_name}</li>
                  })
                }
              </ul>
            </td>
          </tr>

        </tbody></table>
      </div>
    </>
  );
}
