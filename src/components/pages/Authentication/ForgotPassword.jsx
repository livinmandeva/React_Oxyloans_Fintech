import React, { useEffect, useState } from "react";
import { login } from "../../imagepath";import * as api from './api'
import { passwordupdated } from "../../HttpRequest/beforelogin";

const ForgotPassword = () => {
  const [email,setemail]=useState({
    emailid:'',
    error:'',
    data:{},
    emailvaild:false,
    emailToken:'',
    email:'',
    password:'',
    passworderror:'',
    confirmpassword:''
  })
    const [emailisvaild, setemailisvaild]=useState(true)
  const handlechange = (event) => {
    const { name, value } = event.target; // Correct the typo: event.target instead of event.traget
    setemail({
      ...email,
      [name]: value
    });
  };
      


//   const handleresetpassword = async()=>{

//     const vaildatebu=api.vaildateemail(email.emailid);
//     if (vaildatebu){
   
//       setemail({
//         ...email,
//         error: vaildatebu,
//       });
//       return;
//     }try{
//       const sendOtpEmail= await api.sendotpemail(email.emailid);
//       setemailisvaild(!emailisvaild)
//       setEmail({
//         ...email,
//         data: sendOtpEmail,
//       });
//     }catch(error){
//       setEmail({
//         ...email,
//         error: error,
//       });
//     }
//   }  ;   
   useEffect(()=>{
  
   const urlemail=  new URLSearchParams(window.location.search);
   const email = urlemail.get('email');
   console.log(email)
   const emailToken=urlemail.get('emailToken');
   console.log(emailToken)

   setemail({
    ...email,
    email: email,
    emailToken: emailToken,
  });
  
  },[emailisvaild])

  const handlepassword = async () => {
    if (email.password !== email.confirmpassword) {
      setemail({
        ...email,
        passworderror: "password and confirm password must be the same",
      });
    } else {

      try {
        const response = await passwordupdated(
          email.emailToken,
          email.email,
          email.password,
          email.confirmpassword
        );
  

        console.log(response);
      } catch (error) {
       
        console.error(error);
      }
    }
  };
  
  return (
    <>
      {/* Main Wrapper */}
      <div className="main-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox">
              <div className="login-left">
                <img className="img-fluid" src={login} alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
       
                  {/* Form */}
                  {/* <form action="./login"> */}
           
                   <div>    <h1>Reset Password</h1>
                  <p className="account-subtitle">Let Us Help You</p>
                  {/* Form */}
                  {/* <form action="./login"> */}
                    <div className="form-group">
                      <label>
                       email address{" "}
                        <span className="login-danger">*</span>
                      </label>
                      <input className="form-control" type="text" name="emailid" value={email.email}/>
                      <span className="profile-views">
                        <i className="fas fa-envelope" />
                      </span>
                    </div>
                    <div className="form-group">
                      <label>
                       password{" "}
                        <span className="login-danger">*</span>
                      </label>
                      <input className="form-control" type="text" name="emailid" onChange={handlechange}/>
                      <span className="profile-views">
                        <i className="fas fa-envelope" />
                      </span>
                    </div>
                    <div className="form-group">
                      <label>
                        confirm password{" "}
                        <span className="login-danger">*</span>
                      </label>
                      <input className="form-control" type="text" name="emailid" onChange={handlechange}/>
                      <span className="profile-views">
                        <i className="fas fa-envelope" />
                      </span>
                    </div>
                    {email.error && <div  className="errormessage">{email.error}</div>}
                    {email.passworderror && <div  className="errormessage">{email.passworderror}</div>}
                    <div className="form-group">
                      <button
                        className="btn btn-primary btn-block"
                        type="submit"   onClick={handlepassword}
                      >
                        Reset My Password
                      </button>
                    </div>
                    </div>
                  
                  {/* </form> */}
                  {/* /Form */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
