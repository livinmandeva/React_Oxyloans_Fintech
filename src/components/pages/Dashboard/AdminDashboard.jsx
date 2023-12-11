import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import ProgressBar from "react-customizable-progressbar";
import { Link } from "react-router-dom";
import "../Oxyloans/Lender/table.css";
import { Chart as GoogleChart } from "react-google-charts";
import {
  chatapi,
  getDashboardInvestment,
  regular_Api,
  getInterestEarnings,
  getNoDealsParticipated,
} from "../../HttpRequest/afterlogin";
import { Table, Pagination } from "antd";
import { onShowSizeChange, itemRender } from "../../Pagination";
import { fetchData } from "../../Redux/Slice";
import { fetchDatadashboard } from "../../Redux/SliceDashboard";
import { useSelector, useDispatch } from "react-redux";
import useDealActivity from "../../Hooks/useDealActivity";

import {
  awardicon01,
  awardicon04,
  dashboard1,
  dashboard2,
  dashboard3,
  dashboard4,
} from "../../imagepath";
import Footer from "../../Footer/Footer";
import {
  getuserMembershipValidity,
  getUserDetails,
  getactivityApisData,
} from "../../HttpRequest/afterlogin";
import {
  personalDetails,
  personalDetailsInfo,
  validityDatemodal,
} from "../Base UI Elements/SweetAlert";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const getdashboardData = useSelector((data) => data.dashboard.fetchDashboard);
  const getreducerprofiledata = useSelector((data) => data.counter.userProfile);
  // const { activitydata } = useDealActivity();
  const [dashboarddata, setdashboarddata] = useState({
    profileData: "",
  });
  const [membershipdata, setmembershipdata] = useState({
    dashboardData: "",
  });

  // const [dashboardDealActive, setdashboardDealActvity] = useState({
  //   activedeal: 0,
  //   closedDeal: 0,
  //   disbursedDeal: 0,
  // });

  const [regular_runningDeal, setRegularRunningDeal] = useState({
    apidata: "",
    dealtype: "HAPPENING",
    paginationCount: 1,
    pageno: 1,
    apidataESCROW: "",
  });
  const [dashboardInvestment, setdashboardInvestment] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 6,
    defaultPageSize: 4,
  });

  const investmentdashboardPagination = (dats) => {
    setdashboardInvestment({
      ...dashboardInvestment,
      defaultPageSize: dats.pageSize,
      pageNo: dats.current,
      pageSize: dats.pageSize,
    });
  };

  const datasource = [];
  {
    dashboardInvestment.apiData != ""
      ? dashboardInvestment.apiData.lenderWalletHistoryResponseDto.map(
          (data) => {
            datasource.push({
              key: Math.random(),
              Date: data.walletLoaded,
              Description: data.remarks,
              Amount: data.amount,
            });
          }
        )
      : "";
  }

  // Student Chart

  // const googledata = [
  //   [
  //     { type: "date", id: "Date" },
  //     { type: "number", id: "Won/Loss" },
  //   ],
  //   [new Date(2023, 1, 4), 38177],
  //   [new Date(2023, 1, 5), 38705],
  //   [new Date(2023, 1, 12), 38210],
  //   [new Date(2023, 1, 13), 38029],
  //   [new Date(2023, 1, 19), 38823],
  //   [new Date(2023, 1, 23), 38345],
  //   [new Date(2023, 1, 24), 38436],
  //   [new Date(2023, 2, 10), 38447],
  //   [new Date(2023, 11, 10), 38447],
  // ];

  const columns = [
    {
      title: "Date",
      dataIndex: "Date",
      sorter: (a, b) => a.Date - b.Date,
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
    },
    {
      title: "Description",
      dataIndex: "Description",
      sorter: (a, b) => a.Description.length - b.Description.length,
    },
  ];

  useEffect(() => {
    const urlparams = window.location.pathname;
    const urldealname = "regularRunningDeal";
    console.log(urldealname);
    const handleRegular = () => {
      const response = regular_Api(
        regular_runningDeal.dealtype,
        urldealname,
        regular_runningDeal.pageno
      );

      response.then((data) => {
        console.log(data);
        setRegularRunningDeal({
          ...regular_runningDeal,
          apidata: data.data,
        });
      });
    };

    handleRegular();
  }, [regular_runningDeal.pageno]);

  useEffect(() => {
    const response = getDashboardInvestment(
      dashboardInvestment.pageNo,
      dashboardInvestment.pageSize
    );
    response.then((data) => {
      if (data.request.status == 200) {
        setdashboardInvestment({
          ...dashboardInvestment,
          apiData: data.data,
          loading: false,
          hasdata:
            data.data.lenderWalletHistoryResponseDto.length == 0 ? false : true,
        });
      }
    });
    return () => {};
  }, [dashboardInvestment.pageNo, dashboardInvestment.pageSize]);

  useEffect(() => {
    const urlparams = window.location.pathname;
    const urldealname = "ESCROW";
    console.log(urldealname);
    const handleRegular = () => {
      const response = regular_Api(
        regular_runningDeal.dealtype,
        urldealname,
        regular_runningDeal.pageno
      );

      response.then((data) => {
        console.log(data);
        setRegularRunningDeal({
          ...regular_runningDeal,
          apidataESCROW: data.data.listOfBorrowersDealsResponseDto,
        });
      });
    };

    handleRegular();
  }, [regular_runningDeal.pageno]);

  useEffect(() => {
    dispatch(fetchDatadashboard());
    dispatch(fetchData());
    getuserMembershipValidity().then((data) => {
      if (data.request.status == 200) {
        setmembershipdata({
          ...membershipdata,
          dashboardData: data,
        });
        const currentDate = new Date();
        const formattedCurrentDate = currentDate.toISOString().split("T")[0];
        const validityDate = data.data.validityDate;
        console.log(validityDate, formattedCurrentDate);
        if (validityDate >= formattedCurrentDate) {
          console.log("valid");
        } else {
          const skipbutton = localStorage.getItem("skip");
          if (skipbutton) {
            console.log("skip button not clicked");
          } else {
            console.log("validity expires");
            validityDatemodal(validityDate);
          }
        }
      }
    });

    getUserDetails().then((data) => {
      if (data.request.status == 200) {
        setdashboarddata({
          ...dashboarddata,
          profileData: data,
        });
      }
    });
    return () => {};
  }, []);

  useEffect(() => {
    const deatilskip = localStorage.getItem("deatilskip");
    if (deatilskip) {
      console.log("skip the all details alert");
    } else {
      console.log("not the all details alert");

      const profileData = dashboarddata?.profileData?.data;

      if (profileData) {
        const { kycStatus, bankDetailsInfo, personalDetailsInfo } = profileData;

        if (
          kycStatus !== undefined &&
          bankDetailsInfo !== undefined &&
          personalDetailsInfo !== undefined
        ) {
          console.log(kycStatus);
          console.log(bankDetailsInfo);
          console.log(personalDetailsInfo);

          console.log(
            "personalDetails, bankDetailsInfo, and kycStatus available"
          );
        } else {
          console.log("Some information is undefined or not available");
          if (personalDetailsInfo === undefined) {
            personalDetails("personalDetails is not available", "/profile");
          } else if (bankDetailsInfo === undefined) {
            personalDetails("bankdetailsinfo is not available", "/profile");
          } else {
            personalDetails("kyc is not available", "/profile");
          }
        }
      } else {
        console.log("profileData is not available");
      }
    }
  }, [dashboarddata.profileData]);
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
              <div className="row">
                <div className="col-sm-12">
                  <div className="page-sub-header">
                    <h3 className="page-title text-lowercase">
                      Welcome {""}
                      {getreducerprofiledata?.length !== 0
                        ? getreducerprofiledata?.firstName ?? ""
                        : ""}
                      !
                    </h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item active">
                        <Link to="/dashboard">Home</Link>
                      </li>
                      <li className="breadcrumb-item">
                        {" "}
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* /Page Header */}
            {/* Overview Section */}
            <div className="row">
              <div className="col-xl-3 col-sm-6 col-12 d-flex">
                <div className="card bg-comman w-100">
                  <div className="card-body">
                    <div className="db-widgets d-flex justify-content-between align-items-center">
                      <div className="db-info">
                        <h6>Wallet </h6>
                        <h3>
                          {getreducerprofiledata?.length !== 0
                            ? getreducerprofiledata?.lenderWalletAmount -
                              getreducerprofiledata?.holdAmountInDealParticipation -
                              getreducerprofiledata?.equityAmount
                            : ""}
                        </h3>
                      </div>
                      <div className="db-icon">
                        <img
                          src={dashboard3}
                          alt="Dashboard Icon"
                          height={60}
                          width={60}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 d-flex">
                <div className="card bg-comman w-100">
                  <div className="card-body">
                    <div className="db-widgets d-flex justify-content-between align-items-center">
                      <div className="db-info">
                        <h6>Active Deals</h6>
                        <h3>
                          {getdashboardData?.length !== 0
                            ? getdashboardData?.numberOfActiveDealsCount ?? 0
                            : ""}
                        </h3>
                      </div>
                      <div className="db-icon">
                        <img
                          src={dashboard2}
                          alt="Dashboard Icon"
                          height={60}
                          width={60}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 d-flex">
                <div className="card bg-comman w-100">
                  <div className="card-body">
                    <div className="db-widgets d-flex justify-content-between align-items-center">
                      <div className="db-info">
                        <h6>Closed Deals</h6>
                        <h3>
                          {getdashboardData?.length !== 0
                            ? getdashboardData?.numberOfClosedDealsCount ?? 0
                            : ""}
                        </h3>
                      </div>
                      <div className="db-icon">
                        <img
                          src={dashboard1}
                          alt="Dashboard Icon"
                          height={60}
                          width={60}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 d-flex">
                <div className="card bg-comman w-100">
                  <div className="card-body">
                    <div className="db-widgets d-flex justify-content-between align-items-center">
                      <div className="db-info">
                        <h6>Disburse Deals</h6>
                        <h3>
                          {getdashboardData?.length !== 0
                            ? getdashboardData?.numberOfClosedDealsCount +
                              getdashboardData?.numberOfActiveDealsCount
                            : ""}
                        </h3>
                      </div>
                      <div className="db-icon">
                        <img
                          src={dashboard4}
                          alt="Dashboard Icon"
                          height={60}
                          width={60}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 col-lg-12">
                <div className="card">
                  <div className="card-body">
                    <span>
                      <span className="text-bold text-success mx-lg-1">
                        Congratulation :
                      </span>
                      {getreducerprofiledata?.length !== 0
                        ? getreducerprofiledata?.groupName == "NewLender"
                          ? "You are a new lender group, pay the annual membership fee to participate in the multiple deals. "
                          : `You are an ${
                              getreducerprofiledata.groupName == "OXYMARCH09" ||
                              getreducerprofiledata.groupName ==
                                "OxyPremiuimLenders"
                                ? "Oxy Founding Lender"
                                : "NewLender"
                            } group member, and your validity is up to: ${
                              getdashboardData.validityDate
                            }`
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* /Overview Section */}
            <div className="row"></div>
            <div className="row">
              <div className="col-xl-6 d-flex">
                {/* Star Students */}
                <div className="card flex-fill student-space comman-shadow">
                  <div className="card-header d-flex align-items-center">
                    <h5 className="card-title">Investment / Wallet</h5>
                    <ul className="chart-list-out student-ellips">
                      <li className="star-menus">
                        <Link to="#">
                          <i className="fas fa-ellipsis-v" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                        pagination={{
                          total: dashboardInvestment.apiData.countValue,
                          defaultPageSize: dashboardInvestment.defaultPageSize,
                          position: ["topRight"],
                          showSizeChanger: false,
                          onShowSizeChange: onShowSizeChange,
                          size: "default",
                          showLessItems: true,
                          pageSizeOptions: [5, 10, 15, 20],
                          responsive: true,
                        }}
                        columns={columns}
                        expandable={true}
                        dataSource={
                          dashboardInvestment.hasdata ? datasource : []
                        }
                        loading={dashboardInvestment.loading}
                        onChange={investmentdashboardPagination}
                      />
                    </div>
                  </div>
                </div>
                {/* /Star Students */}
              </div>
              <div className="col-xl-6 d-flex">
                {/* Feed Activity */}
                <div className="card flex-fill comman-shadow">
                  <div className="card-header d-flex align-items-center">
                    <h5 className="card-title ">Current Running Deals</h5>
                    <ul className="chart-list-out student-ellips">
                      <li className="star-menus">
                        <Link to="#">
                          <i className="fas fa-ellipsis-v" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="activity-groups">
                      {regular_runningDeal.apidata
                        .listOfDealsInformationToLender &&
                      regular_runningDeal.apidata.listOfDealsInformationToLender
                        .length > 1
                        ? regular_runningDeal.apidata.listOfDealsInformationToLender
                            .slice(0, 4)
                            .map((data, index) => (
                              <div
                                key={`listOfDealsInfo-${index}`}
                                className="activity-awards"
                              >
                                <div className="award-boxs">
                                  <img src={awardicon01} alt="Award" />
                                </div>
                                <div className="award-list-outs">
                                  <h4> {data.dealName}</h4>
                                  <h5>
                                    Min: {data.minimumAmountInDeal}, Max:
                                    {data.paticipationLimitToLenders}, RoI:
                                    {data.rateOfInterest}%
                                  </h5>
                                </div>
                                <div className="award-time-list">
                                  <Link
                                    to={`/participatedeal?dealId=${data.dealId}`}
                                  >
                                    <span>Participate</span>
                                  </Link>
                                </div>
                              </div>
                            ))
                        : regular_runningDeal.apidataESCROW &&
                          regular_runningDeal.apidataESCROW
                            .slice(0, 4)
                            .map((data, index) => (
                              <div
                                key={`listOfDealsInfo-${index}`}
                                className="activity-awards"
                              >
                                <div className="award-boxs">
                                  <img src={awardicon01} alt="Award" />
                                </div>
                                <div className="award-list-outs">
                                  <h4
                                    style={{
                                      fontWeight: "400",
                                      inlineSize: "18rem",
                                    }}
                                    className="textwrap"
                                  >
                                    {data.dealName}
                                  </h4>
                                  <h5>
                                    Min: {data.minimumPaticipationAmount}, Max:
                                    {data.lenderPaticipationAmount}, RoI:
                                    {data.rateOfInterest}%
                                  </h5>
                                </div>
                                <div className="award-time-list">
                                  <Link
                                    to={`/participatedeal?dealId=${data.dealId}`}
                                  >
                                    <span>Participate</span>
                                  </Link>
                                </div>
                              </div>
                            ))}

                      {/* {regular_runningDeal.apidata
                        .listOfDealsInformationToLender &&
                      Array.isArray(
                        regular_runningDeal.apidata
                          .listOfDealsInformationToLender
                      )
                        ? regular_runningDeal.apidataESCROW
                          ? regular_runningDeal.apidata.listOfDealsInformationToLender.map(
                              (data, index) => (
                                <div
                                  key={`listOfDealsInfo-${index}`}
                                  className="activity-awards"
                                >
                                  <div className="award-boxs">
                                    <img src={awardicon01} alt="Award" />
                                  </div>
                                  <div className="award-list-outs">
                                    <h4> {data.dealName}</h4>
                                    <h5>
                                      Min: {data.minimumAmountInDeal}, Max:
                                      {data.lenderPaticipationLimit}, RoI:
                                      {data.rateOfInterest}%{data.repaymentType}
                                    </h5>
                                  </div>
                                  <div className="award-time-list">
                                    <Link
                                      to={`participatedeal?dealId=${data.dealId}`}
                                    >
                                      <span>Participate</span>
                                    </Link>
                                  </div>
                                </div>
                              )
                            )
                          : regular_runningDeal.apidata.listOfDealsInformationToLender
                              .slice(0, 4)
                              .map((data, index) => (
                                <div
                                  key={`listOfDealsInfo-${index}`}
                                  className="activity-awards"
                                >
                                  <div className="award-boxs">
                                    <img src={awardicon01} alt="Award" />
                                  </div>
                                  <div className="award-list-outs">
                                    <h4
                                      style={{
                                        fontWeight: "400",
                                        inlineSize: "18rem",
                                      }}
                                      className="textwrap"
                                    >
                                      {data.dealName}
                                    </h4>
                                    <h5>
                                      Min: {data.minimumAmountInDeal}, Max:{" "}
                                      {data.lenderPaticipationLimit}, RoI:{" "}
                                      {data.rateOfInterest}%{" "}
                                      {data.repaymentType}
                                    </h5>
                                  </div>
                                  <div className="award-time-list">
                                    <Link
                                      to={`participatedeal?dealId=${data.dealId}`}
                                    >
                                      <span>Participate</span>
                                    </Link>
                                  </div>
                                </div>
                              ))
                        : "No running deals are available."} */}
                    </div>
                  </div>
                </div>
                {/* /Feed Activity */}
              </div>
            </div>
          </div>
          {/* Footer */}
          <Footer />
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default AdminDashboard;
