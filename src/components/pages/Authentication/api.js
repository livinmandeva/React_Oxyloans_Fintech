import axios from "axios";
import { data } from "jquery";


 
     const API_BASE_URL="http://ec2-15-207-239-145.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/"
const API_URL = 'http://ec2-15-207-239-145.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/login?grantType=PWD';
const API_URL_otp = "http://ec2-15-207-239-145.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/sendOtp";
// Function to perform the login API request
export const loginUser = async (email, password , dataIpv4, dataIpv6) => {
  var data=  {
    "password": password,
    "email": email, // Use the correct variable here
    "ipAddress": dataIpv4,
    "ipAddressResponse": dataIpv6,
    "loginType": "WEB"
  };
  try {
    const response = await axios.post(API_URL, data,{
      headers: {
        "Content-Type": "application/json",
      }});
      const accessTokenFromHeader = response.headers['accesstoken'];
      localStorage.setItem("token", accessTokenFromHeader)

    if (!accessTokenFromHeader) {
      throw new Error('Access token not found in response headers');
    }

     return {
      accessToken: accessTokenFromHeader,
      responseData: response.data,
    };
  } catch (error) {
    throw error;
  }
};

// Function to validate user input
export const validateInput = (email, password) => {
  // Basic email validation (checks for a valid email format)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.match(emailRegex)) {
    return 'Please enter a valid email address';
  }

  // Password validation (minimum length of 6 characters)
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  // You can add more validation logic as needed

  return null; // No validation error
};   

export const sendotpemail = async (email) => {
  var  data={
    "email": email
}
  try {
    const response = await axios.post(API_BASE_URL +"user/resetpassword", data,{
      headers: {
        "Content-Type": "application/json",
      }});


    // if (!accessTokenFromHeader) {
    //   throw new Error('Access token not found in response headers');
    // }

     return {
      responseData: response.data,
    };
  } catch (error) {
    throw error;
  }
};

export const verifypannumber = async (pannumber, address , time, id,date) => {
  var  data={"address":address,"dob":date,

  "panNumber":pannumber,
  "timeInMilliSeconds": time,
  "userId": id
  }
  try {
    const response = await axios.post(API_BASE_URL +"user/emailVerification", data,{
      headers: {
        "Content-Type": "application/json",
      }});


    // if (!accessTokenFromHeader) {
    //   throw new Error('Access token not found in response headers');
    // }

     return {
      responseData: response.data,
    };
  } catch (error) {
    throw error;
  }
};

export const vaildateemail =(email)=>{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.match(emailRegex)) {
    return 'Please enter a valid email address';
  }
  return null;
}
export const validateRegisterInput =(email, password, moblie)=>{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !email.match(emailRegex)) {
    return 'Please enter a valid email address';
  }

  // Password validation (minimum length of 6 characters)
  if (!password || password.length < 6) {
    return 'Password must be at least 6 characters long';
  }

  // You can add more validation logic as needed

  const phoneNumberRegex = /^\d{10}$/;
  if (!moblie || !moblie.match(phoneNumberRegex)) {
    return 'Please enter a valid 10-digit phone number';
  }

  return null; // No validation error
}


export const validatemoblie = (moblie) => {
const phoneNumberRegex = /^\d{10}$/;
  if (!moblie || !moblie.match(phoneNumberRegex)) {
    return 'Please enter a valid 10-digit phone number';
  }else{
    return null
  }

}

// export const validateotp = (otp) => {
//   const phoneNumberRegex = /^\d{4}$/;
//     if (!otp || !otp.match(phoneNumberRegex)) {
//       return 'Please enter a valid 4-digit otp number';
//     }else{
//       return null
//     }
  
//   }

  export const moblieloginotp = async (moblie) => {
    var data={
     "mobileNumber": moblie
   }
     try {
       const response = await axios.post(API_URL_otp, data);
       
        return {
         responseData: response.data,
       };
     } catch (error) {
       throw error;
     }
   };


export const validateotpsubmit = async (moblie,otp) => {
 var data={
  "mobileNumber": moblie,
  "mobileOtpValue": otp
}
  try {
    const response = await axios.post("http://ec2-13-127-118-128.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/login?grantType=PWD", data,{
      headers: {
        "Content-Type": "application/json",
      }});
    
     return {
      responseData: response.data,
    };
  } catch (error) {
    throw error;
  }
};



export  const RegisterUser = async (moblie)=>{
    var data ={
      citizenship:"NONNRI",
      mobileNumber:moblie
      }
      try{
        const response=await axios.post(API_BASE_URL +"user/newUserRegistration",data);
        return response.data.mobileOtpSession;
      } catch (error) {
        throw error;
      }
}
// a   


export const vaildateotp = async (email,moblie,otp_data,name ,  password ,session, referrerId)=>{
  console.log('Email:', email);
console.log('Mobile:', moblie);
console.log('otp_data:', otp_data);
console.log('name:', name);
console.log('Mobile:', password);
console.log('mobileOtpSession:', session);
console.log('referrerId:', referrerId);
if(referrerId === ""){
  var data ={
    mobileNumber:moblie,
    mobileOtpSession:session,
    mobileOtpValue:otp_data,
    primaryType:"LENDER",
    name:name,
    email:email,
    password:password,
    citizenship:"NONNRI",
    uniqueNumber:0,
    utm:"WEB",
    uuid:"asdfghjkl"
    
    }
}else{
  var data ={
    mobileNumber:moblie,
    mobileOtpSession:session,
    mobileOtpValue:otp_data,
    primaryType:"LENDER",
    name:name,
    email:email,
    password:password,
    citizenship:"NONNRI",
    uniqueNumber:0,
    utm:"WEB",
    uuid:"asdfghjkl"
    
    }
}
  
    try{
      const response=await axios.post(API_BASE_URL +"user/newUserRegistration",data);
      return {
        responseData: response.data,
      };
    } catch (error) {
      throw error;
    }
}