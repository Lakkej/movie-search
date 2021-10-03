import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import axios from "axios";

function App() {
  const [token, setToken] = useState();
  const handleLogin = async (userBase, stage = null) => {
    try {
      let config = {
        method: "get",
        url: "http://localhost:3001/api/login",
        headers: {
          Authorization: `Basic ${userBase}`,
        },
      };
      const response = await axios(config);
      if (response.status === 200) {
        setToken(userBase);
        localStorage.setItem("token", userBase);
      } else {
        setToken(null);
      }
    } catch (error) {
      setToken(stage === "storage" ? null : "error");
    }
  };

  useEffect(() => {
    const tokenValue = localStorage.getItem("token");
    if (tokenValue !== undefined) {
      handleLogin(tokenValue, "storage");
    }
  }, []);
  return (
    <Router>
      <div className="App">
        <Route
          exact
          path="/"
          render={(props) =>
            token === null || token === "error" ? (
              <Login {...props} token={token} handleLogin={handleLogin} />
            ) : (
              <Dashboard {...props} token={token} />
            )
          }
        />
      </div>
    </Router>
  );
}

export default App;
