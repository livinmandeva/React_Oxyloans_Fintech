import axios from "axios";
import { error } from "jquery";
const userisIn = "prod";
const API_BASE_URL =
  userisIn == "local"
    ? "http://ec2-15-207-239-145.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/"
    : "https://fintech.oxyloans.com/oxyloans/v1/user/";
// http://ec2-15-207-239-145.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/19/readingQueriesFromUsers
const getToken = () => {
  return sessionStorage.getItem("accessToken");
};
const getUserId = () => {
  return sessionStorage.getItem("userId");
};

const handleApiRequestAfterLoginService = async (
  baseurl,
  endpoint,
  method,
  accessToken = null,
  data = null,
  headers = {}
) => {
  try {
    const response = await axios({
      method,
      url: `${baseurl}${endpoint}`,
      data,
      headers: {
        "Content-Type": "application/json",
        accessToken,
        ...headers,
      },
    });
    // Add your common logic here
    if (response.status == 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};

export const getuserMembershipValidity = async () => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/dealsStatistics`,
    "GET",
    token
  );

  return response;
};

export const getUserDetails = async () => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `personal/${userId}`,
    "GET",
    token
  );
  return response;
};

export const writequery = async (userdata, queryfiledinput) => {
  const token = getToken();
  const userId = getUserId();
  console.log("User Data:", userdata);
  const postwritequerydata = {
    query: "ui",
    documentId: 0,
    email: userdata.profileData.data.email,
    mobileNumber: userdata.profileData.data.mobileNumber,
    id: userId,
  };
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/readingQueriesFromUsers`,
    "POST",
    token,
    postwritequerydata
  );

  return response;
};
export const fileuploads = async (files) => {
  const token = getToken();
  const userId = getUserId();
  const formData = new FormData();
  formData.append("USERQUERYSCREENSHOT", files);

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/userQueryScreenshot`,
    "POST",
    token,
    formData
  );

  return response;
};

export const submitWithdrawalRequestFromWallet = async (postdate) => {
  const token = getToken();
  const userId = getUserId();

  const postdatastring = JSON.stringify({
    userId,
    userType: "LENDER",
    amount: postdate.withdrawAmount,
    amountRequiredDate: postdate.setGivendate,
    withdrawalReason: postdate.withdraReason,
    rating: postdate.withdrawRating,
    feedBack: postdate.withdrawFeedback,
    adminComments: "",
    status: "INITIATED",
  });
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `savewithdrawalfundsinfo`,
    "POST",
    token,
    postdatastring
  );

  return response;
};

export const loadVirtualAccount = () => {
  const userId = getUserId();
  return {
    userId,
  };
};

export const submitWalletToWallet = async (postdat) => {
  const token = getToken();

  const postdatastring = JSON.stringify({
    senderId: postdat.senderId,
    receiverId: postdat.receiverId.substring(2),
    amount: postdat.amount,
  });
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `wallet_amount_transfer`,
    "POST",
    token,
    postdatastring
  );

  return response;
};

export const highvalueDeals = async (pageNo = 1) => {
  const token = getToken();
  const postdatastring = JSON.stringify({
    pageNo,
    pageSize: 20,
  });
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `assert_based_closed_deals`,
    "POST",
    token,
    postdatastring
  );
  return response;

};

