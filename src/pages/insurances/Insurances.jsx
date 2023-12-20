// pages/Insurances.js
import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { web3, userInsuranceContract } from "../../utils/web3";
import { getAccount } from "../../utils/metaMaskAccount";
import { jwtDecode } from "jwt-decode";

function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }

  return age;
}

const recalculatePremium = async (userAge, insuranceCategory) => {
  console.log(insuranceCategory);
  console.log(userAge);
  const body = {
    age: userAge,
    insuranceCategory: insuranceCategory,
  };
  console.log(body);
  try {
    const response = await axios.post(
      "http://localhost:5000/predict_payment",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Handle the response as needed
    console.log(response.data);
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Error during premium recalculation:", error);
    throw error; // Throw the error to handle it in the calling function
  }
};

const Insurances = () => {
  const [insurances, setInsurances] = useState([]);
  const [user, setUser] = useState({});

  const fetchInsurances = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/insurancePolicies"
      );
      if (response.status === 200) {
        setInsurances(response.data);
      } else {
        console.error("Failed to fetch insurance data.");
      }
    } catch (error) {
      console.error("Error during data fetching:", error);
    }
  };

  function calculateDiscount(paymentProbability) {
    const baseDiscount = 10;
    const discountRate = 0.1;
    let discount = baseDiscount - discountRate * paymentProbability;
    discount = Math.max(0, Math.min(10, discount));

    return discount;
  }

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
    fetchInsurances();
    fetchUser();
  }, []);

  const handleAddToProfile = async (insurance) => {
    try {
      console.log(insurance);
      const accounts = await getAccount();

      console.log(user);
      const userAge = calculateAge(user?.dateOfBirth);
      console.log(userAge);
      // Make a request to Flask API to recalculate premium
      const payment_probability = await recalculatePremium(
        userAge,
        insurance.insuranceCategoryId.name
      );
      console.log(payment_probability);
      const discount = calculateDiscount(
        payment_probability.predicted_payment * 100
      );
      console.log(discount);
      alert("Your discount based on our model: " + discount);

      //Use the recalculated data, e.g., recalculatedData.recalculated_premium
      let newPrice = Math.floor(
        insurance.premiumAmount * ((100 - discount) / 100)
      );
      alert("New price based on our prediction is: " + newPrice);
      await userInsuranceContract.methods
        .createInsurance(
          insurance.policyNumber,
          insurance.duration,
          insurance.insuranceCategoryId.name,
          newPrice,
          insurance.coverageAmount,
          insurance.insuranceCompanyId.name
        )
        .send({
          from: accounts,
          gas: 99999999,
        });

      console.log("UserInsurance created successfully!");
      alert("Insurance added to your profile");
    } catch (error) {
      console.error("Error creating UserInsurance:", error);
    }
  };

  return (
    <div className="bg-warning">
      <Header />
      <div className="d-flex flex-wrap p-5 justify-content-around p-4">
        {insurances.map((insurance) => (
          <Card className="m-3 p-2 bg-light" key={insurance._id}>
            <Card.Body>
              <Card.Title className="fs-1">
                Policy Number: {insurance.policyNumber}
              </Card.Title>
              <Card.Subtitle className="fs-2 mb-2 text-muted">
                Duration: {insurance.duration} months
              </Card.Subtitle>
              <Card.Text className="fs-2">
                Coverage Amount: ${insurance.coverageAmount}
                <br />
                Premium Amount: ${insurance.premiumAmount}
                <br />
                Insurance Category: {insurance.insuranceCategoryId.name}
                <br />
                Company Name: {insurance.insuranceCompanyId.name}
              </Card.Text>
              <div className="text-center">
                <Button
                  className="text-center fs-2 p-5 pt-2 pb-2"
                  variant="primary"
                  onClick={() => {
                    handleAddToProfile(insurance);
                  }}
                >
                  Add to profile
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Insurances;
