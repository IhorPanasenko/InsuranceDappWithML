// components/RegisterForm.js
import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: {
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      postIndex: "",
    },
    phoneNumber: "",
    dateOfBirth: "",
    ethereumAccount: "",
    role: "User",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3001/register",
        formData
      );

      if (response.status >= 200 && response.status < 300) {
        console.log("User registered successfully!");
        alert("You successfully registered to our application");
        navigate("/");
      } else {
        console.error("Failed to register user.");
        alert("Something went wrong. Wait for a while and try again");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mt-2 mb-2 pt-2 pb-2" controlId="firstName">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          className="fs-2"
          type="text"
          placeholder="Enter your first name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mt-2 mb-2 pt-2 pb-2" controlId="lastName">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          className="fs-2"
          type="text"
          placeholder="Enter your last name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mt-2 mb-2 pt-2 pb-2" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          className="fs-2"
          type="email"
          placeholder="Enter your email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mt-2 mb-2 pt-2 pb-2" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          className="fs-2"
          type="password"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mt-2 mb-2 pt-2 pb-2" controlId="country">
        <Form.Label>Country</Form.Label>
        <Form.Control
          className="fs-2"
          type="text"
          placeholder="Enter your country"
          name="country"
          value={formData.address.country}
          onChange={handleAddressChange}
          required
        />
      </Form.Group>
      <Form.Group className="mt-2 mb-2 pt-2 pb-2" controlId="city">
        <Form.Label>City</Form.Label>
        <Form.Control
          className="fs-2"
          type="text"
          placeholder="Enter your city"
          name="city"
          value={formData.address.city}
          onChange={handleAddressChange}
          required
        />
      </Form.Group>
      <Form.Group className="mt-2 mb-2 pt-2 pb-2" controlId="street">
        <Form.Label>Street</Form.Label>
        <Form.Control
          className="fs-2"
          type="text"
          placeholder="Enter your street"
          name="street"
          value={formData.address.street}
          onChange={handleAddressChange}
          required
        />
      </Form.Group>
      <Form.Group className="mt-2 mb-2 pt-2 pb-2" controlId="houseNumber">
        <Form.Label>House number</Form.Label>
        <Form.Control
          className="fs-2"
          type="text"
          placeholder="Enter your house number"
          name="houseNumber"
          value={formData.address.houseNumber}
          onChange={handleAddressChange}
          required
        />
      </Form.Group>
      <Form.Group className="mt-2 mb-2 pt-2 pb-2" controlId="postIndex">
        <Form.Label>Post index</Form.Label>
        <Form.Control
          className="fs-2"
          type="text"
          placeholder="Enter your post index"
          name="postIndex"
          value={formData.address.postIndex}
          onChange={handleAddressChange}
          required
        />
      </Form.Group>
      <Form.Group className="mt-2 mb-2 pt-2 pb-2" controlId="phoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control
          className="fs-2"
          type="tel"
          placeholder="Enter your phone number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mt-2 mb-2 pt-2 pb-2" controlId="dateOfBirth">
        <Form.Label>Date of Birth</Form.Label>
        <Form.Control
          className="fs-2"
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mt-2 mb-2 pt-2 pb-2" controlId="ethereumAccount">
        <Form.Label>Ethereum Account</Form.Label>
        <Form.Control
          className="fs-2"
          type="text"
          placeholder="Enter your ethereum Account"
          name="ethereumAccount"
          value={formData.ethereumAccount}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button className="fs-2 p-5 pt-2 pb-2" variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};

export default RegisterForm;
