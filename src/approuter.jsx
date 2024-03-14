import React, { useEffect } from "react";
import { BrowserRouter, Router, Route, Routes } from "react-router-dom";
import ReactGA from "react-ga";
const TRACKING_ID = "UA-84545654-1"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

import EscrowDeals from "./components/pages/Oxyloans/Admin/Deals/EscrowDeals/EscrowDeals";
import MainAdminDashboard from "./components/pages/Oxyloans/Admin/MainAdminDashboard";
import TestDeals from "./components/pages/Oxyloans/Admin/Deals/TestDeals/TestDeals";
import ViewCurrentDayDeals from "./components/pages/Oxyloans/Lender/ViewCurrentDayDeals";
import ViewDeals from "./components/pages/Oxyloans/Admin/Deals/CreateDeal/ViewDeals";
import UserTestdeals from "./components/pages/Oxyloans/Lender/TestDeal";

import Login from "./components/pages/Authentication";
import Participatedeal from "./components/pages/Oxyloans/Lender/Participatedeal";
import Admlogin from "./components/pages/Authentication/Admlogin";
import Membership from "./components/pages/Oxyloans/Lender/Membership";
import Spining from "./components/pages/Oxyloans/Lender/Spining";
import Loginotp from "./components/pages/Authentication/Loginotp";

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
import ReferaFriend from "./components/pages/Oxyloans/Lender/ReferaFriend";

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
import TicketHistory from "./components/pages/Oxyloans/Lender/TicketHistory";
import MywithdrawalHistory from "./components/pages/Oxyloans/Lender/MywithdrawalHistory";
import WalletToWalletTransactionHistory from "./components/pages/Oxyloans/Lender/WalletToWalletTransactionHistory";
import RegularEscrowDeals from "./components/pages/Oxyloans/Lender/RegularEscrowDeals";
import PaymentGateway from "./components/pages/Oxyloans/Lender/PaymentGateway.jsx";
import Whatappuser from "./components/pages/Authentication/Whatappuser.jsx";

// ********************BORROWER MODULE    ROUTE ************************** //

// import BorrowerDashboard from "./components/pages/Dashboard/BorrowerDashboard";
// import BorrowerProfile from "./components/pages/Oxyloans/Borrower/BorrowerProfile";
// import BorrowerAgreedLoans from "./components/pages/Oxyloans/Borrower/AgreedLoan";
// import BorrowerEnach from "./components/pages/Oxyloans/Borrower/Enach";
// import BorrowerLoanEligibility from "./components/pages/Oxyloans/Borrower/LoanEligibility";
// import BorrowerLoanListing from "./components/pages/Oxyloans/Borrower/LoanListings";
// import BorrowerLoanstatement from "./components/pages/Oxyloans/Borrower/LoanStatement";
// import Borrowermycontacts from "./components/pages/Oxyloans/Borrower/Mycontacts";
// import BorrowerMyEarnings from "./components/pages/Oxyloans/Borrower/MyEarnings";
// import BorrowerMyLoanApplication from "./components/pages/Oxyloans/Borrower/MyLoanApplication";
// import BorrowerPayEmi from "./components/pages/Oxyloans/Borrower/PayEmi";
// import BorrowerReferFriend from "./components/pages/Oxyloans/Borrower/ReferFriend";
// import BorrowerReferStatus from "./components/pages/Oxyloans/Borrower/ReferralStatus";
// import BorrowerRunningLoans from "./components/pages/Oxyloans/Borrower/RunningLoan";
// import BorrowerWriteTous from "./components/pages/Oxyloans/Borrower/BorrowerWriteToUs";
// import BorrowerEmiCalculator from "./components/pages/Oxyloans/Borrower/BorrowerEmaicalculator";
// import BorrowerTicketHistory from "./components/pages/Oxyloans/Borrower/ViewTicketHistory";

// ********************BORROWER MODULE    ROUTES END ************************** //

const AppRouter = () => {
  useEffect(() => {
    console.log(window.location.pathname + window.location.search);
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, [window.location.pathname]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/loadwaletThroughQr" element={<LoadwaletThroughQr />} />
        <Route path="/loginotp" element={<Loginotp />} />
        <Route path="/register" element={<LenderRegister />} />
        <Route path="/borrower_register" element={<BorrowerRegister />} />
        <Route
          path="/register_active_proceed"
          element={<Register_active_proceed />}
        />
        {/* <Route path="/paymentgateway" element={<PaymentGateway />} /> */}

        <Route path="/profile" element={<Profile />} />
        <Route path="/testdeals" element={<UserTestdeals />} />
        <Route path="/forgotpassword" element={<ForgotPassword3 />} />
        <Route path="/partnerRegister" element={<PartnerRegister />} />
        <Route path="/whatsappuser" element={<Whatappuser />} />
        <Route path="/escrowDeals" element={<EscrowDeals />} />
        <Route path="/regularEscrowDeals" element={<RegularEscrowDeals />} />
        <Route
          path="/loadwalletThroughVirtualAccount"
          element={<LoadwalletThroughVirtualAccount />}
        />
        <Route
          path="/withdrawdealfromwallet"
          element={<Withdrawdealfromwallet />}
        />
        <Route path="/mainadmindashboard" element={<MainAdminDashboard />} />
        <Route
          path="/walletToWalletHistory"
          element={<WalletToWalletHistory />}
        />
        <Route path="/viewdeals" element={<ViewDeals />} />
        <Route path="/admintestDeals" element={<TestDeals />} />
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
        <Route path="/mywithdrawalHistory" element={<MywithdrawalHistory />} />
        <Route path="/writetous" element={<Writetous />} />
        <Route path="/viewTicketHistory" element={<ViewTicketHistory />} />
        <Route path="/viewCurrentDayDeals" element={<ViewCurrentDayDeals />} />
        <Route path="/emicalculator" element={<Emicalculator />} />
        <Route path="/configautoInvest" element={<ConfigautoInvest />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/viewAutoHistory" element={<ViewAutoHistory />} />
        <Route path="/participatedeal" element={<Participatedeal />} />
        <Route path="/regularRunningDeal" element={<RegularRunningDeal />} />
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
        <Route path="/lendercontacts" element={<Mycontacts />} />
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
        <Route path="/whatappuser" element={<Whatappuser />} />
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
        <Route path="/whatsapplogin" element={<Whatapplog />} />
        <Route
          path="/walletToWalletTransactionHistory"
          element={<WalletToWalletTransactionHistory />}
        />

        {/* ******************** BORROWER MODULE    ROUTES START **************************  */}

        {/* <Route path="/borrowerDashboard" element={<BorrowerDashboard />} />
        <Route path="/borrowerProfile" element={<BorrowerProfile />} />
        <Route path="/borrowerAgreedLoans" element={<BorrowerAgreedLoans />} />
        <Route path="/borrowerenach" element={<BorrowerEnach />} />
        <Route
          path="/borrowerLoaneligibility"
          element={<BorrowerLoanEligibility />}
        />
        <Route path="/borrowerloanListing" element={<BorrowerLoanListing />} />
        <Route
          path="/borrowerloanstatement"
          element={<BorrowerLoanstatement />}
        />
        <Route path="/borrowermycontacts" element={<Borrowermycontacts />} />
        <Route path="/borrowermyearnings" element={<BorrowerMyEarnings />} />
        <Route
          path="/borrowermyloanApplication"
          element={<BorrowerMyLoanApplication />}
        />
        <Route path="/borrowerpayemi" element={<BorrowerPayEmi />} />
        <Route path="/borrowerreferfriend" element={<BorrowerReferFriend />} />
        <Route path="/borrowerreferstatus" element={<BorrowerReferStatus />} />
        <Route
          path="/borrowerrunningLoans"
          element={<BorrowerRunningLoans />}
        />
        <Route path="/borrowerwriteTous" element={<BorrowerWriteTous />} />
        <Route
          path="/borroweremicalculator"
          element={<BorrowerEmiCalculator />}
        />
        <Route
          path="/borrowerTicketHistory"
          element={<BorrowerTicketHistory />}
        /> */}
        {/* ******************** BORROWER MODULE ROUTES END **************************  */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
