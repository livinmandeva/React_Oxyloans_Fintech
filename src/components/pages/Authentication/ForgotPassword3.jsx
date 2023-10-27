import React, { useEffect, useState } from "react";
import { login } from "../../imagepath";
import * as api from "./api";
import { sendotpemail } from "../../HttpRequest/beforelogin";

const ForgotPassword3 = () => {
  const [email, setemail] = useState({
    emailid: "",
    error: "",
    data: {},
  });

  const handlechange = (event) => {
    const { name, value } = event.target;
    setemail({
      ...email,
      [name]: value,
    });
  };

  const handleresetpassword = async () => {
    const vaildatebu = api.vaildateemail(email.emailid);
    if (vaildatebu) {
      setemail({
        ...email,
        error: vaildatebu,
      });
      return;
    }
    try {
      const sendOtpEmail = sendotpemail(email.emailid);
      setemailisvaild(!emailisvaild);
      setEmail({
        ...email,
        data: sendOtpEmail,
      });
    } catch (error) {
      setEmail({
        ...email,
        error: error,
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
                <img className="img-fluid" src={login} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Reset Password</h1>
                  <p className="account-subtitle">Let Us Help You</p>

                  <div className="form-group">
                    <label>
                      Enter your registered email address
                      <span className="login-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="emailid"
                      onChange={handlechange}
                    />
                    <span className="profile-views">
                      <i className="fas fa-envelope" />
                    </span>
                  </div>
                  {email.error && (
                    <div className="errormessage">{email.error}</div>
                  )}
                  <div className="form-group">
                    <button
                      className="btn btn-primary btn-block"
                      type="submit"
                      onClick={handleresetpassword}
                    >
                      Reset My Password
                    </button>
                  </div>
                  <div className="form-group mb-0">
                    {/* <button
                      className="btn btn-primary primary-reset btn-block"
                      type="submit"
                      onClick="./admindashboard"
                    >
                      Login
                    </button> */}
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

export default ForgotPassword3;
