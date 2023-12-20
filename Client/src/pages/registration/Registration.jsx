import RegisterForm from "../../components/Forms/RegistrationForm/RegistrationForm";

function Registration() {
  return (
    <>
      <div className="fs-2 h-100 d-flex m-5 p-5 bg-light justify-content-center">
        <div className="Container w-75">
          <RegisterForm />
        </div>
      </div>
    </>
  );
}

export default Registration;
