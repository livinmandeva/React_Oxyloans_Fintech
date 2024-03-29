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
import CreateDeal from "./components/pages/Oxyloans/Admin/Deals/CreateDeal/CreateDeal.jsx";
import EquityDeals from "./components/pages/Oxyloans/Admin/Deals/Equitydeals/EquityDeals.jsx";
import ViewDealTypePayOut from "./components/pages/Oxyloans/Admin/ViewDealTypePayOut.jsx";
import HoldAmountRequest from "./components/pages/Oxyloans/Admin/Deals/Hold/HoldAmountRequest.jsx";
import HoldAmountBreakUp from "./components/pages/Oxyloans/Admin/Deals/Hold/HoldAmountBreakUp.jsx";
import BorrowerRunningsinfo from "./components/pages/Oxyloans/Admin/StudentLoanProcess/BorrowerRunningsinfo.jsx";
import UploadFdData from "./components/pages/Oxyloans/Admin/StudentLoanProcess/UploadFdData.jsx";
import FdPaymentDetails from "./components/pages/Oxyloans/Admin/StudentLoanProcess/FdPaymentDetails.jsx";
import VerifyPaymentDetail from "./components/pages/Oxyloans/Admin/StudentLoanProcess/VerifyPaymentDetail.jsx";
import TransferFunds from "./components/pages/Oxyloans/Admin/StudentLoanProcess/TransferFunds.jsx";
import ViewListOfFds from "./components/pages/Oxyloans/Admin/StudentLoanProcess/ViewListOfFds.jsx";
import SearchfdUsers from "./components/pages/Oxyloans/Admin/Deals/LenderPending.jsx/SearchfdUsers.jsx";
import InsertPendingInformation from "./components/pages/Oxyloans/Admin/LenderPending/InsertPendingInformation.jsx";
import PendingamountUser from "./components/pages/Oxyloans/Admin/LenderPending/PendingamountUser.jsx";
import FdStatistics from "./components/pages/Oxyloans/Admin/FdStatistics/FdStatistics.jsx";
import FddownloadInvoice from "./components/pages/Oxyloans/Admin/FdStatistics/FddownloadInvoice.jsx";
import FdmonthlyloansInfo from "./components/pages/Oxyloans/Admin/FdStatistics/FdmonthlyloansInfo.jsx";
import FdexecutedPayment from "./components/pages/Oxyloans/Admin/FdStatistics/FdexecutedPayment.jsx";
import Borrowersapplications from "./components/pages/Oxyloans/Admin/borrowersapplications/Borrowersapplications";
import FdClosedDetails from "./components/pages/Oxyloans/Admin/FdStatistics/FdClosedDetails.jsx";
import Intrested from "./components/pages/Oxyloans/Admin/borrowersapplications/Intrested.jsx";
import LoanAprroved from "./components/pages/Oxyloans/Admin/borrowersapplications/LoanAprroved.jsx";
import Approved from "./components/pages/Oxyloans/Admin/borrowersapplications/Approved";
import NewDisbursed from "./components/pages/Oxyloans/Admin/borrowersapplications/NewDisbursed.jsx";
import ApplicationLevelDisbursed from "./components/pages/Oxyloans/Admin/borrowersapplications/ApplicationLevelDisbursed.jsx";
import LendersLoanApplications from "./components/pages/Oxyloans/Admin/LENDERS/LendersLoanApplications.jsx";
import RegisterLenderUsers from "./components/pages/Oxyloans/RegisterLenderUsers.jsx";
import LenderWallettransactions from "./components/pages/Oxyloans/Admin/LENDERS/LenderWallettransactions.jsx";
import Uploadtransactions from "./components/pages/Oxyloans/Admin/LENDERS/Uploadtransactions.jsx";
import PoolingLendrs from "./components/pages/Oxyloans/Admin/LENDERS/PoolingLendrs.jsx";
import Lenderreferalinfo from "./components/pages/Oxyloans/Admin/LENDERS/Lenderreferalinfo.jsx";
import MonthlyReferalEarning from "./components/pages/Oxyloans/MonthlyReferalEarning.jsx";
import ApproveReferenceamount from "./components/pages/Oxyloans/Admin/LENDERS/ApproveReferenceamount.jsx";
import EditReferenceDeatils from "./components/pages/Oxyloans/Admin/LENDERS/EditReferenceDeatils.jsx";
import EditGroupinfo from "./components/pages/Oxyloans/Admin/LENDERS/EditGroupinfo.jsx";
import Lenderstatistics from "./components/pages/Oxyloans/Admin/LENDERS/Lenderstatistics.jsx";
import SumofDealAmountInfo2 from "./components/pages/Oxyloans/Admin/LENDERS/SumofDealAmountInfo2.jsx";
import LendersInAllEquityDeals from "./components/pages/Oxyloans/Admin/LENDERS/LendersInAllEquityDeals.jsx";
import DisplaylenderwithdrawalfundsList from "./components/pages/Oxyloans/Admin/WithdrawalRequests/DisplaylenderwithdrawalfundsList.jsx";
import CheckLenderDashboard from "./components/pages/Oxyloans/LendersWallet/CheckLenderDashboard.jsx";
import Lendersemiamount from "./components/pages/Oxyloans/LendersWallet/Lendersemiamount.jsx";
import Lenderwalletamountdetails from "./components/pages/Oxyloans/LendersWallet/Lenderwalletamountdetails.jsx";
import Borrowersemiamount from "./components/pages/Oxyloans/LendersWallet/Borrowersemiamount.jsx";
import Addloanowner from "./components/pages/Oxyloans/LendersWallet/Addloanowner.jsx";
import GetOxyFoundingGroups from "./components/pages/Oxyloans/Admin/LENDERS/GetOxyFoundingGroups.jsx";
import RunningLoans from "./components/pages/Oxyloans/Admin/LoanRecords/RunningLoans.jsx";
import ClosedLoans from "./components/pages/Oxyloans/Admin/LoanRecords/ClosedLoans.jsx";
import ClosedLoansByPlatform from "./components/pages/Oxyloans/Admin/LoanRecords/ClosedLoansByPlatform.jsx";
import LenderRunningsloans from "./components/pages/Oxyloans/Admin/LoanRecords/LenderRunningsloans.jsx";
import UserValidityFee from "./components/pages/Oxyloans/Admin/PAYMENTS/UserValidityFee.jsx";
import UploadedStatus from "./components/pages/Oxyloans/Admin/PAYMENTS/UploadedStatus.jsx";
import QrTransactions from "./components/pages/Oxyloans/Admin/PAYMENTS/QrTransactions.jsx";
import ApprovedStatus from "./components/pages/Oxyloans/Admin/PAYMENTS/ApprovedStatus.jsx";
import NotyetReflected from "./components/pages/Oxyloans/Admin/PAYMENTS/NotyetReflected.jsx";
import ECSPaymentHistory from "./components/pages/Oxyloans/Admin/PAYMENTS/ECSPaymentHistory.jsx";
import Borrowersrecovery from "./components/pages/Oxyloans/Admin/PAYMENTS/Borrowersrecovery.jsx";
import UserQueryDetails from "./components/pages/Oxyloans/Admin/HelpDesk/UserQueryDetails.jsx";
import Resolved from "./components/pages/Oxyloans/Admin/HelpDesk/Resolved.jsx";
import ClosedQuery from "./components/pages/Oxyloans/Admin/HelpDesk/ClosedQuery.jsx";
import TotalPendingEMIs from "./components/pages/Oxyloans/Admin/EMIModule/TotalPendingEMIs.jsx";
import PendingCurrentEMI from "./components/pages/Oxyloans/Admin/EMIModule/PendingCurrentEMI.jsx";
import EditDealInfo from "./components/pages/Oxyloans/Admin/Deals/CreateDeal/EditDealInfo.jsx";
import Feependingusers from "./components/pages/Oxyloans/Admin/Deals/Feependingusers.jsx";
import Feepaidusers from "./components/pages/Oxyloans/Admin/Deals/Feepaidusers.jsx";
import OfflineInterest from "./components/pages/Oxyloans/Admin/Deals/OfflineInterest.jsx";
import LendersLoansinfo from "./components/pages/Oxyloans/Admin/AutoGenerated/LendersLoansinfo.jsx";


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

      







        <Route path="/createDeal" element={<CreateDeal />} /> 
        <Route path="/ViewDealsadmin" element={<ViewDeals />} />
        <Route path="/equityDeals" element={<EquityDeals />} />
        <Route path="/escrowDealsadmin" element={<EscrowDeals />} />
        <Route path="/testDeals" element={<TestDeals />} />
        <Route path="/viewDealTypePayOut" element={<ViewDealTypePayOut />} />
        <Route path="/holdAmountRequest" element={<HoldAmountRequest/>} />
        <Route path="/holdAmountBreakUp" element={<HoldAmountBreakUp/>} />
        <Route path="/borrowerRunningsinfo" element={<BorrowerRunningsinfo/>} />
        <Route path="/uploadFdData" element={<UploadFdData/>} />
        <Route path="/FdPaymentDetails" element={<FdPaymentDetails/>} />
        <Route path="/verifyPaymentDetail" element={<VerifyPaymentDetail/>} />
        <Route path="/transferFunds" element={<TransferFunds />} />
        <Route path="/viewListOfFds" element={<ViewListOfFds />} />
        <Route path="/SearchfdUsers" element={<SearchfdUsers/>} />
        <Route path="/InsertPendingInformation" element={<InsertPendingInformation />} />
        <Route path="/pendingamountUser" element={<PendingamountUser />} />   
        <Route path="/fdStatistics" element={<FdStatistics />} />
        <Route path="/fddownloadInvoice" element={<FddownloadInvoice />} /> 
        <Route path="/fdmonthlyloansInfo" element={<FdmonthlyloansInfo />} /> 
        <Route path="/fdexecutedPayment" element={<FdexecutedPayment />} /> 
        <Route path="/fdClosedDetails" element={<FdClosedDetails />} /> 
        <Route path="/borrowersapplications" element={<Borrowersapplications />} /> 
        <Route path="/intrested" element={<Intrested />} /> 
        <Route path="/loanAprroved" element={<LoanAprroved />} /> 
        <Route path="/approved" element={<Approved />} /> 
        <Route path="/newDisbursed" element={<NewDisbursed />} /> 
        <Route path="/ApplicationLevelDisbursed" element={<ApplicationLevelDisbursed />} /> 
        <Route path="/borrowerRunningsinfo" element={<BorrowerRunningsinfo />} />      
        <Route path="/viewVanNumber" element={<NewDisbursed />} /> 
        {/* <Route path="/lendersapplications" element={<LendersLoanApplications />} />  */}
        <Route path="/registerLenderUsers" element={<RegisterLenderUsers />} /> 
        <Route path="/lenderWallettransactions" element={<LenderWallettransactions />} />
        <Route path="/uploadtransactions" element={<Uploadtransactions />} />

        <Route path="/poolingLendrs" element={<PoolingLendrs />} /> 
        <Route path="/lenderreferalinfo" element={<Lenderreferalinfo />} /> 
        <Route path="/monthlyReferalEarning" element={<MonthlyReferalEarning />} /> 
        <Route path="/approveReferenceamount" element={<ApproveReferenceamount />} /> 
        <Route path="/editReferenceDeatils" element={<EditReferenceDeatils />} /> 
        <Route path="/editGroupinfo" element={<EditGroupinfo />} />
        <Route path="/lenderstatistics" element={<Lenderstatistics />} /> 
        <Route path="/sumofDealAmountInfo" element={<SumofDealAmountInfo2 />} /> 
        <Route path="/lendersInAllEquityDeals" element={<LendersInAllEquityDeals />} />
        <Route path="/displaylenderwithdrawalfundsList" element={<DisplaylenderwithdrawalfundsList />} /> 
        <Route path="/walletToWalletHistory1" element={<WalletToWalletHistory />} />
        <Route path="/checkLenderDashboard" element={<CheckLenderDashboard />} />


        <Route path="/lenderwalletamountdetails" element={<Lenderwalletamountdetails />} />
        <Route path="/lendersemiamount" element={<Lendersemiamount />} />
        <Route path="/borrowersemiamount" element={<Borrowersemiamount />} />

        <Route path="/addloanowner" element={<Addloanowner />} /> 
        <Route path="/getOxyFoundingGroups" element={<GetOxyFoundingGroups />} /> 

        <Route path="/getOxyFoundingGroups" element={<GetOxyFoundingGroups />} /> 

        <Route path="/runningLoans" element={<RunningLoans />} />

        <Route path="/closedLoans" element={<ClosedLoans />} />
        <Route path="/closedLoansByPlatform" element={<ClosedLoansByPlatform />} />     
        <Route path="/lenderRunningsloans" element={<LenderRunningsloans />} />
        <Route path="/uservalidityfee" element={<UserValidityFee />} />
        <Route path="/uservalidityfee" element={<UserValidityFee />} />
        <Route path="/feepaidusers" element={<Feepaidusers />} />
        <Route path="/uploadedStatus" element={<UploadedStatus />} />
        <Route path="/feependingusers" element={<Feependingusers />} />
        <Route path="/qrTransactions" element={<QrTransactions />} />
        <Route path="/offlineInterest" element={<OfflineInterest />} />
        <Route path="/approvedStatus" element={<ApprovedStatus />} />
        <Route path="/notyetReflected" element={<NotyetReflected />} />
        <Route path="/ECSPaymentHistory" element={<ECSPaymentHistory />} />
        <Route path="/editDealInfo" element={<EditDealInfo />} />

        <Route path="/borrowersrecovery" element={<Borrowersrecovery />} />
        <Route path="/userQueryDetails" element={<UserQueryDetails />} />
        <Route path="/userQueryDetails" element={<UserQueryDetails />} />
        <Route path="/lendersapplications" element={<LendersLoansinfo />} />
        <Route path="/resolved" element={<Resolved />} />
        <Route path="/closedQuery" element={<ClosedQuery />} />
        <Route path="/totalPendingEMI" element={<TotalPendingEMIs />} />
        <Route path="/pendingCurrentEMI" element={<PendingCurrentEMI />} />
                <Route path="/pendingCurrentEMI" element={<PendingCurrentEMI />} />
                <Route path="/checkfeatureEMIs" element={<checkfeatureEMIs />} />


      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
