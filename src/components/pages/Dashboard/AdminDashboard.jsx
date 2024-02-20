import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import Header from "../../Header/Header";
import SideBar from "../../SideBar/SideBar";
import ProgressBar from "react-customizable-progressbar";
import { Link } from "react-router-dom";
import "../Oxyloans/Lender/table.css";

import {
  chatapi,
  getDashboardInvestment,
  regular_Api,
  getInterestEarnings,
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
  validityDatemodal,
} from "../Base UI Elements/SweetAlert";
import Sidebar from "../../SideBar/AdminSidebar";

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

  // const [data, setObject] = useState({
  //   chart: {
  //     height: 350,
  //     type: "line",
  //     toolbar: {
  //       show: false,
  //     },
  //     fill: false,
  //   },
  //   dataLabels: {
  //     enabled: false,
  //   },
  //   datasets: {
  //     id: "apaxcharts-line",
  //   },
  //   stroke: {
  //     curve: "smooth",
  //   },
  //   colors: ["#3D5EE1", "#70C4CF"],
  //   borderWidth: 3,
  //   labels: ["2020", "2021", "2022", "2023"],
  // });

  // const [series, setSeries] = useState([
  //   {
  //     name: "Investment",
  //     data: [100000, 25000, 1000000, 300000],
  //   },
  //   {
  //     name: "Total Returns",
  //     data: [120000, 32000, 1300000, 450000],
  //   },
  // ]);

  // Student Chart

  const [dataBar, object] = useState({
    colors: ["#3D5EE1", "#70C4CF"],
    chart: {
      type: "bar",
      height: 350,
      width: "100%",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
        categoryGap: "30%",
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    series: [
      {
        name: "Student",
        color: "#70C4CF",
        data: [100000, 100000, 150000, 2000000],
      },
      {
        name: "Escrow",
        color: "#3D5EE1",
        data: [100000, 50000, 60000, 100000],
      },
      {
        name: "Others",
        color: "#3D5EE1",
        data: [0, 1000, 1500000, 1000],
      },
    ],
    labels: [2020, 2021, 2022, 2023, 2024],

    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "100%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 15,
        colors: ["transparent"],
      },
      xaxis: {
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          style: {
            colors: "#777",
          },
        },
      },
      title: {
        text: "",
        align: "left",
        style: {
          fontSize: "0px",
        },
      },
    },
  });

  const [studentchart] = useState([
    {
      name: "Student",
      type: "column",
      data: [0, 100000, 150000, 2000000],
    },
    {
      name: "Escrow",
      type: "column",
      data: [1000000, 100000, 150000, 2000000],
    },
    {
      name: "Others",
      type: "column",
      data: [0, 100000, 150000, 2000000],
    },
  ]);

  const [dealsProgressed, setdealsProgressed] = useState({
    totalDeals: 0,
    participatedDeals: 0,
    percentage: 0,
  });
  const [initialData, setinitialData] = useState({
    totalInvestment: 0, // Initialize with 0 or another appropriate default value
    participatedStudentDeals: 0,
    participatedEscrowDeals: 0,
    participatedNormalDeals: 0,
  });

  // const response = chatapi();
  // response.then((data)=>{
  //   if(data){
  //     SetDistributedColumns({

  //         ...DistributedColumns,
  //         totalInvestment: data.data.totalInvestment, // Initialize with 0 or another appropriate default value
  //   participatedStudentDeals: data.data.participatedStudentDeals,
  //   participatedEscrowDeals: data.data.participatedEscrowDeals,
  //   participatedNormalDeals: data.data.participatedNormalDeals,
  //     })
  //   }

  // })
  // const [DistributedColumns, SetDistributedColumns] = useState({
  //   series: [
  //     {
  //       name: "",
  //       // data: [300000, 200000, 50000, 50000],
  //       data: [0, 0, 0, 0],
  //     },
  //   ],
  //   options: {
  //     chart: {
  //       height: 350,
  //       type: "bar",
  //       events: {
  //         click: function (chart, w, e) {},
  //       },
  //     },
  //     colors: ["#45C4B0", "#3D5EE1", "#70C4CF", "#777"],
  //     plotOptions: {
  //       bar: {
  //         columnWidth: "45%",
  //         distributed: true,
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     legend: {
  //       show: false,
  //     },
  //     xaxis: {
  //       categories: [
  //         ["Total Investment"],
  //         ["Student"],
  //         ["Escow"],
  //         ["normalDeals"],
  //       ],
  //       labels: {
  //         style: {
  //           colors: ["#3D5EE1", "#70C4CF"],
  //           fontSize: "12px",
  //         },
  //       },
  //     },
  //   },
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await chatapi(); // Assuming chatapi() is an async function that fetches data
        if (response && response.data) {
          const data = response.data;
          //  const data1= response.data.data.totalInvestment +
          //   response.data.data.participatedStudentDeals
          //    +  response.data.data.participatedEscrowDeals
          //    + response.data.data.participatedNormalDeals
          //    ;

          SetDistributedColumns((prevColumns) => ({
            ...prevColumns,
            series: [
              {
                name: "",
                data: [
                  data.totalInvestment +
                    data.participatedStudentDeals +
                    data.participatedEscrowDeals +
                    data.participatedNormalDeals,
                  data.participatedStudentDeals,
                  data.participatedEscrowDeals,
                  data.participatedNormalDeals,
                ],
              },
            ],
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Fetch data when the component mounts
  }, []); // Empty dependency array ensures this effect runs once

  useEffect(() => {
    const response = chatapi();
    response.then((data) => {});
  }, []);

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

  const earningProfitInterest = useState({});

  const [googledata, setgoogledate] = useState([
    [
      { type: "date", id: "Date" },
      { type: "number", id: "Won/Loss" },
    ],
  ]);

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
        setmembershipdata({
          ...membershipdata,
          dashboardData: data,
        });
        const currentDate = new Date(); // Get the current date

        // Format the current date as "YYYY-MM-DD"
        const formattedCurrentDate = currentDate.toISOString().split("T")[0];

        // Assuming data.validityDate is a string in the format "YYYY-MM-DD"
        const validityDate = data.data.validityDate; // Replace this with your actual date string

        if (validityDate >= formattedCurrentDate) {
        } else {
          const skipbutton = localStorage.getItem("skip");
          if (skipbutton) {
          } else {
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
    const activeres = getactivityApisData();
    activeres.then((data) => {
      if (data.request.status == 200) {
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
    const earningres = getInterestEarnings();
    earningres.then((data) => {
      if (data.request.status == 200) {
        const newapidata = data.data.map((info, index) => {
          let datesplit = info.date.split("-");
          return [
            new Date(
              datesplit[0],
              datesplit[1].includes("0")
                ? datesplit[1].substring(1)
                : datesplit[1],
              datesplit[2]
            ),
            info.amount,
          ];
        });

        setgoogledate([
          [
            { type: "date", id: "Date" },
            { type: "number", id: "Won/Loss" },
          ],
          ...newapidata,
        ]);
        // googledata;    // [new Date(2023, 1, 4), 38177],
      }
    });
    return () => {};
  }, []);

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
    const deatilskip = localStorage.getItem("deatilskip");

    if (deatilskip) {
    } else {
      const profileData = dashboarddata?.profileData?.data;

      if (profileData) {
        const { kycStatus, bankDetailsInfo, personalDetailsInfo } = profileData;

        if (
          kycStatus !== undefined &&
          bankDetailsInfo !== undefined &&
          personalDetailsInfo !== undefined
        ) {
        } else {
          if (personalDetailsInfo === undefined) {
            personalDetails("personalDetails is not available", "/profile");
          } else if (bankDetailsInfo === undefined) {
            personalDetails("bankdetailsinfo is not available", "/profile");
          } else {
            personalDetails("kyc is not available", "/profile");
          }
        }
      } else {
      }
    }
  }, [dashboarddata.profileData]);
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header />

        {/* Sidebar */}
      <Sidebar />

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
                        <h6>Total Deals</h6>
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
                        Subscription Validity:
                      </span>
                      {getreducerprofiledata?.length !== 0
                        ? getreducerprofiledata?.groupName == "NewLender"
                          ? "You are a new lender group, pay the annual membership fee to participate in the multiple deals. "
                          : `Active until: ${getdashboardData.validityDate}`
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* /Overview Section */}
            <div className="row ">
              <div className="col-md-12 col-lg-6 d-none">
                {/* Revenue Chart */}
                <div className="card card-chart d-i">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <small className="card-title">
                          Investment & Returns
                        </small>
                      </div>
                      <div className="col-6">
                        <ul className="chart-list-out">
                          <li>
                            <span className="circle-blue" />
                            Investment
                          </li>
                          <li>
                            <span className="circle-green" />
                            Total Returns
                          </li>
                          <li className="star-menus">
                            <Link to="#">
                              <i className="fas fa-ellipsis-v" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="apexcharts-area"></div>
                    {/* <Chart options={data} series={series} type="line" /> */}
                  </div>
                </div>
                {/* /Revenue Chart */}
              </div>

              <div className="col-md-12 col-lg-6">
                {/* Student Chart */}
                <div className="card card-chart">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-8">
                        <h6 className="card-title">Deal Activity Amount</h6>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="apexcharts-area"></div>
                    <Chart
                      options={treemap.options}
                      series={treemap.series}
                      type="line"
                      className="activechart"
                    />
                  </div>
                </div>

                {/* /Student Chart */}
              </div>

              <div className="col-md-12 col-lg-6 d-none">
                {/* Student Chart */}
                <div className="card card-chart">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <h6 className="card-title">Investment In Deals</h6>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <div id="apexcharts-area"></div>
                    {/* <Chart
                      options={DistributedColumns.options}
                      series={DistributedColumns.series}
                      type="bar"
                    /> */}
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
                          Deals Participated vs Deals Created In System
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="dash-widget d-flex justify-content-center align-items-center">
                    <div className="circle-bar circle-bar">
                      {/* <div className="circle-graph1" data-percent={50}> */}
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
                              {`${dealsProgressed.participatedDeals}/${dealsProgressed.totalDeals}`}
                            </h4>
                            <p>Deals Progressed</p>
                          </div>
                        </div>
                      </ProgressBar>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-12 col-md-12 d-flex d-none">
                <div className="card flex-fill comman-shadow">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-12">
                        <h5 className="card-title text-center">
                          Interest Earnings Day-Wise Report : 2023
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="dash-widget d-flex justify-content-center align-items-center">
                    <div className="w-100 scrolling">
                      {/* <GoogleChart
                        chartType="Calendar"
                        loader={<div>Loading Chart</div>}
                        data={googledata}
                        options={{
                          calendar: {
                            dayOfWeekLabel: {
                              fontName: "Times-Roman",
                              fontSize: 12,
                              color: "#1a8763",
                              bold: true,
                              italic: true,
                            },
                            cellColor: {
                              stroke: "#76a7fa",
                              strokeOpacity: 0.5,
                              strokeWidth: 1,
                            },

                            dayOfWeekRightSpace: 10,
                          },
                        }}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12 col-lg-12 d-none">
                {/* Student Chart */}
                <div className="card card-chart">
                  <div className="card-header">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <h6 className="card-title">MY Earnings & Returns</h6>
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
                          .listOfDealsInformationToLender.length > 1
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

                                      Min: {data.minimumAmountInDeal}, Max: {data.lenderPaticipationLimit}
                                      {data.paticipationLimitToLenders}, RoI:

                                      {/* Min: {data.minimumAmountInDeal}, Max:
                                      {data.lenderPaticipationLimit}, RoI: */}

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
