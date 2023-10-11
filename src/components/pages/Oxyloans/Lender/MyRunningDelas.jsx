import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { Pagination } from "antd";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { itemRender } from "../../../Pagination";
import "./InvoiceGrid.css";
import {
  myrunnig,
  paticipationChanges1,
  viewdealamountemi,
} from "../../../HttpRequest/afterlogin";
import Modall from "./Modall";
import Modell from "./Modell";
import AlertTable from "./AlertTable";
import ModalComponet from "../../Base UI/ModalComponet";

const MyRunningDelas = () => {
  const [runningdeals, setrunningdeals] = useState({
    data: "",
    modelopen: false,
    paticipationChanges: "",
    dealID: "",
    isModalVisible: false,
    principal_return_account_type: false,
    dealLevelLoanEmiCard: "",
    model2: false,
    principalPayout: true,
  });
  const [modelopen, setOpen] = useState(false);

  const handlemodalopen = (dealId) => {
    const response = viewdealamountemi(dealId);
    console.log(response);
    response.then((data) => {
      setrunningdeals({
        ...runningdeals,
        dealLevelLoanEmiCard: data,
      });
    });
    setOpen(!modelopen);
  };

  const principal_return_account_type = (type, dealId) => {
    setrunningdeals({
      ...runningdeals,
      principalPayout: type == "BANKACCOUNT" ? "WALLET" : "BANKACCOUNT",
      isModalVisible: !runningdeals.isModalVisible,
      dealID: dealId,
    });
  };

  const handleDataFromChild = (data) => {
    setrunningdeals({
      ...runningdeals,
      isModalVisible: !runningdeals.isModalVisible,
    });
  };

  const paticipationChanges = (dealId) => {
    const response = paticipationChanges1(dealId);
    response.then((data) => {
      localStorage.setItem("paticipationChanges", data.data);
      console.log(data.data);
      setrunningdeals({
        ...runningdeals,
        paticipationChanges: data.data,
        model2: !runningdeals.model2,
        // model2: !runningdeals.model2,
      });
    });
  };

  const handleDataFromStatement = (data) => {
    setrunningdeals({
      ...runningdeals,
      model2: !runningdeals.model2,
    });
  };

  useEffect(() => {
    const response = myrunnig(runningdeals);
    response.then((data) => {
      console.log(data);
      setrunningdeals({
        ...runningdeals,
        data: data.data.lenderPaticipatedResponseDto,
      });
    });
  }, []);
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
                  <h3 className="page-title">Participated & Closed Deals </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">My running delas</li>

                    {modelopen && (
                      <Modall
                        data={runningdeals.dealLevelLoanEmiCard}
                        open={modelopen}
                      />
                    )}

                    {runningdeals.model2 && (
                      <AlertTable
                        data={runningdeals.paticipationChanges}
                        open={runningdeals.model2}
                        sendRunningDealStatement={handleDataFromStatement}
                      />
                    )}
                    {runningdeals.isModalVisible && (
                      <ModalComponet
                        data={`Are You Sure, you want to move the principal amount to ${runningdeals.principalPayout.toLowerCase()}`}
                        heading={"Payout conformation !"}
                        sendDataToParent={handleDataFromChild}
                        dealIdInfo={runningdeals.dealID}
                        trasferMethod={runningdeals.principalPayout}
                      />
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {Array.isArray(runningdeals.data) ? (
              <>
              <div className="pangnation">
                <Pagination
                  defaultCurrent={1}
                  total={50}
                  className="pull-right"
                />
                </div>
                {runningdeals.data.map((data, index) => (
                  <div className="row" key={index}>
                    <>
                      <div className="card invoices-tabs-card border-0">
                        <div className="card-body card-body pt-0 pb-0">
                          <div className="invoices-main-tabs border-0 pb-0"></div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12 col-lg-12 col-xl-12 col-12 my-lg-2">
                          <div className="card invoices-grid-card w-100">
                            <div className="card-header row">
                              <Link
                                to="#"
                                className="invoice-grid-link col-sm-12 col-lg-4"
                              >
                                Deal Name: {data.dealName}{" "}
                                {localStorage.setItem("dealID", data.dealId)}
                              </Link>

                              <div className="col-sm-12 col-lg-2">
                                RoI :{data.rateOfInterest} %
                              </div>
                              <div className="col-sm-12 col-lg-3">
                                Tenure : {data.dealDuration} M
                              </div>
                              <div className="col-auto col-lg-3">
                                Participated : INR {data.paticipatedAmount}
                              </div>
                              {/* <div>Status : Open</div> */}
                            </div>
                            <div className="card-middle row">
                              <div className="col-sm-12 col-lg-6">
                                <h6>Deal Type : {data.dealType}</h6>
                                <h6>
                                  First Interest : {data.firstInterestDate}
                                </h6>
                                <h6>
                                  Participated Date :{" "}
                                  {data.firstParticipationDate}
                                </h6>
                              </div>
                              <div className="col-sm-12 col-lg-6">
                                <small>
                                  Comments : {data.messageSentToLenders}
                                </small>
                              </div>
                            </div>
                            <div className="card-body">
                              <div className="row align-items-center">
                                <div className="col-sm-6 col-lg-2">
                                  <span>Deal-ID </span>
                                  <h6 className="mb-0">{data.dealId}</h6>
                                </div>
                                {data.interestEarned != null ? (
                                  <div className="col-sm-6 col-lg-2">
                                    <span>Interest Earned</span>
                                    <h6 className="mb-0">
                                      INR {data.interestEarned}
                                    </h6>
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div className="col-sm-6 col-lg-2">
                                  <span>Payout Type </span>
                                  <h6 className="mb-0">
                                    {data.lederReturnType}
                                  </h6>
                                </div>
                                <div className="col-sm-6 col-lg-2">
                                  <span>Is ATW</span>
                                  <h6 className="mb-0">
                                    {data.withdrawStatus}
                                  </h6>
                                </div>

                                {/* <div className="col-sm-6 col-lg-2">
                                <span>ATW ROI</span>
                                <h6 className="mb-0">
                                  {data.dealRateofinterest} %
                                </h6>
                              </div> */}

                                <div className="col-sm-6 col-lg-2">
                                  <span>Deal Status</span>
                                  <h6 className="mb-0">
                                    {" "}
                                    {data.participationStatus}
                                  </h6>
                                </div>

                                <div className="col-sm-6 col-lg-2">
                                  <span>Principal Payout</span>
                                  <h6 className="mb-0">{data.accountType}</h6>
                                </div>
                              </div>
                            </div>
                            <div className="card-footer">
                              <div className="row align-items-center">
                                <div className="col-auto">
                                  <span
                                    className="badge bg-success-dark"
                                    type="button"
                                    onClick={() => {
                                      paticipationChanges(data.dealId);
                                    }}
                                  >
                                    Participation Details
                                  </span>
                                </div>

                                <div className="col-auto">
                                  <span
                                    type="button"
                                    className="badge bg-primary-dark"
                                    onClick={() => handlemodalopen(data.dealId)}
                                  >
                                    View Statement
                                  </span>
                                </div>

                                <div className="col-auto">
                                  <a
                                    href={data.groupLink}
                                    target="_blank"
                                    className="badge bg-success"
                                  >
                                    <i className="fa fa-whatsapp"></i> Join Deal
                                  </a>
                                </div>

                                <div className="col-auto">
                                  <Link
                                    className="badge bg-danger"
                                    to={`/writetous?dealName=${data.dealName}&&dealId=${data.dealId}`}
                                  >
                                    Raise A query
                                  </Link>
                                </div>

                                <div className="col-auto">
                                  <span
                                    type="button"
                                    className="badge bg-info"
                                    onClick={() =>
                                      principal_return_account_type(
                                        data.accountType,
                                        data.dealId
                                      )
                                    }
                                  >
                                    Edit PayOut
                                  </span>
                                </div>

                                <div className="col-auto">
                                  <span className="badge bg-success-dark">
                                    Participate
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>

                    {/* Your card component and content */}
                  </div>
                ))}
              </>
            ) : (
              <p>No data available</p>
            )}
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>
    </>
  );
};

export default MyRunningDelas;
