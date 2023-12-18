import React, { useEffect, useRef, useState } from "react";
import { login } from "../../imagepath";
import { Link } from "react-router-dom";
import "./login.css";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import * as api from "./api";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import Register from "./Register";
import OtpInput from "./OtpInput";

export default function BorrowerRegister() {
  let inputRef = useRef();
  let inputRef2 = useRef();
  const showIcon = () => (
    <i class="feather feather-eye" aria-hidden="true">
      <FeatherIcon icon="eye" />
    </i>
  );
  const hideIcon = () => (
    <i class="feather feather-eye-slash" aria-hidden="true">
      <FeatherIcon icon="eye-off" />
    </i>
  );
  const [registrationField, setRegistrationField] = useState({
    email: "",
    pancard: "",
    password: "",
    referrerId: "",
    moblie: "",
  });
  const [field, setfield] = useState(true);
  const [submitotp, setsubmitotp] = useState(false);
  const [error, setError] = useState("");
  const [response1, setResponse] = useState({});

  const handlechange = (event) => {
    const { name, value } = event.target;
    setRegistrationField({
      ...registrationField,
      [name]: value,
    });
  };

  const handleLenderRegister = async () => {
    const validationError = api.validateRegisterInput(
      registrationField.email,
      registrationField.password,
      registrationField.moblie
    );

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const RegisterResponse = await api.RegisterUser(registrationField.moblie);
      alert(RegisterResponse);
      localStorage.setItem("seesion", RegisterResponse);
      setResponse(RegisterResponse);
      setfield(false);
      setError(null);
    } catch (error) {
      console.error("Error:", error.response.data.errorMessage);
      setError(error.response.data.errorMessage);
      // setError('An error occurred during login');
    }
  };
  const handlesumitmoblie = () => {};

  const Otpverify = async () => {
    try {
      // Retrieve OTP from local storage and clean it up
      let session = localStorage.getItem("seesion");
      let otpdata = localStorage.getItem("otp");
      let otp_data = otpdata.replace(/,/g, "");

      // Check if OTP has a valid length (e.g., 6 characters)
      if (otp_data.length === 6) {
        // Assuming `api.vaildateotp` expects the parameters in this order: otp_data, mobile, name, email, password
        const response = await api.vaildateotp(
          registrationField.email,
          registrationField.moblie,
          otp_data,
          registrationField.name,
          registrationField.password, // Ensure `password` is available in registrationField
          session,
          registrationField.referrerId
        );

        // Handle the successful response, e.g., update state
        setRegistrationSu(response);
      } else {
        // Handle the case where the OTP length is not valid
        setError("Please enter a valid OTP");
      }
    } catch (error) {
      // Handle any errors that occur during OTP validation
      console.error(
        "Error:",
        error.response ? error.response.data.errorMessage : error.message
      );
      setError(
        error.response
          ? error.response.data.errorMessage
          : "An error occurred during OTP validation"
      );
    }
  };

  return (
    <div>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={login} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  {submitotp ? (
                    <>
                      {" "}
                      <div className="maincircle">
                        <div className="circle">
                          <i class="fa-solid fa-user-check"></i>
                        </div>
                      </div>
                      <div className="cend">
                        <h2 className="textcenter">
                          You are one step away from completing registration.
                        </h2>{" "}
                        <hr />
                        <p className="textcent">
                          An activation link has been sent to your registered
                          e-mail. Please check your inbox and activate your
                          OxyLoans account to start Lending
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      {field ? (
                        <>
                          {" "}
                          <h1>Register as a Borrower</h1>
                        </>
                      ) : (
                        <>
                          <h1>Enter the otp sent to your mobile number</h1>
                        </>
                      )}{" "}
                    </>
                  )}

                  <p className="account-subtitle">
                    {/* Register as a Lender */}
                  </p>
                  {/* Form */}
                  {/* <form >  */}
                  <div>
                    {field ? (
                      <>
                        <div className="form-group">
                          <label>
                            NAME AS PER PANCARD{" "}
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="name"
                            onChange={handlechange}
                          />
                          <span className="profile-views">
                            <i className="fas fa-user-circle" />
                          </span>
                        </div>
                        <div className="form-group">
                          <label>
                            Email <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="email"
                            onChange={handlechange}
                          />
                          <span className="profile-views">
                            <i className="fas fa-envelope" />
                          </span>
                        </div>
                        <div className="form-group">
                          <label>
                            Password <span className="login-danger">*</span>
                          </label>
                          <input
                            ref={inputRef}
                            className="form-control pass-input"
                            type="password"
                            name="password"
                            onChange={handlechange}
                          />
                          <ReactPasswordToggleIcon
                            inputRef={inputRef}
                            showIcon={showIcon}
                            hideIcon={hideIcon}
                          />
                          {/* <input className="form-control pass-input" type="text" />
                                            <span className="profile-views feather-eye toggle-password">
                                                <FeatherIcon icon="eye" />
                                            </span> */}
                        </div>
                        <p className="reffertext">
                          If you are referred by an existing lender,Please enter
                          his/her referrer id ( EX : BR100001)
                        </p>
                        <div className="form-group">
                          <label>
                            ENTER THE REFERRER ID{" "}
                            <span className="login-danger">*</span>
                          </label>
                          {/* <input className="form-control pass-confirm" type="text" /> */}
                          <input
                            ref={inputRef2}
                            className="form-control pass-confirm"
                            type="text"
                            name="referrerId"
                            onChange={handlechange}
                          />

                          <span className="profile-views">
                            <i className="fas fa-phone" />
                          </span>
                        </div>
                        <div className="form-group">
                          <label>
                            Enter Moblie Number
                            <span className="login-danger">*</span>
                          </label>
                          {/* <input className="form-control pass-confirm" type="text" /> */}
                          <input
                            ref={inputRef2}
                            className="form-control pass-confirm"
                            type="text"
                            name="moblie"
                            onChange={handlechange}
                          />

                          <span className="profile-views">
                            <i className="fas fa-phone" />
                          </span>
                        </div>
                        {error && <div className="errormessage">{error}</div>}
                        <div className=" dont-have">
                          Already Registered? <Link to="/">Login</Link>
                        </div>
                        <div className="form-group mb-0">
                          <button
                            className="btn btn-primary btn-block"
                            type="submit"
                            onClick={handleLenderRegister}
                          >
                            {/* //  onClick={()=>{setfield(false);handleLenderRegister()}}> */}
                            Next Step
                          </button>
                        </div>{" "}
                      </>
                    ) : (
                      <>
                        {submitotp ? (
                          <></>
                        ) : (
                          <>
                            {" "}
                            <div className="maincircle">
                              <div className="circle">
                                {" "}
                                <i class="fa-solid fa-user-lock"></i>
                              </div>
                            </div>
                            <p>Enhanced Security for Registering on OxyLoans</p>
                            <hr />
                            <div className="otpfiled">
                              <OtpInput />
                            </div>
                            <div className=" dont-have">
                              Already Registered? <Link to="/">Login</Link>
                            </div>
                            {error && <p className="errormessage">{error}</p>}
                            <div className="form-group mb-0">
                              <button
                                className="btn btn-primary btn-block"
                                type="submit"
                                // onClick={()=>{Otpverify();setsubmitotp(true)}}>
                                onClick={() => Otpverify()}
                              >
                                Submit
                              </button>
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>
                  {/* </form> */}
                  {/* /Form */}
                  <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">or</span>
                  </div>
                  {/* Social Login */}
                  <div className="social-login">
                    <Link to="#">
                      <i className="fab fa-google-plus-g" />
                    </Link>
                    <Link to="#">
                      <i className="fab fa-facebook-f" />
                    </Link>
                    <Link to="#">
                      <i className="fab fa-twitter" />
                    </Link>
                    <Link to="#">
                      <i className="fab fa-linkedin-in" />
                    </Link>
                  </div>
                  {/* /Social Login */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
