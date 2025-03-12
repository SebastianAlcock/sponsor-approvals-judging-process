import { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/") // Connect to Flask backend
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => setMessage("Error connecting to backend"));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Frontend</h1>
        <p>Backend says: {message}</p>
      </header>
    </div>
  );
}

export default App;
