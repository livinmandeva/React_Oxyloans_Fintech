import React, { useEffect, useRef, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import * as api from "./api";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { login } from "../../imagepath";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import "./login.css";
import { useHistory } from "react-router-dom";
import { handleip4, handleipv6 } from "../../HttpRequest/beforelogin";

const Login = () => {
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

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [moblie, setmoblie] = useState("");
  const [loginwithotp, setloginwithotp] = useState(false);
  const [password, setPassword] = useState("");
  const [response, setResponse] = useState(null);
  const [dataIpv4, setdataIpv4] = useState("");
  const [oftermoblieotp, setoftermoblieotp] = useState(false);
  const [otp, setmoblieotp] = useState("");
  const [dataIpv6, setdataIpv6] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    handleipv6().then((data) => {
      setdataIpv6(data.ip);
    });
    handleip4().then((data) => {
      setdataIpv4(data.ip);
    });
  }, []);

  const handleLogin = async () => {
    const validationError = api.validateInput(email, password);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const loginResponse = await api.loginUser(
        email,
        password,
        dataIpv4,
        dataIpv6
      );
      setResponse(loginResponse);
      history.push("/admindashboard");
      setError(null);
    } catch (error) {
      console.error("Error:", error.response.data.errorMessage);
      setError(error.response.data.errorMessage);
    }
  };

  const handleLoginotp = async () => {
    const validationError = api.validatemoblie(moblie);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const loginResponse = await api.moblieloginotp(moblie);

      setoftermoblieotp(true);
    } catch (error) {
      console.error("Error:", error.response.data.errorMessage);
      setError(error.response.data.errorMessage);
      setError("An error occurred during login");
    }
  };

  const handleotpsubmit = async () => {
    try {
      const loginResponse = await api.validateotpsubmit(moblie, otp);
    } catch (error) {
      console.error("Error:", error.response.data.errorMessage);
      setError(error.response.data.errorMessage);
      setError("An error occurred during login");
    }
  };

  return (
    <>
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={login} alt="Logo" />
              </div>
              <div className="login-right">
                {loginwithotp ? (
                  <>
                    <div className="login-right-wrap">
                      <h1>Welcome to Oxyloans</h1>
                      <p className="account-subtitle">
                        Need an account? <Link to="/register">Sign Up</Link>
                      </p>
                      <h2>Sign in</h2>

                      {/* Form */}
                      <div className="form-group">
                        <label>
                          Mobile number <span className="login-danger">*</span>
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          value={moblie}
                          name="mobile"
                          onChange={(event) => setmoblie(event.target.value)}
                          required
                        />
                        <span className="profile-views">
                          <i className="fas fa-user-circle" />
                        </span>
                      </div>

                      {oftermoblieotp ? (
                        <>
                          <div className="form-group">
                            <label>
                              Mobile OTP <span className="login-danger">*</span>
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              value={otp}
                              name="otp"
                              onChange={(event) =>
                                setmoblieotp(event.target.value)
                              }
                              required
                            />
                            <span className="profile-views">
                              <i className="fas fa-user-circle" />
                            </span>
                          </div>
                          <div className="form-group">
                            <button
                              className="btn btn-primary btn-block"
                              onClick={handleotpsubmit}
                              type="button"
                            >
                              Submit
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="form-group">
                            <button
                              className="btn btn-primary btn-block"
                              onClick={handleLoginotp}
                              type="button"
                            >
                              Send OTP
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="login-right-wrap">
                      <h1>Welcome to Oxyloans</h1>

                      <p className="account-subtitle">
                        Need an account? <Link to="/register">Sign Up</Link>
                      </p>
                      <h2>Sign in</h2>

                      <form action="#">
                        <div className="form-group">
                          <label>
                            Username <span className="login-danger">*</span>
                          </label>
                          <input
                            className="form-control"
                            type="text"
                            value={email}
                            name="email"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                          />
                          <span className="profile-views">
                            <i className="fas fa-user-circle" />
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
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            required
                          />
                          {error && <div className="text-danger">{error}</div>}
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
                            onClick={handleLogin}
                            type="button"
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
                        <Link onClick={() => setloginwithotp(true)} to="#">
                          <i className="fab fa-facebook-f" />
                        </Link>
                        <Link to="#">
                          <i className="fab fa-twitter" />
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
