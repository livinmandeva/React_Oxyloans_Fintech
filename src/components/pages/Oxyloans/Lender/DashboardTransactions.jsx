import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import Footer from "../../../Footer/Footer";
import "./Dashboardtable.css";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Table, Pagination } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";
import {
  getDashboardInvestment,
  getDashboardPrincipalReturned,
  getDashboardInterestEarnings,
  getdashboardDealsVsEarnings,
  getDashboardReferralEarnings,
} from "../../../HttpRequest/afterlogin";

const DashboardTransactions = () => {
  const [dashboardInvestment, setdashboardInvestment] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
  });

  const [dashboardPrincipalReturns, setdashboardPrincipalReturns] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
  });

  const [dashboardInterestEarnings, setdashboardInterestEarnings] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
  });

  const [dashboardReferralEarnings, setdashboardReferralEarnings] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
  });

  const [dashboardDealsVsEarnings, setdashboardDealsVsEarnings] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
  });

  const investmentdashboardPagination = (dats) => {
    setdashboardInvestment({
      ...dashboardInvestment,
      defaultPageSize: dats.pageSize,
      pageNo: dats.current,
      pageSize: dats.pageSize,
    });
  };

  const principalReturneddashboardPagination = (dats) => {
    setdashboardPrincipalReturns({
      ...dashboardPrincipalReturns,
      defaultPageSize: dats.pageSize,
      pageNo: dats.current,
      pageSize: dats.pageSize,
    });
  };

  const interestEarningsagination = (dats) => {
    setdashboardInterestEarnings({
      ...dashboardInterestEarnings,
      defaultPageSize: dats.pageSize,
      pageNo: dats.current,
      pageSize: dats.pageSize,
    });
  };

  const dashboardReferalEarningPagination = (dats) => {
    setdashboardReferralEarnings({
      ...dashboardReferralEarnings,
      defaultPageSize: dats.pageSize,
      pageNo: dats.current,
      pageSize: dats.pageSize,
    });
  };

  const dashboardDealsVsEarningsPagination = (dats) => {
    setdashboardDealsVsEarnings({
      ...dashboardDealsVsEarnings,
      defaultPageSize: dats.pageSize,
      pageNo: dats.current,
      pageSize: dats.pageSize,
    });
  };

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
    const response = getDashboardPrincipalReturned(
      dashboardPrincipalReturns.pageNo,
      dashboardPrincipalReturns.pageSize
    );
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data.data.lenderReturnsResponseDto.length);
        setdashboardPrincipalReturns({
          ...dashboardPrincipalReturns,
          apiData: data.data,
          loading: false,
          hasdata:
            data.data.lenderReturnsResponseDto.length == 0 ? false : true,
        });
      }
    });
    return () => {};
  }, [dashboardPrincipalReturns.pageNo, dashboardPrincipalReturns.pageSize]);

  useEffect(() => {
    const response = getDashboardInterestEarnings(
      dashboardInterestEarnings.pageNo,
      dashboardInterestEarnings.pageSize
    );
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data.data.lenderReturnsResponseDto.length);
        setdashboardInterestEarnings({
          ...dashboardInterestEarnings,
          apiData: data.data,
          loading: false,
          hasdata:
            data.data.lenderReturnsResponseDto.length == 0 ? false : true,
        });
      }
    });
    return () => {};
  }, [dashboardInterestEarnings.pageNo, dashboardInterestEarnings.pageSize]);

  useEffect(() => {
    const response = getDashboardReferralEarnings(
      dashboardReferralEarnings.pageNo,
      dashboardReferralEarnings.pageSize
    );
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data.data.referrerResponseDto.length);
        setdashboardReferralEarnings({
          ...dashboardReferralEarnings,
          apiData: data.data,
          loading: false,
          hasdata: data.data.referrerResponseDto.length == 0 ? false : true,
        });
      }
    });
    return () => {};
  }, [dashboardReferralEarnings.pageNo, dashboardReferralEarnings.pageSize]);

  useEffect(() => {
    const response = getdashboardDealsVsEarnings(
      dashboardDealsVsEarnings.pageNo,
      dashboardDealsVsEarnings.pageSize
    );
    response.then((data) => {
      if (data.request.status == 200) {
        setdashboardDealsVsEarnings({
          ...dashboardDealsVsEarnings,
          apiData: data.data,
          loading: false,
          hasdata:
            data.data.lenderTotalPaticipationDealsInfo.length == 0
              ? false
              : true,
        });
      }
    });
    return () => {};
  }, [dashboardDealsVsEarnings.pageNo, dashboardDealsVsEarnings.pageSize]);

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

  const principalReturndatasource = [];
  {
    dashboardPrincipalReturns.apiData != ""
      ? dashboardPrincipalReturns.apiData.lenderReturnsResponseDto.map(
          (data) => {
            principalReturndatasource.push({
              key: Math.random(),
              Date: data.returedDate,
              DealName: data.dealName,
              AmountLent: data.amount,
              ReturnedAmount: data.remarks,
              DealBal: data.currentAmount,
            });
          }
        )
      : "";
  }

  const dashboardInterestEarningsdata = [];
  {
    dashboardInterestEarnings.apiData != ""
      ? dashboardInterestEarnings.apiData.lenderReturnsResponseDto.map(
          (data) => {
            dashboardInterestEarningsdata.push({
              key: Math.random(),
              Date: data.returedDate,
              DealName: data.remarks,
              Days: data.differencInDays,
              Profit: data.amount,
            });
          }
        )
      : "";
  }

  const dashboardReferralEarningsdata = [];
  {
    dashboardReferralEarnings.apiData != ""
      ? dashboardReferralEarnings.apiData.referrerResponseDto.map((data) => {
          dashboardReferralEarningsdata.push({
            key: Math.random(),
            Date: data.participatedDate,
            Lender: data.refereeName,
            DealName: data.dealName,
            Status: data.paymentStatus,
          });
        })
      : "";
  }

  const dashboarddealsVsEarningsdata = [];
  {
    dashboardDealsVsEarnings.apiData != ""
      ? dashboardDealsVsEarnings.apiData.lenderTotalPaticipationDealsInfo.map(
          (data) => {
            dashboarddealsVsEarningsdata.push({
              key: Math.random(),
              SNo: data.sno,
              DealName: data.dealName,
              RoI: data.rateofinterest + " % ",
              Tenure: data.tenure + " M ",
              Date: data.participatedDate,
              ClosedDate:
                data.dealClosedDate == null ? "Running" : data.dealClosedDate,
              Amount: data.participatedAmount,
              LoanStatus: data.pricipaleReturnedStatus,
            });
          }
        )
      : "";
  }
  /*mandeva */
  const columns = [
    {
      title: "Date",
      dataIndex: "Date",
      sorter: (a, b) => a.Date - b.Date,
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

  const principalReturnedcolumn = [
    {
      title: "Date",
      dataIndex: "Date",
      sorter: (a, b) => a.Date.length - b.Date.length,
    },
    {
      title: "Deal Name",
      dataIndex: "DealName",
      sorter: (a, b) => a.DealName.length - b.DealName.length,
    },
    {
      title: "Amount Lent",
      dataIndex: "AmountLent",
      sorter: (a, b) => a.AmountLent - b.AmountLent,
    },

    {
      title: "Returned Amount",
      dataIndex: "ReturnedAmount",
      sorter: (a, b) => a.ReturnedAmount - b.ReturnedAmount,
    },
    {
      title: "Deal Bal",
      dataIndex: "DealBal",
      sorter: (a, b) => a.DealBal - b.DealBal,
    },
  ];

  const interestEarningscolumn = [
    {
      title: "Date",
      dataIndex: "Date",
      sorter: (a, b) => a.Date - b.Date,
    },
    {
      title: "Deal Name",
      dataIndex: "DealName",
      sorter: (a, b) => a.DealName.length - b.DealName.length,
    },
    {
      title: "Days",
      dataIndex: "Days",
      sorter: (a, b) => a.Days - b.Days,
    },

    {
      title: "Profit",
      dataIndex: "Profit",
      sorter: (a, b) => a.Profit - b.Profit,
    },
  ];

  const dealsvsearningscolumn = [
    {
      title: "Deal Name",
      dataIndex: "DealName",
      sorter: (a, b) => a.DealName.length - b.DealName.length,
    },
    {
      title: "RoI",
      dataIndex: "RoI",
      sorter: (a, b) => a.RoI - b.RoI,
    },

    {
      title: "Tenure",
      dataIndex: "Tenure",
      sorter: (a, b) => a.Tenure - b.Tenure,
    },
    {
      title: "Date",
      dataIndex: "Date",
      sorter: (a, b) => a.Date - b.Date,
    },
    {
      title: "Closed Date",
      dataIndex: "ClosedDate",
      sorter: (a, b) => a.ClosedDate - b.ClosedDate,
    },
    {
      title: "Amount",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
    },
    {
      title: "Loan Status",
      dataIndex: "LoanStatus",
      sorter: (a, b) => a.LoanStatus.length - b.LoanStatus.length,
    },
  ];

  const referalEarningscolumn = [
    {
      title: "Date",
      dataIndex: "Date",
      sorter: (a, b) => a.Date - b.Date,
    },
    {
      title: "Lender",
      dataIndex: "Lender",
      sorter: (a, b) => a.Lender - b.Lender,
    },
    {
      title: "Deal Name",
      dataIndex: "DealName",
      sorter: (a, b) => a.DealName - b.DealName,
    },

    {
      title: "Status",
      dataIndex: "Status",
      sorter: (a, b) => a.Status - b.Status,
    },
  ];
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
                        <Link to="/dashboard">DashBoard</Link>
                      </li>
                      <li className="breadcrumb-item active">
                        My Transactions
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body card-bodytable">
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
                      <div className="card-body card-bodytable">
                        <div>
                          <Table
                            className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                            pagination={{
                              total: dashboardInvestment.apiData.countValue,
                              defaultPageSize:
                                dashboardInvestment.defaultPageSize,
                              showTotal: (total, range) =>
                                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
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
                      <div className="card-body card-bodytable">
                        <div>
                          <Table
                            className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                            pagination={{
                              total:
                                dashboardPrincipalReturns.apiData.countValue,
                              defaultPageSize:
                                dashboardPrincipalReturns.defaultPageSize,
                              showTotal: (total, range) =>
                                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                              position: ["topRight"],
                              showSizeChanger: false,
                              onShowSizeChange: onShowSizeChange,
                              size: "default",
                              showLessItems: true,
                              pageSizeOptions: [5, 10, 15, 20],
                              responsive: true,
                            }}
                            columns={principalReturnedcolumn}
                            expandable={true}
                            dataSource={
                              dashboardPrincipalReturns.hasdata
                                ? principalReturndatasource
                                : []
                            }
                            loading={dashboardPrincipalReturns.loading}
                            onChange={principalReturneddashboardPagination}
                          />
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
                      <div className="card-body card-bodytable">
                        <div>
                          <Table
                            className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                            pagination={{
                              total:
                                dashboardInterestEarnings.apiData.countValue,
                              defaultPageSize:
                                dashboardInterestEarnings.defaultPageSize,
                              showTotal: (total, range) =>
                                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                              position: ["topRight"],
                              showSizeChanger: false,
                              onShowSizeChange: onShowSizeChange,
                              size: "default",
                              showLessItems: true,
                              pageSizeOptions: [5, 10, 15, 20],
                              responsive: true,
                            }}
                            columns={interestEarningscolumn}
                            expandable={true}
                            dataSource={
                              dashboardInterestEarnings.hasdata
                                ? dashboardInterestEarningsdata
                                : []
                            }
                            loading={dashboardInterestEarnings.loading}
                            onChange={interestEarningsagination}
                          />
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
                      <div className="card-body card-bodytable">
                        <div>
                          <Table
                            className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                            pagination={{
                              total:
                                dashboardReferralEarnings.apiData.countValue,
                              defaultPageSize:
                                dashboardReferralEarnings.defaultPageSize,
                              showTotal: (total, range) =>
                                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                              position: ["topRight"],
                              showSizeChanger: false,
                              onShowSizeChange: onShowSizeChange,
                              size: "default",
                              showLessItems: true,
                              pageSizeOptions: [5, 10, 15, 20],
                              responsive: true,
                            }}
                            columns={referalEarningscolumn}
                            expandable={true}
                            dataSource={
                              dashboardReferralEarnings.hasdata
                                ? dashboardReferralEarningsdata
                                : []
                            }
                            loading={dashboardReferralEarnings.loading}
                            onChange={dashboardReferalEarningPagination}
                          />
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
                      <div className="card-body card-bodytable">
                        <div>
                          <Table
                            className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                            pagination={{
                              total:
                                dashboardDealsVsEarnings.apiData.countValue,
                              defaultPageSize:
                                dashboardDealsVsEarnings.defaultPageSize,
                              showTotal: (total, range) =>
                                `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                              position: ["topRight"],
                              showSizeChanger: false,
                              onShowSizeChange: onShowSizeChange,
                              size: "default",
                              showLessItems: true,
                              pageSizeOptions: [5, 10, 15, 20],
                              responsive: true,
                            }}
                            columns={dealsvsearningscolumn}
                            expandable={true}
                            dataSource={
                              dashboardDealsVsEarnings.hasdata
                                ? dashboarddealsVsEarningsdata
                                : []
                            }
                            loading={dashboardDealsVsEarnings.loading}
                            onChange={dashboardDealsVsEarningsPagination}
                          />
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
