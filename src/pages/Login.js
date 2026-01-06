import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Login() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegisterMode) {
        // Registration
        const response = await axios.post(
          "http://localhost:8080/auth/register",
          {
            username,
            email,
            password,
          }
        );
        login(response.data);
        navigate("/dashboard");
      } else {
        // Login
        const response = await axios.post(
          "http://localhost:8080/auth/login",
          {
            username,
            password,
          }
        );
        login(response.data);
        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || (isRegisterMode ? "Registration failed" : "Invalid credentials"));
    }
  };

  return (
    <div className="login-container">
      <h3>{isRegisterMode ? "Register" : "Login"}</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {isRegisterMode && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{isRegisterMode ? "Register" : "Login"}</button>
      </form>

      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        {isRegisterMode ? "Already have an account? " : "Don't have an account? "}
        <button
          type="button"
          onClick={() => setIsRegisterMode(!isRegisterMode)}
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          {isRegisterMode ? "Login" : "Register"}
        </button>
      </p>
    </div>
  );
}

export default Login;
