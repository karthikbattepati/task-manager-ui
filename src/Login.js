import { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Login({ setUserId, goToSignup }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const login = async () => {
    try {
      const res = await axios.post(
        "https://task-manager-mbg4.onrender.com/auth/login", // ✅ UPDATED
        {
          username,
          password
        }
      );

      localStorage.setItem("userId", res.data);
      localStorage.setItem("username", username);

      setUserId(res.data);

    } catch (err) {
      console.error(err);
      alert("Invalid login");
    }
  };

  return (
    <div className="main-container">
      <h1 className="title">Welcome To Task_Manager!</h1>

      <div className="form-card">

        <input
          placeholder="Username"
          onChange={e => setUsername(e.target.value)}
        />

        <div className="password-wrapper">
          <input
            type={show ? "text" : "password"}
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
          <span
            className="eye"
            onClick={() => setShow(!show)}
          >
            👁
          </span>
        </div>

        <button onClick={login}>Login</button>
        <button onClick={goToSignup}>Create Account</button>

      </div>
    </div>
  );
}