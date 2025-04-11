import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/User.css";

export default function User() {
  const { id } = useParams(); // actually email
  const [user, setUser] = useState(null);

  useEffect(() => {
    api.get(`/user/${id}`).then(res => {
      setUser(res.data);
    }).catch(err => {
      console.error("Error fetching user:", err);
    });
  }, [id]);

  if (!user) return <div className="loadingSpinner"></div>;

  var applied_projects = null;
  if ("applied_projects" in user && user.applied_projects) applied_projects = user.applied_projects.split(',');
  var approved_projects = null;
  if ("approved_projects" in user && user.approved_projects) approved_projects = user.approved_projects.split(',');
  var committed_project = null;
  if ("committed_project" in user && user.committed_project) committed_project = user.committed_project;

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
                  {
                    applied_projects && applied_projects.map(project => {
                      return <li key={project.id}>{project.project_name}</li>
                    })
                  }
                </ul>
              </td>
            </tr>
            
            <tr>
              <th>
                Projects Approved For:
              </th>
              <td>
                <ul>
                  {
                    approved_projects && approved_projects.map(project => {
                      return <li key={project.id}>{project.project_name}</li>
                    })
                  }
                </ul>
              </td>
            </tr>
            
            <tr>
              <th>
                Project Committed To:
              </th>
              <td>
                {committed_project && committed_project}
              </td>
            </tr>

          </tbody></table>
        </>}

      </div>
    </>
  );
}
