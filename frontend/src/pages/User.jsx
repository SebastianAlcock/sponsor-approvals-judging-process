import Navbar from "./Navbar";

import '../styles/User.css';

export default function User() {

  // TODO: GET user
  var student = {
    id: 17045050,
    first_name: 'John',
    last_name: 'Deer',
    email: 'jad2@njit.edu',
    phone: '(312) 654-7890',
    roles: 'student',
    // if student
    major: 'Information Technology',
    minor: null,
    specialization: null,
    resume: null,
    ucid: 'jad2',
    // if sponsor
    position_title: null,
    org_name: null,
    org_category: null,
    org_industry: null,
    org_website: null,
    org_address: null,
    // admin
    track: 'Industry',
    applied_projects: '124',
    approved_projects: '124',
    committed_project: '124',
    project_manager: false
  }

  var sponsor = {
    id: 17045050,
    first_name: 'Steven',
    last_name: 'Samuel',
    email: 'steven@tapyoca.com',
    phone: '(439) 245-8631',
    roles: 'sponsor,student,TA,Professor,Admin',
    // if student
    major: 'null',
    minor: null,
    specialization: null,
    resume: null,
    ucid: null,
    // if sponsor
    position_title: 'CTO',
    org_name: 'tapyoca',
    org_category: 'Small Business',
    org_industry: 'Media/Entertainment/Arts',
    org_website: 'https://tapyoca.com',
    org_address: '251 Washington Street, Newark, NJ, 07102',
    // admin
    track: '',
    applied_projects: '',
    approved_projects: '',
    committed_project: '',
    project_manager: false
  }
  
  var user = sponsor

  var applied_projects = user.applied_projects.split(',').map(id => get_project(id))
  var approved_projects = user.approved_projects.split(',').map(id => get_project(id))
  var committed_project = get_project(user.committed_project)

  // Takes a project id and returns a project object
  function get_project(id) {
    // TODO: GET project from id
    if (id === '124') {
      return {id: 124, project_name: 'tapyoca FanCard Dashboard'}
    }
    else {
      return '';
    }
  }

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
                    applied_projects.map(project => {
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
                    approved_projects.map(project => {
                      return <li key={project.id}>{project.project_name}</li>
                    })
                  }
                </ul>
              </td>
            </tr>
            
            <tr>
              <th>
                Project Committed To
              </th>
              <td>
                {committed_project.project_name}
              </td>
            </tr>

          </tbody></table>
        </>}

      </div>
    </>
  );
}
