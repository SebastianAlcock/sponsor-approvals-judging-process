import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/Form.css"; // reuse or create styling for link buttons

export default function Applications() {
  return (
    <>
      <Navbar currentPage="applications" />

      <div className="applications page">
        <h1>Apply for Capstone</h1>
        <p>Please select one of the following application options:</p>

        <div className="app-links">
          <Link to="/applications/proposal" className="app-button">
            📄 Sponsor Proposal Application
          </Link>

          <Link to="/applications/approval" className="app-button">
            ✅ Sponsor Approval Form
          </Link>
        </div>
      </div>
    </>
  );
}
