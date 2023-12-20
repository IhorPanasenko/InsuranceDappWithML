import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { web3, userInsuranceContract } from "../../utils/web3";
import { getAccount } from "../../utils/metaMaskAccount";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const UserInsurances = () => {
  const [insurances, setInsurances] = useState([]);

  const fetchUserInsurances = async () => {
    try {
      const account = await getAccount();
      console.log(account);
      const response = await userInsuranceContract.methods
        .getUserInsurances()
        .call({
          from: account,
          gas: 99999999,
        });

      console.log(response);

      setInsurances(response);
    } catch (error) {
      console.error("Error fetching user insurances:", error);
    }
  };

  useEffect(() => {
    fetchUserInsurances();
  }, []);

  const handlePay = async (policyId, price) => {
    try {
      const account = await getAccount();

      await userInsuranceContract.methods.payForInsurance(policyId).send({
        from: account,
        gas: 99999999,
        value: price,
      });

      fetchUserInsurances();
      console.log("Payment successful");
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="bg-warning">
        {insurances.length > 0 ? (
          <div className="d-flex flex-wrap p-5 justify-content-around p-4">
            {insurances?.map((insurance, index) => (
              <Card
                className="m-3 p-2 bg-light border border-3 border-info rounded-5"
                key={index}
              >
                <Card.Body>
                  <Card.Title className="fs-1">
                    Insurance #{index + 1}
                  </Card.Title>
                  <Card.Subtitle className="fs-2 mb-2 text-muted">
                    Duration: {Number(insurance.duration)} months
                  </Card.Subtitle>
                  <Card.Text className="fs-2">
                    Coverage Amount: ${Number(insurance.coverageAmount)}
                    <br />
                    Premium Amount: ${Number(insurance.price)}
                    <br />
                    Insurance Category: {insurance.category}
                    <br />
                    Company Name: {insurance.providerCompany}
                  </Card.Text>
                  <div className="text-center">
                    {insurance.isActive ? (
                      <span className="text-success fs-2">Active</span>
                    ) : (
                      <Button
                        className="text-center fs-2 p-5 pt-2 pb-2"
                        variant="primary"
                        disabled={insurance.userPaid}
                        onClick={() => {
                          handlePay(insurance.policyId, insurance.price);
                        }}
                      >
                        Pay for policy
                      </Button>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h1 className="fs-1 h-100">You have no insurance contracts yet</h1>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default UserInsurances;
