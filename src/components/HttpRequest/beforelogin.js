import axios from "axios";
import { toastrWarning } from "../pages/Base UI Elements/Toast";
const userisIn = "prod";
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
export const verifywhatappotp = async (api) => {
  const value1 = localStorage.getItem("otp");
  const otp = value1.replace(/,/g, "");
  if (otp == "") {
    toastrWarning("Enter The WhastApp Otp");
  } else {
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
  }
};

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
