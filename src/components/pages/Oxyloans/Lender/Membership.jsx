import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { Button, Card, Space } from "antd";
import "./member.css";
import "./Dashboardtable.css";
import { pagination, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";
import {
  getMyWalletTowalletHistory,
  handlePaymembershipapi,
} from "../../../HttpRequest/afterlogin";
import { membershipsweetalert } from "../../Base UI Elements/SweetAlert";

const Membership = React.memo((pros) => {
  const [mywalletTowalletHistory, setmywalletTowalletHistory] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    membershiptype: "",
    loading: false,
  });
  const handlePaymembershipfree = async (membership) => {
    try {
      setmywalletTowalletHistory({
        ...mywalletTowalletHistory,
        loading: true,
      });
      const response = await handlePaymembershipapi(membership);
      console.log(response.data.status);
      membershipsweetalert(response.data.status);
      setmywalletTowalletHistory({
        ...mywalletTowalletHistory,
        loading: false,
      });
    } catch (error) {
      membershipsweetalert("error");
      setmywalletTowalletHistory({
        ...mywalletTowalletHistory,
        loading: false,
      });
    }
  };

  return (
    <>
      <div className="main-wrapper">
        <Header />
        <SideBar />
        {/*Page wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/*Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Membership Payment</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                      Membership Payment
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            <div className="row">
              <div className="col-sm-12">
                <div className="card card-table">
                  <div className="card-body">
                    <div class="row">
                      <div className="col-lg-4  col-md-12 col-sm-12">
                        <div className="card text-center membership-border">
                          <div className="card-header">
                            <h3>1 Month Plan</h3>
                          </div>
                          <div className="card-body">
                            <p className="lead">
                              <strong> 1000 + 18 % GST</strong>
                            </p>
                            <ul className="list-group">
                              <li className="list-group-item">
                                <i className="icon-ok text-danger"></i>
                                <b className="paymembership_tenture">1</b> Month
                                Membership
                              </li>
                              <li className="list-group-item">
                                <i className="icon-ok text-danger"></i>
                                Unlimited Deals Participation
                              </li>
                            </ul>
                          </div>
                          <div className="card-footer">
                            <button
                              type="button"
                              className="btn bg-success bg-gradient btn-block text-center text-white"
                            >
                              Subscribe
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4  col-md-12 col-sm-12 border-5 border-info">
                        <div className="card text-center membership-border">
                          <div className="card-header">
                            <h3>3 Months plan</h3>
                          </div>
                          <div className="card-body">
                            <p className="lead">
                              <strong>2900+18 % GST</strong>
                            </p>
                            <ul className="list-group">
                              <li className="list-group-item">
                                <i className="icon-ok text-danger"></i>
                                <b className="paymembership_tenture">3</b> Month
                                Membership
                              </li>
                              <li className="list-group-item">
                                <i className="icon-ok text-danger"></i>
                                Unlimited Deals Participation
                              </li>
                            </ul>
                          </div>
                          <div className="card-footer">
                            <button
                              type="button"
                              className="btn bg-secondary bg-gradient btn-block text-center text-white"
                            >
                              Subscribe
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4  col-md-12 col-sm-12 border-5 border-info">
                        <div className="card text-center membership-border">
                          <div className="card-header">
                            <h3>6 Months Plan</h3>
                          </div>
                          <div className="card-body">
                            <p className="lead">
                              <strong>5600 + 18 % GST</strong>
                            </p>
                            <ul className="list-group">
                              <li className="list-group-item">
                                <i className="icon-ok text-danger"></i>
                                <b className="paymembership_tenture">6</b> Month
                                Membership
                              </li>
                              <li className="list-group-item">
                                <i className="icon-ok text-danger"></i>
                                Unlimited Deals Participation
                              </li>
                            </ul>
                          </div>
                          <div className="card-footer">
                            <button
                              type="button"
                              className="btn bg-info bg-gradien btn-block text-center text-white"
                            >
                              Subscribe
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4  col-md-12 col-sm-12 border-5 border-info">
                        <div className="card text-center membership-border">
                          <div className="card-header">
                            <h3>1 Year Plan</h3>
                          </div>
                          <div className="card-body">
                            <p className="lead">
                              <strong> 9800 + 18 % GST</strong>
                            </p>
                            <ul className="list-group">
                              <li className="list-group-item">
                                <i className="icon-ok text-danger"></i>
                                <b className="paymembership_tenture">1</b> Year
                                Membership
                              </li>
                              <li className="list-group-item">
                                <i className="icon-ok text-danger"></i>{" "}
                                Unlimited Deals Participation
                              </li>
                            </ul>
                          </div>
                          <div className="card-footer">
                            <button
                              type="button"
                              className="btn btn-success bg-gradien btn-block text-center text-white"
                            >
                              Subscribe
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4  col-md-12 col-sm-12 border-5 border-info">
                        <div className="card text-center membership-border">
                          <div className="card-header">
                            <h3>5 Years Plan</h3>
                          </div>
                          <div className="card-body">
                            <p className="lead">
                              <strong> 50000 + 18 % GST</strong>
                            </p>
                            <ul className="list-group">
                              <li className="list-group-item">
                                <i className="icon-ok text-danger"></i>
                                <b className="paymembership_tenture">5</b> Years
                                Membership
                              </li>
                              <li className="list-group-item">
                                <i className="icon-ok text-danger"></i>{" "}
                                Unlimited Deals Participation
                              </li>
                            </ul>
                          </div>
                          <div className="card-footer">
                            <button
                              type="button"
                              className="btn btn-secondary bg-gradien btn-block text-center"
                            >
                              Subscribe
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4  col-md-12 col-sm-12 border-5 border-info">
                        <div className="card text-center membership-border">
                          <div className="card-header">
                            <h3>10 Years Plan</h3>
                          </div>
                          <div className="card-body">
                            <p className="lead">
                              <strong>90000 + 18 % GST</strong>
                            </p>
                            <ul className="list-group">
                              <li className="list-group-item">
                                <i className="icon-ok text-danger"></i>
                                <b className="paymembership_tenture">10</b>{" "}
                                Years Membership
                              </li>
                              <li className="list-group-item">
                                <i className="icon-ok text-danger"></i>{" "}
                                Unlimited Deals Participation
                              </li>
                            </ul>
                          </div>
                          <div className="card-footer">
                            <button
                              type="button"
                              className="btn bg-info bg-gradien btn-block text-center"
                            >
                              Subscribe
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4  col-md-12 col-sm-12 border-5 border-info">
                        <div className="card text-center membership-border">
                          <div className="card-header">
                            <h3>Life Time Plan</h3>
                          </div>
                          <div className="card-body">
                            <p className="lead">
                              <strong>100000 + 18 % GST</strong>
                            </p>
                            <ul className="list-group">
                              <li className="list-group-item">
                                <i className="icon-ok text-danger"></i>
                                <b className="paymembership_tenture">14</b>{" "}
                                Years Membership
                              </li>
                              <li className="list-group-item">
                                <i className="icon-ok text-danger"></i>{" "}
                                Unlimited Deals Participation
                              </li>
                            </ul>
                          </div>
                          <div className="card-footer">
                            <button
                              type="button"
                              className="btn btn-secondary bg-gradien btn-block text-center"
                            >
                              Subscribe
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Page wrapper */}
      </div>
    </>
  );
});

export default Membership;
