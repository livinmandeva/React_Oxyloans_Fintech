import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import Footer from "../../../Footer/Footer";
import "./InvoiceGrid.css";
import { handledetail, handlecashapi, nofreeParticipationapi } from "../../../HttpRequest/afterlogin";
import { Card, Switch, Table } from "antd";
import { useHistory } from "react-router-dom";
import { toastrError, toastrSuccess } from "../../Base UI Elements/Toast";
import { membership } from "../../Base UI Elements/SweetAlert";

const Participatedeal = () => {
  const history = useHistory();

  const [deal, setDeal] = useState({
    apidata: "",
    transactionNumber: "",
    checked:true,
    accountType: "",
    lenderFeeId: "",
    lenderReturnType: "",
    lenderFeeId: "",
    transferPrincipal:"",
    participatedAmount: "",
    bank: "",
    wallet: "",urldealId:""
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
          urldealId:dealId
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

  deal.apidata  && deal.apidata != ""
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

  const freeParticipation = (dealdata, participatedAmount, lenderParticipationLimit) => {
    console.log(lenderParticipationLimit);
    console.log(participatedAmount);
    console.log(dealdata.participatedAmount); // Assuming dealdata has a participatedAmount property
    console.log(dealdata.apidata.validityStatus);
  
    if (dealdata.bank !== "") {
      if (dealdata.apidata.validityStatus === true) {
        toastrSuccess("valid");
        if (dealdata.participatedAmount >= participatedAmount && dealdata.participatedAmount <= lenderParticipationLimit) {
          alert("correct");
          console.log("Condition met: The deal's participation amount is within the specified range.");
          const response = freeParticipationapi(
            dealdata.apidata.groupId,
            dealdata.apidata.dealId,
            deal.bank,
            dealdata.lenderReturnType
          );
  
          response
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.error("An error occurred:", error);
              // Handle the error, e.g., display an error message.
            });
        } else {
          alert("not correct");
          toastrError("Condition not met: The deal's participation amount is outside the specified range.");
        }
      } else {
        membership("Your validity has expired. Now you have to choose the membership and participate in the deal." , " has    ")
        // toastrError("Your validity has expired. Now you have to choose the membership and participate in the deal.");
      }
    } else {
      toastrError("Please Select Transfer principal payment method");
    };
  };
  
  const handleSwitchChange = (checked) => {
    // Handle the switch change and update the state accordingly
    setDeal({
      ...deal,
      checked:checked
    });
    console.log(deal.checked)

  };
  const nofreeParticipation = (dealdata, participatedAmount, lenderParticipationLimit) => {
    console.log(lenderParticipationLimit)
    console.log(participatedAmount)
    console.log(deal.participatedAmount)
    console.log(dealdata.validityStatus)

    if(deal.bank !==""){

        if (deal.participatedAmount >= participatedAmount && deal.participatedAmount <= lenderParticipationLimit) {
          alert("correct");
          console.log("Condition met: The deal's participation amount is within the specified range.");
          const response = nofreeParticipationapi(
            deal.apidata,
            dealdata.apidata.groupId,
            deal.urldealId,
            deal.bank,
            dealdata.lenderReturnType,
            deal
            
          );
        
          response.then((data) => {
            console.log(data);
          });
        } else {
          alert("not correct");
          toastrError("Condition not met: The deal's participation amount is outside the specified range.");
        }
    }else{
      
      toastrError("Please Select Transfer principal payment method")
    }
 
  
   
  };
  
  useEffect(()=>{
    {console.log(deal.bank)}

  },[deal.bank])


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
            <p>Welcome to {deal.apidata && deal.apidata.dealName}</p>
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
              <h4  style={{ marginTop: "2rem" }}>
              Deal ExtensionConsents   
              </h4>

              {/* <div class="form-check my-1">
                <input
                  class="form-check-input"
                  type="radio"
                  name="transferPrincipal"
                  value={"interested"}
                  onChange={(event) => {
                    setDeal({
                      ...deal,
                      extension: event.target.value,
                    });
                  }}
                />
                <label class="form-check-label" for="flexRadioDisabled">
                Interested
                </label>
              </div> */}
              <Switch defaultChecked={deal.checked} onChange={handleSwitchChange} />
      <span>{deal.checked ?<>{()=>setDeal({
           ...deal,
           checked:true
      })}</>  : 'Not Interested'}</span>
              <h4 style={{ marginTop: "2rem" }} >
                Transfer principal payment method
              </h4>
              <div class="form-check my-1">
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
                  Move Principal to wallet
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
              
                <label class="form-check-label" for="flexRadioCheckedDisabled">
                  Move Principal to Bank
                </label>
              </div>
              <h3 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                Choose your pay out method
              </h3>

              {/* <div className="card-group col-12">
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
              </div> */}

              <div className="datarender" style={{ marginTop: "3%" }}>
                {/* <Card
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
    {deal.apidata.monthlyInterest !== undefined && deal.apidata.monthlyInterest !== 0 ? (
      <div>
        monthlyInterest pay-out {deal.apidata.monthlyInterest} % P.M
      </div>
    ) : null}
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
                </Card> */}

                {deal.apidata.feeStatusToParticipate == "MANDATORY" ? (
                  <>
                    <Card
                      size="meddam"
                      title={deal.apidata.groupName ==="OXYMARCH09"  ? <>OXY FOUNDING LENDER</>: <>New Lender</>}
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

                {deal.apidata.validityStatus ? <>  
                {/*   nofree */}
                
                {console.log(deal.apidata.validityStatus)}
                  <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={()=>nofreeParticipation(deal , deal.apidata.minimumPaticipationAmount , deal.apidata.lenderParticiptionLimit)}
                      >
                        Participate Now
                      </button></> : <>
                      {/* pay free */}
                      <button
                        className="btn btn-primary"
                        type="submit"
                        onClick={()=>freeParticipation(deal , deal.apidata.minimumPaticipationAmount , deal.apidata.lenderParticiptionLimit)}
                      >
                        Participate Now
                      </button>
                      </>}
                  
                    </Card>
                  </>
                ) : (
                  <></>
                )}

{deal.apidata.feeStatusToParticipate == "OPTIONAL" ? (
                  <>
                  {deal.apidata.groupName == "OXYMARCH09" ? <>
                  <Card
                      size="meddam"
                      title={deal.apidata.groupName ? <>OXY FOUNDING LENDER </> : <></>}
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
                        onClick={()=>nofreeParticipation(deal , deal.apidata.minimumPaticipationAmount , deal.apidata.lenderParticiptionLimit)}
                      >
                        Participate Now
                      </button>
                    </Card>
                  </> : <> </>}
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
                        onClick={()=>nofreeParticipation(deal , deal.apidata.minimumPaticipationAmount , deal.apidata.lenderParticiptionLimit)}
                      >
                        Participate Now
                      </button>
                    </Card>

                    
                  </>
                ) : (
                  <></>
                )}
              </div>
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
