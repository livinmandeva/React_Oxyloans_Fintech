import React, { useEffect, useRef, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import * as api from "./api";
import ReactPasswordToggleIcon from "react-password-toggle-icon";
import { login } from "../../imagepath";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import "./login.css";
import { useNavigate, useParams } from "react-router-dom";
import { error } from "jquery";

const Register_active_proceed = () => {
  const history = useNavigate();
  let inputRef = useRef();
  const params = useParams();
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

  //   const [Errordate, setErrordate] = useState('');
  const [date1, setdate1] = useState("");
  const [response, setResponse] = useState(null);

  const [id, setid] = useState("");
  const [time, settime] = useState("");
  const [error, setError] = useState("");
  const [data, setdata] = useState({
    pannumber: "",
    address: "",
    date: "",
  });

  const handlesubmit = async () => {
    if (data.date === "") {
      //  setErrordate("Enter DOB");
    }
    if (data.pannumber.length >= 10) {
      try {
        const loginResponse = await api.verifypannumber(
          data.pannumber,
          data.address,
          time,
          id,
          date1
        );
        setResponse(loginResponse);
        history("/admindashboard");
        setError(null);
      } catch (error) {
        console.error("Error:", error.response.data.errorMessage);
        setError(error.response.data.errorMessage);
        // setError('An error occurred during login');
      }
    } else {
      setError("please enter vaild pan-card number");
    }
  };

  const handlechanges = (event) => {
    const { name, value } = event.target;
    setdata({
      ...data,
      [name]: value,
    });
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    // Get the value of the 'id' parameter
    const id = urlParams.get("id");

    // Get the value of the 'time' parameter
    const time = urlParams.get("time");

    // Do something with the id and time values
    console.log("id:", id);
    console.log("time:", time);
    settime(time);
    setid(id);
  }, []);

  useEffect(() => {
    var inputDate = data.date;

    var dateParts = inputDate.split("-");

    // Create a Date object
    var dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

    // Format the date as DD/MM/YYYY with leading zeros
    var formattedDay = String(dateObj.getDate()).padStart(2, "0");
    var formattedMonth = String(dateObj.getMonth() + 1).padStart(2, "0");
    var formattedYear = dateObj.getFullYear();

    var formattedDate =
      formattedDay + "/" + formattedMonth + "/" + formattedYear;

    // Print the result
    console.log(formattedDate);
    setdate1(formattedDate);
  }, [data.date]);
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
                  {/* <h1>Final Step: Complete Registration</h1> */}

                  <h2>Final Step: Complete Registration</h2>

                  {/* Form */}
                  {/* <form > */}

                  <div className="form-group">
                    <label>
                      Date of Birth <span className="login-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="date"
                      name="date"
                      onChange={handlechanges}
                    />
                    <span className="profile-views">
                      <i className="fas fa-user-circle" />
                    </span>
                  </div>
                  <div className="form-group">
                    <label>
                      Pan Number <span className="login-danger">*</span>
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      name="pannumber"
                      onChange={handlechanges}
                    />
                    <span className="profile-views">
                      <i className="fas fa-user-circle" />
                    </span>
                  </div>
                  <div className="form-group">
                    <label>
                      Address <span className="login-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      type="text"
                      name="address"
                      onChange={handlechanges}
                    />
                    <span className="profile-views">
                      <i className="fas fa-user-circle" />
                    </span>
                  </div>

                  {error && <div className="errormessage">{error} </div>}

                  <button
                    className="btn btn-primary btn-block"
                    type="submit"
                    onClick={handlesubmit}
                  >
                    {" "}
                    Submit{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register_active_proceed;
