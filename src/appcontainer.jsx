import React from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch } from "react-router-dom";
import Login from "./components/pages/Authentication";
import Register from "./components/pages/Authentication/Register";
import ForgotPassword from "./components/pages/Authentication/ForgotPassword";
import Error404 from "./components/pages/Authentication/Error-404";
import ConfigautoInvest from "./components/pages/Oxyloans/Lender/ConfigautoInvest";
import AdminDashboard from "./components/pages/Dashboard/AdminDashboard";
import EarningCertificate from "./components/pages/Oxyloans/Lender/EarningCertificate";
import Emicalculator from "./components/pages/Oxyloans/Lender/Emicalculator";
import LoadwaletThroughQr from "./components/pages/Oxyloans/Lender/LoadwaletThroughQr";
import LoadwalletThroughVirtualAccount from "./components/pages/Oxyloans/Lender/LoadwalletThroughVirtualAccount";
import LoanListings from "./components/pages/Oxyloans/Lender/LoanListings";
import MyclosedDeals from "./components/pages/Oxyloans/Lender/MyclosedDeals";
import Mycontacts from "./components/pages/Oxyloans/Lender/Mycontacts";
import MyEarnings from "./components/pages/Oxyloans/Lender/MyEarnings";
import MyhighvalueDeals from "./components/pages/Oxyloans/Lender/MyhighvalueDeals";
import Myholdamount from "./components/pages/Oxyloans/Lender/Myholdamount";
import MyinterestEarning from "./components/pages/Oxyloans/Lender/MyinterestEarning";
import MyloansStatement from "./components/pages/Oxyloans/Lender/MyloansStatement";
import MypartiallClosedDeal from "./components/pages/Oxyloans/Lender/MypartiallClosedDeal";
import MyreferalStatus from "./components/pages/Oxyloans/Lender/MyreferalStatus";
import MyRunningDelas from "./components/pages/Oxyloans/Lender/MyRunningDelas";
import MywithdrawalHistory from "./components/pages/Oxyloans/Lender/MywithdrawalHistory";
import ReferaFriend from "./components/pages/Oxyloans/Lender/ReferaFriend";
import RegularEscrowDeals from "./components/pages/Oxyloans/Lender/RegularEscrowDeals";
import RegularPersonalDeal from "./components/pages/Oxyloans/Lender/RegularPersonalDeal";
import RegularRunningDeal from "./components/pages/Oxyloans/Lender/RegularRunningDeal";
import TransferWalletToWallet from "./components/pages/Oxyloans/Lender/TransferWalletToWallet";
import ViewAutoHistory from "./components/pages/Oxyloans/Lender/ViewAutoHistory";
import ViewTicketHistory from "./components/pages/Oxyloans/Lender/ViewTicketHistory";
import WalletToWallet from "./components/pages/Oxyloans/Lender/WalletToWallet";
import WithdrawdealfromDeal from "./components/pages/Oxyloans/Lender/WithdrawdealfromDeal";
import Withdrawdealfromwallet from "./components/pages/Oxyloans/Lender/Withdrawdealfromwallet";
import Writetous from "./components/pages/Oxyloans/Lender/Writetous";
import WithdrawalFromWallet from "./components/pages/Oxyloans/Lender/WithdrawalFromWallet";
import WithdrawdealFounds from "./components/pages/Oxyloans/Lender/WithdrawdealFounds";
import MembershipHistory from "./components/pages/Oxyloans/Lender/MembershipHistory";
import Mytransactions from "./components/pages/Oxyloans/Lender/Mytransactions";
import WalletToWalletHistory from "./components/pages/Oxyloans/Lender/WalletToWalletHistory";
import AutoInvestHistory from "./components/pages/Oxyloans/Lender/AutoInvestHistory";
import DashboardTransactions from "./components/pages/Oxyloans/Lender/DashboardTransactions";
import LenderRegister from "./components/pages/Authentication/LenderRegister";
import BorrowerRegister from "./components/pages/Authentication/BorrowerRegister";
import Register_active_proceed from "./components/pages/Authentication/register_active_proceed";
import ForgotPassword3 from "./components/pages/Authentication/ForgotPassword3";
import Whatapplog from "./components/pages/Authentication/Whatapplog";
import PartnerRegister from "./components/pages/Authentication/PartnerRegister";
import Profile from "./components/pages/Blog/Profile";

const appcontainer = () => {
  return (
    <Router Router basename="/">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/forgotpassword" component={ForgotPassword} />
        <Route path="/error404" component={Error404} />
        <Route path="/admindashboard" component={AdminDashboard} />
        <Route path="/loadwaletThroughQr" component={LoadwaletThroughQr} />
        <Route path="/lender_register" component={LenderRegister} />
        <Route path="/borrower_register" component={BorrowerRegister} />
        <Route
          path="/register_active_proceed"
          component={Register_active_proceed}
        />
        <Route path="/profile" component={Profile} />
        <Route path="/forgotpassword1" component={ForgotPassword3} />
        <Route path="/partnerRegister" component={PartnerRegister} />
        <Route
          path="/loadwalletThroughVirtualAccount"
          component={LoadwalletThroughVirtualAccount}
        />
        <Route
          path="/withdrawdealfromwallet"
          component={Withdrawdealfromwallet}
        />
        <Route path="/withdrawdealfromDeal" component={WithdrawdealfromDeal} />
        <Route
          path="/transferWalletToWallet"
          component={TransferWalletToWallet}
        />
        <Route path="/mywithdrawalHistory" component={MywithdrawalHistory} />
        <Route path="/writetous" component={Writetous} />
        <Route path="/viewTicketHistory" component={ViewTicketHistory} />
        <Route path="/emicalculator" component={Emicalculator} />
        <Route path="/configautoInvest" component={ConfigautoInvest} />
        <Route path="/viewAutoHistory" component={ViewAutoHistory} />
        <Route path="/regularRunningDeal" component={RegularRunningDeal} />
        <Route path="/regularEscrowDeals" component={RegularEscrowDeals} />
        <Route path="/regularPersonalDeal" component={RegularPersonalDeal} />
        <Route path="/myRunningDelas" component={MyRunningDelas} />
        <Route path="/myclosedDeals" component={MyclosedDeals} />
        <Route path="/myholdamount" component={Myholdamount} />
        <Route path="/mypartiallClosedDeal" component={MypartiallClosedDeal} />
        <Route path="/myinterestEarning" component={MyinterestEarning} />
        <Route path="/myhighvalueDeals" component={MyhighvalueDeals} />
        <Route path="/earningCertificate" component={EarningCertificate} />
        <Route path="/myloansStatement" component={MyloansStatement} />
        <Route path="/referaFriend" component={ReferaFriend} />
        <Route path="/myreferalStatus" component={MyreferalStatus} />
        <Route path="/mycontacts" component={Mycontacts} />
        <Route
          path="/walletToWalletHistory"
          component={WalletToWalletHistory}
        />
        <Route path="/myEarnings" component={MyEarnings} />
        <Route path="/loanListings" component={LoanListings} />
        <Route path="/WalletToWallet" component={WalletToWallet} />
        <Route path="/withdrawalFromWallet" component={WithdrawalFromWallet} />
        <Route path="/withdrawdealFounds" component={WithdrawdealFounds} />
        <Route path="/membershipHistory" component={MembershipHistory} />
        <Route path="/mytransactions" component={Mytransactions} />
        <Route path="/autoInvestHistory" component={AutoInvestHistory} />
        <Route
          path="/dashboardTransactions"
          component={DashboardTransactions}
        />
        <Route
          path="/loadwalletThroughVirtualAccount"
          component={LoadwalletThroughVirtualAccount}
        />
        <Route path="/whatapplogin" component={Whatapplog} />

        {/* 
        oxyroutes End */}
      </Switch>
    </Router>
  );
};

export default appcontainer;
