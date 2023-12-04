import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import Footer from "../../../Footer/Footer";
import "./InvoiceGrid.css";
import {
  handledetail,
  handlecashapi,
  nofreeParticipationapi,
} from "../../../HttpRequest/afterlogin";
import { Button, Card, Switch, Table } from "antd";
// import { useNavigate  } from "react-router-dom";
import { toastrError, toastrSuccess } from "../../Base UI Elements/Toast";
import {
  WarningAlert,
  WarningAlertWalltTran,
  membership,
  participated,
  participatedapi,
} from "../../Base UI Elements/SweetAlert";
import Swal from "sweetalert2";
import Freeparticipate from "./Freeparticipate";
import Spining from "./Spining";

const Participatedeal = () => {
  // const history = useNavigate();

  const [deal, setDeal] = useState({
    apidata: "",
    transactionNumber: "",
    accountType: "",
    lenderFeeId: "",
    feeParticipate: true,
    lenderReturnType: "",
    lenderFeeId: "",
    transferPrincipal: "",
    participatedAmount: "111",
    bank: "",
    wallet: "",
    urldealId: "",
    spining: false,
  });
  const [buttonvaild, setbuttonvaild] = useState(false);
  const [isConditionMet, setIsConditionMet] = useState(false);

  useEffect(() => {
    const handledealinfo = async () => {
      const urlparam = new URLSearchParams(window.location.search);
      const dealId = urlparam.get("dealId");

      const response = await handledetail(dealId);
      console.log(response.data);

      setDeal({
        ...deal,
        apidata: response.data,
        urldealId: dealId,
      });
      if (response.request.status == 500) {
        setDeal({
          ...deal,
          spining: true,
        });
      }
      {
        response.data.lenderRemainingWalletAmount != "" ||
          (null && (
            <>
              {localStorage.setItem(
                "lenderRemainingWalletAmount",
                response.data.lenderRemainingWalletAmount
              )}
            </>
          ));
      }
      setTimeout(() => {
        setDeal({
          ...deal,
          apidata: response.data,
          urldealId: dealId,
        });
        console.log("deal apidata", deal.apidata);
      }, 1000);

      if (response.data.yearlyInterest !== 0) {
        setDeal({
          ...deal,
          lenderReturnType: "YEARLY",
        });
      } else if (response.data.halfInterest !== 0 || null) {
        setDeal({
          ...deal,
          lenderReturnType: "Half Year",
        });
      } else if (response.data.monthlyInterest !== 0 || null) {
        setDeal({
          ...deal,
          lenderReturnType: "monthly",
        });
      }
    };

    handledealinfo();
  }, []);

  const dataSource = [];

  console.log(deal.apidata);
  deal.apidata && deal.apidata != ""
    ? dataSource.push({
        name: deal.apidata.dealName,
        loanamount: deal.apidata.dealAmount,
        availablelimit: deal.apidata.remainingAmountInDeal,
        tenureinmonths: deal.apidata.duration + "M",
        funding: deal.apidata.fundStartDate,
        fundingdate: deal.apidata.fundEndDate,
        minimumparticipation: deal.apidata.minimumPaticipationAmount,
        maximumparticipation: deal.apidata.lenderParticiptionLimit,
      })
    : null;
  const columns = [
    {
      title: "Deal Name",
      dataIndex: "name",
      key: "deal",
    },
    {
      title: "Deal Value",
      dataIndex: "loanamount",
      key: "loanamount",
    },
    {
      title: "Available Limit",
      dataIndex: "availablelimit",
      key: "availablelimit",
    },
    {
      title: "Tenure",
      dataIndex: "tenureinmonths",
      key: "tenureinmonths",
    },

    {
      title: "Min Amount",
      dataIndex: "minimumparticipation",
      key: "minimumparticipation",
    },
    {
      title: "Max Amount",
      dataIndex: "maximumparticipation",
      key: "maximumparticipation",
    },
  ];

  const dealparticipate = (
    apidata,
    participatedAmount,
    lenderReturnType,
    groupId,
    dealId,
    accountType,
    deal
  ) => {
    console.log(deal.apidata.feeStatusToParticipate);
    console.log(deal.apidata.groupName);
    console.log(deal.apidata.validityStatus);

    if (isConditionMet) {
      if (deal.apidata.feeStatusToParticipate == "MANDATORY") {
        if (deal.apidata.groupName != "" || null) {
          if (deal.apidata.validityStatus === false) {
            console.log("deal succuess");
            // WarningAlert()

            participatedapi({
              apidata,
              participatedAmount,
              lenderReturnType,
              groupId,
              dealId,
              accountType,
              deal,
            });
          } else {
            console.log("deal validityStatus completed ");
          }
        } else {
          console.log("deal  having free feeStatusToParticipate");
        }
      } else {
        participatedapi({
          apidata,
          participatedAmount,
          lenderReturnType,
          groupId,
          dealId,
          accountType,
          deal,
        });
        console.log("deal not having free feeStatusToParticipate");
      }
    } else {
      WarningAlertWalltTran(
        "The participation fee falls below the specified requirements."
      );
    }
  };
  useEffect(() => {
    console.log(deal.apidata);

    const checkCondition = () => {
      if (
        deal.participatedAmount >= deal.apidata.minimumPaticipationAmount &&
        deal.participatedAmount <= deal.apidata.lenderParticiptionLimit
      ) {
        console.log("Condition passed");
        setIsConditionMet(true);
      } else {
        console.log("Condition not passed");
        setIsConditionMet(false);
      }
    };

    checkCondition();
  }, [deal.participatedAmount]);

  useEffect(() => {
    if (deal.bank != "") {
      console.log("payment type selected");
      setbuttonvaild(true);
    } else {
      console.log("select  payment type");
      setbuttonvaild(false);
    }
  }, [deal.bank]);
  useEffect(() => {
    {
      console.log(deal.bank);
    }
  }, [deal.bank]);

  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <SideBar />

        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">
                    {/* Write To Us */}
                    Deal Info
                  </h3>

                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Deal Info</li>
                  </ul>
                </div>
              </div>
            </div>
            {deal.spining ? (
              <>
                {" "}
                <Spining />
              </>
            ) : (
              <>
                <p>Welcome to {deal.apidata && deal.apidata.dealName}</p>
                <div className="row col-12">
                  <Table
                    dataSource={dataSource.length < 0 ? [] : dataSource}
                    columns={columns}
                    pagination={false}
                    loading={dataSource.length < 0 ? true : false}
                  />
                </div>

                <div className="displaycenter">
                  <h4 style={{ marginTop: "2rem" }}>Return Principal To :</h4>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="transferPrincipal"
                      value={"WALLET"}
                      onChange={(event) => {
                        setDeal({
                          ...deal,
                          bank: event.target.value,
                        });
                      }}
                    />
                    <label class="form-check-label" for="flexRadioDisabled">
                      <strong> Move Principal to wallet </strong>
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="transferPrincipal"
                      value={"BANKACCOUNT"}
                      onChange={(event) => {
                        setDeal({
                          ...deal,
                          bank: event.target.value,
                        });
                      }}
                    />

                    <label
                      class="form-check-label"
                      for="flexRadioCheckedDisabled"
                    >
                      <strong> Move Principal to Bank</strong>
                    </label>
                  </div>
                </div>
                <div className="centerdiv mt-5">
                  <h4>Your participation to this deal is</h4>
                  <div className="form-group">
                    <input
                      className="form-control-lg form-control-lg1"
                      type="text"
                      placeholder="Enter amount here..."
                      onChange={(event) => {
                        setDeal({
                          ...deal,
                          participatedAmount: event.target.value,
                        });
                      }}
                    />
                  </div>
                  {}
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => {
                      // Assuming 'dealparticipate' is a function you want to call
                      dealparticipate(
                        deal.apidata,
                        deal.participatedAmount,
                        deal.lenderReturnType,
                        deal.apidata.groupId,
                        deal.urldealId,
                        deal.bank,
                        deal
                      );

                      // Update the 'deal' state
                      setDeal({
                        ...deal,
                        participatedeal: !deal.participatedeal,
                      });
                    }}
                  >
                    Participate
                  </Button>
                </div>
              </>
            )}
            {/* /Page Header */}
          </div>
          <Footer />
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default Participatedeal;
