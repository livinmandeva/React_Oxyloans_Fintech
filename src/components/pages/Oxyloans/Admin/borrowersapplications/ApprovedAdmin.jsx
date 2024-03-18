import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Button, Table, Tag } from "antd";

import Header from "../../../../Header/Header";
import "./inserted.css";
import Sidebar from "../../../../SideBar/AdminSidebar";
import { onShowSizeChange } from "../../../../Pagination";
import {
  getintrestedapi,
  getintrestedapiclick,
  getloanborrowerandlender,
  handelcalcluateapi,
  handlecalculatapidata,
} from "../../../../HttpRequest/admin";
import { render } from "@fullcalendar/core/preact";
import Swal from "sweetalert2";
import Model1 from "./Model1";

const ApprovedAdmin = () => {
  const [intrested, setintrested] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
    isvaildcard: true,
    isfiledvaild:false
  });


  const  [datavalue   ,setdatavalue]=useState({
    inputfiled:"",
    fieldValue:"",
    inputfiledvalue:false
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
        inputfiled:"Name"
      });
    } else if (event.target.value === "Borrowers id") {
      setdatavalue({
        ...datavalue,
        inputfiledvalue: true,
        inputfiled:"Borrowers id",
      });
    }
  };
  useEffect(() => {
    const response = getintrestedapi(intrested.pageNo, intrested.pageSize);
    response.then((data) => {
      if (data.request.status == 200) {
        console.log(data.data.results);
        setintrested({
          ...intrested,
          apiData: data.data.results,
          loading: false,
          hasdata: data.data.count == 0 ? false : true,
        });
      }
    });
    return () => {};
  }, [intrested.pageNo, intrested.pageSize]);

  const datasource = [];
  {
    intrested.apiData != ""
      ? intrested.apiData.map((data) => {
          datasource.push({
            key: Math.random(),
            PaymentDate: data,
            TransactionNumber: data,
            Amount: data,
            PaidThrough: data,
            documents: data,
            comments: data,
          });
        })
      : "";
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
      title: "User Info",
      dataIndex: "PaymentDate",
      sorter: (a, b) => a.PaymentDate - b.PaymentDate,
      render: (render) => (
        <>
          <p>BR : -{render.user.id}</p>
          <p>
            <strong>Status:</strong> <br></br>
            {render.user.status}
          </p>
        </>
      ),
    },
    {
      title: "Req Date & Exp Date",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
      render: (render) => (
        <>
          <div className="insertstart">
            <p>
              <strong>Req Date:-</strong> {render.loanRequestedDate}
            </p>
            <p>
              <strong>Exp Date:-</strong> {render.expectedDate}
            </p>
          </div>
        </>
      ),
    },
    {
      title: "Name & Mobile",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
          <p>
            {" "}
            {render.user.firstName} {render.user.mobileNumber}
          </p>
          <p>
            <strong>city :</strong>
            {render.borrowerUsercity}
          </p>
          <p>
            <strong>oxyScore :{render.lenderUser.oxyScore}</strong>
          </p>
        </>
      ),
    },
    {
      title: "Email & Address",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
          <p>{render.user.email}</p>
          <p>{render.user.address}</p>
        </>
      ),
    },
    {
      title: "View documents",
      dataIndex: "documents",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (documents, index) => (
        <>
          {documents &&
            documents.borrowerKycDocuments &&
            documents.borrowerKycDocuments.map((document, docIndex) => (
              <div key={docIndex}>
                <Link
                  to={document.documentSubType == "PAN" && document.downloadUrl}
                >
                  <p>
                    {document.documentSubType == "PAN" &&
                      document.documentSubType}
                  </p>
                </Link>

                <Link
                  to={
                    document.documentSubType == "AADHAR" && document.downloadUrl
                  }
                >
                  <p>
                    {document.documentSubType == "AADHAR" &&
                      document.documentSubType}
                  </p>
                </Link>
                <Link
                  to={
                    document.documentSubType == "Bank Statement" &&
                    document.downloadUrl
                  }
                >
                  <p>
                    {document.documentSubType == "Bank Statement" &&
                      document.documentSubType}
                  </p>
                </Link>
                <Link
                  to={
                    document.documentSubType == "PASSPORT" &&
                    document.downloadUrl
                  }
                >
                  <p>
                    {document.documentSubType == "PASSPORT" &&
                      document.documentSubType}
                  </p>
                </Link>
                <Link
                  to={
                    document.documentSubType == "DRIVINGLICENCE" &&
                    document.downloadUrl
                  }
                >
                  <p>
                    {document.documentSubType == "DRIVINGLICENCE" &&
                      document.documentSubType}
                  </p>
                </Link>
                <Link
                  to={
                    document.documentSubType == "VOTERID" &&
                    document.downloadUrl
                  }
                >
                  <p>
                    {document.documentSubType == "VOTERID" &&
                      document.documentSubType}
                  </p>
                </Link>
                <Link
                  to={
                    document.documentSubType == "PAYSLIPS" &&
                    document.downloadUrl
                  }
                >
                  <p>
                    {document.documentSubType == "PAYSLIPS" &&
                      document.documentSubType}
                  </p>
                </Link>
                <Link
                  to={
                    document.documentSubType == "BANKSTATEMENT" &&
                    document.downloadUrl
                  }
                >
                  <p>
                    {document.documentSubType == "BANKSTATEMENT" &&
                      document.documentSubType}
                  </p>
                </Link>
              </div>
            ))}
        </>
      ),
    },
    {
      title: "Comments",
      dataIndex: "comments",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render, index) => (
        <>
          <Tag color="#2db7f5" onClick={() => HandleClick(render.id)}>
            Click here to view the comments
          </Tag>

          {intrested.isfiledvaild &&  <>

            <br></br>
            Location:
            <br></br>
            Residence Address :
            <br></br>
            Company Name:
            <br></br>
            Company Address :
            <br></br>
            Role :
            <br></br>
            Loan Requirement:
            <br></br>
            Salary :
            <br></br>
            Loan Eligibility:
            <br></br>
            Current EMIs:
            <br></br>
            PAN Password:
            <br></br>
            Payslips Password:
            <br></br>
            Aadhar Password:
            <br></br>
            Bank Password:
            <br></br>
            Cibil Password:
            <br></br>
            Commets Section Before Nov 25th 2020:-</>}
        </>
      ),
    },
    {
      title: "Risk calculations & send offer",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render) => (
        <>
          {/* <Button size="small"> Risk Calculation</Button>
         <Button size="small">Cibil score</Button>
         <Button size="small">Send Offer</Button>
         <Button size="small">Reject Offer</Button>
         <Button size="small">Approved & Create Deal</Button> */}

          <div className="divintrested">
            <Link to="">
              View Requests &<br></br> Responses to this borrower
            </Link>
            <Tag color="#f50">Reject Offer</Tag>
            <Tag color="#3d5ee1" onClick={() => HandleClick(render.id)}>
              APP Level Approved
            </Tag>
          </div>
        </>
      ),
    },
  ];
  const handleTagClick = () => {
    console.log("but");
  };


  const  handelclickuser=()=>{
    const response = getintrestedapiclick(
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
                  Lender and Borrower agreed loans
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
                      <div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                            Date Range
                            <span className="login-danger"></span>
                          </label>
                          <select
                            type="text"
                            name="inputfiled"
                            className="form-control"
                            placeholder="Enther the LENDER ID "
                            onChange={handelchange}
                          >
                            <option>-- Choose --</option>
                            <option value="Borrowers id">Borrowers id</option>
                            <option value="Name">Name</option>
                          </select>
                        </div>
                      </div>

{datavalue.inputfiledvalue  && <><div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                            {datavalue.inputfiled}
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="fieldValue"  
                            className="form-control" 
                            onChange={handelchange}
                            // placeholder={datavalue.inputfiled}
                          />
                        </div>
                      </div></>}
                      <div className="col-3">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary"  onClick={()=>handelclickuser()}>
                            Fetch Deatils
                          </button>
                        </div>
                      </div>
                    </div>     {intrested.isfiledvaild  && <>   <Model1 />
                    </>}
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

export default ApprovedAdmin;
