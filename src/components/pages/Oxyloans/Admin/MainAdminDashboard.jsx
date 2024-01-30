import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

import { Link } from "react-router-dom";
import "../../Oxyloans/Lender/table.css";

import {
  chatapi,
  getDashboardInvestment,
  regular_Api,
  getInterestEarnings,
  getNoDealsParticipated,
  lenderTotalInvestmentsAndReturns,
} from "../../../HttpRequest/afterlogin";
import { Table, Pagination, Card } from "antd";
import { onShowSizeChange } from "../../../Pagination";
import { fetchData } from "../../../Redux/Slice";
import { fetchDatadashboard } from "../../../Redux/SliceDashboard";
import { useSelector, useDispatch } from "react-redux";
import useDealActivity from "../../../Hooks/useDealActivity";

import {
  awardicon01,
  awardicon04,
  dashboard1,
  dashboard2,
  dashboard3,
  dashboard4,
} from "../../../imagepath";
import Footer from "../../../Footer/Footer";
import {
  getuserMembershipValidity,
  getUserDetails,
  getactivityApisData,
} from "../../../HttpRequest/afterlogin";
import {
  dealmembership,
  newlendersweetalert,
  personalDetails,
  personalDetailsInfo,
  validityDatemodal,
} from "../../Base UI Elements/SweetAlert";
// import Header from "../../../Header/Header";
import AdminSidebar from "../../../SideBar/AdminSidebar";
import AdminHeader from "../../../Header/AdminHeader";
import { handlegetdashboardcarddeatilsapi } from "../../../HttpRequest/admin";

const MainAdminDashboard = () => {
  const dispatch = useDispatch();
  const getdashboardData = useSelector((data) => data.dashboard.fetchDashboard);
  const getreducerprofiledata = useSelector((data) => data.counter.userProfile);
  const { activitydata } = useDealActivity();
  const [dashboarddata, setdashboarddata] = useState({
    profileData: "",
  });
  const [membershipdata, setmembershipdata] = useState({
    dashboardData: "",
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

  useEffect(() => {}, []);
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

  const [newlender, setnewlender] = useState(false);

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

  const [data, setObject] = useState({
    chart: {
      height: 350,
      type: "line",
      toolbar: {
        show: false,
      },
      fill: false,
    },
    dataLabels: {
      enabled: false,
    },
    datasets: {
      id: "apaxcharts-line",
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#3D5EE1", "#70C4CF"],
    borderWidth: 3,
    labels: ["2020-21", "2021-22", "2022-23", "2023-24"],
  });
  const [series, setSeries] = useState([
    {
      name: "Investment",
      data: [],
    },
    {
      name: "Total Returns",
      data: [],
    },
  ]);

 

  // Student Chart





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
        categories: ["Active Deals", "Closed Deals", "Disbursed Deals"],
      },
    },
  });


  const  [mainadmindashboarddata , setmainadmindashboarddata]=useState({})
  const [investmentTotalEaring, setinvestmentTotalEaring] = useState({
    series: [
      {
        name: "Principal Return",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 70, 62, 66],
      },
      {
        name: "Interest Earning",
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 80, 61, 69],
      },
      {
        name: "Referal Earning",
        data: [35, 41, 36, 26, 45, 48, 52, 53, 41, 92, 88, 66],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      colors: ["#237abf", "#5c9b45", "#93B1A6"],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        // title: {
        //   text: " My Interest vs Principal vs Earning",
        // },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  });

  const [noofdeals, setnoofdeals] = useState({
    series: [
      {
        name: "Investment ",
        data: [10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      {
        name: "Interest Earnings",
        data: [50, 32, 33, 52, 13, 43, 32, 41, 37, 22, 43, 21],
      },
      {
        name: "Principal Returned",
        data: [90, 17, 11, 9, 15, 11, 20, 41, 37, 22, 43, 21],
      },
      {
        name: "Referral Earnings",
        data: [80, 7, 5, 8, 6, 9, 4, 41, 37, 22, 43, 21],
      },
      {
        name: "Total Earnings",
        data: [96, 12, 19, 32, 25, 24, 10, 41, 37, 22, 43, 21],
      },
    ],
    options: {
      colors: ["#AEC3AE", "#EAC696", "#EEE0C9", "#ADC4CE", "#96B6C5"],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          verticial: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
            },
          },
        },
      },
      stroke: {
        width: 1,
      },
      title: {
        text: "",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          formatter: function (val) {
            return val;
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: -20,
      },
    },
  });


  const columns = [
    {
      title: "Loan ID",
      dataIndex: "Date",
      sorter: (a, b) => a.Date - b.Date,
    },
    {
      title: "AppID",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
    },
    {
      title: "Amount",
      dataIndex: "Description",
      sorter: (a, b) => a.Description.length - b.Description.length,
    },
    {
      title: "Agreement Status",
      dataIndex: "Description",
      sorter: (a, b) => a.Description.length - b.Description.length,
    },
  ];



  useEffect(() => {
    const handlegetdashboardcarddeatils = async () => {
      try {
        const response = await handlegetdashboardcarddeatilsapi(); // Assuming handlegetdashboardcarddeatilsapi() is an async function that fetches data
        console.log(response);setmainadmindashboarddata(response.data)

      } catch (error) {
        console.log("error:", error); // Log the specific error
      }
    };
    handlegetdashboardcarddeatils(); // Call the function to fetch data
  }, []);
   // Empty dependency array means this effect will run only once after the initial render
  
  
  useEffect(() => {}, []);
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <AdminHeader />

        {/* Sidebar */}
        <AdminSidebar />

        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <div className="page-sub-header">
                    <h3 className="page-title text-capitalize">
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
                        <h6>REGISTERED USERS </h6>
                        <h3>
                          {mainadmindashboarddata.registeredUsersCount}
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
                        <h6>Lenders</h6>
                        <h3>
                        {mainadmindashboarddata.lendersCount}
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
                        <h6>Borrowers</h6>
                        <h3>
                        {mainadmindashboarddata.borrowersCount}
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
                        <h6>TODAY'S REGISTERD</h6>
                        <h3>
                        {mainadmindashboarddata.todayRegisteredUsersCount}
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
                      {/* {getreducerprofiledata?.length !== 0 ? (
                        getreducerprofiledata?.groupName === "NewLender" ? (
                          <>
                            You are a new lender group, pay the annual
                            membership fee to participate in multiple deals.
                          </>
                        ) : (
                          `You are an ${
                            getreducerprofiledata.groupName === "OXYMARCH09" ||
                            getreducerprofiledata.groupName ===
                              "OxyPremiuimLenders"
                              ? "Oxy Founding Lender"
                              : "NewLender"
                          } group member, and your validity is up to: ${
                            getdashboardData.validityDate
                          }`
                        )
                      ) : (
                        ""
                      )} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* /Overview Section */}
            <div className="row ">
              <div className="col-md-12 col-lg-12 d-none">
                {/* Student Chart */}
                <div className="card card-chart">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <h6 className="card-title">Latest loan Agreements </h6>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="apexcharts-area"></div>
                    <Chart
                      options={investmentTotalEaring.options}
                      series={investmentTotalEaring.series}
                      type="bar"
                      height={350}
                    />
                  </div>
                </div>

                {/* /Student Chart */}
              </div>

              <div className="col-md-12 col-lg-12" style={{ display: "none" }}>
                {/* Student Chart */}
                <div className="card card-chart">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <h6 className="card-title">My Activities : 2023</h6>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="apexcharts-area"></div>
                    <Chart
                      options={noofdeals.options}
                      series={noofdeals.series}
                      type="bar"
                      height={420}
                    />
                  </div>
                </div>

                {/* /Student Chart */}
              </div>
            </div>
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
                    <h5 className="card-title ">
                      Current Month EMIs Information
                    </h5>
                    <ul className="chart-list-out student-ellips">
                      <li className="star-menus">
                        <Link to="#">
                          <i className="fas fa-ellipsis-v" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    <div className="activity-groups" style={{ gap: "10px" }}>
                      No of EMI processed
                      <div
                        class="progress mt-2"
                        role="progressbar"
                        aria-label="Success example"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          class="progress-bar bg-success"
                          style={{ width: "25%" }}
                        >
                          25%
                        </div>
                      </div>
                      No of EMI Not processed
                      <div
                        class="progress  mt-2"
                        role="progressbar"
                        aria-label="Success example"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          class="progress-bar bg-success"
                          style={{ width: "50%" }}
                        >
                          50%
                        </div>
                      </div>
                      Amount Not Received
                      <div
                        class="progress  mt-2"
                        role="progressbar"
                        aria-label="Success example"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          class="progress-bar bg-success"
                          style={{ width: "75%" }}
                        >
                          25%
                        </div>
                      </div>
                      Earned Amount
                      <div
                        class="progress  mt-2"
                        role="progressbar"
                        aria-label="Success example"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          class="progress-bar bg-success"
                          style={{ width: "25%" }}
                        >
                          25%
                        </div>
                      </div>
                      No OF EMIS pending
                      <div
                        class="progress  mt-2"
                        role="progressbar"
                        aria-label="Success example"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          class="progress-bar bg-success"
                          style={{ width: "25%" }}
                        >
                          25%
                        </div>
                      </div>
                      Earned Amount
                      <div
                        class="progress  mt-2"
                        role="progressbar"
                        aria-label="Success example"
                        aria-valuenow="25"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          class="progress-bar bg-success"
                          style={{ width: "25%" }}
                        >
                          25%
                        </div>
                      </div>
                      <br></br>
                      <hr></hr>
                      <div className="card-div">
                        <div className="col">
                          <div className="cardsmall">
                            <p>
                              <strong>15</strong>
                            </p>
                          </div>

                          <Card style={{ width: 100 }}>
                            <p className="cardpara">Users</p>
                            <p className="cardpara">₹ 5000</p>
                            <p className="cardpara">30</p>
                            <p className="cardpara">DAYS</p>
                            <p className="cardpara">BUCKET</p>
                          </Card>
                        </div>
                        <div className="col">
                          <div className="cardsmall">
                            <p>
                              <strong>15</strong>
                            </p>
                          </div>

                          <Card style={{ width: 100 }}>
                            <p className="cardpara">Users</p>
                            <p className="cardpara">₹ 5000</p>
                            <p className="cardpara">30</p>
                            <p className="cardpara">DAYS</p>
                            <p className="cardpara">BUCKET</p>
                          </Card>
                        </div>
                        <div className="col">
                          <div className="cardsmall">
                            <p>
                              <strong>15</strong>
                            </p>
                          </div>

                          <Card style={{ width: 100 }}>
                            <p className="cardpara">Users</p>
                            <p className="cardpara">₹ 5000</p>
                            <p className="cardpara">30</p>
                            <p className="cardpara">DAYS</p>
                            <p className="cardpara">BUCKET</p>
                          </Card>
                        </div>
                        <div className="col">
                          <div className="cardsmall">
                            <p>
                              <strong>15</strong>
                            </p>
                          </div>

                          <Card style={{ width: 100 }}>
                            <p className="cardpara">Users</p>
                            <p className="cardpara">₹ 5000</p>
                            <p className="cardpara">30</p>
                            <p className="cardpara">DAYS</p>
                            <p className="cardpara">BUCKET</p>
                          </Card>
                        </div>
                      </div>
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

export default MainAdminDashboard;
