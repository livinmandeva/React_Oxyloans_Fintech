import axios from "axios";
const userisIn = "prod";
const API_BASE_URL =
  userisIn == "local"
    ? "http://ec2-15-207-239-145.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/"
    : "https://fintech.oxyloans.com/oxyloans/v1/user/";
// http://ec2-15-207-239-145.ap-south-1.compute.amazonaws.com:8080/oxyloans/v1/user/19/readingQueriesFromUsers
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

export const sendInvait = async (email, mailContent, mailSubject) => {
  const token = getToken();
  const userId = getUserId();
  const data = {
    email: email,
    referrerId: userId,
    mailContent: mailContent,
    mailSubject: mailSubject,
    inviteType: "BulkInvite",
  };
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `lenderReferring`,
    "POST",
    token,
    data
  );

  return response;
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

export const bulkinvitegmailLink = async () => {
  const token = getToken();
  const userId = getUserId();
  let userType;
  if (userId.trim().toUpperCase().startsWith("LR")) {
    userType = "LENDER";
  } else {
    userType = "BORROWER";
  }
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `getGmailAuthorization/gmailcontacts/${userType}`,
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

export const loadlendernomineeDetails = async () => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `nominee/${userId}`,
    "GET",
    token
  );
  return response;
};
export const LoadwalletThroughQrScan = async (amount) => {
  const token = getToken();
  const userId = getUserId();
  var data = {
    userId: userId,
    amount: amount,
  };

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `QRTransactionInitiation`,
    "POST",

    token,
    data
  );

  return response;
};

export const handlecashapi = async (groupId, amount) => {
  const token = getToken();
  const userId = getUserId();

  const data = {
    amount: amount,
    dealId: groupId,
  };

  console.log(data);
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/cashfree`,
    "POST",

    token,
    data
  );
  return response;
};
export const viewdealamountemi = async (dealId) => {
  const token = getToken();
  const userId = getUserId();

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/${dealId}/dealLevelLoanEmiCard`,
    "GET",

    token
  );
  return response;
};

export const principal_return_account_type = async (dealId, transfermethod) => {
  const token = getToken();
  const userId = getUserId();

  var data = {
    userId: userId,
    dealId: dealId,
    accountType: transfermethod,
  };

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `principal_return_account_type`,
    "PATCH",
    token,
    data
  );
  return response;
};
export const myrunnig = async (props) => {
  const token = getToken();
  const userId = getUserId();

  console.log(props);
  const data = {
    pageNo: props.pageNo,
    pageSize: 10,
  };

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/runningDealsInfoBasedOnPagination`,
    "POST",
    token,
    data
  );
  return response;
};
export const sendMoblieOtp = async (bankaccountprofile) => {
  const token = getToken();
  const userId = getUserId();

  const data = {
    mobileNumber: bankaccountprofile.moblieNumber,
  };

  console.log(data);
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `sendMobileOtp `,
    "POST",
    token,
    data
  );
  return response;
};
export const profileupadate = async (userProfile) => {
  const token = getToken();
  const userId = getUserId();

  console.log(userProfile);
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `personal/${userId}`,
    "PATCH",
    token,
    userProfile
  );

  return response;
};
export const checkqrcodetransaction = async (qrid) => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${qrid}/qrStatusCheck`,
    "PATCH",
    token
  );

  return response;
};

export const paticipationChanges1 = async (dealId) => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/${dealId}/paticipationChanges`,
    "GET",
    token
  );

  return response;
};

export const handelapi = async (dealId) => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/${dealId}/closedDealsInterest`,
    "GET",
    token
  );
  return response;
};
export const regular_Api = async (dealType, urldealname, pageNo = 1) => {
  const token = getToken();
  const userId = getUserId();

  if (urldealname == "ESCROW") {
    var url = "listOfDealsInformationForEquityDeals";
    var data = {
      pageNo: pageNo,
      pageSize: 10,
      dealName: "ESCROW",
      dealType: dealType,
    };
  } else if (urldealname == "PERSONAL") {
    var url = "listOfDealsInformationForEquityDeals";
    var data = {
      pageNo: pageNo,
      pageSize: 10,
      dealName: "PERSONAL",
      dealType: dealType,
    };
  } else if (urldealname == "regularRunningDeal") {
    var url = "listOfDealsInformationToLender";
    var data = {
      pageNo: pageNo,
      pageSize: 10,
      dealType: dealType,
    };
  }

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/${url}`,
    "POST",
    token,
    data
  );
  return response;
};
export const verifyBankAccountAndIfsc = async (bankaccountprofile) => {
  const token = getToken();
  const userId = getUserId();
  const data = {
    bankAccount: bankaccountprofile.accountNumber,
    ifscCode: bankaccountprofile.ifscCode,
  };

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    "verifyBankAccountAndIfsc",
    "POST",
    token,
    data
  );
  return response;
};
export const Earning = async (status) => {
  const token = getToken();
  const userId = getUserId();
  const data = JSON.stringify({
    userId: userId,
    paymentStatus: "",
  });

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `downLoadLinkForBonusAmount`,
    data,
    "POST",
    token
  );
  return response;
};

export const uploadkyc = async () => {};
export const updatebank = async (bankaccountprofile) => {
  const token = getToken();
  const userId = getUserId();
  const mobileOtpSession = localStorage.getItem("OtpSeesion");
  const data = {
    accountNumber: bankaccountprofile.accountNumber,
    bankAddress: bankaccountprofile.bankAddress,
    bankName: bankaccountprofile.bankName,
    branchName: bankaccountprofile.branchName,
    confirmAccountNumber: bankaccountprofile.confirmAccountNumber,
    ifscCode: bankaccountprofile.ifscCode,
    mobileOtp: bankaccountprofile.mobileOtp,
    mobileOtpSession: mobileOtpSession,
    updateBankDetails: true,
    userName: "JOHN DOE",
  };

  console.log(userProfile);
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `personal/${userId}`,
    "PATCH",
    token,
    data
  );

  return response;
};
export const Myreferal = async (pageNo = 1, pageSize = 10) => {
  const token = getToken();
  const userId = getUserId();
  const postdata = JSON.stringify({
    pageNo,
    pageSize,
  });
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/displayingReferrerInfo`,
    "POST",
    token,
    postdata
  );
  return response;
};

export const downloadreferal = async () => {
  const token = getToken();
  const userId = getUserId();

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/referralBonusAmountLink`,
    "GET",
    token
  );

  return response;
};
export const getcontactdeatils = async () => {
  const token = getToken();
  const userId = getUserId();

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    // user/getLenderStoredEmailContacts/${suserId}
    `getLenderStoredEmailContacts/${userId}`,
    "GET",
    token
  );
  return response;
};

export const handleapicall = async (data) => {
  const token = getToken();
  const userId = getUserId();

  const data1 = {
    userId: userId,
    dealId: data.dealId,
    currentAmount: data.currentAmount,
    requestedAmount: data.requestedAmount,
    withDrawalFunds: data.withdrawAmount,
  };
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    // user/getLenderStoredEmailContacts/${suserId}
    `withdrawalFundsFromDeals`,
    data1,
    "POST",
    token
  );
  return response;
};
export const writequery = async (userdata) => {
  console.log(userdata);
  const token = getToken();
  const userId = getUserId();
  console.log("User Data:", userdata);
  const postwritequerydata = {
    query: userdata.query,
    documentId: 0,
    email: userdata.profiledata.email,
    mobileNumber: userdata.profiledata.mobileNumber,
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

export const submitWalletToWallet = async (postdata) => {
  const token = getToken();

  const postdatastring = JSON.stringify({
    senderId: postdata.senderId,
    receiverId: postdata.receiverId.substring(2),
    amount: postdata.amount,
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

export const profilesubmit = async (profile) => {
  const token = getToken();
  const userId = getUserId();
  const data = profile;
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `lenderReferring`,
    "POST",
    token,
    data
  );

  return response;
};

export const TicketHistoryapi = async () => {
  const token = getToken();
  const userId = getUserId();
  const data = {
    pageNo: 1,
    pageSize: 10,
    status: "",
    userId: userId,
  };

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `queryDetailsBasedOnUserId`,
    "POST",
    token,
    data
  );

  return response;
};

export const getemailcontent = async () => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `mailContentShowingToLender`,
    "GET",
    token
  );
  return response;
};

export const highvalueDeals = async (pageNo = 1, pageSize = 10) => {
  const token = getToken();
  const postdatastring = JSON.stringify({
    pageNo,
    pageSize,
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

export const getMyWalletTowalletHistory = async (pageNo = 1) => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/wallet-to-wallet-debit-history`,
    "GET",
    token
  );
  return response;
};

export const getMembershiphistory = async (pageNo = 1, pageSize = 10) => {
  const token = getToken();
  const userId = getUserId();
  const postdatastring = JSON.stringify({
    pageNo,
    pageSize,
  });
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/fee_details_for_lender`,
    "POST",
    token,
    postdatastring
  );
  return response;
};
export const getMyfinancialEarnings = async () => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/financial_year_data`,
    "GET",
    token
  );
  return response;
};

export const getMyToatlInterestEarnings = async () => {
  const token = getToken();
  const userId = getUserId();

  const postdatastring = JSON.stringify({
    userId,
  });

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `monthly_interest_earnings`,
    "POST",
    token,
    postdatastring
  );
  return response;
};

export const getMyWithdrawalHistory = async (pageNo = 1, pageSize = 10) => {
  const token = getToken();
  const userId = getUserId();
  const postdatastring = JSON.stringify({
    page: {
      pageNo,
      pageSize,
    },
    firstName: "",
    lastName: "",
    userId: userId,
  });
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `lenderwithdrawalfundssearch`,
    "POST",
    token,
    postdatastring
  );
  return response;
};

export const getMyTransactions = async (pageNo = 1, pageSize = 10) => {
  const token = getToken();
  const userId = getUserId();

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/lenderHistory`,
    "GET",
    token
  );
  return response;
};

export const getWithdrawaFromDeal = async (pageNo = 1, pageSize = 10) => {
  const token = getToken();
  const userId = getUserId();

  const postdatastring = JSON.stringify({
    pageNo,
    pageSize,
    dealType: "NORMAL",
  });

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/lenderPaticipatedDealBasedOnDealType`,
    "POST",
    token,
    postdatastring
  );
  return response;
};

export const getDashboardInvestment = async (pageNo = 1, pageSize = 10) => {
  const token = getToken();
  const userId = getUserId();

  const postdatastring = JSON.stringify({
    userId,
    requestType: "WALLETCREDITED",
    pageSize,
    pageNo,
    searchType: "DESC",
  });

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `newLenderDashboard`,
    "POST",
    token,
    postdatastring
  );
  return response;
};

export const getDashboardPrincipalReturned = async (
  pageNo = 1,
  pageSize = 10
) => {
  const token = getToken();
  const userId = getUserId();

  const postdatastring = JSON.stringify({
    userId,
    requestType: "LENDERPRICIPAL",
    pageSize,
    pageNo,
    searchType: "DESC",
  });

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `newLenderDashboard`,
    "POST",
    token,
    postdatastring
  );
  return response;
};

export const getDashboardInterestEarnings = async (
  pageNo = 1,
  pageSize = 10
) => {
  const token = getToken();
  const userId = getUserId();

  const postdatastring = JSON.stringify({
    userId,
    requestType: "LENDERINTEREST",
    pageSize,
    pageNo,
    searchType: "DESC",
  });

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `newLenderDashboard`,
    "POST",
    token,
    postdatastring
  );
  return response;
};

export const getDashboardReferralEarnings = async (
  pageNo = 1,
  pageSize = 10
) => {
  const token = getToken();
  const userId = getUserId();

  const postdatastring = JSON.stringify({
    userId,
    requestType: "REFERRALBONUS",
    pageSize,
    pageNo,
    searchType: "DESC",
  });

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `newLenderDashboard`,
    "POST",
    token,
    postdatastring
  );
  return response;
};

export const getdashboardDealsVsEarnings = async (
  pageNo = 1,
  pageSize = 10
) => {
  const token = getToken();
  const userId = getUserId();

  const postdatastring = JSON.stringify({
    userId,
    requestType: "LENDERPATICIPATION",
    pageSize,
    pageNo,
    searchType: "DESC",
  });

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `newLenderDashboard`,
    "POST",
    token,
    postdatastring
  );
  return response;
};

export const referralEarningsInfo = async (pageNo = 1, pageSize = 10) => {
  const token = getToken();
  const userId = getUserId();
  const postdatastring = JSON.stringify({
    pageNo,
    pageSize,
    paymentStatus: "",
    userId,
  });
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `referralBonusAmountBasedOnStatus`,
    "POST",
    token,
    postdatastring
  );
  return response;
};

export const getholdamountInfo = async () => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/hold-amount-details`,
    "GET",
    token
  );
  return response;
};

export const myclosedDealsInfo = async (pageNo = 1, pageSize = 10) => {
  const token = getToken();
  const userId = getUserId();
  const postdatastring = JSON.stringify({
    pageNo,
    pageSize,
    userId,
  });
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `closedDealsForUserBasedOnPagination`,
    "POST",
    token,
    postdatastring
  );
  return response;
};

export const getEmiTableInformation = async (params) => {
  const token = getToken();
  const userId = getUserId();

  const postdatastring = JSON.stringify({
    loanAmount: params.loanAmount,
    rateOfInterest: params.inputroi,
    tenure: params.inputTenure,
    calculationType: params.emiType,
  });

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `borrowerEmiDetails`,
    "POST",
    token,
    postdatastring
  );
  return response;
};

export const getSessionExpireTime = () => {
  const tokenTimeStamp = getUserSessionTime();
  var addingtime = 1500000;
  var getTime = parseInt(tokenTimeStamp) + addingtime;
  var date = new Date();
  var milliseconds = date.getTime();
  let isNearbySession = false;
  if (milliseconds > getTime) {
    isNearbySession = true;
  }
  return isNearbySession;
};

export const getNewSessionTime = async () => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/USER/accessTokenGeneration`,
    "GET",
    token
  );
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("tokenTime");
  const accessTokenFromHeader = response.headers["accesstoken"];
  sessionStorage.setItem("accessToken", accessTokenFromHeader);
  sessionStorage.setItem("tokenTime", response.data.tokenGeneratedTime);
  setTimeout(() => {
    window.location.reload();
  }, 2500);
  return response;
};

export const cancelWithdrawalRequest = async (fromrequest, requestId) => {
  const token = getToken();
  const userId = getUserId();

  var postdata = JSON.stringify({
    id: requestId,
    userId: userId,
    requestFrom: fromrequest,
  });

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `to-cancel-withdrawal-request`,
    "PATCH",
    token,
    postdata
  );
  return response;
};

export const getFinancialReportDownload = async (
  startDate,
  endDate,
  requestTypefromBtn
) => {
  const token = getToken();
  const userId = getUserId();
  var postdata = JSON.stringify({
    startDate,
    endDate,
    inputType: requestTypefromBtn,
  });

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/lender-income`,
    "POST",
    token,
    postdata
  );
  return response;
};

export const downloadClosedLoanStatement = async (typeoffile = "RUNNING") => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/${typeoffile}/excel-sheet-download`,
    "GET",
    token
  );

  return response;
};

export const downloadTranactionStatement = async () => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/lenderHistoryPdf`,
    "GET",
    token
  );

  return response;
};

export const getMyinterestEarningSearch = async (data) => {
  const token = getToken();
  const userId = getUserId();
  var postdata = JSON.stringify({
    userId: userId,
    startDate: data.searchStartdate,
    endDate: data.searchEndDate,
    sortBasedOn: data.sortbased,
    sortingType: "Asc",
  });

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `monthly_interest_earnings`,
    "POST",
    token,
    postdata
  );
  return response;
};

export const savenomineeDeatailsApi = async (nominee) => {
  const token = getToken();
  const userId = getUserId();

  const data = {
    userId: userId,
    relation: nominee.relation,
    name: nominee.nomineeName,
    mobileNumber: nominee.nomineeMobile,
    email: nominee.nomineeEmail,
    accountNumber: nominee.accountNo,
    ifscCode: nominee.nomineeIfsc,
    bankName: nominee.bank,
    branchName: nominee.branch,
    city: nominee.nomineecity,
  };

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    "nominee",
    "POST",
    token,
    data
  );
  return response;
};
