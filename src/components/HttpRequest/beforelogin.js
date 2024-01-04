import axios from "axios";
const userisIn = "local";
let API_BASE_URL =
  userisIn == "local"
    ? "http://ec2-15-207-239-145.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/"
    : "https://fintech.oxyloans.com/oxyloans/v1/user/";

const handleApiRequestBeforeLogin = async (
  method,
  BASE_URL,
  End_Url,
  POSTDATA
) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${End_Url}`,
      data: POSTDATA,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

export const sendotpemail = async (email) => {
  const data = {
    email: email,
  };

  const response = handleApiRequestBeforeLogin(
    "POST",
    API_BASE_URL,
    "resetpassword",
    data
  );
  return response;
};

export const Admlog = async (userid, password) => {
  const data = {
    id: userid,
    primaryType: password,
  };
  const response = await handleApiRequestBeforeLogin(
    "POST",
    API_BASE_URL,
    "login?grantType=PWD",
    data
  );

  if (response.status == 200) {
    const accessTokenFromHeader = response.headers["accesstoken"];
    sessionStorage.setItem("accessToken", accessTokenFromHeader);
    sessionStorage.setItem("userId", response.data.id);
    sessionStorage.setItem("tokenTime", response.data.tokenGeneratedTime);
    return response;
  } else {
    return response;
  }
};
export const userloginSection = async (email, password) => {
  const checkLoginMode = email.includes("@") == true ? true : false;
  const postdata =
    checkLoginMode === true
      ? JSON.stringify({ password: password, email: email })
      : JSON.stringify({
          password: password,
          mobileNumber: email,
        });

  const response = await handleApiRequestBeforeLogin(
    "POST",
    API_BASE_URL,
    "login?grantType=PWD",
    postdata
  );

  if (response.status == 200) {
    const accessTokenFromHeader = response.headers["accesstoken"];
    sessionStorage.setItem("accessToken", accessTokenFromHeader);
    sessionStorage.setItem("userId", response.data.id);
    sessionStorage.setItem("tokenTime", response.data.tokenGeneratedTime);
    return response;
  } else {
    return response;
  }
};
export const sendwhatappotp = async (value1) => {
  const value = value1.replace("+", "");
  const data = {
    whatsappNumber: value,
  };
  const response = await handleApiRequestBeforeLogin(
    "POST",
    API_BASE_URL,
    "whatsapp-login-otp",
    data
  );
  return response;
};
export const referrerdata = (referrerId, refParam) => {
  console.log(referrerId);

  const numericPart = referrerId.match(/\d+$/);

  if (referrerId !== "") {
    const response = handleApiRequestBeforeLogin(
      "GET",
      API_BASE_URL,

      `${numericPart}/user-uniquenumber`
    );
    return response;
  } else {
    const response = handleApiRequestBeforeLogin(
      "GET",
      API_BASE_URL,

      `${refParam}/user-uniquenumber`
    );

<<<<<<< Updated upstream
}


export const handlesenOtp =async(moblie)=>{


  var data={
    mobileNumber: moblie
  }

  const response =await handleApiRequestBeforeLogin(
    "POST",
    API_BASE_URL,
    `sendOtp`,
    data
  )
return  response;
}


export   const usersubmitotp =async(email, password)=>{
   const data={
    mobileNumber: email,
    mobileOtpValue: password
   }
   const response = await  handleApiRequestBeforeLogin(
    "POST",
    API_BASE_URL,
    `login?grantType=PWD `,
    data
   )

   return  response;
}
=======
    return response;
  }
};
>>>>>>> Stashed changes
export const verifywhatappotp = async (api) => {
  console.log(api);
  const value1 = localStorage.getItem("otp");
  const otp = value1.replace(/,/g, "");
  const data = {
    whatsappNumber: api.whatsappNumber,
    session: api.session,
    otp: otp,
    id: api.id,
    otpGeneratedTime: api.otpGeneratedTime,
  };
  const response = await handleApiRequestBeforeLogin(
    "POST",
    API_BASE_URL,
    "whatsapp-login-otp-verification",
    data
  );
  return response;
};

// export const handleip4 = () => {
//   return handleApiRequestBeforeLogin(
//     "get",
//     "https://api.ipify.org/?format=json"
//   );
// };
// export const handleipv6 = () => {
//   return handleApiRequestBeforeLogin("get", "https://ipapi.co/json/");
// };

export const passwordupdated = async (
  email,
  emailToken,
  password,
  confirmPassword
) => {
  const data = {
    password: password,
    confirmPassword: confirmPassword,
  };
  const response = handleApiRequestBeforeLogin(
    "POST",
    API_BASE_URL,
    `resetpassword/${emailToken}`,
    data
  );
  return response;
};
