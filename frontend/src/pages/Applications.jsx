import { Link } from "react-router-dom";

import Navbar from "./Navbar";

export default function Applications() {

  return (
    <>
      <Navbar currentPage={'applications'}/>

      <div className="applications page">
        <h1>Application Select</h1>
        <div>
          <Link to='/applications/proposal'>Sponsor Proposal Application</Link>
        </div>
      </div>
    </>
  );
}
