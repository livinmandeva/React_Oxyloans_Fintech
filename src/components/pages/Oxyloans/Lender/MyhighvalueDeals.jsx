import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { pagination, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";
import { highvalueDeals } from "../../../HttpRequest/afterlogin";
const MyhighvalueDeals = () => {
  const [selectedHighValueDeals, setHighValueDeals] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 10,
    defaultPageSize: 10,
  });

  const setHighValueDealsPagination = (dats) => {
    console.log(dats);
    setHighValueDeals({
      ...selectedHighValueDeals,
      defaultPageSize: dats.pageSize,
      pageNo: dats.current,
      pageSize: dats.pageSize,
    });
  };

  useEffect(() => {
    const response = highvalueDeals(
      selectedHighValueDeals.pageNo,
      selectedHighValueDeals.pageSize
    );
    response.then((data) => {
      if (data.request.status == 200) {
        setHighValueDeals({
          ...selectedHighValueDeals,
          apiData: data.data,
          loading: false,
          hasdata:
            data.data.borrowerDealsResponseDto.length == 0 ? false : true,
        });
      }
    });
    return () => {};
  }, [selectedHighValueDeals.pageNo, selectedHighValueDeals.pageSize]);

  const datasource = [];
  {
    selectedHighValueDeals.apiData != ""
      ? selectedHighValueDeals.apiData.borrowerDealsResponseDto.map((data) => {
          datasource.push({
            key: Math.random(),
            DealName: data.dealName,
            DealAmount: data.dealAmount,
            FundsStartDate: data.fundsAcceptanceStartDate,
            DealClosedDate: data.dealClosedDate,
            NoofParticipatedLenders: data.numberOfLendersParticipated,
          });
        })
      : "";
  }

  const columns = [
    {
      title: "Deal Name",
      dataIndex: "DealName",
      sorter: (a, b) => a.DealName.length - b.DealName.length,
    },
    {
      title: "Deal Amount",
      dataIndex: "DealAmount",
      sorter: (a, b) => a.DealAmount - b.DealAmount,
    },
    {
      title: "Funds Start Date",
      dataIndex: "FundsStartDate",
      sorter: (a, b) => a.FundsStartDate - b.FundsStartDate,
    },
    {
      title: "Deal Closed Date",
      dataIndex: "DealClosedDate",
      sorter: (a, b) => a.DealClosedDate - b.DealClosedDate,
    },
    {
      title: "Participated Lenders",
      dataIndex: "NoofParticipatedLenders",
      sorter: (a, b) => a.NoofParticipatedLenders - b.NoofParticipatedLenders,
    },
  ];

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
                  <h3 className="page-title">High Value Deals Info</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/admindashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Ongoing Deals</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                        pagination={{
                          total:
                            selectedHighValueDeals.apiData.assertDealsCount,
                          defaultPageSize:
                            selectedHighValueDeals.defaultPageSize,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          position: ["topRight"],
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          size: "default",
                          showLessItems: true,
                          pageSizeOptions: [5, 10, 15, 20],
                          responsive: true,
                        }}
                        columns={columns}
                        dataSource={
                          selectedHighValueDeals.hasdata ? datasource : []
                        }
                        expandable={true}
                        loading={selectedHighValueDeals.loading}
                        onChange={setHighValueDealsPagination}
                      />
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
};

export default MyhighvalueDeals;
