import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Switch } from "react-router-dom";
import Participatedeal from "./components/pages/Oxyloans/Lender/Participatedeal";
import Admlogin from "./components/pages/Authentication/Admlogin";

const Login = React.lazy(() => import("./components/pages/Authentication"));
const Register = React.lazy(() =>
  import("./components/pages/Authentication/Register")
);
const ForgotPassword = React.lazy(() =>
  import("./components/pages/Authentication/ForgotPassword")
);
const Error404 = React.lazy(() =>
  import("./components/pages/Authentication/Error-404")
);
const ConfigautoInvest = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/ConfigautoInvest")
);

const AdminDashboard = React.lazy(() =>
  import("./components/pages/Dashboard/AdminDashboard")
);

const EarningCertificate = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/EarningCertificate")
);

const Emicalculator = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/Emicalculator")
);
const LoadwaletThroughQr = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/LoadwaletThroughQr")
);
const LoadwalletThroughVirtualAccount = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/LoadwalletThroughVirtualAccount")
);
const LoanListings = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/LoanListings")
);
const MyclosedDeals = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/MyclosedDeals")
);
const Mycontacts = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/Mycontacts")
);
const MyEarnings = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/MyEarnings")
);
const MyhighvalueDeals = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/MyhighvalueDeals")
);
const Myholdamount = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/Myholdamount")
);
const MyinterestEarning = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/MyinterestEarning")
);
const MyloansStatement = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/MyloansStatement")
);
const MypartiallClosedDeal = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/MypartiallClosedDeal")
);
const MyreferalStatus = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/MyreferalStatus")
);
const MyRunningDelas = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/MyRunningDelas")
);
const ReferaFriend = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/ReferaFriend")
);

const RegularEscrowDeals = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/RegularEscrowDeals")
);
const RegularPersonalDeal = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/RegularPersonalDeal")
);
const RegularRunningDeal = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/RegularRunningDeal")
);
const TransferWalletToWallet = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/TransferWalletToWallet")
);
const ViewAutoHistory = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/ViewAutoHistory")
);
const ViewTicketHistory = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/ViewTicketHistory")
);
const WalletToWallet = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/WalletToWallet")
);
const WithdrawdealfromDeal = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/WithdrawdealfromDeal")
);
const Withdrawdealfromwallet = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/Withdrawdealfromwallet")
);
const Writetous = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/Writetous")
);

const WithdrawalFromWallet = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/WithdrawalFromWallet")
);

const WithdrawdealFounds = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/WithdrawdealFounds")
);

const MembershipHistory = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/MembershipHistory")
);

const Mytransactions = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/Mytransactions")
);

const WalletToWalletHistory = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/WalletToWalletHistory")
);
const AutoInvestHistory = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/AutoInvestHistory")
);

const DashboardTransactions = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/DashboardTransactions")
);

const LenderRegister = React.lazy(() =>
  import("./components/pages/Authentication/LenderRegister")
);

const BorrowerRegister = React.lazy(() =>
  import("./components/pages/Authentication/BorrowerRegister")
);

const Register_active_proceed = React.lazy(() =>
  import("./components/pages/Authentication/register_active_proceed")
);

const ForgotPassword3 = React.lazy(() =>
  import("./components/pages/Authentication/ForgotPassword3")
);

const Whatapplog = React.lazy(() =>
  import("./components/pages/Authentication/Whatapplog")
);

const PartnerRegister = React.lazy(() =>
  import("./components/pages/Authentication/PartnerRegister")
);

const Profile = React.lazy(() => import("./components/pages/Blog/Profile"));

const TicketHistory = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/TicketHistory")
);

const MywithdrawalHistory = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/MywithdrawalHistory")
);

const appcontainer = () => {
  return (
    <Suspense>
      <Router Router basename="/">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgotpassword" component={ForgotPassword} />
          <Route path="/error404" component={Error404} />
          <Route path="/dashboard" component={AdminDashboard} />
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
                    <Route
            path="/admlogin"
            component={Admlogin}
          />
          <Route
            path="/withdrawdealfromDeal"
            component={WithdrawdealfromDeal}
          />
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
          <Route path="/participatedeal" component={Participatedeal} />
          <Route path="/regularRunningDeal" component={RegularRunningDeal} />
          <Route path="/regularEscrowDeals" component={RegularEscrowDeals} />
          <Route path="/regularPersonalDeal" component={RegularPersonalDeal} />
          <Route path="/myRunningDelas" component={MyRunningDelas} />
          <Route path="/myclosedDeals" component={MyclosedDeals} />
          <Route path="/myholdamount" component={Myholdamount} />
          <Route
            path="/mypartiallClosedDeal"
            component={MypartiallClosedDeal}
          />
          <Route path="/ticketHistory" component={TicketHistory} />
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
          <Route
            path="/withdrawalFromWallet"
            component={WithdrawalFromWallet}
          />
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
    </Suspense>
  );
};

export default appcontainer;
