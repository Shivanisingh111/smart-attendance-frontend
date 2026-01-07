import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token, login } = useContext(AuthContext);

    useEffect(() => {
      if (token) {
        navigate("/dashboard");
      }
    }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("password", password);

      const response = await axios.post(
        "http://localhost:8080/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      login(response.data);     
      navigate("/dashboard");    
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <h3>Login</h3>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
