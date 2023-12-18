import React, { useEffect, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { registerImage } from "../../imagepath";
import { Link } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
import OtpInput from "./OtpInput";
import {
  sendwhatappotp,
  verifywhatappotp,
} from "../../HttpRequest/beforelogin";
import { toastrError } from "../Base UI Elements/Toast";

const Whatapplog = () => {
  const [handlewhatapp, sethandlewhatapp] = useState(true);
  const [value, setValue] = useState();

  const [whatappotp, setwhatappotp] = useState({
    successMessage: "",
    otp: "",
    errorMessage: "",
    otpdata: "",
  });

  const verifyotp = async () => {
    const response = verifywhatappotp(whatappotp.otpdata);
    response.then((data) => {
      const accessToken = data.data.accessToken;
      console.log("Access Token: " + accessToken);
      if (data) {
        setwhatappotp({
          ...whatappotp,
          responsedata: data,
        });
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("userId", data.data.id);
        sessionStorage.setItem("tokenTime", data.data.tokenGeneratedTime);
        if (accessToken != null) {
          history("/dashboard");
        }
      } else if (data.response.status === 400) {
        const errorMessage = data.response.data.errorMessage;
        console.log("Error Message: " + errorMessage);
        setwhatappotp({
          ...whatappotp,
          errorMessage: data.response.data.errorMessage,
        });
      }
    });
  };
  const sethandlewhatappclick = async () => {
    if (value == undefined) {
      toastrError("Enter The WhatsApp Number");
    } else {
      const response = sendwhatappotp(value);
      response.then((data) => {
        if (data.request.status === 200) {
          sethandlewhatapp(false);
          setwhatappotp({
            ...whatappotp,
            successMessage: "Otp Sent successfully",
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
                          Whatsapp number
                          <span className="login-danger">*</span>
                        </label>
                        <PhoneInput
                          className="phoneinputfiled form-control"
                          value={value}
                          onChange={setValue}
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
                        <Link to="/whatapplogin">
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
                      <h2 className="text-center">Otp verification</h2>
                      <div className="texts">
                        <OtpInput />
                      </div>

                      <div className="co-12 text-success mt-3 text-center">
                        {whatappotp.successMessage && (
                          <span>{whatappotp.successMessage}</span>
                        )}
                      </div>

                      <div className="form-group">
                        <button
                          className="btn btn-primary btn-block mt-4"
                          type="submit"
                          onClick={verifyotp}
                        >
                          Submit
                        </button>
                      </div>

                      <div className="login-or">
                        <span className="or-line" />
                        <span className="span-or">or</span>
                      </div>
                      {/* Social Login */}
                      <div className="social-login">
                        <Link to="/whatapplogin">
                          <i className="fa fa-whatsapp" />
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

export default Whatapplog;
