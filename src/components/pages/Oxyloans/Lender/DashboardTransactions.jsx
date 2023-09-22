import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import Footer from "../../../Footer/Footer";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Table, Pagination } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";
import { getDashboardInvestment } from "../../../HttpRequest/afterlogin";

const DashboardTransactions = () => {
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
                    <h3 className="page-title">My Transactions </h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/students">DashBoard</Link>
                      </li>
                      <li className="breadcrumb-item active">QR Code</li>
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
                              defaultPageSize: 5,
                              showTotal: (total, range) =>
                                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                              position: ["topRight"],
                              showSizeChanger: false,
                              onShowSizeChange: onShowSizeChange,
                              size: "default",
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

                        <div
                          className="table-responsive"
                          style={{ display: "none" }}
                        >
                          <table className="table star-student table-hover table-center table-borderless table-striped">
                            <thead className="thead-light">
                              <tr>
                                <th className="text-center">S#</th>
                                <th className="text-center">Date</th>
                                <th className="text-center"> Description</th>
                                <th className="text-center"> Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-center">
                                  <div>1</div>
                                </td>
                                <td className="text-center">
                                  <div>2023-07-14</div>
                                </td>
                                <td className="text-center">student deals</td>
                                <td className="text-center">50000</td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div>2</div>
                                </td>
                                <td className="text-center">
                                  <div>2023-07-14</div>
                                </td>
                                <td className="text-center">QR</td>
                                <td className="text-center">90000</td>
                              </tr>
                              <tr>
                                <td className="text-center">
                                  <div>3</div>
                                </td>
                                <td className="text-center">
                                  <div>2023-07-14</div>
                                </td>
                                <td className="text-center"> /ATTN/</td>
                                <td className="text-center">1185</td>
                              </tr>
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
                  <div className="col-xl-12 d-flex">
                    {/* Star Students */}
                    <div className="card flex-fill student-space comman-shadow">
                      <div className="card-header d-flex align-items-center">
                        <h5 className="card-title">Principal Returned</h5>
                        <ul className="chart-list-out student-ellips">
                          <li className="star-menus">
                            <Link to="#">
                              <i className="fas fa-ellipsis-v" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table star-student table-hover table-center table-borderless table-striped">
                            <thead className="thead-light">
                              <tr>
                                <th>Date</th>
                                <th> Deal Name</th>
                                <th className="text-center"> Amount Lent</th>
                                <th>Returned Amount</th>
                                <th>Deal Bal</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-nowrap">
                                  <div>2023-09-02</div>
                                </td>
                                <td className="text-nowrap">
                                  SD-2S-20L-31MAY23
                                </td>
                                <td className="text-center"> 30000</td>
                                <td className="text-nowrap">
                                  <div> Returned to wallet(S)</div>
                                </td>
                                <td className="text-nowrap">
                                  <div>0</div>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>2023-09-02</div>
                                </td>
                                <td className="text-nowrap">
                                  SD-2S-20L-31MAY23
                                </td>
                                <td className="text-center"> 30000</td>
                                <td className="text-nowrap">
                                  <div> Returned to wallet(S)</div>
                                </td>
                                <td className="text-nowrap">
                                  <div>0</div>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>2023-09-02</div>
                                </td>
                                <td className="text-nowrap">
                                  SD-2S-20L-31MAY23
                                </td>
                                <td className="text-center"> 30000</td>
                                <td className="text-nowrap">
                                  <div> Returned to wallet(S)</div>
                                </td>
                                <td className="text-nowrap">
                                  <div>0</div>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>2023-09-02</div>
                                </td>
                                <td className="text-nowrap">
                                  SD-2S-20L-31MAY23
                                </td>
                                <td className="text-center"> 30000</td>
                                <td className="text-nowrap">
                                  <div> Returned to wallet(S)</div>
                                </td>
                                <td className="text-nowrap">
                                  <div>0</div>
                                </td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>2023-09-02</div>
                                </td>
                                <td className="text-nowrap">
                                  SD-2S-20L-31MAY23
                                </td>
                                <td className="text-center"> 30000</td>
                                <td className="text-nowrap">
                                  <div> Returned to wallet(S)</div>
                                </td>
                                <td className="text-nowrap">
                                  <div>0</div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* /Star Students */}
                  </div>
                  <div className="col-xl-12 d-flex">
                    {/* Star Students */}
                    <div className="card flex-fill student-space comman-shadow">
                      <div className="card-header d-flex align-items-center">
                        <h5 className="card-title">Interest Earnings</h5>
                        <ul className="chart-list-out student-ellips">
                          <li className="star-menus">
                            <Link to="#">
                              <i className="fas fa-ellipsis-v" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table star-student table-hover table-center table-borderless table-striped">
                            <thead className="thead-light">
                              <tr>
                                <th>Date</th>
                                <th className="text-center"> Deal Name</th>
                                <th> Days</th>
                                <th> Profit</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-nowrap">
                                  <div>2023-09-04</div>
                                </td>
                                <td className="text-center">
                                  S21_Exclusive_4_Founding_Lenders Interest
                                </td>
                                <td className="text-nowrap">30</td>
                                <td className="text-nowrap">30</td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>2023-09-04</div>
                                </td>
                                <td className="text-center">
                                  S21_Exclusive_4_Founding_Lenders Interest
                                </td>
                                <td className="text-nowrap">30</td>
                                <td className="text-nowrap">30</td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>2023-09-04</div>
                                </td>
                                <td className="text-center">
                                  S21_Exclusive_4_Founding_Lenders Interest
                                </td>
                                <td className="text-nowrap">30</td>
                                <td className="text-nowrap">30</td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>2023-09-04</div>
                                </td>
                                <td className="text-center">
                                  S21_Exclusive_4_Founding_Lenders Interest
                                </td>
                                <td className="text-nowrap">30</td>
                                <td className="text-nowrap">30</td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>2023-09-04</div>
                                </td>
                                <td className="text-center">
                                  S21_Exclusive_4_Founding_Lenders Interest
                                </td>
                                <td className="text-nowrap">30</td>
                                <td className="text-nowrap">30</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* /Star Students */}
                  </div>
                  <div className="col-xl-12 d-flex">
                    {/* Star Students */}
                    <div className="card flex-fill student-space comman-shadow">
                      <div className="card-header d-flex align-items-center">
                        <h5 className="card-title">Referral Earnings</h5>
                        <ul className="chart-list-out student-ellips">
                          <li className="star-menus">
                            <Link to="#">
                              <i className="fas fa-ellipsis-v" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table star-student table-hover table-center table-borderless table-striped">
                            <thead className="thead-light">
                              <tr>
                                <th className="">Date</th>
                                <th className="">Lender</th>
                                <th className="text-center"> Deal Name</th>
                                <th className="text-center">Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-nowrap">
                                  <div>2023-09-05</div>
                                </td>
                                <td className="text-nowrap">
                                  GAYATHRI SRINIVASAN
                                </td>
                                <td className="text-center">
                                  SD-4S-35L-05SEP23
                                </td>
                                <td className="text-center">Unpaid</td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>2023-09-05</div>
                                </td>
                                <td className="text-nowrap">
                                  GAYATHRI SRINIVASAN
                                </td>
                                <td className="text-center">
                                  SD-4S-35L-05SEP23
                                </td>
                                <td className="text-center">Unpaid</td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>2023-09-05</div>
                                </td>
                                <td className="text-nowrap">
                                  GAYATHRI SRINIVASAN
                                </td>
                                <td className="text-center">
                                  SD-4S-35L-05SEP23
                                </td>
                                <td className="text-center">Unpaid</td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>2023-09-05</div>
                                </td>
                                <td className="text-nowrap">
                                  GAYATHRI SRINIVASAN
                                </td>
                                <td className="text-center">
                                  SD-4S-35L-05SEP23
                                </td>
                                <td className="text-center">Unpaid</td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>2023-09-05</div>
                                </td>
                                <td className="text-nowrap">
                                  GAYATHRI SRINIVASAN
                                </td>
                                <td className="text-center">
                                  SD-4S-35L-05SEP23
                                </td>
                                <td className="text-center">PAID</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {/* /Star Students */}
                  </div>
                  <div className="col-xl-12 d-flex">
                    {/* Star Students */}
                    <div className="card flex-fill student-space comman-shadow">
                      <div className="card-header d-flex align-items-center">
                        <h5 className="card-title">Deals Vs Earnings</h5>
                        <ul className="chart-list-out student-ellips">
                          <li className="star-menus">
                            <Link to="#">
                              <i className="fas fa-ellipsis-v" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="table star-student table-hover table-center table-borderless table-striped">
                            <thead className="thead-light">
                              <tr>
                                <th>S.No</th>
                                <th className="text-center"> Deal Name</th>
                                <th> RoI</th>
                                <th>Tenure </th>
                                <th> Date</th>
                                <th> Closed Date</th>
                                <th> Amount</th>
                                <th> Loan Status</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="text-nowrap">
                                  <div>1</div>
                                </td>
                                <td className="text-nowrap">
                                  SD-LB-5CR-36M-1.7ROI-MlyPayOut-SEP23
                                </td>

                                <td className="text-nowrap">1.7</td>

                                <td className="text-nowrap">36 M</td>

                                <td className="text-nowrap">
                                  <div>2023-09-04</div>
                                </td>
                                <td className="text-center">
                                  <div>2023-09-04</div>
                                </td>
                                <td className="text-center">50000</td>
                                <td className="text-nowrap">Running</td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>1</div>
                                </td>
                                <td className="text-nowrap">
                                  SD-LB-5CR-36M-1.7ROI-MlyPayOut-SEP23
                                </td>

                                <td className="text-nowrap">1.7</td>

                                <td className="text-nowrap">36 M</td>

                                <td className="text-nowrap">
                                  <div>2023-09-04</div>
                                </td>
                                <td className="text-center">
                                  <div>2023-09-04</div>
                                </td>
                                <td className="text-nowrap">50000</td>
                                <td className="text-nowrap">Running</td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>1</div>
                                </td>
                                <td className="text-nowrap">
                                  SD-LB-5CR-36M-1.7ROI-MlyPayOut-SEP23
                                </td>

                                <td className="text-nowrap">1.7</td>

                                <td className="text-nowrap">36</td>

                                <td className="text-nowrap">
                                  <div>2023-09-04</div>
                                </td>
                                <td className="text-center">
                                  <div>2023-09-04</div>
                                </td>
                                <td className="text-nowrap">50000</td>
                                <td className="text-nowrap">Running</td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>1</div>
                                </td>
                                <td className="text-nowrap">
                                  SD-LB-5CR-36M-1.7ROI-MlyPayOut-SEP23
                                </td>

                                <td className="text-nowrap">1.7</td>

                                <td className="text-nowrap">36 M</td>

                                <td className="text-nowrap">
                                  <div>2023-09-04</div>
                                </td>
                                <td className="text-center">
                                  <div>2023-09-04</div>
                                </td>
                                <td className="text-nowrap">50000</td>
                                <td className="text-nowrap">Running</td>
                              </tr>
                              <tr>
                                <td className="text-nowrap">
                                  <div>1</div>
                                </td>
                                <td className="text-nowrap">
                                  SD-LB-5CR-36M-1.7ROI-MlyPayOut-SEP23
                                </td>

                                <td className="text-nowrap">1.7</td>

                                <td className="text-nowrap">36 M</td>

                                <td className="text-nowrap">
                                  <div>2023-09-04</div>
                                </td>
                                <td className="text-center">
                                  <div>2023-09-04</div>
                                </td>
                                <td className="text-nowrap">50000</td>
                                <td className="text-nowrap">Running</td>
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

export default DashboardTransactions;
