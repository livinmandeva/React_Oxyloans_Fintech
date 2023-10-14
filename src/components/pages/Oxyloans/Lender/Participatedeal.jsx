import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import Footer from "../../../Footer/Footer";
import "./InvoiceGrid.css";
import { allqueries, cancelled, resolved, pending } from "../../../imagepath";
import { handledetail   , handlecashapi} from "../../../HttpRequest/afterlogin";
import MyRichTextEditor from "./MyRichTextEditor";
import { Card, Table } from "antd";
import { useHistory } from "react-router-dom";

const Participatedeal = () => {

  const history =useHistory()
  const [deal, setDeal] = useState({
    apidata: "",
    transactionNumber:'',
    accountType:'',
    lenderFeeId:'',
    lenderReturnType:'',
    lenderFeeId:'',
    participatedAmount:'',
    bank:'',
    wallet:''

  });

  


  useEffect(() => {
    const handledealinfo = async (dealId) => {
      const urlparam = new URLSearchParams(window.location.search);
      var dealId = urlparam.get("dealId");

      console.log(dealId);
      const response = handledetail(dealId);

      response.then((data) => {
        console.log(data);
        setDeal({
          ...deal,
          apidata: data.data,
          
        });
        if(data.data.yearlyInterest != 0){
          setDeal({
            ...deal,
            lenderReturnType: "YEARLY",
            
          });
        }
      });
    };

    handledealinfo();
  }, []);

  const dataSource = [];

  deal.apidata != ""
    ? dataSource.push({
        name: deal.apidata.dealName,
        loanamount: deal.apidata.dealAmount,
        availablelimit: deal.apidata.remainingAmountInDeal,
        tenureinmonths: deal.apidata.duration + "M",
        funding: deal.apidata.fundStartDate,
        fundingdate: deal.apidata.fundEndDate,
        minimumparticipation: deal.apidata.minimumPaticipationAmount,
        maximumparticipation: deal.apidata.lenderParticiptionLimit,
      })
    : null;
  const columns = [
    {
      title: "Deal Name",
      dataIndex: "name",
      key: "deal",
    },
    {
      title: "Deal Value",
      dataIndex: "loanamount",
      key: "loanamount",
    },
    {
      title: "Available Limit",
      dataIndex: "availablelimit",
      key: "availablelimit",
    },
    {
      title: "Months",
      dataIndex: "tenureinmonths",
      key: "tenureinmonths",
    },
    {
      title: "Funding Start ",
      dataIndex: "funding",
      key: "funding",
    },
    {
      title: "Funding End ",
      dataIndex: "fundingdate",
      key: "fundingdate",
    },
    {
      title: "Minimum Amount",
      dataIndex: "minimumparticipation",
      key: "minimumparticipation",
    },
    {
      title: "Maximum Amount",
      dataIndex: "maximumparticipation",
      key: "maximumparticipation",
    },
  ];
  // action="https://test.cashfree.com/billpay/checkout/post/submit"
  const handlecashfree = () => {
    console.log(deal.wallet, deal.bank)

    const response = handlecashapi(deal.apidata.groupId, deal.participatedAmount);
  
    
    
    response.then((data) => {
      console.log(data);
      history.push("https://test.cashfree.com/billpay/checkout/post/submit")
    });
  }
  
  const  freeParticipation =()=>{
    const response =freeParticipationapi(deal.apidata.groupId ,deal.apidata.dealId, deal.accountType , deal.lenderReturnType)
    response.then((data)=>{
      console.log(data)
    })
  }

//   updatingLenderDeal

//   {
//     "userId": "16",
//     "groupId": "7",
//     "dealId": "248",
//     "participatedAmount": 5000,
//     "lenderReturnType": "YEARLY",
//     "processingFee": 0,
//     "lenderFeeId": "0",
//     "accountType": "WALLET"
// }
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
                    Deal Info
                  </h3>
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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{}}
              />
            </div>
            <div className="centerdiv">
              <h4>Your participation to this deal is</h4>
              <div className="form-group">
                <input
                  className="form-control-lg form-control-lg1"
                  type="text"
                  placeholder="Enter amount here..."
                  


                  onChange={(event)=>{setDeal({
                    ...deal,
                    participatedAmount:event.target.value
                  })}}
                />
              </div>
              <h4 style={{ marginTop: "2rem" }}>
                Transfer principal payment method{" "}
              </h4>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="Wallet"
                  id="Wallet"   
                  onChange={(event)=>{setDeal({
                    ...deal,
                    wallet:event.target.value
                  })}}
                />
                <label class="form-check-label" for="flexRadioDisabled">
                  Move Principal to wallet
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="Bank"
                  id="Bank"
                  
                  onChange={(event)=>{setDeal({
                    ...deal,
                    bank:event.target.value,
                  })}}
                />
                <label class="form-check-label" for="flexRadioCheckedDisabled">
                  Move Principal to Bank
                </label>
              </div>
              <h3 style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                Choose your pay out method
              </h3>
              <div className="datarender" style={{ marginTop: "3%" }}>
                <Card
                  size="meddam"
                  headStyle={{ backgroundColor: "#3d5ee1", color: "white" }}
                  title="OXY FOUNDING LENDER"
                  bodyStyle={{ width: 300, textAlign: "center" }}
                >
                  <p>Choose Your Interest Payout Method</p>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDisabled"
                      id="flexRadioDisabled"
                    />
                    <label class="form-check-label" for="flexRadioDisabled">
                      {/* Monthly Interest pay-out 1.7% P.M */}
                   {deal.apidata  && <>{console.log(deal.apidata)}
                      {deal.apidata.monthlyInterest      != 0 ? <div>monthlyInterest pay-out {deal.apidata.monthlyInterest} % P.M</div> : <></>}</>}
                      {deal.apidata.yearlyInterest != 0 ? <div>yearlyInterest pay-out {deal.apidata.monthlyInterest} % P.M</div> : <></>}
                      {deal.apidata.quartlyInterest != 0 ? <div>quartlyInterest pay-out {deal.apidata.monthlyInterest} % P.M</div> : <></>}   
                      {deal.apidata.halfInterest != 0 ? <div>halfInterest pay-out {deal.apidata.monthlyInterest} % P.M</div>  :<></>}   
                      
                    </label>
                  </div>



                  {deal.apidata.lifeTimeWaiver ? <>  <button className="btn btn-primary" type="submit">
                    Participate Now
                  </button></> : <a  href="https://test.cashfree.com/billpay/checkout/post/submit" className="btn btn-primary" onClick={handlecashfree}>Participate Now</a>}
                
                </Card>
                    {console.log(deal.apidata.feeStatusToParticipate)}
                {deal.apidata.feeStatusToParticipate =="MANDATORY"  ?
                 <>  
                 <Card
                  size="meddam"
                  title="NO Fee To Participate"
                  headStyle={{ backgroundColor: "#3d5ee1", color: "white" }}
                  bodyStyle={{ width: 300, textAlign: "center" }}
                >
                  <p size="meddam">Choose Your Interest Payout Method</p>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDisabled"
                      id="flexRadioDisabled"
                    />
                    {/* <label class="form-check-label" for="flexRadioDisabled">
                      Monthly Interest pay-out 1.7% P.M
                    </label> */}
   <label class="form-check-label" for="flexRadioDisabled">

                  
   {deal.apidata  && <>{console.log(deal.apidata)}
                      {deal.apidata.monthlyInterest      != 0 ? <div>monthlyInterest pay-out {deal.apidata.monthlyInterest} % P.M</div> : <></>}</>}
                      {deal.apidata.yearlyInterest != 0 ? <div>yearlyInterest pay-out {deal.apidata.monthlyInterest} % P.M</div> : <></>}
                      {deal.apidata.quartlyInterest != 0 ? <div>quartlyInterest pay-out {deal.apidata.monthlyInterest} % P.M</div> : <></>}   
                      {deal.apidata.halfInterest != 0 ? <div>halfInterest pay-out {deal.apidata.monthlyInterest} % P.M</div>  :<></>}   
                           </label></div>
                           
                  <button className="btn btn-primary" type="submit"   onClick={freeParticipation}>
                    Participate Now
                  </button>
                </Card></> :<></>}
               
              </div>{" "}
            </div>
          </div>

          <Footer />
        </div>
      </div>
      {/* /Main Wrapper */}
    </>
  );
};

export default Participatedeal;
