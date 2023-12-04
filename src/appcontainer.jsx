import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Participatedeal from "./components/pages/Oxyloans/Lender/Participatedeal";
import Admlogin from "./components/pages/Authentication/Admlogin";
import Membership from "./components/pages/Oxyloans/Lender/Membership";
import Spining from "./components/pages/Oxyloans/Lender/Spining";

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/error404" element={<Error404 />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/loadwaletThroughQr" element={<LoadwaletThroughQr />} />
          <Route path="/register" element={<LenderRegister />} />
          <Route path="/borrower_register" element={<BorrowerRegister />} />
          <Route
            path="/register_active_proceed"
            element={<Register_active_proceed />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgotpassword1" element={<ForgotPassword3 />} />
          <Route path="/partnerRegister" element={<PartnerRegister />} />
          <Route
            path="/loadwalletThroughVirtualAccount"
            element={<LoadwalletThroughVirtualAccount />}
          />
          <Route
            path="/withdrawdealfromwallet"
            element={<Withdrawdealfromwallet />}
          />
          <Route path="/spining" element={<Spining />} />
          <Route path="/admlogin" element={<Admlogin />} />
          <Route
            path="/withdrawdealfromDeal"
            element={<WithdrawdealfromDeal />}
          />
          <Route
            path="/transferWalletToWallet"
            element={<TransferWalletToWallet />}
          />
          <Route
            path="/mywithdrawalHistory"
            element={<MywithdrawalHistory />}
          />
          <Route path="/writetous" element={<Writetous />} />
          <Route path="/viewTicketHistory" element={<ViewTicketHistory />} />
          <Route path="/emicalculator" element={<Emicalculator />} />
          <Route path="/configautoInvest" element={<ConfigautoInvest />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/viewAutoHistory" element={<ViewAutoHistory />} />
          <Route path="/participatedeal" element={<Participatedeal />} />
          <Route path="/regularRunningDeal" element={<RegularRunningDeal />} />
          <Route path="/regularEscrowDeals" element={<RegularEscrowDeals />} />
          <Route
            path="/regularPersonalDeal"
            element={<RegularPersonalDeal />}
          />
          <Route path="/myRunningDelas" element={<MyRunningDelas />} />
          <Route path="/myclosedDeals" element={<MyclosedDeals />} />
          <Route path="/myholdamount" element={<Myholdamount />} />
          <Route
            path="/mypartiallClosedDeal"
            element={<MypartiallClosedDeal />}
          />
          <Route path="/ticketHistory" element={<TicketHistory />} />
          <Route path="/myinterestEarning" element={<MyinterestEarning />} />
          <Route path="/myhighvalueDeals" element={<MyhighvalueDeals />} />
          <Route path="/earningCertificate" element={<EarningCertificate />} />
          <Route path="/myloansStatement" element={<MyloansStatement />} />
          <Route path="/referaFriend" element={<ReferaFriend />} />
          <Route path="/myreferalStatus" element={<MyreferalStatus />} />
          <Route path="/mycontacts" element={<Mycontacts />} />
          <Route
            path="/walletToWalletHistory"
            element={<WalletToWalletHistory />}
          />
          <Route path="/myEarnings" element={<MyEarnings />} />
          <Route path="/loanListings" element={<LoanListings />} />
          <Route path="/WalletToWallet" element={<WalletToWallet />} />
          <Route
            path="/withdrawalFromWallet"
            element={<WithdrawalFromWallet />}
          />
          <Route path="/withdrawdealFounds" element={<WithdrawdealFounds />} />
          <Route path="/membershipHistory" element={<MembershipHistory />} />
          <Route path="/mytransactions" element={<Mytransactions />} />
          <Route path="/autoInvestHistory" element={<AutoInvestHistory />} />
          <Route
            path="/dashboardTransactions"
            element={<DashboardTransactions />}
          />
          <Route
            path="/loadwalletThroughVirtualAccount"
            element={<LoadwalletThroughVirtualAccount />}
          />
          <Route path="/whatapplogin" element={<Whatapplog />} />
          {/* 
        oxyroutes End */}
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default appcontainer;
