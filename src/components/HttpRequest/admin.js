import axios from "axios";
const userisIn = "local";
let API_BASE_URL =
  userisIn == "local"
    ? "http://ec2-15-207-239-145.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/"
    : "https://fintech.oxyloans.com/oxyloans/v1/user/";

const handleApiRequestAdminService = async (
  endpoint,
  method,
  data = null,
  headers = {},
  accessToken
) => {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}/${endpoint}`,
      data,
      headers: {
        "Content-Type": "application/json",
        accessToken,
        ...headers,
      },
    });

    if (response.ok) {
      const processedData = response.data;
      return processedData;
    }
  } catch (error) {
    throw error;
  }
};
