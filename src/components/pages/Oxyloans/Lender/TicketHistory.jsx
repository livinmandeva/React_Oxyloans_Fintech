import React from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import Footer from "../../../Footer/Footer";

import FeatherIcon from "feather-icons-react/build/FeatherIcon";

const TicketHistory = () => {
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
            <div className="page-header">
              <div className="row">
                <div className="col-sm-12">
                  <div className="page-sub-header">
                    <h3 className="page-title">Ticket History </h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/students">DashBoard</Link>
                      </li>
                      <li className="breadcrumb-item active">Ticket History</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="row col-12">
                  <div className="col-xl-12 d-flex">
                    {/* Star Students */}
                    <div className="card flex-fill student-space comman-shadow">
                      {/* <div className="card-header d-flex align-items-center">
                        <h5 className="card-title">Investment / Wallet</h5>
                        <ul className="chart-list-out student-ellips">
                          <li className="star-menus">
                            <Link to="#">
                              <i className="fas fa-ellipsis-v" />
                            </Link>
                          </li>
                        </ul>
                      </div> */}
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table star-student table-hover table-center table-borderless table-striped">
                            <thead className="thead-light">
                              <tr>
                                <th className="text-center">S#</th>
                                <th className="text-center"> Ticket Id</th>
                                <th className="text-center"> Query</th>
                                <th className="text-center">Admin Comments</th>
                              </tr>
                            </thead>
                            <tbody>
                             
                              <tr>
                                <td className="text-center">
                                  <div>4</div>
                                </td>
                                <td className="text-center">
                                  <div>2023-07-14</div>
                                </td>
                                <td className="text-center">GL EscrYly ICIC</td>
                                <td className="text-center">1185</td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div>5</div>
                                </td>
                                <td className="text-center">
                                  <div>2023-07-14</div>
                                </td>
                                <td className="text-center">36months2.2ROI</td>
                                <td className="text-center">1185</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* /Star Students */}
                  </div>
                 

                </div>
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

export default TicketHistory;
