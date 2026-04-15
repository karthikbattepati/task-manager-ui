import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";

export default function App() {

  const [page, setPage] = useState("login");

  //ensure string → number consistency
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  if (!userId) {

    if (page === "signup") {
      return <Signup goToLogin={() => setPage("login")} />;
    }

    return (
      <Login
        setUserId={(id) => {
          setUserId(id);
        }}
        goToSignup={() => setPage("signup")}
      />
    );
  }

  return (
    <Dashboard
      userId={userId}
      logout={() => {
        localStorage.clear();
        setUserId(null);
      }}
    />
  );
}