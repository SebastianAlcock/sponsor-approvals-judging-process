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

  return (
    <>
      <Navbar />
      <div className="user page">
        <h1>
          <span className="header">{user.first_name} {user.last_name}</span>
          {user.roles.split(',').map(role => <span className="role" key={role}>{role.toUpperCase()}</span>)}
        </h1>

        <table><tbody>
          <tr><th>Email</th><td>{user.email}</td></tr>
          <tr><th>Phone</th><td>{user.phone}</td></tr>
        </tbody></table>

        {user.roles.includes('student') && (
          <>
            <h2>Student Info:</h2>
            <table><tbody>
              {user.major && <tr><th>Major</th><td>{user.major}</td></tr>}
              {user.minor && <tr><th>Minor</th><td>{user.minor}</td></tr>}
              {user.specialization && <tr><th>Specialization</th><td>{user.specialization}</td></tr>}
              {user.resume && <tr><th>Resume</th><td><a href={user.resume}>View Resume</a></td></tr>}
            </tbody></table>
          </>
        )}
      </div>
    </>
  );
}
