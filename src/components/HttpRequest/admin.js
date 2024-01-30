import axios from "axios";
const userisIn = "local";
let API_BASE_URL =
  userisIn == "local"
    ? "http://ec2-15-207-239-145.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/"
    : "https://fintech.oxyloans.com/oxyloans/v1/user/";


    const getToken = () => {
      return sessionStorage.getItem("accessToken");
    };
    export const getUserId = () => {
      return sessionStorage.getItem("userId");
    };
    
    export const getUserSessionTime = () => {
      return sessionStorage.getItem("tokenTime");
    };
    
const handleApiRequestAdminService = async (
  endpoint,
  method,
  accessToken,
  data = null,
  headers = {},
  
) => {
  try {
    const response = await axios({
      method,
      url: `${API_BASE_URL}${endpoint}`,
      data,
      headers: {
        "Content-Type": "application/json",
        accessToken,
        ...headers,
      },
    });

    if (response.status == 200) {
      return response;
    }
  } catch (error) {
    return error;
  }
};


export const borrowerRunningsinfoapi = async (passId) => {
  const token = getToken();
  const userId = getUserId();

  const data = {
    leftOperand: {
        fieldName: "userId",
        fieldValue: passId,
        operator: "EQUALS"
    },
    logicalOperator: "AND",
    rightOperand: {
        fieldName: "parentRequestId",
        operator: "NULL"
    },
    page: {
        pageNo: 1,
        pageSize: 10
    },
    sortBy: "loanRequestedDate",
    sortOrder: "DESC"
};
  const response = await handleApiRequestAdminService(
    `6/loan/ADMIN/request/search`,
    "POST",
    token,
    data,
    
  );
  return response;
};


export const handlegetdashboardcarddeatilsapi = async () => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAdminService(
    `${userId}/dashboard/ADMIN?current=false`,
    "GET",
    token
);

  return response;
};