import React,{ useEffect, useState }  from "react";
import { Link } from "react-router-dom";

import { Button, Table } from "antd";

import Header from "../../../../Header/Header";
import './inserted.css';
import Sidebar from "../../../../SideBar/AdminSidebar";
import { onShowSizeChange } from "../../../../Pagination";
import { getintrestedapi, handelcalcluateapi, handlecalculatapidata } from "../../../../HttpRequest/admin";
import { render } from "@fullcalendar/core/preact";
import Swal from "sweetalert2";
import Model from "./Model";


const Approvedloan = () => {
  const [intrested, setintrested] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 5,
    defaultPageSize: 5,
    isvaildcard:false,
  });

const [buttonindex , setbuttonindex]=useState({
  btnindex:"",
  isbuttonvalid:false
})
const HandleClick = (id) => {
  setbuttonindex(prevState => ({
    ...prevState,
    isbuttonvalid: !prevState.isbuttonvalid,
    btnindex: id,
  }));
  console.log(buttonindex.btnindex);
}
  const membershiphistoryPagination = (Pagination) => {
    setintrested({
      ...intrested,
      defaultPageSize: Pagination.pageSize,
      pageNo: Pagination.current,
      pageSize: Pagination.pageSize,
    });
  };

 
  useEffect(() => {
    const response = getintrestedapi(
      intrested.pageNo,
      intrested.pageSize
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
            documents:data,
            comments:data,
          });
        })
      : "";
  }    

  const handlecalculat=(index)=>{
    

    console.log(index)
    Swal.fire({
      title: "Are you sure?",
      text: "Are You Sure, you want to update the CIBIL Score?!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {

        Swal.fire({
          title: "Enter the Cibil score",
          text: "Cibil Score*",
          icon: "warning",
          input: 'text', // Use 'input' instead of render
          inputAttributes: {
              className: 'form-control'
          },
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes"
        }).then((result)=> {

          if(result.isConfirmed)  {
            const inputValue = result.value; // Retrieve the value entered by the user
            // Now you can use inputValue in your logic
            console.log("User input:", inputValue);
            const response=  handlecalculatapidata(inputValue  ,index);

            response.then((data) => {
    
              console.log(data)
              if (data.request.status == 200) {
                Swal.fire({
                  title: "CIBIL Score",
                  text: "Updated",
                  icon: "success",
                });
          }});
          }
        })
   
    
     
      }
    });

}


const handlesendoffer =()=>{
  Swal.fire({
    text: "Are You Sure, you want to update the CIBIL Score?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    setintrested({
      ...intrested,
      isvaildcard:!intrested.isvaildcard,
    })
    if (result.isConfirmed) {
    
      
      console.log(intrested.isvaildcard)
      console.log(intrested.isvaildcard)
    }
})
}
  const handlecalculation=async(index)=>{
    const response= await handelcalcluateapi(index);
    response.then((data) => {

      console.log(data)
      if (data.request.status == 200) {
        Swal.fire({
          text: "Are You Sure, you want to update the CIBIL Score?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success"
            });
          }
        });
  }});

}



  const columns = [
    {
      title: "Borrower Id",
      dataIndex: "PaymentDate",
      sorter: (a, b) => a.PaymentDate - b.PaymentDate,
      render: (render) => (
        <>
          <p>BR : -{render.user.id}</p>
          <p><strong>Status:</strong> {render.user.status}</p>
        </>
      )
    },
    {
      title: "Req Date & Exp Date",
      dataIndex: "TransactionNumber",
      sorter: (a, b) => a.TransactionNumber.length - b.TransactionNumber.length,
      render: (render)=>(
        <>
        <div  className="insertstart">
       <p><strong>Req Date:-</strong> {render.loanRequestedDate}</p>
       <p><strong>Exp Date:-</strong> {render.expectedDate}</p>
       </div>
        </>
      )
    },
    {
      title: "Name & Mobile",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>
       <p> {render.user.firstName} {render.user.mobileNumber}</p>
       <p><strong>city :</strong>{render.user.city}</p>
       <p><strong>oxyScore :{render.lenderUser.oxyScore}</strong></p>

        </>
      )
    },
    {
      title: "Email & Address",
      dataIndex: "PaidThrough",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>rateOfInterestToBorrower

       <p>{render.rateOfInterest}% Monthly</p>
       <p>{render.user.email}</p>
       <p>{render.user.address}</p>
       <p><strong>INR</strong> {render.loanRequestAmount}</p>
       <p>{render.rateOfInterest}% Monthly</p>
        </>
      )
    },
    {
      title: "Amount & ROI",
      dataIndex: "documents",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (documents, index) => (
        <>
        {documents && documents.borrowerKycDocuments && documents.borrowerKycDocuments.map((document, docIndex) => (
          <div key={docIndex}>
            <Link to={document.documentSubType =="PAN" && document.downloadUrl} ><p>{document.documentSubType =="PAN" && document.documentSubType}</p>
            </Link>

            <Link to={document.documentSubType =="AADHAR" && document.downloadUrl} ><p>{document.documentSubType =="AADHAR" && document.documentSubType}</p></Link>

            <Link to={document.documentSubType =="PAN" && document.downloadUrl} ><p>{document.documentSubType =="PAN" && document.documentSubType}</p></Link>
            <Link to={document.documentSubType =="Bank Statement" && document.downloadUrl} ><p>{document.documentSubType =="Bank Statement" && document.documentSubType}</p></Link>
            <Link to={document.documentSubType =="PAYSLIPS" && document.downloadUrl} ><p>{document.documentSubType =="PAYSLIPS" && document.documentSubType}</p></Link>
            <Link to={document.documentSubType =="DRIVING LICENCE" && document.downloadUrl} ><p>{document.documentSubType =="DRIVING LICENCE" && document.documentSubType}</p></Link>
            <Link to={document.documentSubType =="VOTERID" && document.downloadUrl} ><p>{document.documentSubType =="VOTERID" && document.documentSubType}</p></Link>
        
            {/* <p>AADHAR</p>
        <p>Passport</p>
        <p>Bank Statement</p>
        <p>PAYSLIPS</p>
        <p>DRIVING LICENCE</p>
        <p>VOTERID</p> */}
          </div>
        ))}
  
      </>
      )
    },
    {
      title: "View documents",
      dataIndex: "comments",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render , index)=>(
        <>
        
   <Button size="small"  type="primary" onClick={()=>HandleClick(render.id)}>   View Admin Comments</Button>

{render.id == buttonindex.btnindex  && <p>

  Location:  <br></br>
Residence Address :<br></br>
Company Name:<br></br>
Company Address :<br></br>
Role :<br></br>
Loan Requirement:<br></br>
Salary :<br></br>
Loan Eligibility:<br></br>
Current EMIs:<br></br>
PAN Password:<br></br>
Payslips Password:<br></br>
Aadhar Password:<br></br>
Bank Password:<br></br>
Cibil Password:<br></br>
</p>}
     <p><strong>Radha Sir Comments</strong></p>
           <p></p>
           
           <p><strong>Comments :</strong></p>
           <p><strong>Duration: </strong>3 Months</p>
           <p><strong>RoI to Lender :</strong>{render.user.commentsRequestDto != null && render.user.commentsRequestDto.rateOfInterestToLender} % PA</p>
           <p><strong>RoI to Borrower :</strong>{render.borrowerUser.commentsRequestDto != null && render.borrowerUser.commentsRequestDto.rateOfInterestToBorrower} % PA</p>
           <p><strong>Rating :</strong></p>
           <p><strong>Borrower Re-Payment :</strong>{render.borrowerUser.commentsRequestDto != null && render.borrowerUser.commentsRequestDto.repaymentMethodForBorrower}</p>
           <p><strong>Lender Re-Payment:</strong> {render.borrowerUser.commentsRequestDto != null && render.borrowerUser.commentsRequestDto.repaymentMethodForLender}</p>
        </>
      )
    },
    {
      title: "Comments",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>
        

      
        </>
      )
    },
    {
      title: "	No.of loan requests",
      dataIndex: "Amount",
      sorter: (a, b) => a.Amount - b.Amount,
      render: (render)=>(
        <>
         {/* <Button size="small"> Risk Calculation</Button>
         <Button size="small">Cibil score</Button>
         <Button size="small">Send Offer</Button>
         <Button size="small">Reject Offer</Button>
         <Button size="small">Approved & Create Deal</Button> */}

         <div  className="divintrested">


         <Button type="primary" size="small"  onClick={()=>handlecalculation(render.id)} > Risk Calculation</Button>
         <Button type="primary" size="small" style={{backgroundColor: 'rgb(0 0 0 / 40%)',}}  onClick={()=>handlecalculat(render.offerSentDetails.id)}>Cibil score</Button>
         <Button type="primary" size="small"style={{backgroundColor: '#1ab70a',border:'#1ab70a'}}    onClick={()=>handlesendoffer()}>Send Offer</Button>
         <Button type="primary" size="small" style={{     background: 'tomato'}}>Reject Offer</Button>
         <Button type="primary" size="small"style={{backgroundColor: 'green',border:'green'}}>Approved & Create Deal</Button>
         </div>
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
                  <h3 className="page-title">
                    Intrested Borrower Loan Applications
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
                            <span className="login-danger">*</span>
                          </label>
                          <select
                            type="text"
                            name="withdrawFeedback"
                            className="form-control"
                            placeholder="Enther the LENDER ID "
                          >
                            <option>-- Choose --</option>
                            <option>Date Range</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-12 col-sm-3">
                        <div className="form-group local-forms">
                          <label>
                            Date Range
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="withdrawFeedback"
                            className="form-control"
                            placeholder="Enther the Start Date"
                          />
                        </div>
                      </div>
                      <div className="col-3">
                        <div className="student-submit">
                          <button type="button" className="btn btn-primary">
                            Fetch Deatils
                          </button>
                        </div>
                      </div>
                    </div>{intrested.isvaildcard  && <>   <Model />
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

export default Approvedloan;
