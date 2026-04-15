import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

export default function Dashboard({ userId, logout }) {

  const [tasks, setTasks] = useState([]);
  const username = localStorage.getItem("username");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("LOW");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  // ✅ UPDATED BASE URL
  const API = "https://task-manager-mbg4.onrender.com";

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/api/tasks/${userId}`);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async () => {
    try {
      await axios.post(`${API}/api/tasks/${userId}`, {
        title,
        description,
        status: "PENDING",
        dueDate,
        priority
      });

      // clear inputs
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("LOW");

      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const completeTask = async (task) => {
    try {
      await axios.put(`${API}/api/tasks/${task.id}`, {
        ...task,
        status: "COMPLETED"
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setEditData(task);
  };

  const saveEdit = async () => {
    try {
      await axios.put(`${API}/api/tasks/${editId}`, editData);
      setEditId(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAccount = async () => {
    const password = prompt("Enter password to delete account");

    if (!password) return;

    try {
      const res = await axios.delete(`${API}/auth/delete/${userId}`, {
        data: { password }
      });

      if (res.data === "WRONG PASSWORD") {
        alert("Wrong password");
      } else {
        alert("Account deleted");
        localStorage.clear();
        window.location.reload();
      }

    } catch (err) {
      console.error(err);
      alert("Error deleting account");
    }
  };

  return (
    <div className="main-container">

      <div className="top-bar">
        <div>Hello, {username}</div>
        <div>
          <button className="logout" onClick={logout}>Logout</button>
          <button className="logout" onClick={deleteAccount}>Delete Account</button>
        </div>
      </div>

      <h1 className="title">Task Manager</h1>

      <div className="form-card">
        <label>Task Title</label>
        <input value={title} onChange={e => setTitle(e.target.value)} />

        <label>Description</label>
        <input value={description} onChange={e => setDescription(e.target.value)} />

        <label>Due Date</label>
        <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />

        <label>Priority</label>
        <select value={priority} onChange={e => setPriority(e.target.value)}>
          <option>LOW</option>
          <option>MEDIUM</option>
          <option>HIGH</option>
        </select>

        <button onClick={addTask}>Add Task</button>
      </div>

      {tasks.map(task => (
        <div className="task-card" key={task.id}>

          {editId === task.id ? (
            <div style={{ width: "100%" }}>
              <input value={editData.title} onChange={e => setEditData({ ...editData, title: e.target.value })} />
              <input value={editData.description} onChange={e => setEditData({ ...editData, description: e.target.value })} />
              <select value={editData.status} onChange={e => setEditData({ ...editData, status: e.target.value })}>
                <option>PENDING</option>
                <option>COMPLETED</option>
              </select>
              <button onClick={saveEdit}>Save</button>
            </div>
          ) : (
            <>
              <div>
                <h3 style={{ textAlign: "center" }}>{task.title}</h3>
                <p><b>Description:</b> {task.description}</p>
                <p><b>Due:</b> {task.dueDate}</p>
                <p><b>Priority:</b> {task.priority}</p>
                <p><b>Status:</b> {task.status}</p>
              </div>

              <div className="actions">
                <button onClick={() => startEdit(task)}>Edit</button>
                {task.status === "PENDING" && (
                  <button onClick={() => completeTask(task)}>Complete</button>
                )}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </>
          )}

        </div>
      ))}

    </div>
  );
}