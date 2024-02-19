import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Table } from "antd";

import Header from "../../../../Header/Header";
import Sidebar from "../../../../SideBar/AdminSidebar";
import './stuenloanprocess.css'
import { onShowSizeChange } from "../../../../Pagination";
import { getborrowerLoanStatusapi } from "../../../../HttpRequest/admin";
import { useTrail } from "react-spring";

const BorrowerLoanStatus = () => {



  const [borrowerLoanStatusapi ,setborrowerLoanStatusapi]=useState({
    apiData: "",
    hasdata: false,
    loading: true,
    pageNo: 1,
    pageSize: 10,
    userId:"",
        modeldata:"",
    fdAmount:"",
    accountNumber:"",
    userName:"",
    loanType:"",
    ifsc:"",
    defaultPageSize: 10,
    dataindexdata:1
    
  })

  const borrowerLoanStatusapiPagination = (Pagination) => {
    setborrowerLoanStatusapi({
      ...borrowerLoanStatusapi,
      defaultPageSize: Pagination.pageSize,
      pageNo: Pagination.current,
      pageSize: Pagination.pageSize,
    });
  };





  useEffect(()=>{
    const response = getborrowerLoanStatusapi(
      borrowerLoanStatusapi.pageNo ,
       borrowerLoanStatusapi.pageSize
    );
    response.then((data) => {
      if (data.request.status == 200) {
    
        setborrowerLoanStatusapi({
          ...borrowerLoanStatusapi,
          apidata:data.data,
          loading:false,
          hasdata:data.data.count == 0 ? false : true,
        });console.log(data.data.borrowerNewBankDetailsResponseDto)
      }
    });
  } ,[])

  useEffect(()=>{
    const response = getborrowerLoanStatusapi(
      borrowerLoanStatusapi.pageNo ,
       borrowerLoanStatusapi.pageSize
    );
    response.then((data) => {
      if (data.request.status == 200) {
    
        setborrowerLoanStatusapi({
          ...borrowerLoanStatusapi,
          apidata:data.data,
          loading:false,
          hasdata:data.data.count == 0 ? false : true,
        });console.log(data.data.borrowerNewBankDetailsResponseDto)
      }
    });
  },[borrowerLoanStatusapi.pageNo  , borrowerLoanStatusapi.pageSize])



  const  handlegetcurrentid=(index)=>{
    
      setborrowerLoanStatusapi({
        ...borrowerLoanStatusapi,
        dataindexdata:index,
        modeldata:borrowerLoanStatusapi.apidata.borrowerNewBankDetailsResponseDto[index]
      })
      // console.log(index)
      // console.log(borrowerLoanStatusapi.apidata.borrowerNewBankDetailsResponseDto[index])
      
      
  }
  const handelprevclick = () => {
    if (borrowerLoanStatusapi.pageNo > 0    ) {
      setborrowerLoanStatusapi(prevstate => ({
        ...prevstate,
        pageNo: prevstate.pageNo - 10
      }));
      console.log("handelprevclick");
    }
  };
  
const  handlechange =(event)=>{
const {name , value}=event.target;


setborrowerLoanStatusapi({
  ...borrowerLoanStatusapi,
  [name]:value,
})
}
  const handelNextclick =()=>{
    setborrowerLoanStatusapi(nextstate  =>({

      ...nextstate,
      pageNo: nextstate.pageNo + 10
    }))

    console.log("handelNextclick")
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
                  <h3 className="page-title">Verifed FD Users</h3>
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
                      <div className="col-12 col-sm-4">
                        <div className="form-group local-forms">
                          <label>
                            Search User Id :
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="withdrawFeedback"
                            className="form-control"
                            placeholder="Enther the LENDER ID "
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
                    </div>

                    <table className="table">
  <thead>
    <tr>
      <th scope="col">Borrower Info</th>
      <th scope="col">FD INFO</th>
      <th scope="col">Bank Info</th>
      <th scope="col">FD Amount</th>
      <th scope="col">Edit</th>
    </tr>
  </thead>
  <tbody>
  {/* {
    "userId": 16,
    "accountNumber": "026291800001191",
    "ifsc": "YESB0000262",
    "city": "MUMBAI",
    "branch": "SANTACRUZ, MUMBAI",
    "bankName": "YES BANK",
    "userName": "JOHN DOE",
    "bankChoosen": "YES BANK",
    "leadBy": "SUBBU",
    "consultancy": "LEO",
    "roi": 0.6,
    "fundingType": "DAYS",
    "country": "uk",
    "university": "oxford",
    "studentMobileNumber": "0123456789",
    "fdAmount": 10000,
    "bankDetailsVerifiedOn": null,
    "fdCreatedDate": null,
    "paymentId": null,
    "days": null,
    "fdAmountFromSystem": null,
    "fdValidityDate": null,
    "registeredMobileNumber": null,
    "nameFromProfile": null,
    "fdClosedDate": null,
    "status": null,
    "feeInvoice": null,
    "paymentsCollection": "STUDENT",
    "loanType": "ASSET"
} */}
    {/* {console.log(borrowerLoanStatusapi.apidata.borrowerNewBankDetailsResponseDto)} */}
    {borrowerLoanStatusapi.apidata && borrowerLoanStatusapi.apidata.borrowerNewBankDetailsResponseDto && borrowerLoanStatusapi.apidata.borrowerNewBankDetailsResponseDto.length !== 0 &&
  borrowerLoanStatusapi.apidata.borrowerNewBankDetailsResponseDto.map((data, index) => (
    <tr key={index}>
      <td>
        <div className="pargra">
          <p><strong>ID :</strong> BR {data.userId}</p>
          <p><strong>Name :</strong> {data.userName}</p>
          <p><strong>Funding Type :</strong> {data.fundingType}</p>
          <p><strong>Fee payer :</strong> {data.paymentsCollection}</p>
        </div>
      </td>
      <td>
        <div className="pargra">
          <p><strong>Amount :</strong> {data.fdAmount}</p>
          <p><strong>Lead By :</strong> {data.leadBy}</p>
          <p><strong>RoI :</strong> {data.roi} % PM</p>
        </div>
      </td>
      <td>
        <div className="pargra">
          <p><strong>Ac No :</strong> {data.accountNumber}</p>
          <p><strong>Ifsc :</strong> {data.ifsc}</p>
          <p><strong>Bank Name :</strong> {data.bankName}</p>
        </div>
      </td>
      <td>
        <div className="pargra">
          <p><strong>Amount :</strong> {data.fdAmount}</p>
          <p><strong>Loan Type :</strong> {data.loanType}</p>
        </div>
      </td>
      <td>
        <button type="button" className="btn btn-primary"    class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={()=>handlegetcurrentid(index)}>Edit</button>
      </td>
    </tr>
  ))
}

  </tbody>
</table>

<nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item"><a class="page-link" href="#" onClick={handelprevclick}>Previous</a></li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#"   onClick={handelNextclick}>Next</a></li>
  </ul>
</nav>
</div>

                 
                </div>
                <>
                
                    


<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">Edit the Bank Details</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
    {/* {console.log(borrowerLoanStatusapi.dataindexdata)}

    {borrowerLoanStatusapi.apidata && borrowerLoanStatusapi.apidata.borrowerNewBankDetailsResponseDto && borrowerLoanStatusapi.apidata.borrowerNewBankDetailsResponseDto.length !== 0 &&     console.log(borrowerLoanStatusapi.apidata.borrowerNewBankDetailsResponseDto[borrowerLoanStatusapi.dataindexdata])
     } */}



<div class="row g-3 align-items-center">

                      </div>
                 



<div   className="gapdata">
  <div className="row"  style={{marginTop: '20px',}}>
<div className=" col-sm-6">
                        <div className="form-group local-forms">
                          <label>
                          Borrower ID
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"   
                            name="userId"
                            value={borrowerLoanStatusapi.modeldata.userId}
                            className="form-control"
                            placeholder="Borrower ID "
                            onChange={handlechange}
                          />
                        </div>
                      </div>   

                      <div className="col-sm-6">
                        <div className="form-group local-forms">
                          <label>
                          FD Amount  :
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                         
                            className="form-control"
                            value={borrowerLoanStatusapi.modeldata.fdAmount}
                            name="fdAmount"
                            placeholder="Enther the FD Amount"
                            onChange={handlechange}
                          />
                        </div>
                      </div>


                      </div>
                      <div className="row" >
                <div className=" col-sm-6">
                        <div className="form-group local-forms">
                          <label>
                                Account Number: 
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="accountNumber"
                            className="form-control" 
                            value={borrowerLoanStatusapi.modeldata.accountNumber}  
                            onChange={handlechange}
                            placeholder="Account Number "
                          />
                        </div>
                      </div>   

                      <div className="col-sm-6">
                        <div className="form-group local-forms">
                          <label>
                                  Name As Per Bank  :
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="userName"
                            className="form-control"
                            value={borrowerLoanStatusapi.modeldata.userName}
                            onChange={handlechange}
                            placeholder="Name As Per Bank  "
                          />
                        </div>
                      </div>


                      </div>


                      
                      <div className="row" >
<div className=" col-sm-6">
                        <div className="form-group local-forms">
                          <label>
                            IFSC  : 
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="ifsc"
                            className="form-control"
                            value={borrowerLoanStatusapi.modeldata.ifsc}
                            onChange={handlechange}
                            placeholder="Enther ifsc"
                          />
                        </div>
                      </div>   

                      <div className="col-sm-6">
                        <div className="form-group local-forms">
                          <label>
                                      Loan Type  :
                            <span className="login-danger">*</span>
                          </label>
                          <input
                            type="text"
                            name="loanType"
                            className="form-control"
                            value={borrowerLoanStatusapi.modeldata.loanType}
                            placeholder="Enther  Loan Type "
                            onChange={handlechange}
                          />
                        </div>
                      </div>  


                      </div>
</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Submit</button>
        <button type="button" class="btn btn-primary">Cancel</button>
      </div>
    </div>
  </div>
</div></>
              </div>
            </div>
          </div>
        </div>
        {/*Page wrapper */}
      </div>
    </>
  );
};

export default BorrowerLoanStatus;
