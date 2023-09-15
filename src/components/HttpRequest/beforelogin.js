import axios from "axios";
const userisIn = "local";
let API_BASE_URL =
  userisIn == "local"
    ? "http://ec2-15-207-239-145.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/"
    : "https://fintech.oxyloans.com/oxyloans/v1/user/";

const handleApiRequestBeforeLogin = async (method, url) => {
  try {
    const response = await axios({
      method,
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status == 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};

export const handleip4 = () => {
  return handleApiRequestBeforeLogin(
    "get",
    "https://api.ipify.org/?format=json"
  );
};

export const handleipv6 = () => {
  return handleApiRequestBeforeLogin("get", "https://ipapi.co/json/");
};
