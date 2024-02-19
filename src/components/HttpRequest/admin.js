import axios from "axios";
const userisIn = "local";
const API_BASE_URL =
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

export const loadVirtualAccount = () => {
  const userId = getUserId();
  return {
    userId,
  };
};

const getuserLoginId = getUserId();
const getUserLoginToken = getToken();

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

export const handledetail = async (dealId) => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/${dealId}/singleDeal`,
    "GET",
    token
  );
  return response;
};

export const getborrowerLoanStatusapi = async (pageNo  , pageSize) => {
  const token = getToken();
  const userId = getUserId();
const data ={
  pageNo: pageNo,
  pageSize: pageSize
}
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${pageNo}/${pageSize}/BEFORE/bank-details`,
    "POST",
    token,
    data
  );

  return response;
};


export    const  handalapicall= async  (upload)=>{
  const token = getToken();

  const data ={
    userId:upload.userId,
		fdAmount:upload.fdAmount,
		createdDate:upload.createdDate,
  }
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `/holdamount`,
    "POST",
    token,
    data
  );
  return response;
}

export    const  uploadapi= async  (upload)=>{
  const token = getToken();

  const data ={
    userId:upload.userId,
		fdAmount:upload.fdAmount,
		createdDate:upload.createdDate,
  }
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `/holdamount`,
    "POST",
    token,
    data
  );
  return response;
}
export const handleholdamountapi = async (holdAmountRequest) => {
  const token = getToken();
  // const userId = getUserId();

  const data ={
    userId: holdAmountRequest.userId,
		holdAmount: holdAmountRequest.holdAmount,
		comments: holdAmountRequest.comments,
		dealId: holdAmountRequest.dealId,
  }

  
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `/holdamount`,
    "POST",
    token,
    data
  );
  return response;
};

export const getfddownloadInvoice = async (fddownloadInvoice)=>{

  const token = getToken();
     const data={
      type: fddownloadInvoice.type != "" ? fddownloadInvoice.type : "BULK",
      startDate: fddownloadInvoice.startDate,
      endDate: fddownloadInvoice.endDate,
     }


  
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `payments-invoice`,
    "POST",   
    token,
    data
  );
  return response;
}

export const getintrestedapi = async (intrested)=>{

  const token = getToken();


     const data = {
          leftOperand: {
          fieldName: "user.adminComments",
          fieldValue: "INTERESTED",
          operator: "EQUALS"
      },
      logicalOperator: "AND",
      rightOperand: {
          fieldName: "parentRequestId",
          operator: "NULL"
      },
      page: {
          pageNo: intrested.pageNo,
          pageSize: intrested.pageSize
      },
      sortBy: "loanRequestedDate",
      sortOrder: "DESC"
  }

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `1/loan/ADMIN/request/search`,
    "POST",   
    token,
    data
  );
  return response;
}

export  const handelcalcluateapi    =async(id)=>{
  const token = getToken();


  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `calculateprofilerisk?userId=${id}`,
    "GET",   
    token,
  );
  return response;
}


export  const handlecalculatapidata  = async (input , id)=>{


  const token = getToken();

const data={
  creditScoreByPaisabazaar: input
}
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${id}/creditScoreByPaisabazaar`,
    "PATCH",   
    token,
    data
  );
  return response;
}
export  const getfdmonthlyloansInfo    =async(fdmonthlyloansInfo)=>{
  const token = getToken();
     const data={
      startDate: fdmonthlyloansInfo.startDate,
      endDate: fdmonthlyloansInfo.endDate,
     }


  
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `fd-monthly-details`,
    "POST",   
    token,
    data
  );
  return response;
}
export const fdstatitckapi = async (fdstatitck)=>{
  const token = getToken();
     const data={
      type: fdstatitck.type,
      startDate: fdstatitck.startDate,
      endDate: fdstatitck.endDate,
     }


  
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `fd-statistics`,
    "POST",   
    token,
    data
  );
  return response;
}

