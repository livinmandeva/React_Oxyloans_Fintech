import React, { useEffect, useRef, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { registerImage } from "../../imagepath";
import { Link, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { WarningBackendApi } from "../Base UI Elements/SweetAlert";

import { handlesenOtp, usersubmitotp } from "../../HttpRequest/beforelogin";
import { toastrSuccess, toastrWarning } from "../Base UI Elements/Toast";
import { useDispatch } from "react-redux";

const Loginotp = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [userLogInInfo, setUserLoginInfo] = useState({
    email: "",
    moblie: "",
    loginwithotp: false,
    password: "",
    emailerror: "",
    passworderror: "",
    sentotp: false,
    response: null,
    dataIpv4: "",
    oftermoblieotp: false,
    otp: "",
    dataIpv6: "",
    error: null,
    errormessage: "",
  });

  let inputRef = useRef();
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

  const handlechange = (event) => {
    const { name, value } = event.target;
    setUserLoginInfo({
      ...userLogInInfo,
      [name]: value,
    });
  };

  const submitloginhandler = async () => {
    if (userLogInInfo.password === "") {
      setUserLoginInfo((prevState) => ({
        ...prevState,
        passworderror:
          userLogInInfo.password === "" ? "Please enter The OTP" : "",
      }));
    } else {
      let { email, password } = userLogInInfo;
      const retriveresponse = await usersubmitotp(email, password);

      if (retriveresponse.request.status == 200) {
        toastrSuccess("Login Success!");

        sessionStorage.setItem("userId", retriveresponse.data.id);
        sessionStorage.setItem(
          "tokenTime",
          retriveresponse.data.tokenGeneratedTime
        );
        sessionStorage.setItem(
          "accessToken",
          retriveresponse.headers.accesstoken
        );
        // dispatch(getProfile({ res: retriveresponse.data }));
        history("/dashboard");
      } else {
        toastrWarning(retriveresponse.response.data.errorMessage);
      }
    }
  };

  const sendtheOtp = async () => {
    if (userLogInInfo.email === "") {
      setUserLoginInfo((prevState) => ({
        ...prevState,
        emailerror:
          userLogInInfo.email === "" ? "Please Enter The Moblie Number" : "",
      }));
    } else {
      if (userLogInInfo.email.length === 10) {
        const response = await handlesenOtp(userLogInInfo.email);
        console.log(response);
        if (response.request.status == 200) {
          if (response.data.id) {
            sessionStorage.setItem("userId", response.data.id);
          }
          setUserLoginInfo({
            ...userLogInInfo,
            sentotp: true,
          });
        } else {
          WarningBackendApi(
            response.response.data.errorCode,
            response.response.data.errorMessage
          );
        }
      } else {
        setUserLoginInfo((prevState) => ({
          ...prevState,
          emailerror:
            userLogInInfo.email === "" ? "Please 10 digit Moblie Number" : "",
        }));
      }
    }
  };

  return (
    <>
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
                  <h1>Welcome to Oxyloans</h1>

                  <p className="account-subtitle">
                    Need an account? <Link to="/register">Sign Up</Link>
                  </p>
                  <h2>LogIn With OTP</h2>

                  <div className="form-group">
                    <label htmlFor="userloginusername">
                      Enter Moblie Number{" "}
                      <span className="login-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      value={userLogInInfo.email}
                      name="email"
                      onChange={handlechange}
                      maxLength={6}
                      id="userloginusername"
                      required
                    />
                    <span className="profile-views">
                      <i className="fas fa-user-circle" />
                    </span>
                    {userLogInInfo.emailerror && (
                      <div className="text-danger">
                        {" "}
                        {userLogInInfo.emailerror}
                      </div>
                    )}
                  </div>
                  {userLogInInfo.sentotp && (
                    <>
                      {" "}
                      <div className="form-group">
                        <label htmlFor="userpassword">
                          Enter OTP <span className="login-danger">*</span>
                        </label>
                        <input
                          ref={inputRef}
                          className="form-control pass-input"
                          type="number"
                          name="password"
                          id="userpassword"
                          value={userLogInInfo.password}
                          onChange={handlechange}
                          required
                        />
                        {userLogInInfo.error && (
                          <div className="text-danger">
                            {userLogInInfo.errormessage}
                          </div>
                        )}{" "}
                        {userLogInInfo.passworderror && (
                          <div className="text-danger">
                            {" "}
                            {userLogInInfo.passworderror}
                          </div>
                        )}
                        <ReactPasswordToggleIcon
                          inputRef={inputRef}
                          showIcon={showIcon}
                          hideIcon={hideIcon}
                        />
                      </div>{" "}
                    </>
                  )}

                  <div className="forgotpass">
                    <div className="remember-me">
                      <label className="custom_check mr-2 mb-0 d-inline-flex remember-me">
                        Remember me
                        <input type="checkbox" name="remember" />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <Link to="/forgotpassword">Forgot Password?</Link>
                  </div>
                  <div className="form-group">
                    {userLogInInfo.sentotp ? (
                      <>
                        {" "}
                        <button
                          className="btn btn-primary btn-block"
                          type="button"
                          onClick={submitloginhandler}
                        >
                          Login
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary btn-block"
                          type="button"
                          onClick={sendtheOtp}
                        >
                          Send OTP
                        </button>
                      </>
                    )}
                  </div>

                  <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">or</span>
                  </div>

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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loginotp;
