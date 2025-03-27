import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage"

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Capstone Portal</h1>
        <nav>
          <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<h1>Dashboard Page (Coming Soon)</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
