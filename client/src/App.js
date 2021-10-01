import logo from "./logo.svg";
import "./App.css";
import { Button } from "@mui/material";
import axios from "axios";

const login = async (username, password) => {
  try {
    let config = {
      method: "get",
      url: "http://localhost:3001/api/login",
      headers: {
        Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString(
          "base64"
        )}`,
      },
    };
    const response = await axios(config);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button fullWidth onClick={() => login("user", "securepassword")}>
          Click me
        </Button>
      </header>
    </div>
  );
}

export default App;
