import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

import Navbar from "./Navbar";
import api from "../services/api";

import "../styles/User.css";

export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const [projectInfo, setProjectInfo] = useState([]);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const userLocal = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  const userId = userLocal && 'id' in userLocal ? userLocal.id : null;

  const userRole = userLocal && 'roles' in userLocal ? userLocal.roles : null;

  useEffect(() => {
    api.get(`/user/${id}`).then(res => {
      setUser(res.data);
    }).catch(err => {
      console.error("Error fetching user:", err);
    });
  }, [id]);

  useEffect(() => {
    api.get("/projects")
      .then(res => {
        if (user) {
          var appliedProjects = [];
          var approvedProjects = [];
          var committedProject = [];

          if (user.applied_projects)
            user.applied_projects.replace(/\[|\]| /g, '')
              .split(',').filter(Boolean).map(Number)
              .forEach(id => {
                const match = res.data.find(project => project.id === id);
                appliedProjects.push(match);
              });
          
          if (user.approved_projects)
            user.approved_projects.replace(/\[|\]| /g, '')
              .split(',').filter(Boolean).map(Number)
              .forEach(id => {
                const match = res.data.find(project => project.id === id);
                approvedProjects.push(match);
              });
          
          if (user.committed_project)
            user.committed_project.replace(/\[|\]| /g, '')
              .split(',').filter(Boolean).map(Number)
              .forEach(id => {
                const match = res.data.find(project => project.id === id);
                committedProject.push(match);
              });
          
          
          setProjectInfo([appliedProjects, approvedProjects, committedProject]);
        }
      }).catch(err => {setError(`Error loading student projects data: ${err}`)});
  }, [user]);

  if (!user) return <div className="loadingSpinner"></div>;

  const handleDelete = async (e) => {
    const endpoint = `/user/${user.id}`;
    try {
      await api.delete(endpoint);
      navigate(`/directory`);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  // TODO: IMPLEMENT USER EDITING
  const handleEdit = async (e) => {
    try {
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  function projectList(projectArray) {
    if (!Array.isArray(projectArray)) return null;

    return projectArray.map((project, i) => {
    if (!project) return <li key={`missing-${i}`}>(Project not found)</li>;

    return (
      <li key={project.id}>
        <FaEye
          onClick={() => navigate(`/project/${project.id}`)}
          className="eye"
        />{" "}
        {project.project_name}
      </li>
    );
  });
  }

  console.log(user)

  return (
    <>
      <Navbar />
      <div className='user page'>
        <h1>
          <span className='header'>{user.first_name} {user.last_name}</span>
          {user.roles.split(',').map(role => <span className={'role'} key={role}>{role.toUpperCase()}</span>)}
        </h1>
        
        <table><tbody>
          
          <tr>
            <th>
              Email
            </th>
            <td>
              {user.email}
            </td>
          </tr>
          
          <tr>
            <th>
              Phone
            </th>
            <td>
              {user.phone}
            </td>
          </tr>
        
        </tbody></table>
  
        {user.roles.includes('sponsor') && <>
          <h2>
            Company/Organization Information:
          </h2>
            
          <table><tbody>

            { user.org_name &&
            <tr>
              <th>
                Name
              </th>
              <td>
                {user.org_name}
              </td>
            </tr>
            }

            { user.org_category &&
            <tr>
              <th>
                Scope
              </th>
              <td>
                {user.org_category}
              </td>
            </tr>
            }

            { user.org_industry &&
              <tr>
                <th>
                  Industry
                </th>
                <td>
                  {user.org_industry}
                </td>
              </tr>
              }

            { user.org_website &&
            <tr>
              <th>
                Website
              </th>
              <td>
                <a href={user.org_website}>{user.org_website}</a>
              </td>
            </tr>
            }

            { user.org_address &&
            <tr>
              <th>
                Address
              </th>
              <td>
                {user.org_address}
              </td>
            </tr>
            }
          
          </tbody></table>
        </>}

        {user.roles.includes('student') && <>
          <h2>
            Student Information:
          </h2>
          
          <table><tbody>

            { user.major &&
            <tr>
              <th>
                Major
              </th>
              <td>
                {user.major}
              </td>
            </tr>
            }

            { user.minor &&
            <tr>
              <th>
                Minor
              </th>
              <td>
                {user.minor}
              </td>
            </tr>
            }

            { user.specialization &&
            <tr>
              <th>
                Specialization
              </th>
              <td>
                {user.specialization}
              </td>
            </tr>
            }

            { user.ucid &&
            <tr>
              <th>
                UCID
              </th>
              <td>
                {user.ucid}
              </td>
            </tr>
            }
            
            { user.position_title &&
            <tr>
              <th>
                Position Title
              </th>
              <td>
                {user.position_title}
              </td>
            </tr>
            }
          
          </tbody></table>

          <h2>
            Project Application Information:
          </h2>
          
          <table><tbody>
            
            <tr>
              <th>
                Projects Applied To:
              </th>
              <td>
                <ul>
                  {projectInfo[0] ? projectList(projectInfo[0]) : <li key='x'>Loading...</li>}
                </ul>
              </td>
            </tr>
            
            <tr>
              <th>
                Projects Approved For:
              </th>
              <td>
                <ul>
                  {projectInfo[0] ? projectList(projectInfo[1]) : <li key='x'>Loading...</li>}
                </ul>
              </td>
            </tr>
            
            <tr>
              <th>
                Project Committed To:
              </th>
              <td>
                <ul>
                  {projectInfo[0] ? projectList(projectInfo[2]) : <li key='x'>Loading...</li>}
                </ul>
              </td>
            </tr>

          </tbody></table>
          
        </>}

        <div className="buttonArea">

          { // if user is admin or owns the page show controls
            userLocal &&
            userRole && 
            userId &&
            (userRole.includes('admin') || user.id === userId) ?
            <>
              <button type="button" onClick={() => handleEdit()}>Edit User</button>
              { // if user is admin show delete
                userRole.includes('admin') ?
                <button type="button" onClick={() => handleDelete()}>Delete User</button>
                :
                <></>
              }
            </>
            :
            <></>
          }
          
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

      </div>
    </>
  );
}
