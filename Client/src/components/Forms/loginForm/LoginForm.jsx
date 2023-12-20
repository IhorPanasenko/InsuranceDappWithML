// components/LoginForm.js
import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        loginData
      );

      if (response.status === 200) {
        console.log("User logged in successfully!");
        alert("Successgull Login!!!");
        console.log(response.data.token)
        localStorage.setItem("token", response.data.token )
        navigate("/insurances")
      } else {
        console.error("Failed to log in.");
        alert("Failed to login.\nMaybe you entered incorrect data\nTry again")
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Invalid username or password.\nTry again")
    }
  };

  return (
    <div className="Container">
      <Form onSubmit={handleSubmit}>
        {/* Email */}
        <Form.Group className="mt-2 mb-2" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
          className="fs-2"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Password */}
        <Form.Group className="mt-2 mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
           className="fs-2"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Submit Button */}
        <Button  className="fs-2 p-5 pt-2 pb-2 mt-3" variant="primary" type="submit">
          Login
        </Button>

        {/* Link to Registration Page */}
        <Col className="mt-3">
          <p>
            Don't have an account? <Link to="/registration">Register here</Link>
          </p>
        </Col>
      </Form>
    </div>
  );
};

export default LoginForm;
