import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import Header from "../../../Header/Header";
import SideBar from "../../../SideBar/SideBar";
import { Button, Card, Space } from 'antd';
import './member.css'
import './Dashboardtable.css'
import { pagination, Table } from "antd";
import { onShowSizeChange, itemRender } from "../../../Pagination";
import { getMyWalletTowalletHistory, handlePaymembershipapi } from "../../../HttpRequest/afterlogin";
import { membershipsweetalert } from "../../Base UI Elements/SweetAlert";

const Membership = React.memo((pros) => {
  const [mywalletTowalletHistory, setmywalletTowalletHistory] = useState({
    apiData: "",
    hasdata: false,
    loading: true,
    membershiptype:"",
  });



  const handlePaymembershipfree = async (membership) => {

       
    try {
      const response = await handlePaymembershipapi(membership);
      console.log(response.data.status);
      membershipsweetalert(response.data.status)

      // Handle the response data or perform additional actions here
    } catch (error) {
      // Handle errors if the promise is rejected
      
      membershipsweetalert("error")
    }
  };
  
  
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
                  <h3 className="page-title">Membership Payment</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">
                       Membership Payment
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            <div className="row">
              <div className="col-sm-12">
                <div className="card"  >
                  <div className="card-body">
                    <div>


                    <Space direction="horizontal" size={13} style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                    <Card
      size="small"
      title="1 Months Plan"
      style={{
        width: 220,
        textAlign:'center'
      }}
    >
      <h6 className="cardstylemar">1000  + 18 % GST</h6>
      
      <p ><strong>1</strong> Month  Membership</p>
      <p>Unlimited Deals Participation</p>
      <div className="centerdic">
     <Button className="btn btn-primary centerdic"   onClick={()=>handlePaymembershipfree("MONTHLY")}>Subscribe</Button>
      </div>
    </Card>
    <Card
      size="small"
      title="3 Months plan"
      style={{
        width: 220,
        textAlign:'center'
      }}
    >
      <h6 className="cardstylemar">2900 + 18 % GST</h6>
      
      <p ><strong>3 </strong> Year Membership</p>
      <p>Unlimited Deals Participation</p>
      <div className="centerdic">
     <Button className="btn btn-primary centerdic"  onClick={()=>handlePaymembershipfree("QUARTERLY")}>Subscribe</Button>
      </div>
    </Card>
    <Card
      size="small"
      title="6 Months Plan"
      style={{
        width: 220,
        textAlign:'center'
      }}
    >
      <h6 className="cardstylemar">5600 + 18 % GST</h6>
      
      <p ><strong>6</strong> Months  Membership</p>
      <p>Unlimited Deals Participation</p>
      <div className="centerdic">
     <Button className="btn btn-primary centerdic" onClick={()=>handlePaymembershipfree("HALFYEARLY")}>Subscribe</Button>
      </div>
    </Card>

    <Card
      size="small"
      title="1 Year Plan"
      style={{
        width: 220,
        textAlign:'center'
      }}
    >
      <h6 className="cardstylemar">9800  + 18 % GST</h6>
      
      <p ><strong>1</strong> Months  Membership</p>
      <p>Unlimited Deals Participation</p>
      <div className="centerdic">
     <Button className="btn btn-primary centerdic" onClick={()=>handlePaymembershipfree("PERYEAR")}>Subscribe</Button>
      </div>
    </Card>

    <Card
      size="small"
      title="5 Year Plan"
      style={{
        width: 220,
        textAlign:'center'
      }}
    >
      <h6 className="cardstylemar">50000   + 18 % GST</h6>
      
      <p ><strong>5</strong> Year  Membership</p>
      <p>Unlimited Deals Participation</p>
      <div className="centerdic">
     <Button className="btn btn-primary centerdic" onClick={()=>handlePaymembershipfree("FIVEYEARS")}>Subscribe</Button>
      </div>
    </Card>

    <Card
      size="small"
      title="10 Year Plan"
      style={{
        width: 220,
        textAlign:'center'
      }}
    >
      <h6 className="cardstylemar">90000   + 18 % GST</h6>
      
      <p ><strong>10 </strong> Year  Membership</p>
      <p>Unlimited Deals Participation</p>
      <div className="centerdic">
     <Button className="btn btn-primary centerdic" onClick={()=>handlePaymembershipfree("TENYEARS")}>Subscribe</Button>
      </div>
    </Card>

    <Card
      size="small"
      title="Life Time Plan"
      style={{
        width: 220,
        textAlign:'center'
      }}
    >
      <h6 className="cardstylemar">100000   + 18 % GST</h6>
      
      <p ><strong>1</strong> Years   Membership</p>
      <p>Unlimited Deals Participation</p>
      <div className="centerdic">
     <Button className="btn btn-primary centerdic" onClick={()=>handlePaymembershipfree("LIFETIME")}>Subscribe</Button>
      </div>
    </Card>
    </Space>   
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
});

export default Membership;
