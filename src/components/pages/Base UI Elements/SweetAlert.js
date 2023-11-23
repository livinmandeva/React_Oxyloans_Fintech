import React, { Component } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  getNewSessionTime,
  getFinancialReportDownload,
  downloadClosedLoanStatement,
  downloadTranactionStatement,
  cancelWithdrawalRequest,
  nofreeParticipationapi,
} from "../../HttpRequest/afterlogin";
import { toastrSuccess } from "./Toast";

export const HandleClick = () => {
  Swal.fire({
    title: "Any fool can use a computer",
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const HandleWithTitle = () => {
  Swal.fire({
    title: "The Internet?,",
    text: "That thing is still around?",
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const HandleWithFooter = (message) => {
  Swal.fire({
    type: "success",
    title: "Congratulation",
    text: message,
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const topStart = () => {
  Swal.fire({
    position: "top-start",
    type: "success",
    title: "Your work has been saved",
    showConfirmButton: !1,
    timer: 1500,
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const topEnd = () => {
  Swal.fire({
    position: "top-end",
    type: "success",
    title: "Your work has been saved",
    showConfirmButton: !1,
    timer: 1500,
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const bottomStart = () => {
  Swal.fire({
    position: "bottom-start",
    type: "success",
    title: "Your work has been saved",
    showConfirmButton: !1,
    timer: 1500,
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const bottomEnd = () => {
  Swal.fire({
    position: "bottom-end",
    type: "success",
    title: "Your work has been saved",
    showConfirmButton: !1,
    timer: 1500,
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};

export const Info = () => {
  Swal.fire({
    title: "Info!",
    text: "You clicked the button!",
    type: "info",
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const WarningAlert = (errorMessage, redirectTo) => {
  Swal.fire({
    title: "session Expiring",
    text: errorMessage,
    icon: "warning",
    showDenyButton: true,
    confirmButtonText: "Sign Out",
    denyButtonText: "Contine",
    denyButtonColor: "#5c9b45",
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      window.location.href = `${redirectTo}`;
    } else if (result.isDenied) {
      getNewSessionTime();
      Swal.fire("Token!", "Your session has Generated.", "success");
    }
  });
};



export const validityDatemodal = (validityDate) => {
  Swal.fire({
    title: "Membership Renewal Reminder",
    html: `<p style={{marginBottom: '2px'}}>Your membership validity expired on ${validityDate}.</p>`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Get Membership",
  }).then((result) => {
    if (result.isConfirmed) {
      // Use window.location.href to navigate to a new URL
      window.location.href = '/paymembership';
    }
  });
};

export const participatedapi = ({
  apidata,
  participatedAmount,
  lenderReturnType,
  groupId,
  dealId,
  accountType,
  deal
}) => {
  Swal.fire({
    title: "Please review the lending details!",
    html: `<p><strong> Lending Amount :- INR </strong>${participatedAmount}</p><br>
           <p><strong> Pay-out Method: </strong>${lenderReturnType}</p><br>
           <p><strong> Pay-out Method: </strong>${participatedAmount}</p>`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ok!"
  }).then((result) => {
    if (result.isConfirmed) {
      // Call the nofreeParticipationapi function here
      const response = nofreeParticipationapi(
        apidata,
        groupId,
        dealId,
        accountType,
        lenderReturnType,
        deal
      );
      const amount = localStorage.getItem("lenderRemainingWalletAmount");

      response
        .then((response) => {
          console.log(response);
          Swal.fire({
            title: "Congratulations!",
            text: `We are reserving ${participatedAmount} for  .
            Your new wallet balance: ${amount}`,
            icon: "success"
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Error!",
            text: `We are reserving ${errorMessage} for ROI%%% .
            Your new wallet balance: ${amount}`,
            icon: "error"
          });
        });
    }
  });
};


const tenure = {
  monthly: 1000,
  quarterly: 2900,
  halfyearly: 5600,
  peryear: 9800,
  lifetime: 100000,
  fiveyears: 50000,
  tenyears: 90000,
};

// Define the membership function
export const membership = () => {
  Swal.fire({
    title: "Select Membership Duration",
    width: "600px",
    html: `
      <style>
        .radiobutton {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      </style>
      <div class="radiobutton">
        <input type="radio" name="membershipOption" value="monthly" id="option1">
        <label for="option1">One Month</label>
        <!-- Add the rest of the radio buttons and labels here -->
      </div>`,
    showCancelButton: true,
    confirmButtonText: "Pay & Participate",
    cancelButtonText: "Cancel",
    input: "radio",
    inputOptions: {
      monthly: "One Month",
      quarterly: "Quarterly",
      halfyearly: "Half-Yearly",
      peryear: "One Year",
      lifetime: "Five Years",
      fiveyears: "Ten Years",
      tenyears: "Life Time",
    },
    inputValidator: (result) => {
      if (!result) {
        return "You must select an option";
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      const selectedOption = result.value;
      const amount = tenure[selectedOption];
      const calculate = (amount * 118) / 100;
      Swal.fire({
        title: "pay amount",
        text: selectedOption,
        html: `<br>Your membership amount is  ${calculate}`,
        icon: "info",
        confirmButtonText: "Pay Amount",
      });
    }
  });
};

export const WarningAlertWalltTran = (errorMessage, redirectTo) => {
  Swal.fire({
    title: "error",
    text: errorMessage,
    icon: "warning",
    // showDenyButton: true,
    // denyButtonColor: "#5c9b45",
  }).then((result) => {
    console.log(result);
    // if (result.isConfirmed) {
    //   window.location.href = `${redirectTo}`;
    // } else if (result.isDenied) {
    //   getNewSessionTime();
    //   Swal.fire("Token!", "Your session has Generated.", "success");
    // }
  });
};
export const PrincipalTransfer = (warningType, errormessage) => {
  Swal.fire("Principal Payout!", errormessage, warningType);
  setTimeout(() => {
    window.location.reload();
  }, 3000);
};

export  const WarningAlerterror= (errorMessage, redirectTo)=>{
  Swal.fire({
    title: "error",
    text: errorMessage,
    icon: "error",
    showDenyButton: true,

  })
}
export const Error = () => {
  Swal.fire({
    title: "Error!",
    text: " You clicked the button!",
    type: "error",
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const autoClose = () => {
  var t;
  Swal.fire({
    title: "Auto close alert!",
    html: "I will close in <strong></strong> seconds.",
    timer: 2e3,
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
    onBeforeOpen: function () {
      Swal.showLoading(),
        (t = setInterval(function () {
          Swal.getContent().querySelector("strong").textContent =
            Swal.getTimerLeft();
        }, 100));
    },
    onClose: function () {
      clearInterval(t);
    },
  }).then(function (t) {
    t.dismiss === Swal.DismissReason.timer &&
      console.log("I was closed by the timer");
  });
};
export const outsideClick = () => {
  Swal.fire({
    title: "Click outside to close!",
    text: "This is a cool message!",
    allowOutsideClick: !0,
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
  });
};
export const Prompt = () => {
  Swal.fire({
    input: "text",
    confirmButtonText: "Next &rarr;",
    showCancelButton: !0,
    progressSteps: ["1", "2", "3"],
    confirmButtonClass: "btn btn-primary",
    buttonsStyling: !1,
    cancelButtonClass: "btn btn-danger ml-1",
  })
    .queue([
      { title: "Question 1", text: "Chaining swal2 modals is easy" },
      "Question 2",
      "Question 3",
    ])
    .then(function (t) {
      t.value &&
        Swal.fire({
          title: "All done!",
          html:
            "Your answers: <pre><code>" +
            JSON.stringify(t.value) +
            "</code></pre>",
          confirmButtonText: "Lovely!",
        });
    });
};
export const confirmText = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    type: "warning",
    showCancelButton: !0,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    confirmButtonClass: "btn btn-primary",
    cancelButtonClass: "btn btn-danger ml-1",
    buttonsStyling: !1,
  }).then(function (t) {
    t.value &&
      Swal.fire({
        type: "success",
        title: "Deleted!",
        text: "Your file has been deleted.",
        confirmButtonClass: "btn btn-success",
      });
  });
};
export const confirmColor = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    type: "warning",
    showCancelButton: !0,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    confirmButtonClass: "btn btn-primary",
    cancelButtonClass: "btn btn-danger ml-1",
    buttonsStyling: !1,
  }).then(function (t) {
    t.value
      ? Swal.fire({
          type: "success",
          title: "Deleted!",
          text: "Your file has been deleted.",
          confirmButtonClass: "btn btn-success",
        })
      : t.dismiss === Swal.DismissReason.cancel &&
        Swal.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          type: "error",
          confirmButtonClass: "btn btn-success",
        });
  });
};

export const confirmationAlertFyYear = (startdate, enddate, downloadType) => {
  Swal.fire({
    title: "Are you sure?",
    text: `You want to ${
      downloadType == "DOWNLOAD"
        ? "Download the FY Statement"
        : "Get FY Email Statement"
    } `,
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes !",
  }).then((result) => {
    if (result.isConfirmed) {
      const response = getFinancialReportDownload(
        startdate,
        enddate,
        downloadType
      );
      response.then((data) => {
        console.log(data);
        if (data.request.status == 200) {
          if (downloadType == "DOWNLOAD") {
            // window.location.href = data.data.lenderProfit;
            window.open(data.data.lenderProfit, "_blank");
          }
          Swal.fire(
            "Success!",
            `${
              downloadType == "DOWNLOAD"
                ? "Your file has been downloaded."
                : "We have sent FY Statement  to your Email"
            }`,
            "success"
          );
        }
      });
    }
  });
};

export const downloadClosedLoanStatementAlert = (type) => {
  Swal.fire({
    title: "Are you sure?",
    text: `You want to download All  Closed Loan Information  `,
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes !",
  }).then((result) => {
    if (result.isConfirmed) {
      const response = downloadClosedLoanStatement(type);
      response.then((data) => {
        console.log(data);
        if (data.request.status == 200) {
          window.open(data.data.closedDealsDownloadUrl, "_blank");
          Swal.fire("Success!", `Downloaded Successfully`, "success");
        } else if (data.response.data.errorCode != "200") {
          Swal.fire(
            "warning!",
            `${data.response.data.errorMessage}`,
            "warning"
          );
        }
      });
    }
  });
};

export const downloadMytransactionAlert = () => {
  Swal.fire({
    title: "Are you sure?",
    text: `You want to download Transaction Information  `,
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes !",
  }).then((result) => {
    if (result.isConfirmed) {
      const response = downloadTranactionStatement();
      response.then((data) => {
        console.log(data);
        if (data.request.status == 200) {
          window.open(data.data.downloadUrl, "_blank");
          Swal.fire("Success!", `Downloaded Successfully`, "success");
        } else if (data.response.data.errorCode != "200") {
          Swal.fire(
            "warning!",
            `${data.response.data.errorMessage}`,
            "warning"
          );
        }
      });
    }
  });
};

export const freeParticipationapialert = (
  apidata,
  groupId,
  urldealId,
  bank,
  lenderReturnType,
  deal
) => {
  Swal.fire({
    title: "Please review the lending details!",
    text: `Lending Amount: INR ${deal.participatedAmount}<br></br>Deal Name: ${deal.dealName}<br></br>RoI: ${deal}%`,
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes!",
  }).then((result) => {
    if (result.isConfirmed) {
      const response = nofreeParticipationapi(
        apidata,
        groupId,
        urldealId,
        bank,
        lenderReturnType,
        deal
      );
      response.then((data) => {
        console.log(data);
        if (data.request.status == 200) {
          toastrSuccess("Deal participated successfully"); // Make sure toastrSuccess is defined
        } else if (data.response.data.errorCode != "200") {
          Swal.fire(
            "Warning!",
            `${data.response.data.errorMessage}`,
            "warning"
          );
        }
      });
    }
  });
};

export const cancelwithdrawalRequestInformation = (fromrequest, id) => {
  Swal.fire({
    title: "Are you sure?",
    text: `You want to Cancel The Withdrawal Request`,
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes !",
  }).then((result) => {
    if (result.isConfirmed) {
      const response = cancelWithdrawalRequest(fromrequest, id);
      response.then((data) => {
        console.log(data);
        if (data.request.status == 200) {
          Swal.fire("Success!", `Sucessfully Cancel The Request`, "success");
        } else if (data.response.data.errorCode != "200") {
          Swal.fire(
            "warning!",
            `${data.response.data.errorMessage}`,
            "warning"
          );
        }
      });
    }
  });
};

export const Success = (tittle, message) => {
  Swal.fire(`${tittle}`, `${message}`, "success");
};

export const WarningBackendApi = (tittle, message) => {
  Swal.fire(`${tittle}`, `${message}`, "warning");
};
