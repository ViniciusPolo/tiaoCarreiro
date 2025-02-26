// src/components/Login.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import tiaoCarreiro from './tiao-carreiro-pardinho.png';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://0.0.0.0:8000/api/login", {
        email,
        password,
      });

      if (response.data.token) {
        // Save the token to localStorage
        localStorage.setItem("token", response.data.token);

        // Redirect to the dashboard or home page 
        alert("foi")
        navigate("/musicas");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <header>
        <img src={tiaoCarreiro} alt="Tião Carreiro" className="artist-img" />
        <h1>Top 5 Músicas Mais Tocadas</h1>
        <h2>Tião Carreiro & Pardinho</h2>
      </header>
      <div className="container">
        <div className="submit-form">
            <h3>Login</h3>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="submit-button" type="submit">Login</button>
          </form>
          <p>
            Don't have an account? <Link to="/register">Register here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;