import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import ProgressBar from "react-customizable-progressbar";
import { Link } from "react-router-dom";
import "../Oxyloans/Lender/table.css";

import {
  getDashboardInvestment,
  regular_Api,
  getNoDealsParticipated,
} from "../../HttpRequest/afterlogin";
import { Table } from "antd";
import { onShowSizeChange } from "../../Pagination";
import { fetchData } from "../../Redux/Slice";
import { fetchDatadashboard } from "../../Redux/SliceDashboard";
import { useSelector, useDispatch } from "react-redux";
// import useDealActivity from "../../Hooks/useDealActivity";

import {
  awardicon01,
  dashboard1,
  dashboard2,
  dashboard3,
  dashboard4,
  rightclickmark,
} from "../../imagepath";
import Footer from "../../Footer/Footer";
import {
  getuserMembershipValidity,
  getUserDetails,
  getactivityApisData,
} from "../../HttpRequest/afterlogin";
import { personalDetails } from "../Base UI Elements/SweetAlert";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const getdashboardData = useSelector((data) => data.dashboard.fetchDashboard);
  const getreducerprofiledata = useSelector((data) => data.counter.userProfile);

  const [dashboarddata, setdashboarddata] = useState({
    profileData: "",
  });
  const [membershipdata, setmembershipdata] = useState({
    dashboardData: "",
    ismembershiptrue: "",
    isnewlender: false,
  });

  const [dashboardDealActive, setdashboardDealActvity] = useState({
    activedeal: 0,
    closedDeal: 0,
    disbursedDeal: 0,
  });
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

  const [dashboardcarddata , setdashboardcarddata]=useState({})

  const [dealsProgressed, setdealsProgressed] = useState({
    totalDeals: 0,
    participatedDeals: 0,
    percentage: 0,
  });

  const [treemap, Settreemap] = useState({
    series: [
      {
        name: "",
        data: [
          dashboardDealActive.activedeal,
          dashboardDealActive.closedDeal,
          dashboardDealActive.disbursedDeal,
        ],
        color: "#664DC9",
      },
    ],
  
    options: {
      chart: {
        height: 350,
        type: "bar",
        zoom: {
          enabled: false,
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },

      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: ["Active  Amount ", "Closed  Amount", "Total  Amount "],
      },
    },
  });

  const columns = [
    {
      title: "Date",
      dataIndex: "Date",
      sorter: (a, b) => new Date(a.Date) - new Date(b.Date),
    },

    {
      title: "Description",
      dataIndex: "Description",
      sorter: (a, b) => a.Description.length - b.Description.length,
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
    },
  ];

  useEffect(() => {
    const urlparams = window.location.pathname;
    const urldealname = "regularRunningDeal";

    const handleRegular = () => {
      const response = regular_Api(
        regular_runningDeal.dealtype,
        urldealname,
        regular_runningDeal.pageno
      );

      response.then((data) => {
        setRegularRunningDeal({
          ...regular_runningDeal,
          apidata: data.data,
        });
      });
    };

    handleRegular();
  }, [regular_runningDeal.pageno]);

  useEffect(() => {
    const urlparams = window.location.pathname;
    const urldealname = "ESCROW";

    const handleRegular = () => {
      const response = regular_Api(
        regular_runningDeal.dealtype,
        urldealname,
        regular_runningDeal.pageno
      );

      response.then((data) => {
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
        const validitydate = new Date(data.data?.validityDate);
        var next_date = new Date();
        const diffTime = Math.abs(validitydate - next_date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const validityDatecheck =
          validitydate > next_date && data.data?.validityDate !== null;

        setmembershipdata({
          ...membershipdata,
          dashboardData: data,
          ismembershiptrue: validityDatecheck,
        });
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
    const activeres = getactivityApisData();
    activeres.then((data) => {
      if (data.request.status == 200) {

        setdashboardcarddata(data.data)
        Settreemap({
          ...treemap,
          series: [
            {
              name: "",
              data: [
                data.data.activeDealsAmount,
                data.data.closedDealsAmount,
                data.data.disbursedDealsAmount,
              ],
              color: "#664DC9",
            },
          ],
        });
      }
    });
    return () => {};
  }, []);

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
    const response = getNoDealsParticipated();
    response.then((data) => {
      if (data.request.status == 200) {
        setdealsProgressed({
          ...dealsProgressed,
          totalDeals: data.data.dealCount,
          participatedDeals: data.data.participationCount,
          percentage:
            (data.data.participationCount / data.data.dealCount) * 100,
        });
      }
    });
    return () => {};
  }, []);

  useEffect(() => {
    const profileskip = localStorage.getItem("profileskip");
    if (profileskip) {
    } else {
      const profileData = dashboarddata?.profileData?.data;
      if (profileData) {
        const { kycStatus, bankDetailsInfo, personalDetailsInfo, groupName } =
          profileData;
        const isvalidity = membershipdata.ismembershiptrue;

        if (
          kycStatus == false &&
          bankDetailsInfo == true &&
          personalDetailsInfo == true
        ) {
          personalDetails(
            "Attention: Update Your Personal Details for Enhanced Services and Security. ",
            "/profile"
          );
        } else if (
          kycStatus == true &&
          bankDetailsInfo == true &&
          personalDetailsInfo == false
        ) {
          personalDetails(
            "Kindly provide/update your bank information,",
            "/profile"
          );
        } else if (
          kycStatus == true &&
          bankDetailsInfo == true &&
          personalDetailsInfo == false
        ) {
          personalDetails(
            " Kindly provide/update your personal Information",
            "/profile"
          );
        } else if (
          kycStatus == false &&
          bankDetailsInfo == false &&
          personalDetailsInfo == false
        ) {
          personalDetails(
            "Personal details are currently unavailable. Kindly provide/update your bank information, nominee details, and complete the KYC process ",
            "/profile"
          );
        } else if (
          kycStatus == true &&
          bankDetailsInfo == true &&
          personalDetailsInfo == true &&
          isvalidity == false
        ) {
          const skipbutton = localStorage.getItem("skip");
          // if (skipbutton) {
          // } else {
          //   validityDatemodal(getdashboardData?.validityDate, groupName);
          // }
        }
      }
    }
    return () => {};
  }, [dashboarddata.profileData, membershipdata.ismembershiptrue]);

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
                    <h3 className="page-title">
                      Welcome {""}
                      {getreducerprofiledata?.length !== 0
                        ? getreducerprofiledata?.firstName
                            .charAt(0)
                            .toUpperCase() +
                            getreducerprofiledata?.firstName
                              .slice(1)
                              .toLowerCase() ?? ""
                        : ""}
                    </h3>
     
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
                  <Link to="/myRunningDeals">
                    <div className="card-body">
                      <div className="db-widgets d-flex justify-content-between align-items-center">
                        <div className="db-info">
                          <h6>Active Deals</h6>
                          <h3>
                            {getdashboardData?.length !== 0
                              ? getdashboardData?.numberOfActiveDealsCount ?? 0
                              : ""}
                          </h3>
                          <span className="badge bg-success  mt-2">INR {dashboardcarddata?.length !== 0
                              ? dashboardcarddata?.activeDealsAmount ?? 0
                              : ""}</span>
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
                  </Link>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 d-flex">
                <div className="card bg-comman w-100">
                  <Link to="/myclosedDeals">
                    <div className="card-body">
                      <div className="db-widgets d-flex justify-content-between align-items-center">
                        <div className="db-info">
                          <h6>Closed Deals</h6>
                          <h3>
                            {getdashboardData?.length !== 0
                              ? getdashboardData?.numberOfClosedDealsCount ?? 0
                              : ""}
                          </h3>
                          <span className="badge bg-warning mt-2">INR  {dashboardcarddata?.length !== 0
                              ? dashboardcarddata?.closedDealsAmount ?? 0
                              : ""} </span>   
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
                  </Link>
                </div>
              </div>
              <div className="col-xl-3 col-sm-6 col-12 d-flex">
                <div className="card bg-comman w-100">
                  <div className="card-body">
                    <div className="db-widgets d-flex justify-content-between align-items-center">
                      <div className="db-info">
                        <h6>Total Deals</h6>
                        <h3>
                          {getdashboardData?.length !== 0
                            ? getdashboardData?.numberOfClosedDealsCount +
                              getdashboardData?.numberOfActiveDealsCount
                            : ""}
                        </h3>

                        <span className="badge bg-success mt-2">INR {dashboardcarddata?.length !== 0
                              ? dashboardcarddata?.disbursedDealsAmount ?? 0
                              : ""}</span>
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
                        Subscription Validity:
                      </span>
                      {getreducerprofiledata?.length !== 0 &&
                        (getreducerprofiledata?.groupName === "NewLender" ? (
                          <span>
                            You are a new lender, pay the annual membership fee
                            to participate in the multiple deals
                            <span className="badge bg-info mx-2">
                              <Link to="/membership" className="text-white">
                                Get Membership
                              </Link>
                            </span>
                          </span>
                        ) : (
                          <span>
                            {getdashboardData?.validityDate &&
                              `Active until ${getdashboardData?.validityDate}`}{" "}
                            <span className="badge bg-info mx-2">
                              <Link to="/membership" className="text-white">
                                Get Membership
                              </Link>
                            </span>
                          </span>
                        ))}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* /Overview Section */}
            <div className="row">
              <div className="col-md-12 col-lg-6 ">
                {/* Student Chart */}
                <div className="card card-chart">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h6 className="card-title">Deals Amount Monitor</h6>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="apexcharts-area"></div>
                    <Chart
                      options={treemap.options}
                      series={treemap.series}
                      type="bar"
                      className="activechart"
                    />
                  </div>
                </div>

                {/* /Student Chart */}
              </div>

              <div className="col-12 col-lg-4 col-xl-6 d-flex">
                <div className="card flex-fill comman-shadow">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-12">
                        <h5 className="card-title text-center">
                          Participated vs Created In System
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="dash-widget d-flex justify-content-center align-items-center">
                    <div className="circle-bar circle-bar">
                      <ProgressBar
                        width={270}
                        radius={75}
                        progress={dealsProgressed.percentage}
                        rotate={-180}
                        strokeWidth={10}
                        strokeColor="#70C4CF"
                        strokeLinecap="square"
                        trackStrokeWidth={8}
                        trackStrokeColor="#e6e6e6"
                        trackStrokeLinecap="square"
                        pointerRadius={0}
                        initialAnimation={true}
                        transition="1.5s ease 0.5s"
                        trackTransition="0s ease"
                      >
                        <div className="circle-graph1" data-percent="50">
                          <div className="progress-less teacher-dashboard">
                            <h4>
                              {`${
                                getdashboardData?.numberOfClosedDealsCount +
                                getdashboardData?.numberOfActiveDealsCount
                              }/${dealsProgressed.totalDeals}`}
                            </h4>
                            <p>Deals </p>
                          </div>
                        </div>
                      </ProgressBar>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-12 d-flex">
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
              {regular_runningDeal.apidata?.listOfDealsInformationToLender
                ?.length > 0 ? (
                <div className="col-xl-12 d-flex">
                  {/* Feed Activity */}
                  <div className="card flex-fill comman-shadow">
                    <div className="card-header d-flex align-items-center">
                      <h5 className="card-title ">Ongoing Deals</h5>
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
                        regular_runningDeal.apidata
                          .listOfDealsInformationToLender.length > 0
                          ? regular_runningDeal.apidata.listOfDealsInformationToLender
                              .slice(0, 4)
                              .map((data, index) => (
                                <div
                                  key={`listOfDealsInfo-${index}`}
                                  className="activity-awards"
                                >
                                  <div className="award-boxs">
                                    <img src={rightclickmark} alt="Award" />
                                  </div>
                                  <div className="award-list-outs">
                                    <h4> {data.dealName}</h4>
                                    <h5>
                                      Min: {data.minimumAmountInDeal}, Max:
                                      {data.lenderPaticipationLimit}, RoI:
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
                                      Min: {data.minimumPaticipationAmount},
                                      Max:
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
                      </div>
                    </div>
                  </div>
                  {/* /Feed Activity */}
                </div>
              ) : (
                ""
              )}
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
