import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Button, Table, Tag } from "antd";

import Header from "../../../../Header/Header";
import "../borrowersapplications/inserted.css";
import Sidebar from "../../../../SideBar/AdminSidebar";
import { onShowSizeChange } from "../../../../Pagination";
import {
  HandleClickDisbursmentapi,
  HandleClickRepaymentapi,
    dealwithdrawalinterest,
    getborrowerapiclick,
  getdealWithdrawRequest,
  getintrestedapi,
  getintrestedapiclick,
  getloanborrowerandlender,
  handelcalcluateapi,
  handlecalculatapidata,
} from "../../../../HttpRequest/admin";
import { render } from "@fullcalendar/core/preact";
import Swal from "sweetalert2";
import { WarningAlertSuccess } from "../../../Base UI Elements/SweetAlert";


const Hh2h2WithdrawalApprove = () => {
  const [intrested, setintrested] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
    isvaildcard: true,
    inputfiledvalue2:false,
    isfiledvaild:false,
    inputfiled2:"",
    inputselectcity:false,
    inpututm:false
  });



  const [fronmdealdata , setfromdealdata]=useState({
      pageNo: 1,
      pageSize: 10,
      userType: "LIVE"
  })
  const  [datavalue   ,setdatavalue]=useState({
    inputfiled:"",
    fieldValue:"",
    fieldValue2:"",
    utmamountfiled:"",
    inputfiledvalue:false,
    fieldValue3:"",
    fieldValue31:"",
  })

  const [buttonindex, setbuttonindex] = useState({
    btnindex: "",
    isbuttonvalid: false,
  });
  const HandleClickRepayment =async (id) => {

  
   try {
    const response = await HandleClickRepaymentapi(id);
    if (response.status === 200) {
        console.log(response.data);
        WarningAlertSuccess(response.data.status);
    } else {
        console.error("Request failed with status:", response.status);
    }
} catch (error) {
    console.error("Error occurred:", error);
}
  };   
  const HandleClickDisbursment =async (id) => {
    try {
      const response = await HandleClickDisbursmentapi(id);
      if (response.status === 200) {
          console.log(response.data);
          WarningAlertSuccess(response.data.status);
      } else {
          console.error("Request failed with status:", response.status);
      }
  } catch (error) {
      console.error("Error occurred:", error);
  }
   };  
  const membershiphistoryPagination = (Pagination) => {
    setintrested({
      ...intrested,
      defaultPageSize: Pagination.pageSize,
      pageNo: Pagination.current,
      pageSize: Pagination.pageSize,
    });
  };

  const handelchange = (event) => {
    const { name, value } = event.target;
    setdatavalue({
      ...datavalue,
      [name]: value
    });
  
    console.log(event.target.value);
  
    if (event.target.value === "Name") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiled:"Name",
        inputselectcity:false,
        inputfiledvalue2:false,
        inpututm:false,
      });

     
    } else if (event.target.value === "borrowersid") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiled:"borrowers id",
        inputselectcity:false,
        inputfiledvalue2:false,
        inpututm:false,
      });
    }else if (event.target.value === "roi") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiledvalue2:true,
        inputfiled:"Min Roi",
        inputfiled2:"Max",
        inputselectcity:false,
        inpututm:false,
      });
    }else if (event.target.value === "amount") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiledvalue2:true,
        inputfiled:"Min Amount",
        inputselectcity:false,
        inpututm:false,
        inputfiled2:"Max ",
      });
    }else if (event.target.value === "amount&city") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiledvalue2:true,
        inputfiled:"amount&city",
        inputfiled1:"Min Amount",
        inputfiled2:"Max ",
        inputselectcity:true,
        inpututm:false
      });
    }else if (event.target.value === "city") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: false,
        inputfiledvalue2:false,
        inputselectcity:true,
        isfiledvaild:false,
        inpututm:false
      });
    }else if (event.target.value === "mobileNumber") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiled:"mobileNumber",
        inputfiledvalue2:false,
        inputselectcity:false,
      });
    }else if (event.target.value === "oxyscore") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiledvalue1:false,
        inputfiled:"oxyscore",
        
        inpututm:false,
      });
    }else if (event.target.value === "pannumber") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiled:"pannumber",
        inputfiledvalue2:false,
        inputfiled2:"OxyScore",
        inputselectcity:false,
        inpututm:false,
        inputselectcity:false,
      });
    }else if (event.target.value === "utm") {
      setdatavalue({
        ...datavalue,
        inputfiled:"utm",
        inputfiledvalue: false,
        inputfiledvalue2: false,
        inputselectcity:false,
        inpututm:true
      });
    }else if (event.target.value === "utm&amount") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        utmamountfiled:"utm&amount",
        inputfiled:"Min Amount",
        inputfiled2:"Max Amount",
        inputfiledvalue2: true,
        inputselectcity:false,
        inpututm:true
      });
    }else if (event.target.value === "utm&city") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: false,
        inputfiled:"utm&city",
        inputfiledvalue2:false,
        inpututm:true,
        inputselectcity:true
      });
    }else if (event.target.value === "utm&city") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiled:"utm&city",
        inpututm:true
      });
    }
  };  const { userId } = useParams(); 
  useEffect(() => {
    
    // const response = getintrestedapi(intrested.pageNo, intrested.pageSize);
    // response.then((data) => {
    //   if (data.request.status == 200) {
    //     console.log(data.data.results);
    //     setintrested({
    //       ...intrested,
    //       apiData: data.data.results,
    //       loading: false,
    //       hasdata: data.data.count == 0 ? false : true,
    //     });
    //   }
    // });

    const searchParams = new URLSearchParams(window.location.search);
    const userIdFromParams = searchParams.get('userId');
      console.log(userIdFromParams)
    // if (userIdFromParams) {
    //   dealWithdrawalInterest(userIdFromParams);
    // }
    const response = dealwithdrawalinterest(userIdFromParams);
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data.data);
        setintrested({
          ...intrested,
          apiData: data.data,
          loading: false,
          hasdata: data.data.count == 0 ? false : true,
        });
      }
    });
    return () => {};
  }, [intrested.pageNo, intrested.pageSize]);

  const datasource = [];
  if (intrested.apiData !== "") {
    datasource.push({
        PaymentDate: intrested.apiData,
        TransactionNumber: intrested.apiData,
        Amount: intrested.apiData,
        PaidThrough: intrested.apiData,
        documents: intrested.apiData,
        comments: intrested.apiData
    });
}


  const columns = [
    {					
      title: "Deal Id",
      dataIndex: "PaymentDate",
      sorter: (a, b) => a.PaymentDate - b.PaymentDate,
      render: (render) => (
        <>
        <p>{render.dealId}</p>
    
        </>
      ),
    },
    {
      title: "Principal Amount",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
      render: (render) => (
        <>
          <div className="insertstart">
          <p>{render.amount}</p>
        {/* <p>Deal Id :{render.dealId}</p> */}
          </div>
        </>
      ),
    },
    {
      title: "Interest Amount",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
          <p>
          {render.interestAmount}
          </p>
        </>
      ),
    },
    {
      title: "Request Date",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
          <p>{render.approvedDate}</p>

        </>
      ),
    },
    {
      title: "Approved Date",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
              {/* <p>    {render.approvedDate}</p> */}
<p>   {render.approvedDate}</p>

        </>
      ),
    },
    {
      title: "Move to Funds",
      dataIndex: "documents",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (documents, index) => (
        <>

          <Tag color="#2db7f5" onClick={() => HandleClickDisbursment(documents.id)}>
          Disbursment Account
          </Tag>
          <Tag color="#2db7f5" onClick={() => HandleClickRepayment(documents.id)}>
          Repayment Account
          </Tag>

        </>
      ),
    },

  ];
  const handleTagClick = () => {
    console.log("but");
  };


  const  handelclickuser=()=>{

    console.log(intrested);
    console.log(datavalue);
    const response = getborrowerapiclick(
      intrested,
      datavalue
   
    );
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data.data.results)
        setintrested({
          ...intrested,
          apiData: data.data.results,
          loading: false,
          hasdata: data.data.count == 0 ? false : true,
        });
      }
    });
  }
   
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
                  <h3 className="page-title">
                  User Withdrawal Approved List
                  </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">User Withdrawal Approved List</li>
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
                 
           
                    </div>   
                    <div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs"
                        // pagination={{
                        //   total: membershiphistory.apiData.count,
                        //   showTotal: (total, range) =>
                        //     `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                        //   position: ["topRight"],
                        //   showSizeChanger: false,
                        //   onShowSizeChange: onShowSizeChange,
                        // }}
                        columns={columns}
                        dataSource={intrested.hasdata ? datasource : []}
                        expandable={true}
                        loading={intrested.loading}
                        onChange={membershiphistoryPagination}
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

export default Hh2h2WithdrawalApprove;
