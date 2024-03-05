import React, { useEffect, useRef, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "owl.carousel/dist/assets/owl.theme.default.css";

import { registerImage } from "../../imagepath";

import { Link  ,useLocation } from "react-router-dom";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import OtpInput from "./OtpInput";
import {
  sendwhatappotp,
  verifywhatappotp,
} from "../../HttpRequest/beforelogin";
import { toastrError } from "../Base UI Elements/Toast";
import Usercard from "./Usercard";

const Whatappuser = () => {



  const [handlewhatapp, sethandlewhatapp] = useState(true);
  const [value, setValue] = useState("");
  const [dataIpv6, setdataIpv6] = useState({});
  const [dataIpv4, setdataIpv4] = useState("");

  const [whatappotp, setwhatappotp] = useState({
    successMessage: "",
    otp: "",
    // otpdata:''
    errorMessage: "",
    otpdata: "",
  });

  const [data , setdata]=useState({
        userId: "LR36549",
        name: "MANDEVA LIVEEN",
        email: "liveen@oxyloans.com"
    })
    
    const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryString = searchParams.get('data');
  const whatsappLoginResponse = queryString ? JSON.parse(decodeURIComponent(queryString)) : [];


  console.log(whatsappLoginResponse)
  const verifyotp = async () => {
    const response = verifywhatappotp(whatappotp.otpdata);

    response.then((data) => {
      const accessToken = data.data.accessToken;

      if (data) {
        setwhatappotp({
          ...whatappotp,
          responsedata: data,
        });
       
        
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("userId", data.data.id);
        sessionStorage.setItem("tokenTime", data.data.tokenGeneratedTime);

        
        
        console.log(whatappotp.responsedata)
        if(data.data.whatsappLoginResponse !== []){
          history("/whatappuser");
        }else if (accessToken != null) {
          if (data.data.primaryType == "LENDER") {
            history("/dashboard");
          } else if (data.data.primaryType == "ADMIN") {
            history("/dashboard");
          } else {
            history("/borrowerDashboard");
          }

          // history("/dashboard");
        }
      } else if (data.response.status === 400) {
        // const errorMessage = data.response.data.errorMessage;

        setwhatappotp({
          ...whatappotp,
          errorMessage: data.response.data.errorMessage,
        });
      }
    });
  };
  const sethandlewhatappclick = async () => {
    if (value == "") {
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
            <div className=" logincard" >
            
            <Usercard  data={data}/>
            <Usercard data={data} />
            <Usercard data={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Whatappuser;
