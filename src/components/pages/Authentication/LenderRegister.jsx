import React, { useEffect, useRef, useState } from "react";
import { registerImage } from "../../imagepath";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import * as api from "./api";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import OtpInput from "./OtpInput";
import { toastrWarning } from "../Base UI Elements/Toast";
export default function LenderRegister() {
  let inputRef = useRef();
  let inputRef2 = useRef();
  const showIcon = () => (
    <i className="feather feather-eye" aria-hidden="true">
      <FeatherIcon icon="eye" />
    </i>
  );
  const hideIcon = () => (
    <i className="feather feather-eye-slash" aria-hidden="true">
      <FeatherIcon icon="eye-off" />
    </i>
  );
  const [registrationField, setRegistrationField] = useState({
    email: "",
    pancard: "",
    password: "",
    referrerId: "",
    moblie: "",
    emailerror: "",
    pancarderror: "",
    passworderror: "",
    eamilerror: "",
    referrerIderror: "",
    uniqueNumber: "",
    moblieerror: "",
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
    setRegistrationField((prevState) => ({
      ...prevState,
      emailerror:
        registrationField.email === "" ? "Please enter the email" : "",
      pancarderror:
        registrationField.pancard === "" ? "Please enter the Name" : "",
      moblieerror:
        registrationField.moblie === "" ? "Please enter the moblie" : "",
      passworderror:
        registrationField.password === "" ? "Please enter the password" : "",
    }));

    const validationError = api.validateRegisterInput(
      registrationField.email,
      registrationField.password,
      registrationField.moblie
    );

    if (validationError) {
      setError(validationError);
      return;
    }
    if (
      registrationField.emailerror === "" &&
      registrationField.pancarderror === "" &&
      registrationField.moblieerror === "" &&
      registrationField.passworderror === ""
    ) {
      try {
        const RegisterResponse = await api.RegisterUser(
          registrationField.moblie
        );
        localStorage.setItem("seesion", RegisterResponse);
        setResponse(RegisterResponse);
        setfield(false);
        setError(null);
      } catch (error) {
        console.error("Error:", error.response.data.errorMessage);
        setError(error.response.data.errorMessage);
        // setError('An error occurred during login');
      }
    }
  };

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
          registrationField.pancard,
          registrationField.password, // Ensure `password` is available in registrationField
          session,
          registrationField.referrerId
        );
        //  const mill=gettime()

        localStorage.setItem("id", response.responseData.userId);

        const mill1 = new Date().getTime();
        localStorage.setItem("timemilll", mill1);
        navigate("/register_active_proceed");
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

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 1000);
  }, [error]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    // Get the value of the 'ref' parameter
    const refParam = searchParams.get("ref");

    if (registrationField.referrerId != "" || refParam != "") {
      setRegistrationField({
        ...registrationField,
        referrerId: refParam,
      });
    } else {
    }
  }, []);
  return (
    <div>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img
                  className="img-fluid h-100"
                  src={registerImage}
                  alt="Logo"
                />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  {submitotp ? (
                    <>
                      {" "}
                      <div className="maincircle">
                        <div className="circle">
                          <i className="fa-solid fa-user-check"></i>
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
                          <h1>Register as a Lender </h1>
                        </>
                      ) : (
                        <>
                          <h1 className="center">Please Enter the OTP </h1>
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
                            Name as per PAN card
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="pancard"
                            maxLength={30}
                            onChange={handlechange}
                          />
                          <span className="profile-views">
                            <i className="fas fa-user-circle" />
                          </span>
                          {registrationField.pancarderror && (
                            <div className="error">
                              {registrationField.pancarderror}
                            </div>
                          )}
                        </div>
                        <div className="form-group">
                          <label>
                            Email <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            name="email"
                            maxLength={35}
                            onChange={handlechange}
                          />
                          <span className="profile-views">
                            <i className="fas fa-envelope" />
                          </span>
                          {registrationField.emailerror && (
                            <div className="error">
                              {registrationField.emailerror}
                            </div>
                          )}
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
                            maxLength={15}
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
                                            </span> */}{" "}
                          {registrationField.passworderror && (
                            <div className="error">
                              {registrationField.passworderror}
                            </div>
                          )}
                        </div>
                        <p className="reffertext">
                          If you are referred by an existing lender,Please enter
                          his/her referrer id ( EX : LR100001)
                        </p>
                        <div className="form-group">
                          <label>Enter the referrer ID</label>
                          <input
                            ref={inputRef2}
                            className="form-control pass-confirm"
                            type="text"
                            name="referrerId"
                            value={registrationField.referrerId}
                            onChange={handlechange}
                          />
                          {/* <span className="profile-views">
                            <i className="fas fa-phone" />
                          </span>{" "} */}
                          {registrationField.referrerIderror && (
                            <div className="error">
                              {registrationField.referrerIderror}
                            </div>
                          )}
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
                            type="tel"
                            name="moblie"
                            maxLength={10}
                            onChange={handlechange}
                          />
                          <span className="profile-views">
                            <i className="fas fa-phone" />
                          </span>{" "}
                          {registrationField.moblieerror && (
                            <div className="error">
                              {registrationField.moblieerror}
                            </div>
                          )}
                        </div>
                        {error && (
                          <div className="errormessage">
                            {toastrWarning(error)}
                          </div>
                        )}
                        <div className=" dont-have">
                          Already Registered ? <Link to="/">Login</Link>
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
                                <i className="fa-solid fa-user-lock"></i>
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
                    {/* <Link to="#">
                      <i className="fab fa-google-plus-g" />
                    </Link> */}
                    <Link to="/whatsapplogin" className="bg-success text-white">
                      <i className="fa fa-whatsapp" />{" "}
                    </Link>
                    {/* <Link onClick={() => {}} to="#">
                      <i className="fab fa-facebook-f" />
                    </Link>
                    <Link to="#">
                      <i className="fab fa-twitter" />
                    </Link> */}
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
