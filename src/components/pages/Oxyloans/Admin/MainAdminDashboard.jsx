import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

import { Link } from "react-router-dom";
import "../../Oxyloans/Lender/table.css";

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
  dealmembership,
  newlendersweetalert,
  personalDetails,
  personalDetailsInfo,
  validityDatemodal,
} from "../../Base UI Elements/SweetAlert";
import AdminSidebar from "../../../SideBar/AdminSidebar";
import SideBar from "../../../SideBar/SideBar";
import AdminHeader from "../../../Header/AdminHeader";
import { admindashbordcount } from "../../../HttpRequest/admin";

const MainAdminDashboard = () => {
  const dispatch = useDispatch();
 
  const { activitydata } = useDealActivity();



  const [dashborddata , setdashboarddata]=useState({
    dashboarddatascreen:""
  })

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


  

  const [newlender, setnewlender] = useState(false);



 

  useEffect(()=>{
    const fetchdata = async () => {
      try {
        const response = await admindashbordcount(); // Assuming lenderTotalInvestmentsAndReturns is an asynchronous function

        console.log(response);
          setdashboarddata({
            ...dashborddata,
            dashboarddatascreen: response.data
          })
        // Update the state based on the response data
      
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchdata();
  },[])





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
                        {dashborddata.dashboarddatascreen !== "" && dashborddata.dashboarddatascreen.registeredUsersCount}

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
                       
                        {dashborddata.dashboarddatascreen !== "" && dashborddata.dashboarddatascreen.lendersCount}
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
                        {dashborddata.dashboarddatascreen !== "" && dashborddata.dashboarddatascreen.borrowersCount}
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
                        {dashborddata.dashboarddatascreen !== "" && dashborddata.dashboarddatascreen.todayRegisteredUsersCount}
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

            {/* /Overview Section */}
  
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
