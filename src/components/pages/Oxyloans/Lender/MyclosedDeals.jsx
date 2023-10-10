import React from "react";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { useState, useEffect } from "react";
import { pagination, Table } from "antd";
import { Link } from "react-router-dom";
import { onShowSizeChange, itemRender } from "../../../Pagination";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import {  handelapi, myclosedDealsInfo } from "../../../HttpRequest/afterlogin";
import Modaldata from "./Modaldata";

const MyclosedDeals = () => {
  const [myclosedDeals, setmyclosedDeals] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
    statement:"",
    model:false
  });

  const myclosedDealsPagination = (Pagination) => {
    setmyclosedDeals({
      ...myclosedDeals,
      defaultPageSize: Pagination.pageSize,
      pageNo: Pagination.current,
      pageSize: Pagination.pageSize,
    });
  };



  const handelSatement=async(dealId)=>{
   const response = handelapi(dealId);
    response.then((data)=>{
  console.log(data)
  setmyclosedDeals({
    ...myclosedDeals,
    statement:data.data
  })
})
  }
  useEffect(() => {
    const response = myclosedDealsInfo(
      myclosedDeals.pageNo,
      myclosedDeals.pageSize
    );
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data);
        setmyclosedDeals({
          ...myclosedDeals,
          apiData: data.data,
          loading: false,
          hasdata:
            data.data.lenderReturnsResponseDto.length == 0 ? false : true,
        });
      }
    });
    return () => {};
  }, [myclosedDeals.pageNo, myclosedDeals.pageSize]);

  const datasource = [];
  {
    myclosedDeals.apiData != ""
      ? myclosedDeals.apiData.lenderReturnsResponseDto.map((data) => {
          datasource.push({
            key: Math.random(),
            DealName: data.dealName,
            Participated: "INR " + data.totalPaticipation,
            ROI: data.rateOfInterest + " % PM",
            Dealstart: data.fundsAcceptanceStartDate,
            DealClosed: data.dealClosedToLender,
            Statement: (
              <button type="submit" className="btn  w-70 btn-primary btn-xs" onClick={()=>handelSatement(data.dealId)}>
                Statement
              </button>
            ),
          });
        })
      : "";
  }

  const column = [
    {
      title: "Deal Name",
      dataIndex: "DealName",
      sorter: (a, b) => a.DealName.length - b.DealName.length,
    },
    {
      title: "Participated ",
      dataIndex: "Participated",
      sorter: (a, b) => a.Participated.length - b.Participated.length,
    },
    {
      title: "ROI",
      dataIndex: "ROI",
      sorter: (a, b) => a.ROI.length - b.ROI.length,
    },

    {
      title: "Deal start",
      dataIndex: "Dealstart",
      sorter: (a, b) => a.Dealstart.length - b.Dealstart.length,
    },
    {
      title: "Deal Closed",
      dataIndex: "DealClosed",
      sorter: (a, b) => a.DealClosed.length - b.DealClosed.length,
    },
    {
      title: "Statement",
      dataIndex: "Statement",
    },
  ];
  return (
    <div>
      <>
        <div className="main-wrapper">
          {/* Header */}
          <Header />
          {/* Sidebar */}
          <SideBar />

          <div className="page-wrapper">
            <div className="content container-fluid">
              {/* Page Header */}
              <div className="page-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h3 className="page-title">Participation Closed deals</h3>
                    <ul className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                      <li className="breadcrumb-item active">Closed deals</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* /Page Header */}
              <div className="row">
                <div className="col-sm-12">
                  <div className="card card-table">
                    <div className="card-body">
                      {/* Page Header */}
                      <div className="page-header">
                        <div className="row align-items-center">
                          <div className="col"></div>
                          <div className="col-auto text-end float-end ms-auto download-grp">
                            <Link
                              to="#"
                              className="btn btn-outline-primary me-2"
                            >
                              <i className="fas fa-download" /> {""}
                              Download
                            </Link>

                            {myclosedDeals.statement  && <><Modaldata data={myclosedDeals.statement} open={true}/>  {console.log(myclosedDeals.statement)}</>}
                          </div>
                        </div>
                      </div>
                      {/* /Page Header */}
                      <div className="table-responsive">
                        <Table
                          className="table border-0 star-student table-center mb-0"
                          pagination={{
                            total: myclosedDeals.apiData.countValue,
                            defaultPageSize: myclosedDeals.defaultPageSize,
                            showTotal: (total, range) =>
                              `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                            showSizeChanger: true,
                            onShowSizeChange: onShowSizeChange,
                            itemRender: itemRender,
                            position: ["topRight"],
                          }}
                          columns={column}
                          dataSource={myclosedDeals.hasdata ? datasource : []}
                          expandable={true}
                          loading={myclosedDeals.loading}
                          onChange={myclosedDealsPagination}

                          // rowSelection={rowSelection}
                          //     rowKey={(record) => record.ID}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Footer */}
            <footer>
              <p>Copyright © 2016 OxyLoans.com. All rights reserved.</p>
            </footer>
            {/* /Footer */}
          </div>
        </div>
        {/* /Main Wrapper */}
      </>
    </div>
  );
};

export default MyclosedDeals;
