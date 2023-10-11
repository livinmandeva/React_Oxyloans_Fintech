import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import Footer from "../../../Footer/Footer";
import './InvoiceGrid.css'
import { allqueries, cancelled, resolved, pending } from "../../../imagepath";
import {handledetail}  from '../../../HttpRequest/afterlogin'
import MyRichTextEditor from "./MyRichTextEditor";
import { Card, Table } from "antd";

const Participatedeal = () => {


  const [deal , setDeal]=useState({
   apidata:''
  })

useEffect(()=>{

  const handledealinfo = async (dealId)=>{
  const urlparam= new URLSearchParams(window.location.search) 
  var dealId = urlparam.get("dealId");

  console.log(dealId);
   const  response= handledetail(dealId);

   response.then((data)=>{
    
        console.log(data)
        setDeal({
          ...deal,
          apidata:data.data
        })
    })
  }

handledealinfo()
},[])


// const dataSource = [
//   {
//     key: '1',
//     name: 'Mike',
//     loanamount:'pp',
//     availablelimit:'pp',
//     tenureinmonths: '',
//     funding:'',
//     fundingdate:'',
//     minimumparticipation:'',
//     maximumparticipation:'',
//   },
 
// ];


const dataSource = [];

deal.apidata !="" ? 
dataSource.push({
    name: deal.apidata.dealName,
    loanamount:deal.apidata.dealAmount,
    availablelimit:deal.apidata.remainingAmountInDeal,
    tenureinmonths: deal.apidata.duration,
    funding:deal.apidata.fundStartDate,
    fundingdate:deal.apidata.fundEndDate,
    minimumparticipation:deal.apidata.minimumPaticipationAmount,
    maximumparticipation:deal.apidata.lenderParticiptionLimit,

}) : null
const columns = [
  {
    title: 'Deal Name',
    dataIndex: 'name',
    key: 'deal',
  },
  {
    title: 'Loan Amount',
    dataIndex: 'loanamount',
    key: 'loanamount',
  },
  {
    title: 'Available Limit',
    dataIndex: 'availablelimit',
    key: 'availablelimit',
  },
  {
    title: 'Tenure in Months',
    dataIndex: 'tenureinmonths',
    key: 'tenureinmonths',
  },
  {
    title: 'Funding Start Date',
    dataIndex: 'funding',
    key: 'funding',
  },
  {
    title: 'Funding End Date',
    dataIndex: 'fundingdate',
    key: 'fundingdate',
  },
  {
    title: 'Minimum Participation',
    dataIndex: 'minimumparticipation',
    key: 'minimumparticipation',
  },
  {
    title: 'Maximum Participation',
    dataIndex: 'maximumparticipation',
    key: 'maximumparticipation',
  },
];
  return (
    <>
      <div className="main-wrapper">
        {/* Header */}
        <Header />

        {/* Sidebar */}
        <SideBar />

        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content container-fluid">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">
                    {/* Write To Us */}
                     Deal Info</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Deal Info</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}
        <p>Welcome to {deal.apidata.dealName}</p>
        <div   style={{display:'flex',justifyContent:'center'}}>
        <Table dataSource={dataSource} columns={columns}  />


                   
                    </div>
                    <div className="centerdiv">
                    <h4>Your participation to this deal is</h4>

                    <div className="form-group">
                 
                      <input className="form-control-lg form-control-lg1" type="text"   placeholder="Enter amount here..."/>
                    </div>
                    <h4  style={{marginTop: '2rem',}}>Transfer principal payment method </h4>
                   
                    <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDisabled" />
  <label class="form-check-label" for="flexRadioDisabled">
  Move Principal to wallet
  </label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioCheckedDisabled" checked />
  <label class="form-check-label" for="flexRadioCheckedDisabled">
  Move Principal to Bank
  </label>
</div>  
<h3 style={{marginTop: '1rem', marginBottom: '1rem',}}>Choose your pay out method</h3>
<div  className="datarender" style={{marginTop: '3%',}}>

<Card size="meddam"  headStyle={{backgroundColor: '#3d5ee1', color:'white',}} title="OXY FOUNDING LENDER" bodyStyle={{ width: 300,textAlign:'center',}}>
      <p>Choose Your Interest Payout Method</p>
      <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDisabled" />
  <label class="form-check-label" for="flexRadioDisabled">
  Monthly Interest pay-out 1.7% P.M
  </label>
</div>


      <button className="btn btn-primary"  type="submit">Participate Now</button>
    </Card>   

    <Card size="meddam" title="NO Fee To Participate" headStyle={{backgroundColor: '#3d5ee1', color:'white'}} bodyStyle={{ width: 300 ,textAlign:'center' }}>
      <p size="meddam">Choose Your Interest Payout Method</p>
      <div class="form-check">
  <input class="form-check-input" type="radio" name="flexRadioDisabled" id="flexRadioDisabled" />
  <label class="form-check-label" for="flexRadioDisabled">
  Monthly Interest pay-out 1.7% P.M
  </label>
</div>
<button className="btn btn-primary"  type="submit">Participate Now</button>

    </Card>
    </div>          </div>
                    

          </div>

       
          {/* <div   style={{display:'flex',justifyContent:'center'}}>
          <Table dataSource={dataSource} columns={columns} /> 
         
          </div> */}
          {/* Footer */}
          <Footer />
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default Participatedeal;
