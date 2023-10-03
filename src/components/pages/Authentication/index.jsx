import React, { useEffect, useRef, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { login, registerImage } from "../../imagepath";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { useHistory } from "react-router-dom";
import { userloginSection } from "../../HttpRequest/beforelogin";
import { toastrSuccess, toastrWarning } from "../Base UI Elements/Toast";

const Login = () => {
  const history = useHistory();
  const [userLogInInfo, setUserLoginInfo] = useState({
    email: "",
    moblie: "",
    loginwithotp: false,
    password: "",
    response: null,
    dataIpv4: "",
    oftermoblieotp: false,
    otp: "",
    dataIpv6: "",
    error: null,
    errormessage: "",
    isvalid: true,
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

  useEffect(() => {
    if ((userLogInInfo.email != "") & (userLogInInfo.password != "")) {
      setUserLoginInfo({
        ...userLogInInfo,
        isvalid: false,
      });
    } else {
      setUserLoginInfo({
        ...userLogInInfo,
        isvalid: true,
      });
    }
  }, [userLogInInfo.email, userLogInInfo.password]);

  const submitloginhandler = async () => {
    let { email, password } = userLogInInfo;
    const retriveresponse = await userloginSection(email, password);

    if (retriveresponse.request.status == 200) {
      toastrSuccess("Login Suceess !");
      history.push("/dashboard");
    } else {
      toastrWarning(retriveresponse.response.data.errorMessage);
      // setUserLoginInfo({
      //   ...userLogInInfo,
      //   error: true,
      //   errormessage: retriveresponse.response.data.errorMessage,
      // });
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
                  <h2>Sign in</h2>

                  <form className="needs-validation" noValidate>
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
                      )}
                      <ReactPasswordToggleIcon
                        inputRef={inputRef}
                        showIcon={showIcon}
                        hideIcon={hideIcon}
                      />
                    </div>
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
                      <button
                        className="btn btn-primary btn-block"
                        type="button"
                        disabled={userLogInInfo.isvalid}
                        onClick={submitloginhandler}
                      >
                        Login
                      </button>
                    </div>
                  </form>

                  <div className="login-or">
                    <span className="or-line" />
                    <span className="span-or">or</span>
                  </div>

                  <div className="social-login">
                    <Link to="#">
                      <i className="fab fa-google-plus-g" />
                    </Link>
                    <Link to="/whatapplogin">
                      <i className="fa fa-whatsapp" />{" "}
                    </Link>
                    <Link onClick={() => {}} to="#">
                      <i className="fab fa-facebook-f" />
                    </Link>
                    <Link to="#">
                      <i className="fab fa-twitter" />
                    </Link>
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
