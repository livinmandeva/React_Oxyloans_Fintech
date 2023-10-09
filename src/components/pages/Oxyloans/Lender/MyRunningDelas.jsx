import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import "./InvoiceGrid.css";
import {myrunnig ,  paticipationChanges1 ,viewdealamountemi} from '../../../HttpRequest/afterlogin'
import Modall from "./Modall";
import Modell from "./Modell";
import AlertTable from "./AlertTable";
import ModalComponet from "../../Base UI/ModalComponet";




const MyRunningDelas = () => {
 

 const [runningdeals , setrunningdeals]=useState({
   data:"",
   modelopen:false,
   paticipationChanges:"",
   dealID:'',
   isModalVisible:false,
   principal_return_account_type:false,
   dealLevelLoanEmiCard:"",
   model2:false,
 })
const [modelopen,setOpen]=useState(false)

 useEffect(()=>{


  const response =myrunnig(runningdeals)
  response.then((data)=>{
   console.log(data)
   setrunningdeals({
     ...runningdeals,
     data:data.data.lenderPaticipatedResponseDto,
   })
   console.log(data.data.lenderPaticipatedResponseDto)


  })
 },[])
 

 const handlemodalopen = (dealId) => {
  
  const response = viewdealamountemi(dealId);
  console.log(response);
  response.then((data) => {
    setrunningdeals({
      ...runningdeals,
      dealLevelLoanEmiCard: data,
    });
  });
  setOpen(!modelopen)
}
// principal_return_account_type      {
//   "userId": "8",
//   "dealId": "2",
//   "accountType": "WALLET"
// }
const principal_return_account_type = () => {
        setrunningdeals({
          ...runningdeals,
          isModalVisible: !runningdeals.isModalVisible,
        })

}

const paticipationChanges = (dealId) => {
  const response = paticipationChanges1(dealId);

  response.then((data) => {
    localStorage.setItem("paticipationChanges", data.data)
    console.log(data.data);

    setrunningdeals({
      ...runningdeals,
      paticipationChanges:data.data,
      model2: !runningdeals.model2,
    });    
  });
};



  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header />
        {/* Sidebar */}
        <SideBar />
        {/* Page Wrapper */}
        <div class="page-wrapper">
          <div class="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Participated & Closed Deals </h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">My running delas</li>
                    {/* {paticipationChanges  && <Modall />} */}
                    {modelopen && <Modall data={runningdeals.dealLevelLoanEmiCard} open={modelopen}/>}
                    {console.log(runningdeals.paticipationChanges)}
                 {/* {runningdeals.model2 && <Modell data={runningdeals.paticipationChanges}  open={runningdeals.model2}/>} */}  
                 {runningdeals.model2 && <AlertTable data={runningdeals.paticipationChanges}  open={runningdeals.model2}/>}   
                 {runningdeals.isModalVisible && <ModalComponet data={"Are You Sure, you want to move the principal amount to Wallet?"} heading={"Info !"} />}
                  </ul>
                </div>
              </div>
            </div>


            {Array.isArray(runningdeals.data) ? (
  runningdeals.data.map((data, index) => (
    <div className="row" key={index}>
            <>
              <div className="card invoices-tabs-card border-0">
                <div className="card-body card-body pt-0 pb-0">
                  <div className="invoices-main-tabs border-0 pb-0"></div>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-12 col-lg-12 col-xl-12 col-12 my-lg-2">
                  <div className="card invoices-grid-card w-100">
                    <div className="card-header row">
                      <Link
                        to="/viewinvoice"
                        className="invoice-grid-link col-sm-12 col-lg-4"
                      >
                        Deal Name: {data.dealName}   {localStorage.setItem("dealID",data.dealId)}
                      </Link>

                      <div className="col-sm-12 col-lg-2">RoI : 24 % PA</div>
                      <div className="col-sm-12 col-lg-3">
                        Tenure : {data.dealDuration}
                      </div>
                      <div className="col-auto col-lg-3">
                        Participated :  1000
                      </div>
                      {/* <div>Status : Open</div> */}
                    </div>
                    <div className="card-middle row">
                      <div className="col-sm-12 col-lg-6">
                        <h6>Deal Type : {data.dealType}</h6>
                        <h6>First Interest : {data.firstInterestDate}</h6>
                        <h6>Participated Date : {data.firstParticipationDate}</h6>
                      </div>
                      <div className="col-sm-12 col-lg-6">
                        <small>
                          Comments : We wish every registered Lender to
                          experience the system without paying processing fee.
                          We trust a good one month experience will enable
                          lender to pay fee and participate with higher amounts.
                        </small>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-sm-6 col-lg-2">
                          <span>Deal-ID </span>
                          <h6 className="mb-0">{data.dealId}</h6>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                          <span>Interest Earned</span>
                          <h6 className="mb-0">{data.interestEarned}</h6>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                          <span>Payout to </span>
                          <h6 className="mb-0">{data.lederReturnType}</h6>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                          <span>Is ATW</span>
                          <h6 className="mb-0">NO</h6>
                        </div>
                        <div className="col-sm-6 col-lg-2">
                          <span>ATW ROI</span>
                          <h6 className="mb-0">{data.dealRateofinterest}  %</h6>
                        </div>

                        <div className="col-sm-6 col-lg-2">
                          <span>Deal Status</span>
                          <h6 className="mb-0"> {data.participationStatus}</h6>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <div className="row align-items-center">
                        <div className="col-auto">
                          <button className="badge bg-success-dark"  onClick={()=>{paticipationChanges(data.dealId)}}>
                            Participation Details
                          </button>
                        </div>

                        <div className="col-auto">
                        <button className="badge bg-primary-dark" onClick={() => handlemodalopen(data.dealId)}>

                          {/* <button className="badge bg-primary-dark" onClick={ ()=>handlemodalopen(runningdeals.dealId)}> */}
                            View Statement
                          </button>     
                          
                        </div>

                        <div className="col-auto">
                          <a  href={data.groupLink} className="badge bg-success">
                            <i className="fa fa-whatsapp"></i> Join Deal
                          </a>
                        </div>


                        
                        <div className="col-auto">
                          <Link className="badge bg-danger" to={`/writetous?dealName=${data.dealName}&&dealId=${data.dealId}`}>Raise A query</Link>
                        </div>

                        <div className="col-auto">
                          <span className="badge bg-info" onClick={principal_return_account_type}>Edit PayOut</span>
                        </div>

                        <div className="col-auto">
                          <span className="badge bg-success-dark">
                            Participate
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>

      {/* Your card component and content */}
    </div>
  ))
) : (
  <p>No data available</p>
)}
          </div>
        </div>
        {/* /Page Wrapper */}
      </div>
    </>
  );
};

export default MyRunningDelas;
