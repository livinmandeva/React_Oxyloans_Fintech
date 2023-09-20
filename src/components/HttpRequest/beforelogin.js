import axios from "axios";
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
    return response;
  } else {
    return response;
  }
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
