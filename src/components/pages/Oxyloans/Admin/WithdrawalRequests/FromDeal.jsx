import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Table, Tag } from "antd";

import Header from "../../../../Header/Header";
import "../borrowersapplications/inserted.css";
import Sidebar from "../../../../SideBar/AdminSidebar";
import { onShowSizeChange } from "../../../../Pagination";
import {
    getborrowerapiclick,
  getintrestedapi,
  getintrestedapiclick,
  getloanborrowerandlender,
  getwallet_to_wallet_initiated_transfer,
  handelcalcluateapi,
  handlecalculatapidata,
  listOfWithdrawalsRequestedByLenders,
} from "../../../../HttpRequest/admin";
import { render } from "@fullcalendar/core/preact";
import Swal from "sweetalert2";


const FromDeal = () => {
  const [intrested, setintrested] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
    userType:"LIVE"
  });
const [apipayload , setapipayload]=useState({
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
  const HandleClick = (id) => {
    setbuttonindex((prevState) => ({
      ...prevState,
      isbuttonvalid: !prevState.isbuttonvalid,
      btnindex: id,
    }));
    console.log(buttonindex.btnindex);
  };
  const membershiphistoryPagination = (Pagination) => {
    setintrested({
      ...intrested,
      defaultPageSize: Pagination.pageSize,
      pageNo: Pagination.current,
      pageSize: Pagination.pageSize,
    });
  };


  useEffect(() => {
    const response = listOfWithdrawalsRequestedByLenders(apipayload);
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data.data.lenderWithdrawalFundsFromDealsResponseDto);
        setintrested({
          ...intrested,
          apiData: data.data.lenderWithdrawalFundsFromDealsResponseDto,
          loading: false,
          hasdata: data.data.totalCount == 0 ? true : true,
        });    console.log(data.data.lenderWithdrawalFundsFromDealsResponseDto)
       
      }
    });

    return () => {};
  }, [intrested.pageNo, intrested.pageSize , apipayload.userType ]);
  console.log(intrested.apiData)
  const datasource = [];

  if (intrested.apiData && intrested.apiData.length > 0) {
      intrested.apiData.forEach((data) => {
          datasource.push({
              key: Math.random(),
              PaymentDate: data,
              TransactionNumber: data,
              Amount: data,
              PaidThrough: data,
              documents: data,
              comments: data,
          });
      });
  }
  

  const handlecalculat = (index) => {
    console.log(index);
    Swal.fire({
      title: "Are you sure?",
      text: "Are You Sure, you want to update the CIBIL Score?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Enter the Cibil score",
          text: "Cibil Score*",
          icon: "warning",
          input: "text", // Use 'input' instead of render
          inputAttributes: {
            className: "form-control",
          },
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.isConfirmed) {
            const inputValue = result.value; // Retrieve the value entered by the user
            // Now you can use inputValue in your logic
            console.log("User input:", inputValue);
            const response = handlecalculatapidata(inputValue, index);

            response.then((data) => {
              console.log(data);
              if (data.request.status == 200) {
                Swal.fire({
                  title: "CIBIL Score",
                  text: "Updated",
                  icon: "success",
                });
              }
            });
          }
        });
      }
    });
  };

  const handlesendoffer = () => {
    Swal.fire({
      text: "Are You Sure, you want to update the CIBIL Score?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      setintrested({
        ...intrested,
        isvaildcard: !intrested.isvaildcard,
      });
      if (result.isConfirmed) {
        console.log(intrested.isvaildcard);
        console.log(intrested.isvaildcard);
      }
    });
  };
  const handlecalculation = async (index) => {
    const response = await handelcalcluateapi(index);
    response.then((data) => {
      console.log(data);
      if (data.request.status == 200) {
        Swal.fire({
          text: "Are You Sure, you want to update the CIBIL Score?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };


  const columns = [
    {
      title: "LR ID & Name",
      dataIndex: "PaymentDate",   
      					 
      sorter: (a, b) => a.PaymentDate - b.PaymentDate,
      render: (render) => (
        <>
    {/* <p>Name : JOHN DOE</p>
  
    <p>Id : LR 57</p>			 */}

<p>LR {render.userId}</p>
   <p>Name: {render.lenderName}</p>
        </>
      ),
    },
    {
      title: "Deal Name",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
      render: (render) => (
        <>
          <div className="insertstart">
   <p>Name : {render.receiverName}</p>
   <p>Id : LR {render.receiverId}</p>

   
          </div>
        </>
      ),
    },
    {
      title: "Requested Info",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
        <p> {render.dealName}</p>
        <p>Deal Id : {render.dealId}</p>
        </>
      ),
    },
    {
      title: "Withdraw Amount",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
          
          <p>{render.amount}</p>

        </>
      ),
    },
    {
      title: "Requested on",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
          
          <p>AC NO : {render.accountNumber}</p>
          <p>IFSC : {render.ifsc}</p>

        </>
      ),
    },
    {
      title: "Bank Details",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
          
          <p>AC NO : {render.accountNumber}</p>
          <p>IFSC : {render.ifsc}</p>

        </>
      ),
    },
    {
      title: "Withdrawal",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
          
          <p>{render.status}</p>
          <Tag>view Withdraw Interest</Tag>

        </>
      ),
    },
    {
      title: "Status	Actions",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
          
          <p>{render.status}</p>

        </>
      ),
    },
  
  ];
  const handleTagClick = () => {
    console.log("but");
  };


  const  handelclickuser=(usertypeparam)=>{

    console.log(intrested);
    console.log(datavalue);

    setapipayload({
      ...apipayload,
      userType:usertypeparam
    })

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
                   LIVE Lender Wallet Transfers info
                  </h3>
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
                 
             
                      <div className="col-3">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary"  onClick={()=>handelclickuser("LIVE")}>
                          View Live User 
                          </button>
                        </div>
                      </div>
                      
                      <div className="col-3">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary"  onClick={()=>handelclickuser("TEST")}>
                          View Test User 
                          </button>
                        </div>
                      </div>
                    </div>   
                    <div>
                      <Table
                        className="table-responsive table-responsive-md table-responsive-lg table-responsive-xs mt-2"
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

export default FromDeal;
