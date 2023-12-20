import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";

const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    // Get the user ID from localStorage
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken && decodedToken.userId) {
        const userId = decodedToken.userId;
        try {
          const response = await axios.get(
            `http://localhost:3001/users/${userId}`
          );
          if (response.status === 200) {
            setUser(response.data);
            console.log(response.data);
          } else {
            console.error("Failed to fetch user data.");
          }
        } catch (error) {
          console.error("Error during data fetching:", error);
        }
      }
    }
  };

  useEffect(() => {

    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row>
          <Col className="fs-3" md={6}>
            <h2 className="fs-1">User Profile</h2>
            {user ? (
              <>
                <p>
                  <strong>First Name:</strong> {user.firstName}
                </p>
                <p>
                  <strong>Last Name:</strong> {user.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <p>
                  <strong>Address:</strong> {user.address.country},{" "}
                  {user.address.city}, {user.address.street},{" "}
                  {user.address.houseNumber}, {user.address.postIndex}
                </p>
                <p>
                  <strong>Phone Number:</strong> {user.phoneNumber}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {user.dateOfBirth}
                </p>
                <p>
                  <strong>Ethereum Account:</strong> {user.ethereumAccount}
                </p>
              </>
            ) : (
              <p>Loading...</p>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
