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

export const admindashbordcount = async () => {
  const token = getToken();
  const userId = getUserId();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/dashboard/ADMIN?current=false`,
    "GET",
    token
  );
  return response;
};

export  const  borrowerLoanStatusapisearchid  =  async  (inputid)=>{
  const input = inputid.match(/\d+$/);
  const token = getToken();
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${input}/fd-search`,
    "GET",
    token,
  );

  return response;
}
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


export const dealwithdrawalinterest = async (id) => {
  const token = getToken();
  const userId = getUserId();

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${id}/deal-withdrawal-interest`,
    "GET",
    token,
  
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
    `holdamount`,
    "POST",
    token,
    data
  );
  return response;
};

export    const  handelclicknewaccountdetailsapi= async  (data)=>{
  const token = getToken();

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${data.userId}/new-account-details`,
    "GET",
    token,
    data
  );
  return response;
}
export    const  handefeecalculationapi= async  (data)=>{
  const token = getToken();

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${data.userId}/payment-upload`,
    "GET",
    token,
    data
  );
  return response;
}

export    const  updatefdcreateddateamount= async  (upload)=>{
  const token = getToken();
  var parts = upload.createdDate.split("-");

  // Rearrange the parts to form the desired format
  var formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
  const data ={
    userId:upload.userId,
		fdAmount:upload.fdAmount,
		createdDate:formattedDate,
  }
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `update-fdcreated-date-amount`,
    "PATCH",
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
export const HandleClickRepaymentapi = async (id) => {
  const token = getToken();
  // const userId = getUserId();

  const data ={
    accountType: "DISBURSMENT",
    id: id,
    amountType: "INTEREST"
}

  
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `h2happroval`,
    "PATCH",
    token,
    data
  );
  return response;
};

export const HandleClickDisbursmentapi = async (id) => {
  const token = getToken();
  // const userId = getUserId();

  const data ={
    accountType: "REPAYMENT",
    id: id,
    amountType: "INTEREST"
}

  
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `h2happroval`,
    "PATCH",
    token,
    data
  );
  return response;
};

export const lenderwithdrawalfundssearchAPI = async (pageNo, pageSize ,id) => {
  const token = getToken();
  // const userId = getUserId();

  const data={
    page: {
      pageNo: pageNo,
      pageSize: pageSize
    },
    firstName: "",
    lastName: "",
    userId: id
  }
  
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `lenderwithdrawalfundssearch`,
    "POST",
    token,
    data
  );
  return response;
};



export  const handleclickapproveapi = (comment)=>{
const id   =localStorage.getItem("commentid");
const resolve   =localStorage.getItem("resolve")

  const token = getToken();
       const data={
        id: id,
        status: resolve,
        adminComments: comment
    }


  
  const response =  handleApiRequestAfterLoginService(
    API_BASE_URL,
    `updatewithdrawalfundsstatus`,
    "POST",   
    token,
    data
  );
  return response;
}


export  const handeldealcrateapi =async()=>{


    const token = getToken();
       const data={
        type: fddownloadInvoice.type != "" ? fddownloadInvoice.type : "BULK",
        startDate: fddownloadInvoice.startDate,
        endDate: fddownloadInvoice.endDate,
       }
  
  
    
    const response = await handleApiRequestAfterLoginService(
      API_BASE_URL,
      `createAdeal`,
      "PATCH",   
      token,
      data
    );
    return response;
  }

  export  const gettestlenderwallettrns =async(pageNo ,   pageSize)=>{


     const userId = getUserId();
    const token = getToken();
       const data={
        pageNo: pageNo, pageSize: pageSize}
  
  
    
    const response = await handleApiRequestAfterLoginService(
      API_BASE_URL,
      `${userId}/gettestlenderwallettrns`,
      "POST",   
      token,
      data
    );
    return response;
  }
  export  const getAllTestLendersWalletInfo =async(pageNo ,pageSize)=>{


    const token = getToken();
       const data={
          pageNo: pageNo,
          pageSize: pageSize
      } 

    const response = await handleApiRequestAfterLoginService(
      API_BASE_URL,
      `getAllTestLendersWalletInfo`,
      "POST",   
      token,
      data
    );
    return response;
  }

  export const checkingcurrentwalletbalance = async (wallet)=>{

    const token = getToken();
      const data ={
        walletAmountType: wallet
      }
    const response = await handleApiRequestAfterLoginService(
      API_BASE_URL,
      `checking-testlender-current-wallet-balance`,
      "POST",   
      token,
      data
    );
    return response;
  }  
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
export const getwallet_to_wallet_initiated_transfer = async (data)=>{

  const token = getToken();
    


  
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `wallet_to_wallet_initiated_transfer`,
    "POST",   
    token,
    data
  );
  return response;
}
export const lender_fee_payment_detailsapi = async (pageNo , pageSize , type) => {
  const token = getToken();
  const userId = getUserId();
 const  data ={
  type: type,
  pageNo: pageNo,
  pageSize: pageSize
}
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `lender_fee_payment_testdetails`,
    "POST",
    token,
    data
  );
  return response;
};
export const getcheckLenderDashboard = async (id)=>{

  const token = getToken();

  
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${id}/lenderDashboard`,
    "GET",   
    token,
    
  );
  return response;
}
export const listOfWithdrawalsRequestedByLenders = async (data)=>{

  const token = getToken();
    


  
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `listOfWithdrawalsRequestedByLenders`,
    "POST",   
    token,
    data
  );
  return response;
}



export const userquerydetailsAPI = async ( status, type, reslove ,)=>{

  const token = getToken();
    


  const data ={
    pageNo: reslove.pageNo,
    pageSize: reslove.pageSize,
    status: status,
    primaryType: type
}
  
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `testqueryDetailsBasedOnPrimaryType`,
    "POST",   
    token,
    data
  );
  return response;
}

export const getAllLendersWalletInfo = async (pageNo , pageSize)=>{

  const token = getToken();
    const data ={

        pageNo: pageNo,
        pageSize: pageSize
    }
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `getAllTestLendersWalletInfo`,
    "POST",   
    token,
    data
  );
  return response;
}  
export const gethandelclickapi = async (membershiphistory)=>{

  const token = getToken();
    const data ={
        startDate: membershiphistory.startDate,
        endDate: membershiphistory.endDate
    }
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `getCurrentWalletBalance`,
    "POST",   
    token,
    data
  );
  return response;
}  
export const checkingcurrentwalletbalanceapi = async (wallet)=>{

  const token = getToken();
    const data ={
      walletAmountType: wallet
    }
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `checking-testlender-current-wallet-balance`,
    "POST",   
    token,
    data
  );
  return response;
}  

export const handlesubmitdatacredital = async (data)=>{

  const token = getToken();
  
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `testupdateMobileNumberAndEmail`,
    "PATCH",   
    token,
    data
  );
  return response;
} 
export  const handelhandeluploadtranapi  =async  (pardata)=>{
  const token = getToken();
const data={

    scrowAccountNumber: pardata.scrowAccountNumber,
    transactionAmount: pardata.transactionAmount,
    transactionDate: pardata.transactionDate,
    documentUploadedId: ""

}
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${pardata.userid}/savelendertransaction`,
    "POST",   
    token,
    data
  );
  return response;
}
export const userquerydetails = async (data)=>{

  const token = getToken();

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `listOfWithdrawalsRequestedByLenders`,
    "POST",   
    token,
    data
  );
  return response;
}

export const uploadscrreenshort = async (event) => {
  const token = getToken();
  const userId = getUserId();
  var fd = new FormData();
  var files = event.target.files[0];
  fd.append(event.target.name, files);
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${userId}/userQueryScreenshot`,
    "POST",
    token,
    fd,
    {
      "Content-Type": "multipart/form-data",
    }
  );
  return response;
};
export const getborrowerapiclick = async (intrested, datavalue ,) => {
  const inputString = datavalue.fieldValue;
const value = parseInteger(inputString);
console.log(value); 
  const token = getToken();
  let  data={
    leftOperand: {
        fieldName: "userPrimaryType",
        fieldValue: "LENDER",
        operator: "EQUALS"
    },
    logicalOperator: "AND",
    rightOperand: {
        fieldName: "user.status",
        fieldValue: "REGISTERED",
        operator: "EQUALS"
    },
    page: {
        pageNo: 1,
        pageSize: 10
    },
    sortBy: "loanRequestedDate",
    sortOrder: "DESC"
} ; // Define data object outside of conditional blocks

  console.log(datavalue.inputfiled);
  
  console.log(datavalue.inputfiled2);

  if (datavalue.inputfiled === "borrowers id") {

    console.log("borr")
    data={

      leftOperand: {
      fieldName: "userId",
      fieldValue: value,
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

}
    console.log("bo")
  } else if (datavalue.inputfiled === "Name") {
    console.log("Name")
    data={

      leftOperand: {
      fieldName: "Name",
      fieldValue: value,
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

}
  }






  // let userId = suserId;
	// let primaryType = sprimaryType;
	// let accessToken = saccessToken;

	// if (primaryType == "LENDER") {
	// 	var fieldValueforSearch = "LENDER";
	// } else {
	// 	var fieldValueforSearch = "BORROWER";
	// }
{console.log(datavalue.utmamountfiled)}
	if (datavalue.inputfiled == "mobileNumber") {
		 data = {
			leftOperand: {
				fieldName: "user.mobileNumber",
				fieldValue: datavalue.fieldValue,
				operator: "EQUALS",
			},
			logicalOperator: "AND",
			rightOperand: {
				leftOperand: {
					fieldName: "parentRequestId",
					operator: "NULL",
				},
				logicalOperator: "OR",
				rightOperand: {
					fieldName: "parentRequestId",
					operator: "NOT_NULL",
				},
			},
			page: {
				pageNo: 1,
				pageSize: 10,
			},
			sortBy: "loanRequestedDate",
			sortOrder: "DESC",
		};
	} else if (datavalue.inputfiled == "userName") {
		 data = {
			leftOperand: {
				logicalOperator: "AND",
				rightOperand: {
					logicalOperator: "OR",
					rightOperand: {
						fieldName: "user.personalDetails.firstName",
						operator: "LIKE",
						fieldValue: userName,
					},
					leftOperand: {
						fieldName: "user.personalDetails.lastName",
						operator: "LIKE",
						fieldValue: userName,
					},
				},
				leftOperand: {
					fieldName: "userPrimaryType",
					fieldValue: userType,
					operator: "EQUALS",
				},
			},
			logicalOperator: "AND",
			rightOperand: {
				fieldName: "parentRequestId",
				operator: "NULL",
			},
			page: {
				pageNo: 1,
				pageSize: 10,
			},
			sortBy: "loanRequestedDate",
			sortOrder: "DESC",
		};
	} else if (datavalue.inputfiled == "city") {
		   data = {
			leftOperand: {
				leftOperand: {
					leftOperand: {
						fieldName: "userPrimaryType",
						fieldValue: datavalue.fieldValue,
						operator: "EQUALS",
					},
					logicalOperator: "AND",
					rightOperand: {
						fieldName: "user.city",
						fieldValue: datavalue.fieldValue,
						operator: "ILIKE",
					},
				},
				logicalOperator: "AND",
				rightOperand: {
					fieldName: "parentRequestId",
					operator: "NULL",
				},
			},
			logicalOperator: "OR",
			rightOperand: {
				leftOperand: {
					leftOperand: {
						fieldName: "userPrimaryType",
						fieldValue: datavalue.fieldValue,
						operator: "EQUALS",
					},
					logicalOperator: "AND",
					rightOperand: {
						fieldName: "user.personalDetails.address",
						fieldValue: datavalue.fieldValue,
						operator: "ILIKE",
					},
				},
				logicalOperator: "AND",
				rightOperand: {
					fieldName: "parentRequestId",
					operator: "NULL",
				},
			},
			page: {
				pageNo: 1,
				pageSize: 10,
			},
			sortBy: "loanRequestedDate",
			sortOrder: "DESC",
		};
	} else if (datavalue.inputfiled == "amount&city") {
		   data = {
			leftOperand: {
				leftOperand: {
					fieldName: "user.primaryType",
					fieldValue: "BORROWER",
					operator: "EQUALS",
				},
				logicalOperator: "AND",
				rightOperand: {
					fieldName: "user.city",
					fieldValue: datavalue.fieldValue3,
					operator: "EQUALS",
				},
			},
			logicalOperator: "AND",
			rightOperand: {
				leftOperand: {
					leftOperand: {
						fieldName: "parentRequestId",
						operator: "NULL",
					},
					logicalOperator: "AND",
					rightOperand: {
						fieldName: "userPrimaryType",
						fieldValue: "BORROWER",
						operator: "EQUALS",
					},
				},
				logicalOperator: "AND",
				rightOperand: {
					leftOperand: {
						fieldName: "loanRequestAmount",
						fieldValue: datavalue.fieldValue,
						operator: "GTE",
					},
					logicalOperator: "AND",
					rightOperand: {
						fieldName: "loanRequestAmount",
						fieldValue: datavalue.fieldValue2,
						operator: "LTE",
					},
				},
			},

			page: {
				pageNo: 1,
				pageSize: 10,
			},
			sortBy: "loanRequestedDate",
			sortOrder: "DESC",
		};
	} 
  else if (datavalue.utmamountfiled == "utm&amount") {
		  data = {
			leftOperand: {
				leftOperand: {
					fieldName: "user.primaryType",
					fieldValue: "BORROWER",
					operator: "EQUALS",
				},
				logicalOperator: "AND",
				rightOperand: {
					fieldName: "user.urchinTrackingModule",
					fieldValue: datavalue.fieldValue31,
					operator: "EQUALS",
				},
			},
			logicalOperator: "AND",
			rightOperand: {
				leftOperand: {
					leftOperand: {
						fieldName: "parentRequestId",
						operator: "NULL",
					},
					logicalOperator: "AND",
					rightOperand: {
						fieldName: "userPrimaryType",
						fieldValue: "BORROWER",
						operator: "EQUALS",
					},
				},
				logicalOperator: "AND",
				rightOperand: {
					leftOperand: {
						fieldName: "loanRequestAmount",
						fieldValue: datavalue.fieldValue,
						operator: "GTE",
					},
					logicalOperator: "AND",
					rightOperand: {
						fieldName: "loanRequestAmount",
						fieldValue: datavalue.fieldValue2,
						operator: "LTE",
					},
				},
			},

			page: {
				pageNo: 1,
				pageSize: 10,
			},
			sortBy: "loanRequestedDate",
			sortOrder: "DESC",
		};


    
	} else if (datavalue.inputfiled == "utm&city") {
		//     data = {
		// 	leftOperand: {
		// 		leftOperand: {
		// 			fieldName: "user.primaryType",
		// 			fieldValue: "BORROWER",
		// 			operator: "EQUALS",
		// 		},
		// 		logicalOperator: "AND",
		// 		rightOperand: {
		// 			fieldName: "user.city",
		// 			fieldValue: "Hyderabad",
		// 			operator: "EQUALS",
		// 		},
		// 	},
		// 	logicalOperator: "AND",
		// 	rightOperand: {
		// 		leftOperand: {
		// 			leftOperand: {
		// 				fieldName: "parentRequestId",
		// 				operator: "NULL",
		// 			},
		// 			logicalOperator: "AND",
		// 			rightOperand: {
		// 				fieldName: "userPrimaryType",
		// 				fieldValue: "BORROWER",
		// 				operator: "EQUALS",
		// 			},
		// 		},
		// 		logicalOperator: "AND",
		// 		rightOperand: {
		// 			fieldName: "user.urchinTrackingModule",
		// 			fieldValue: "WEB",
		// 			operator: "EQUALS",
		// 		},
		// 	},

		// 	page: {
		// 		pageNo: 1,
		// 		pageSize: 10,
		// 	},
		// 	sortBy: "loanRequestedDate",
		// 	sortOrder: "DESC",
		// };
    data={
      leftOperand: {
        leftOperand: {
          fieldName: "user.primaryType",
          fieldValue: "BORROWER",
          operator: "EQUALS"
        },
        logicalOperator: "AND",
        rightOperand: {
          fieldName: "user.city",
          fieldValue: "Hyderabad",
          operator: "EQUALS"
        }
      },
      logicalOperator: "AND",
      rightOperand: {
        leftOperand: {
          leftOperand: {
            fieldName: "parentRequestId",
            operator: "NULL"
          },
          logicalOperator: "AND",
          rightOperand: {
            fieldName: "userPrimaryType",
            fieldValue: "BORROWER",
            operator: "EQUALS"
          }
        },
        logicalOperator: "AND",
        rightOperand: {
          fieldName: "user.urchinTrackingModule",
          fieldValue: "WEB",
          operator: "EQUALS"
        }
      },
      page: {
        pageNo: 1,
        pageSize: 10
      },
      sortBy: "loanRequestedDate",
      sortOrder: "DESC"
    }
	} else if (datavalue.inputfiled == "Min Roi") {
		//    data = {
		// 	leftOperand: {
		// 		fieldName: "userPrimaryType",
		// 		operator: "EQUALS",
		// 		fieldValue: "BORROWER",
		// 	},
		// 	logicalOperator: "AND",
		// 	rightOperand: {
		// 		leftOperand: {
		// 			fieldName: "rateOfInterest",
		// 			fieldValue: datavalue.fieldValue,
		// 			operator: "GTE",
		// 		},
		// 		logicalOperator: "AND",
		// 		rightOperand: {
		// 			fieldName: "rateOfInterest",
		// 			fieldValue: datavalue.fieldValue2,
		// 			operator: "LTE",
		// 		},
		// 	},
		// 	page: {
		// 		pageNo: 1,
		// 		pageSize: 9,
		// 	},
		// };


    data={
      leftOperand: {
        fieldName: "userPrimaryType",
        operator: "EQUALS",
        fieldValue: "BORROWER"
      },
      logicalOperator: "AND",
      rightOperand: {
        leftOperand: {
          fieldName: "rateOfInterest",
          fieldValue: datavalue.fieldValue,
          operator: "GTE"
        },
        logicalOperator: "AND",
        rightOperand: {
          fieldName: "rateOfInterest",
          fieldValue:  datavalue.fieldValue2,
          operator: "LTE"
        }
      },
        page: {
        pageNo: 1,
        pageSize: 9
      }
    }
	} else if (datavalue.inputfiled == "amount") {
		var postData = {
			leftOperand: {
				fieldName: "userPrimaryType",
				operator: "EQUALS",
				fieldValue: "BORROWER",
			},
			logicalOperator: "AND",
			rightOperand: {
				leftOperand: {
					fieldName: "loanRequestAmount",
					fieldValue: minamtValue,
					operator: "GTE",
				},
				logicalOperator: "AND",
				rightOperand: {
					fieldName: "loanRequestAmount",
					fieldValue: maxamtValue,
					operator: "LTE",
				},
			},
			page: {
				pageNo: 1,
				pageSize: 9,
			},
		};
	} else if (datavalue.inputfiled == "utm") {
		 data = {
			leftOperand: {
				leftOperand: {
					fieldName: "userPrimaryType",
					fieldValue: "BORROWER",
					operator: "EQUALS",
				},
				logicalOperator: "AND",
				rightOperand: {
					fieldName: "user.status",
					fieldValue: "REGISTERED",
					operator: "EQUALS",
				},
			},
			logicalOperator: "AND",
			rightOperand: {
				leftOperand: {
					leftOperand: {
						fieldName: "parentRequestId",
						operator: "NOT_NULL",
					},
					logicalOperator: "OR",
					rightOperand: {
						fieldName: "parentRequestId",
						operator: "NULL",
					},
				},
				logicalOperator: "AND",
				rightOperand: {
					fieldName: "user.urchinTrackingModule",
					fieldValue: datavalue.fieldValue31,
					operator: "EQUALS",
				},
			},
			page: {
				pageNo: 1,
				pageSize: 10,
			},
			sortBy: "loanRequestedDate",
			sortOrder: "DESC",
		};
	} else if (datavalue.inputfiled == "pannumber") {
   console.log("")
		  data= {
			leftOperand: {
				fieldName: "user.personalDetails.panNumber",
				fieldValue: datavalue.fieldValue,
				operator: "EQUALS",
			},
			logicalOperator: "AND",
			rightOperand: {
				leftOperand: {
					fieldName: "parentRequestId",
					operator: "NULL",
				},
				logicalOperator: "OR",
				rightOperand: {
					fieldName: "parentRequestId",
					operator: "NOT_NULL",
				},
			},
			page: {
				pageNo: 1,
				pageSize: 10,
			},
			sortBy: "loanRequestedDate",
			sortOrder: "DESC",
		};
	} else {
		//     data = {
		// 	leftOperand: {
		// 		fieldName: "userId",
		// 		fieldValue: borrowerid,
		// 		operator: "EQUALS",
		// 	},
		// 	logicalOperator: "AND",
		// 	rightOperand: {
		// 		leftOperand: {
		// 			fieldName: "parentRequestId",
		// 			operator: "NULL",
		// 		},
		// 		logicalOperator: "AND",
		// 		rightOperand: {
		// 			leftOperand: {
		// 				fieldName: "loanStatus",
		// 				fieldValue: "Requested",
		// 				operator: "EQUALS",
		// 			},
		// 			logicalOperator: "OR",
		// 			rightOperand: {
		// 				fieldName: "loanStatus",
		// 				fieldValue: "Edit",
		// 				operator: "EQUALS",
		// 			},
		// 		},
		// 	},
		// };


   
	}
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `1/loan/ADMIN/request/testsearch`,
    "POST",
    token,
    data
  );
  return response;
};
export const getintrestedapiclick = async (intrested, datavalue) => {
  const inputString = datavalue.fieldValue;
const value = parseInteger(inputString);
console.log(value); 
  const token = getToken();
  let data = {}; // Define data object outside of conditional blocks

  console.log(datavalue.inputfiled);

  if (datavalue.inputfiled === "borrowers id") {
    data = {
      leftOperand: {
        leftOperand: {
          fieldName: "userId",
          operator: "LIKE",
          fieldValue: value
        },
        logicalOperator: "OR",
        rightOperand: {
          fieldName: "userId",
          operator: "LIKE",
          fieldValue: value // Did you mean datavalue.fieldValue here?
        }
      },
      logicalOperator: "AND",
      rightOperand: {
        leftOperand: {
          fieldName: "parentRequestId",
          operator: "NULL"
        },
        logicalOperator: "AND",
        rightOperand: {
          fieldName: "loanOfferedAmount.loanOfferdStatus",
          fieldValue: "LOANOFFERACCEPTED",
          operator: "EQUALS"
        }
      },
      page: {
        pageNo: intrested.pageNo,
        pageSize: intrested.pageSize
      },
      sortBy: "loanRequestedDate",
      sortOrder: "DESC"
    };
  } else if (datavalue.inputfiled === "Name") {
    data = {
      leftOperand: {
        leftOperand: {
          fieldName: "user.personalDetails.firstName",
          operator: "LIKE",
          fieldValue: datavalue.fieldValue
        },
        logicalOperator: "OR",
        rightOperand: {
          fieldName: "user.personalDetails.firstName",
          operator: "LIKE",
          fieldValue: datavalue.fieldValue // Did you mean datavalue.fieldValue here?
        }
      },
      logicalOperator: "AND",
      rightOperand: {
        leftOperand: {
          fieldName: "parentRequestId",
          operator: "NULL"
        },
        logicalOperator: "AND",
        rightOperand: {
          fieldName: "loanOfferedAmount.loanOfferdStatus",
          fieldValue: "LOANOFFERACCEPTED",
          operator: "EQUALS"
        }
      },
      page: {
        pageNo: intrested.pageNo,
        pageSize: intrested.pageSize
      },
      sortBy: "loanRequestedDate",
      sortOrder: "DESC"
    };
  }

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `1/loan/ADMIN/request/search`,
    "POST",
    token,
    data
  );
  return response;
};

function parseInteger(inputString) {
  // Remove all non-numeric characters using regular expression
  const numericString = inputString.replace(/\D/g, '');

  // Parse the remaining string as an integer
  const parsedInteger = parseInt(numericString);

  return parsedInteger;
}
export const getloanborrowerandlender = async (intrested , datavalue)=>{

  const token = getToken();


  //    const data = {
  //         leftOperand: {
  //         fieldName: "user.adminComments",
  //         fieldValue: "INTERESTED",
  //         operator: "EQUALS"
  //     },
  //     logicalOperator: "AND",
  //     rightOperand: {
  //         fieldName: "parentRequestId",
  //         operator: "NULL"
  //     },
  //     page: {
  //         pageNo: intrested.pageNo,
  //         pageSize: intrested.pageSize
  //     },
  //     sortBy: "loanRequestedDate",
  //     sortOrder: "DESC"
  // }

  // const data = {
  //   leftOperand: {
  //     leftOperand: {
  //       fieldName: datavalue.inputfiled === "Name" ? "user.personalDetails.firstName"  :  "userId",
  //       operator: "LIKE",
  //       fieldValue: datavalue.fieldValue
  //     },
  //     logicalOperator: "OR",
  //     rightOperand: {
  //       fieldName:datavalue.inputfiled === "Name" ? "user.personalDetails.firstName"  :  "userId",
  //       operator: "LIKE",
  //       fieldValue:  data.fieldValue
  //     }
  //   },
  //   logicalOperator: "AND",
  //   rightOperand: {
  //     leftOperand: {
  //       fieldName: "parentRequestId",
  //       operator: "NULL"
  //     },
  //     logicalOperator: "AND",
  //     rightOperand: {
  //     fieldName: "loanOfferedAmount.loanOfferdStatus",
  //     fieldValue: "LOANOFFERACCEPTED",
  //     operator: "EQUALS"
  //     }
  //   },
  //   page: {
  //     pageNo: intrested.pageNo,
  //     pageSize: intrested.pageSize
  //   },
  //   sortBy: "loanRequestedDate",
  //   sortOrder: "DESC"
  // }

  const data ={
     leftOperand: {
      leftOperand: {
        fieldName: "userPrimaryType",
        fieldValue: "BORROWER",
        operator: "EQUALS"
      },
      logicalOperator: "AND",
      rightOperand: {
        fieldName: "user.adminComments",
        fieldValue: "INTERESTED",
        operator: "EQUALS"
      }
    },
    logicalOperator: "AND",
    rightOperand: {
        leftOperand: {
        fieldName: "parentRequestId",
        operator: "NULL"
      },
      logicalOperator: "AND",
      rightOperand: {
        fieldName: "loanOfferedAmount.loanOfferdStatus",
        fieldValue: "LOANOFFERACCEPTED",
        operator: "EQUALS"
      }
    },
    page: {
      pageNo: 1,
      pageSize: 9
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

export const dealreopenmessageapi = async (dealId, fundsAcceptanceEndDate)=>{
  const data = {
    dealId: dealId,
    fundsAcceptanceEndDate: fundsAcceptanceEndDate.split("-").reverse().join("/")
};
 const token = getToken();

 const response = await handleApiRequestAfterLoginService(
   API_BASE_URL,
   `deal-reopen`,
   "PATCH",   
   token,
   data
 );
 return response;
}
export const lendersfeestatus = async ()=>{
 
 const token = getToken();

 const response = await handleApiRequestAfterLoginService(
   API_BASE_URL,
   `lenders_fee_status`,
   "GET",   
   token,
   
 );
 return response;
}
export const extendsDurationapi = async (dealId, fundsAcceptanceEndDate)=>{
  const data = 
    { dealId: dealId,
    duration: fundsAcceptanceEndDate 
    }

 const token = getToken();

 const response = await handleApiRequestAfterLoginService(
   API_BASE_URL,
   `extendsDuration`,
   "PATCH",   
   token,
   data
 );
 return response;
}
export const listOfDealsInformationForEquityDealsapi = async (type, dealname , pageno , pagesize)=>{
  const data = 
  {
    pageNo: pageno,
    pageSize:  pagesize,
    dealType: type,
    dealName: dealname
  }

 const token = getToken();
 const userId  =getUserId()

 const response = await handleApiRequestAfterLoginService(
   API_BASE_URL,
   `${userId}/listOfDealsInformationForEquityDeals`,
   "POST",   
   token,
   data
 );
 return response;
}
export const getviewdealadmin = async ( pageNo, pageSize , dealType)=>{
   const data={
    pageNo,
    pageSize,
    dealType,
  }
  const token = getToken();
 
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `listOfDealsInformationForNormalDeals`,
    "POST",   
    token,
    data
  );
  return response;
}


export const getlistOfDealsInformationForEquityDeals = async ( data)=>{

 const token = getToken();  const userId = getUserId();

 const response = await handleApiRequestAfterLoginService(
   API_BASE_URL,
   `${userId}/listOfDealsInformationForEquityDeals`,
   "POST",   
   token,
   data
 );
 return response;
}

export   const  handleStopPartici= async(dealId)=>{
  const token = getToken();
  const useid =getUserId()
  const data =   { 
    statusType: "ACHIEVED"
   }
  const jsonString = JSON.stringify(data);
  
  console.log(jsonString);   
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${dealId}/dealPaticipationStatusUpdation`,
    "PATCH",   
    token,
    data
  );
  return response;
} 



export   const  listOfDealsInformationForEquityDeals= async(data)=>{
  const token = getToken();
  const useid =getUserId()

  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${useid}/listOfDealsInformationForEquityDeals`,
    "POST",   
    token,
    data
  );
  return response;
} 

export   const  apidealreopen= async(date5)=>{
  const token = getToken();
  const useid =getUserId()
  const dealId  = localStorage.getItem("dealId")
  const data =   { 
      dealId: dealId,
      fundsAcceptanceEndDate: date5.split("-").reverse().join("/")

   }
  
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `deal-reopen `,
    "PATCH",   
    token,
    data
  );
  return response;
}


export   const  handlesubmitapi= async(dealId    , type)=>{
  const token = getToken();
  const useid =getUserId()
 
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `deal-summary?dealId=${dealId}&amountType=${type}`,
    "GET",   
    token,
  );
  return response;
}
export   const  handleextenddealTenureapi= async(dealId)=>{
  const token = getToken();
  const useid =getUserId()
  const data =   { 
    statusType: "ACHIEVED"
   }
  const jsonString = JSON.stringify(data);
  
  console.log(jsonString);   
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${dealId}/dealPaticipationStatusUpdation`,
    "PATCH",   
    token,
    data
  );
  return response;
} 
export const getintrestedapi = async (intrested , datavalue)=>{

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

  // const data = {
  //   leftOperand: {
  //     leftOperand: {
  //       fieldName: datavalue.inputfiled === "Name" ? "user.personalDetails.firstName"  :  "userId",
  //       operator: "LIKE",
  //       fieldValue: datavalue.fieldValue
  //     },
  //     logicalOperator: "OR",
  //     rightOperand: {
  //       fieldName:datavalue.inputfiled === "Name" ? "user.personalDetails.firstName"  :  "userId",
  //       operator: "LIKE",
  //       fieldValue:  data.fieldValue
  //     }
  //   },
  //   logicalOperator: "AND",
  //   rightOperand: {
  //     leftOperand: {
  //       fieldName: "parentRequestId",
  //       operator: "NULL"
  //     },
  //     logicalOperator: "AND",
  //     rightOperand: {
  //     fieldName: "loanOfferedAmount.loanOfferdStatus",
  //     fieldValue: "LOANOFFERACCEPTED",
  //     operator: "EQUALS"
  //     }
  //   },
  //   page: {
  //     pageNo: intrested.pageNo,
  //     pageSize: intrested.pageSize
  //   },
  //   sortBy: "loanRequestedDate",
  //   sortOrder: "DESC"
  // }
  
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
export   const  handlesubmitqueymessageapi= async(apidata)=>{
  const token = getToken();
  const useid =getUserId()
  const data = {
    id:"6", // Convert id to string
    userId: String(apidata.userId), // Convert userId to string
    status: apidata.status,
    comments: apidata.comments,
    resolvedBy: apidata.resolvedBy,
    adminDocumentId: parseInt(apidata.adminDocumentId), // Convert adminDocumentId to integer using parseInt
    respondedBy: apidata.respondedBy
  };
  
  const jsonString = JSON.stringify(data);
  
  console.log(jsonString);   
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `testresolvingUserQuery`,
    "PATCH",   
    token,
    jsonString
  );
  return response;
}  

export   const  handelmodelopen= async(userId)=>{
  const token = getToken();
  
const data={
  leftOperand: {
      leftOperand: {
          fieldName: "user.id",
          fieldValue: userId,
          operator: "EQUALS"
      },
      logicalOperator: "AND",
      rightOperand: {
          fieldName: "parentRequestId",
          operator: "NOT_NULL"
      }
  },
  logicalOperator: "OR",
  rightOperand: {
      fieldName: "parentRequestId",
      fieldValue: "57",
      operator: "EQUALS"
  },
  page: {
      pageNo: 1,
      pageSize: 10
  }
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
export   const  ticketHistoryapiget= async(id ,userId)=>{
  const token = getToken();
  
const data={
  id: id,
  userId: userId

}
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `listOfQueriesHisory`,
    "POST",   
    token,
    data
  );
  return response;
}  

export  const interestDetailsForDeall  = async (input)=>{


  const token = getToken();

const data={

    paymentDate: "21-02-2024",
    originalPaymentDate: "08-02-2024",
    dealId: "11",
    status: "APPROVED",
    totalAmount: "1",
    paymentMode: "OFFLINE"

}
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `interestDetailsForDeall`,
    "POST",   
    token,
    data
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

export  const lenderFee_excel_sheet    =async(data)=>{
  const token = getToken();
     


  
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `${data}/lenderFee_excel_sheet`,
    "POST",   
    token,
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
export  const getdealpay    =async(intrested,  datavalue)=>{
  const token = getToken();
     const data={
      dealType: datavalue.fieldValue3,
      payOutType: datavalue.fieldValue31
  }


  
  const response = await handleApiRequestAfterLoginService(
    API_BASE_URL,
    `deals`,
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

