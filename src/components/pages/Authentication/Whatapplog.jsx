import React, { useEffect, useRef, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "owl.carousel/dist/assets/owl.theme.default.css";

import {
  registerImage,
  oxylogomobile,
  oxylogodashboard,
} from "../../imagepath";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import "./login.css";
import OtpInput from "./OtpInput";
import {
  sendwhatappotp,
  verifywhatappotp,
} from "../../HttpRequest/beforelogin";
import { toastrError } from "../Base UI Elements/Toast";
import "./user.css";
import Whatappuser from "./Whatappuser";

const Whatapplog = () => {
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
  const [handlewhatapp, sethandlewhatapp] = useState(true);
  const [value, setValue] = useState("");
  const [dataIpv6, setdataIpv6] = useState({});
  const [dataIpv4, setdataIpv4] = useState("");
  const [whatsapploginotp, setwhatsapploginotp] = useState([]);

  const [whatappotp, setwhatappotp] = useState({
    successMessage: "",
    otp: "",
    // otpdata:''
    errorMessage: "",
    otpdata: "",
  });

  const history = useNavigate();
  const [data, setdata] = useState("");
  const [datavalid, setdatavaild] = useState(false);

  const handleipv6 = () => {
    axios({
      method: "get",
      url: "https://ipapi.co/json/",
    })
      .then((res) => {
        setdataIpv6(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleip4 = () => {
    axios({
      method: "get",
      url: "https://api.ipify.org/?format=json",
    })
      .then((res) => {
        setdataIpv4(res.data.ip);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const setwhatsappotphandler = (otpvalues) => {
    setwhatsapploginotp(otpvalues);
  };
  useEffect(() => {
    handleipv6();
    handleip4();
  }, []);

  const verifyotp = async () => {
    let whatsappotpvaluescallback =
      whatsapploginotp.length > 0 ? whatsapploginotp.join("") : "";
    if (whatsappotpvaluescallback == "") {
      toastrError("Enter the Whatsapp OTP");
    } else {
      const response = verifywhatappotp(
        whatappotp.otpdata,
        whatsappotpvaluescallback
      );
      response.then((data) => {
        const accessToken = data.headers?.accesstoken;
        if (accessToken) {
          setwhatappotp({
            ...whatappotp,
            responsedata: data,
          });
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("userId", data.data.id);
          sessionStorage.setItem("tokenTime", data.data.tokenGeneratedTime);
          if (accessToken != null) {
            if (data.data.primaryType == "LENDER") {
              history("/dashboard");
            } else if (data.data.primaryType == "ADMIN") {
              history("/dashboard");
            } else {
              toastrError("Try to Login of Lender Only");
            }
          }
          // setdata(data);
        } else if (data.response?.status == 400) {
          toastrError(data.response.data.errorMessage);
          // setwhatappotp({
          //   ...whatappotp,
          //   errorMessage: data.response.data.errorMessage,
          // });
        } else {
          setdata(data);
          setdatavaild(true);
        }
      });
    }
  };

  const sethandlewhatappclick = async () => {
    if (value == "" || value == undefined) {
      toastrError("Enter The WhatsApp Number");
    } else {
      const response = sendwhatappotp(value);
      response.then((data) => {
        if (data.request.status === 200) {
          sethandlewhatapp(false);
          setwhatappotp({
            ...whatappotp,
            otpdata: data.data,
          });
        } else {
          setwhatappotp({
            ...whatappotp,
            errorMessage: data.response.data.errorMessage,
          });
          toastrError(data.response.data.errorMessage);
        }
      });
    }
  };

  return (
    <>
      {datavalid && (
        <>
          {/* login-body */}
          <div className="main-wrapper  container-fluid">
            <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-center">
                  <img
                    src={oxylogodashboard}
                    className="imagelo11"
                    alt="images-data"
                  />
                </div>
              </div>

              <div className="card-body border-0">
                <Whatappuser data={data.data.whatsappLoginResponse} />
              </div>
            </div>
          </div>
        </>
      )}
      {datavalid ? (
        <></>
      ) : (
        <>
          <div className="main-wrapper login-body">
            <div className="login-wrapper">
              <div className="container">
                <div className="loginbox">
                  <div className="login-left">
                    <img
                      className="img-fluid  h-100"
                      src={registerImage}
                      alt="Logo"
                    />
                  </div>

                  <div className="login-right">
                    {handlewhatapp ? (
                      <>
                        <div className="login-right-wrap">
                          <h1>Welcome to Oxyloans</h1>
                          <p className="account-subtitle">
                            Need an account? <Link to="/register">Sign Up</Link>
                          </p>

                          <h2>Sign in</h2>
                          <div className="phoneinput form-group">
                            <label>
                              WhatsApp number
                              <span className="login-danger">*</span>
                            </label>
                            <PhoneInput
                              className="phoneinputfiled form-control"
                              value={value}
                              onChange={setValue}
                              defaultCountry="IN"
                            />
                          </div>
                          <div className="forgotpass">
                            <Link to="/forgotpassword">Forgot Password?</Link>
                          </div>
                          <div className="form-group">
                            <button
                              className="btn btn-primary btn-block"
                              type="submit"
                              onClick={sethandlewhatappclick}
                            >
                              Send OTP
                            </button>
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
                            <Link
                              to="/whatsapplogin"
                              className="bg-success text-white"
                            >
                              <i className="fa fa-whatsapp" />
                            </Link>
                            {/* <Link to="#">
                          <i className="fab fa-facebook-f" />
                        </Link>
                        <Link to="#">
                          <i className="fab fa-twitter" />
                        </Link> */}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="login-right-wrap">
                          <h1>Welcome to Oxyloans</h1>
                          <p className="account-subtitle">
                            Need an account? <Link to="/register">Sign Up</Link>
                          </p>
                          <h2>Otp verification</h2>
                          <div className="texts">
                            <OtpInput
                              data={4}
                              setwhatsappotphandler={setwhatsappotphandler}
                            />
                          </div>
                          {whatappotp.successMessage && (
                            <div className="errorMessage">
                              {whatappotp.successMessage}{" "}
                            </div>
                          )}
                          {whatappotp.errorMessage && (
                            <div className="errorMessage">
                              {whatappotp.errorMessage}{" "}
                            </div>
                          )}
                          <div className="form-group">
                            <button
                              className="btn btn-primary btn-block mt-4"
                              type="submit"
                              onClick={verifyotp}
                            >
                              Submit
                            </button>
                          </div>
                          {/* </form> */}
                          {/* /Form */}
                          <div className="login-or">
                            <span className="or-line" />
                            <span className="span-or">or</span>
                          </div>
                          {/* Social Login */}
                          <div className="social-login">
                            <Link
                              to="/whatsapplogin"
                              className="bg-success text-white"
                            >
                              <i className="fa fa-whatsapp" />
                            </Link>
                            {/* <Link to="#">

                          <i className="fab fa-google-plus-g" />
                        </Link> */}

                            {/* <Link to="#">
                          <i className="fab fa-facebook-f" />
                        </Link>
                        <Link to="#">
                          <i className="fab fa-twitter" />
                        </Link> */}
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
      )}
    </>
  );
};

export default Whatapplog;
