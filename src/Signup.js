import { useState } from "react";
import axios from "axios";
import "./App.css";

export default function Signup({ goToLogin }) {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    username: "",
    password: ""
  });

  const signup = async () => {
    try {
      const res = await axios.post(
        "https://task-manager-mbg4.onrender.com/auth/signup", // ✅ UPDATED
        form
      );

      if (res.data === "USERNAME EXISTS") {
        alert("Username already exists");
      } else {
        alert("Signup successful");
        goToLogin();
      }

    } catch (err) {
      console.error(err);
      alert("Server error or network issue");
    }
  };

  return (
    <div className="main-container">

      <h1 className="title">Create Account</h1>

      <div className="form-card">

        <label>First Name</label>
        <input
          placeholder="Enter first name"
          value={form.firstName}
          onChange={e =>
            setForm({ ...form, firstName: e.target.value })
          }
        />

        <label>Last Name</label>
        <input
          placeholder="Enter last name"
          value={form.lastName}
          onChange={e =>
            setForm({ ...form, lastName: e.target.value })
          }
        />

        <label>Gender</label>
        <select
          value={form.gender}
          onChange={e =>
            setForm({ ...form, gender: e.target.value })
          }
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <label>Date of Birth</label>
        <input
          type="date"
          value={form.dob}
          onChange={e =>
            setForm({ ...form, dob: e.target.value })
          }
        />

        <label>Username</label>
        <input
          placeholder="Choose username"
          value={form.username}
          onChange={e =>
            setForm({ ...form, username: e.target.value })
          }
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={e =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button onClick={signup}>Signup</button>
        <button onClick={goToLogin}>Go to Login</button>

      </div>

    </div>
  );
}