// src/pages/Register.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import tiaoCarreiro from './tiao-carreiro-pardinho.png';


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://0.0.0.0:8000/api/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      if (response.data.token) {
        // Save the token to localStorage
        localStorage.setItem("token", response.data.token);

        // Redirect to the dashboard or home page
        alert("Registration successful!");
        navigate("/musicas");
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
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
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <div className="input-group">
          <input
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">          
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            placeholder="Confirm Password"
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            required
          />
        </div>
        <button className="submit-button" type="submit">Register</button>
      </form>
      </div>
      </div>
    </div>
  );
};

export default Register;