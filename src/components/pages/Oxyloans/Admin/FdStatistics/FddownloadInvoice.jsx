import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Table } from "antd";

import Header from "../../../../Header/Header";
import Sidebar from "../../../../SideBar/AdminSidebar";
import { getfddownloadInvoice } from "../../../../HttpRequest/admin";


const FddownloadInvoice = () => {
  const [fddownloadInvoice, setFddownloadInvoice] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    isfiled:false,
      type: "",
      startDate: null,
      endDate: null
    // pageNo: 1,
    // pageSize: 5,
    // defaultPageSize: 5,
  });



  useEffect(() => {
    const response = getfddownloadInvoice(fddownloadInvoice);
    response.then((data) => {
      if (data.request.status == 200) {

        console.log(data.data)
        setFddownloadInvoice({
          ...fddownloadInvoice,
          apiData: data.data,
          loading: false,
          hasdata: data.data.count == 0 ? false : true,
        });
      }
    });
    return () => {};
  }, []);

 
  const handleSubmit =()=>{
    const response = getfddownloadInvoice(fddownloadInvoice);
    response.then((data) => {
      if (data.request.status == 200) {

        console.log(data.data)
        setFddownloadInvoice({
          ...fddownloadInvoice,
          apiData: data.data,
          loading: false,
          hasdata: data.data.count == 0 ? false : true,
        });
      }
    });
  }

  const datasource = [];
  {
    fddownloadInvoice.apiData != ""
      ? fddownloadInvoice.apiData.map((data , index) => {
          datasource.push({
            key: index + 1,
            PaymentDate: index + 1,
            TransactionNumber: data.invoice,

            Amount:data.invoice
          });
        })
      : "";
  }
   const handlechange =(event)=>{
    const {value , name}=event.target;

    // a
       setFddownloadInvoice({
        ...fddownloadInvoice,
        [name]:value,
       })
console.log(fddownloadInvoice.type)


       if(value === "dataRange"){
        
        setFddownloadInvoice((prev)=>({
          ...prev,
          type:null,
          isfiled:!prev.isfiled
        }))
       }
   }
  const columns = [
    {
      title: "s#",
      dataIndex: "PaymentDate",
      sorter: (a, b) => a.PaymentDate - b.PaymentDate,
    },
    {
      title: "File",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
    },
    {
      title: "Download",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (text, record) => (
        <>

         <Link to={record.Amount} ><button className="btn btn-primary">Download</button> </Link>
        </>
      )
    },
  ];

  return (
    <>
      <div className="main-wrapper">
        <Header />
        <Sidebar />
        {/*Page wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/*Page Header */}
            <div className="page-header">
              <div className="row">
                <div className="col">
                  <h3 className="page-title">Download Invoice</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Hold Deal Users</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            <div className="row">
              <div className="col-sm-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                            Date Range
                            <span className="login-danger">*</span>
                          </label>
                          <select
                            type="text"
                            onChange={handlechange}
                            name="type"
                            className="form-control"     placeholder="Enther the LENDER ID "  
                            
                          >
                            <option>-- Choose --</option>
                            <option  value="dataRange">Date Range</option>
                          </select>
                        </div>
                      </div>
                      {fddownloadInvoice.isfiled  &&  <div>     <div className="col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                            Date Range
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="date"
                            name="startDate"
                            className="form-control"
                            onChange={handlechange}
                            placeholder="Enther the Start Date"
                          />
                        </div>
                      </div>
                      <div className=" col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                            Date Range
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="date"
                            name="endDate"
                            className="form-control"
                            onChange={handlechange}
                            placeholder="Enther start Date"
                          />
                        </div>
                      </div></div>}

                 
                      <div className="col-3">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary"  onClick={handleSubmit}>
                            Fetch Deatils
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"   


                        columns={columns}
                        dataSource={fddownloadInvoice.apiData ? datasource : []}
                        expandable={true}
                        loading={fddownloadInvoice.loading}
                        // onChange={fddownloadInvoice}  
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

export default FddownloadInvoice;
