import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { regular_Api } from "../../../HttpRequest/afterlogin";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { Table } from "antd";

const RegularRunningDeal = () => {
  const [regular_runningDeal, setRegularRunningDeal] = useState({
    apidata: "",
    dealtype: "HAPPENING",
  });

  const dataSource = [];

  regular_runningDeal.apidata !="" ? 
dataSource.push({
    name: regular_runningDeal.apidata.dealName,
    loanamount:regular_runningDeal.apidata.dealAmount,
    availablelimit:regular_runningDeal.apidata.remainingAmountInDeal,
    tenureinmonths: regular_runningDeal.apidata.duration,
    funding:regular_runningDeal.apidata.fundStartDate,
    fundingdate:regular_runningDeal.apidata.fundEndDate,
    minimumparticipation:regular_runningDeal.apidata.minimumPaticipationAmount,
    maximumparticipation:regular_runningDeal.apidata.lenderParticiptionLimit,

}) : null
const columns = [
  {
    title: 'Deal Info',
    dataIndex: 'Deal Info',
    key: 'deal',
  },
  {
    title: 'Participation Details',
    dataIndex: 'loanamount',
    key: 'loanamount',
  },
  {
    title: 'Duration & Time Limits',
    dataIndex: 'availablelimit',
    key: 'availablelimit',
  },
  {
    title: 'ROI & Withdrawal Details',
    dataIndex: 'tenureinmonths',
    key: 'tenureinmonths',
  },
  {
    title: 'Participate',
    dataIndex: 'funding',
    key: 'funding',
  },
];


  useEffect(() => {
    const urlparams = window.location.pathname;
    const urldealname = urlparams.slice(1);
    console.log(urldealname);
    const handleRegular = () => {
      const response = regular_Api(regular_runningDeal.dealtype, urldealname);

      response.then((data) => {
        console.log(data.data);

        setRegularRunningDeal({
          ...regular_runningDeal,
          apidata: data.data,
        });
      });
    };

    handleRegular();
  }, []); // Include urldealname as a dependency

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
                  <h3 className="page-title">Running & Closed Deals</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Running & Closed Deals{" "}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Invoice Header */}

            <div className="card report-card">
              <div className="card-body h-10">
                <div className="row">
                  <Link
                    to="/myclosedDeals"
                    className="btn btn-warning col-lg-3 col-sm-6"
                  >
                    Regular Closed Delas
                  </Link>
                  <Link
                    to="/myRunningDelas"
                    className="btn btn-success col-lg-3 col-sm-6  mx-lg-2"
                  >
                    My Participated Delas
                  </Link>
                </div>
              </div>
            </div>
            {regular_runningDeal.apidata.listOfDealsInformationToLender && (
              <>
                {console.log(regular_runningDeal.apidata)}

                {regular_runningDeal.apidata.listOfDealsInformationToLender !==
                ""
                  ? regular_runningDeal.apidata.listOfDealsInformationToLender.map(
                      (data, index) => (
                        <div className="row" key={index}>
                          <div className="col-sm-12 col-lg-12 col-xl-12 col-12 my-lg-2">
                            <div className="card invoices-grid-card w-100 h-25">
                              <div className="card-header row">
                                <Link
                                  to="/viewinvoice"
                                  className="invoice-grid-link col-sm-12 col-lg-4"
                                >
                                  Deal Name: {data.dealName}
                                </Link>

                                <div className="col-sm-12 col-lg-2">
                                  RoI : {data.rateOfInterest} %
                                </div>
                                <div className="col-sm-12 col-lg-3">
                                  Tenure : {data.duration} Months
                                </div>
                                <div className="col-auto col-lg-3">
                                  Deal Value : {data.dealAmount}
                                </div>
                                {/* <div>Status : Open</div> */}
                              </div>
                              <div className="card-middle row">
                                <div className="col-sm-12 col-lg-6">
                                  <h6>
                                    Deal Opened Time :{" "}
                                    {data.fundsAcceptanceStartDate}
                                  </h6>
                                  <h6>
                                    Deal Closing Time :{" "}
                                    {data.fundsAcceptanceEndDate}
                                  </h6>
                                  <h6>
                                    First Participation :{" "}
                                    {data.firstParticipationDate}
                                  </h6>
                                  <h6>
                                    Last Participation :{" "}
                                    {data.lastParticipationDate}
                                  </h6>
                                </div>
                                <div className="col-sm-12 col-lg-6">
                                  <small>
                                    Comments : ATW - Any Time Withdraw We
                                    understand lenders wish to withdraw funds in
                                    between the deal tenure, So if you want to
                                    withdraw funds anytime Monthly RoI will be
                                    reduced to 1.2% from the day 1 of deal
                                    participation. We take 30 days to release
                                    the funds.
                                  </small>
                                </div>
                              </div>
                              <div className="card-body">
                                <div className="row align-items-center">
                                  <div className="col-sm-6 col-lg-2">
                                    <span>Available Limit</span>
                                    <h6 className="mb-0">500000</h6>
                                  </div>
                                  <div className="col-sm-6 col-lg-2">
                                    <span>Min Amount</span>
                                    <h6 className="mb-0">
                                      {data.minimumAmountInDeal}
                                    </h6>
                                  </div>
                                  <div className="col-sm-6 col-lg-2">
                                    <span>Max Amount</span>
                                    <h6 className="mb-0">
                                      {data.lenderPaticipationLimit}
                                    </h6>
                                  </div>
                                  <div className="col-sm-6 col-lg-2">
                                    <span>ATW</span>
                                    <h6 className="mb-0">
                                      {data.withdrawStatus}
                                    </h6>
                                  </div>
                                  <div className="col-sm-6 col-lg-2">
                                    <span>ATW ROI</span>
                                    <h6 className="mb-0">
                                      {data.roiForWithdraw} %
                                    </h6>
                                  </div>

            <div className="col-sm-6 col-lg-2">
              <span>Deal Status</span>
              <h6 className="mb-0">{data.fundingStatus}</h6>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="row align-items-center">
            <div className="col-auto">
              <Link to={`participatedeal?dealId=${data.dealId}`} className="badge bg-success-dark">
                Participate
              </Link>
            </div>

                                  <div className="col-auto">
                                    <a
                                      href={data.dealLink}
                                      className="badge bg-primary-dark"
                                      target="_blank"
                                    >
                                      View Borrower Documents
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* 
    <div className="col-lg-12">
      <div className="invoice-load-btn">
        <Link to="#" className="btn">
          <span className="spinner-border text-primary" /> Load more
        </Link>
      </div>
    </div> */}
                        </div>
                      )
                    )
                  : null}
              </>
            )}

            {regular_runningDeal.apidata.listOfBorrowersDealsResponseDto && (
              <>
              <div className="card">
              <Table dataSource={dataSource} columns={columns} />
              </div>
                {console.log(
                  regular_runningDeal.apidata.listOfBorrowersDealsResponseDto
                )
                }{" "}
              </>
            )}
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default RegularRunningDeal;
