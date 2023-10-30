import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import Footer from "../../../Footer/Footer";
import "./InvoiceGrid.css";
import { handledetail, handlecashapi } from "../../../HttpRequest/afterlogin";
import { Card, Table } from "antd";
import { useHistory } from "react-router-dom";

const Participatedeal = () => {
  const history = useHistory();

  const [deal, setDeal] = useState({
    apidata: "",
    transactionNumber: "",
    accountType: "",
    lenderFeeId: "",
    lenderReturnType: "",
    lenderFeeId: "",
    participatedAmount: "",
    bank: "",
    wallet: "",
  });

  useEffect(() => {
    const handledealinfo = async (dealId) => {
      const urlparam = new URLSearchParams(window.location.search);
      var dealId = urlparam.get("dealId");
      const response = handledetail(dealId);
      response.then((data) => {
        console.log(data);
        setDeal({
          ...deal,
          apidata: data.data,
        });
        if (data.data.yearlyInterest != 0) {
          setDeal({
            ...deal,
            lenderReturnType: "YEARLY",
          });
        }
      });
    };

    handledealinfo();
  }, []);

  const dataSource = [];

  deal.apidata != ""
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
      title: "Funding Start ",
      dataIndex: "funding",
      key: "funding",
    },
    {
      title: "Funding End ",
      dataIndex: "fundingdate",
      key: "fundingdate",
    },
    {
      title: "Minimum Amount",
      dataIndex: "minimumparticipation",
      key: "minimumparticipation",
    },
    {
      title: "Maximum Amount",
      dataIndex: "maximumparticipation",
      key: "maximumparticipation",
    },
  ];
  // action="https://test.cashfree.com/billpay/checkout/post/submit"
  const handlecashfree = () => {
    console.log(deal.wallet, deal.bank);
    const response = handlecashapi(
      deal.apidata.groupId,
      deal.participatedAmount
    );
    response.then((data) => {
      console.log(data);
      history.push("https://test.cashfree.com/billpay/checkout/post/submit");
    });
  };

  const freeParticipation = () => {
    const response = freeParticipationapi(
      deal.apidata.groupId,
      deal.apidata.dealId,
      deal.accountType,
      deal.lenderReturnType
    );
    response.then((data) => {
      console.log(data);
    });
  };

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
            {/* /Page Header */}
            <p>Welcome to {deal.apidata.dealName}</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
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
              <h4 style={{ marginTop: "2rem" }}>
                Transfer principal payment method
              </h4>
              <div class="form-check my-1">
                <input
                  class="form-check-input"
                  type="radio"
                  name="transferPrincipal"
                  value={"wallet"}
                  onChange={(event) => {
                    setDeal({
                      ...deal,
                      wallet: event.target.value,
                    });
                  }}
                />
                <label class="form-check-label" for="flexRadioDisabled">
                  Move Principal to wallet
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="transferPrincipal"
                  value={"bank"}
                  onChange={(event) => {
                    setDeal({
                      ...deal,
                      bank: event.target.value,
                    });
                  }}
                />
                <label class="form-check-label" for="flexRadioCheckedDisabled">
                  Move Principal to Bank
                </label>
              </div>
              <h3 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                Choose your pay out method
              </h3>

              <div className="card-group col-12">
                <div className="card col-md-3 col-lg-3 mx-3 col-sm-12 h-30">
                  <div className="card-header  text-center bg-dark text-white">
                    NEW LENDER
                  </div>
                  <div className="card-body text-center">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Item 1</li>
                      <li className="list-group-item">Item 2</li>
                      <li className="list-group-item">Item 3</li>
                    </ul>
                  </div>
                  <div className="card-footer text-center">
                    <button className="btn btn-primary col-md-4">Submit</button>
                  </div>
                </div>

                <div className="card col-md-3 col-lg-3 col-sm-12 mx-3 h-20">
                  <div className="card-header  text-center bg-success text-white">
                    NEW LENDER
                  </div>
                  <div className="card-body text-center">
                    <ul className="list-group list-group-flush lead">
                      <li className="list-group-item border-1">
                        <input
                          className="form-check-input mx-2"
                          type="radio"
                          name="newlenderpayout"
                          id="premMonthly"
                        />
                        <label for="premMonthly">
                          Monthly Interest pay-out
                        </label>
                      </li>
                    </ul>
                  </div>
                  <div className="card-footer text-center">
                    <button className="btn btn-primary col-md-4">Submit</button>
                  </div>
                </div>
              </div>

              {/* <div className="datarender" style={{ marginTop: "3%" }}>
                <Card
                  size="meddam"
                  headStyle={{
                    backgroundColor: "#3d5ee1",
                    color: "white",
                    textAlign: "center",
                  }}
                  title="OXY FOUNDING LENDER"
                  bodyStyle={{ width: 300, textAlign: "center" }}
                >
                  <p>Choose Your Interest Payout Method</p>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDisabled"
                      id="flexRadioDisabled"
                    />
                    <label class="form-check-label" for="flexRadioDisabled">
                      {deal.apidata && (
                        <>
                          {console.log(deal.apidata)}
                          {deal.apidata.monthlyInterest != 0 ? (
                            <div>
                              monthlyInterest pay-out
                              {deal.apidata.monthlyInterest} % P.M
                            </div>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                      {deal.apidata.yearlyInterest != 0 ? (
                        <div>
                          yearlyInterest pay-out {deal.apidata.monthlyInterest}{" "}
                          % P.M
                        </div>
                      ) : (
                        <></>
                      )}
                      {deal.apidata.quartlyInterest != 0 ? (
                        <div>
                          quartlyInterest pay-out {deal.apidata.monthlyInterest}{" "}
                          % P.M
                        </div>
                      ) : (
                        <></>
                      )}
                      {deal.apidata.halfInterest != 0 ? (
                        <div>
                          halfInterest pay-out {deal.apidata.monthlyInterest} %
                          P.M
                        </div>
                      ) : (
                        <></>
                      )}
                    </label>
                  </div>

                  {deal.apidata.lifeTimeWaiver ? (
                    <>
                      <button className="btn btn-primary" type="submit">
                        Participate Now
                      </button>
                    </>
                  ) : (
                    <a
                      href="https://test.cashfree.com/billpay/checkout/post/submit"
                      className="btn btn-primary"
                      onClick={handlecashfree}
                    >
                      Participate Now
                    </a>
                  )}
                </Card>

                {deal.apidata.feeStatusToParticipate == "MANDATORY" ? (
                  <>
                    <Card
                      size="meddam"
                      title="NO Fee To Participate"
                      headStyle={{
                        backgroundColor: "#3d5ee1",
                        color: "white",
                        textAlign: "center",
                      }}
                      bodyStyle={{ width: 300 }}
                    >
                      <p size="meddam">Choose Your Interest Payout Method</p>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="flexRadioDisabled"
                          id="flexRadioDisabled"
                        />
                        <label class="form-check-label" for="flexRadioDisabled">
                          {deal.apidata && (
                            <>
                              {deal.apidata.monthlyInterest != 0 ? (
                                <div>
                                  monthlyInterest pay-out
                                  {deal.apidata.monthlyInterest} % P.M
                                </div>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                          {deal.apidata.yearlyInterest != 0 ? (
                            <div>
                              yearlyInterest pay-out{" "}
                              {deal.apidata.monthlyInterest} % P.M
                            </div>
                          ) : (
                            <></>
                          )}
                          {deal.apidata.quartlyInterest != 0 ? (
                            <div>
                              quartlyInterest pay-out{" "}
                              {deal.apidata.monthlyInterest} % P.M
                            </div>
                          ) : (
                            <></>
                          )}
                          {deal.apidata.halfInterest != 0 ? (
                            <div>
                              halfInterest pay-out{" "}
                              {deal.apidata.monthlyInterest} % P.M
                            </div>
                          ) : (
                            <></>
                          )}
                        </label>
                      </div>

                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={freeParticipation}
                      >
                        Participate Now
                      </button>
                    </Card>
                  </>
                ) : (
                  <></>
                )}
              </div> */}
            </div>
          </div>
          <Footer />
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default Participatedeal;
