import React, { useEffect, useRef, useState } from "react";
import { registerImage } from "../../imagepath";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { Link, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { userloginSection } from "../../HttpRequest/beforelogin";
import { toastrSuccess, toastrWarning } from "../Base UI Elements/Toast";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [userLogInInfo, setUserLoginInfo] = useState({
    email: "",
    moblie: "",
    loginwithotp: false,
    password: "",
    emailerror: "",
    passworderror: "",
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
    if (userLogInInfo.email === "" || userLogInInfo.password === "") {
      setUserLoginInfo((prevState) => ({
        ...prevState,
        emailerror:
          userLogInInfo.email === ""
            ? "Please Enter the Email/Mobile Number"
            : "",
        passworderror:
          userLogInInfo.password === "" ? "Please Enter The Password" : "",
      }));
    } else {
      let { email, password } = userLogInInfo;
      const retriveresponse = await userloginSection(email, password);

      if (retriveresponse.request.status == 200) {
        toastrSuccess("Login Suceess !");
        // dispatch(getProfile({ res: retriveresponse.data }));
        console.log(retriveresponse.data.primaryType)
        if(retriveresponse.data.primaryType === "ADMIN"){
          history("/mainadmindashboard");
        }else if(retriveresponse.data.primaryType === "LENDER"){
          history("/dashboard");
        }else if(retriveresponse.data.primaryType === "BORROWER"){
          history("/dashboard");
        }

      } else {
        toastrWarning(retriveresponse.response.data.errorMessage);
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
                  <h2>Login</h2>

                  <div className="form-group">
                    <label htmlFor="userloginusername">
                      Email/Mobile No <span className="login-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      value={userLogInInfo.email}
                      name="email"
                      onChange={handlechange}
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

                  <div className="form-group">
                    <label htmlFor="userpassword">
                      Password <span className="login-danger">*</span>
                    </label>
                    <input
                      ref={inputRef}
                      className="form-control pass-input"
                      type="password"
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
                  </div>

                  <div className="forgotpass">
                    <div className="remember-me">
                      <Link to="/loginotp">Login With OTP ?</Link>
                    </div>
                    <Link to="/forgotpassword">Forgot Password?</Link>
                  </div>

                  <div className="form-group">
                    <button
                      className="btn btn-primary btn-block"
                      type="button"
                      onClick={submitloginhandler}
                    >
                      Login
                    </button>
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

export default Login;
