import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HoldAmountRequest from "./components/pages/Oxyloans/Admin/Deals/Hold/HoldAmountRequest";
import HoldAmountBreakUp from "./components/pages/Oxyloans/Admin/Deals/Hold/HoldAmountBreakUp";
import BorrowerRunningsinfo from "./components/pages/Oxyloans/Admin/StudentLoanProcess/BorrowerRunningsinfo";
import BorrowerLoanStatus from "./components/pages/Oxyloans/Admin/StudentLoanProcess/BorrowerLoanStatus";
import UploadFdData from "./components/pages/Oxyloans/Admin/StudentLoanProcess/UploadFdData";
import FdPaymentDetails from "./components/pages/Oxyloans/Admin/StudentLoanProcess/FdPaymentDetails";
import VerifyPaymentDetail from "./components/pages/Oxyloans/Admin/StudentLoanProcess/VerifyPaymentDetail";
import TransferFunds from "./components/pages/Oxyloans/Admin/StudentLoanProcess/TransferFunds";
import ViewListOfFds from "./components/pages/Oxyloans/Admin/StudentLoanProcess/ViewListOfFds";
import SearchfdUsers from "./components/pages/Oxyloans/Admin/StudentLoanProcess/SearchfdUsers";
import InsertPendingInformation from "./components/pages/Oxyloans/Admin/LenderPending/InsertPendingInformation";
import PendingamountUser from "./components/pages/Oxyloans/Admin/LenderPending/PendingamountUser";
import FdStatistics from "./components/pages/Oxyloans/Admin/FdStatistics/FdStatistics";
import FddownloadInvoice from "./components/pages/Oxyloans/Admin/FdStatistics/FddownloadInvoice";
import FdmonthlyloansInfo from "./components/pages/Oxyloans/Admin/FdStatistics/FdmonthlyloansInfo";
import FdexecutedPayment from "./components/pages/Oxyloans/Admin/FdStatistics/FdexecutedPayment";
import FdClosedDetails from "./components/pages/Oxyloans/Admin/FdStatistics/FdClosedDetails";
import LoanAprroved from "./components/pages/Oxyloans/Admin/borrowersapplications/LoanAprroved";
import NewDisbursed from "./components/pages/Oxyloans/Admin/borrowersapplications/NewDisbursed";
import Intrested from "./components/pages/Oxyloans/Admin/borrowersapplications/Intrested";
import Approvedloan from "./components/pages/Oxyloans/Admin/borrowersapplications/Approvedloan";
import ApplicationLevelDisbursed from "./components/pages/Oxyloans/Admin/borrowersapplications/ApplicationLevelDisbursed";
import ViewVanNumber from "./components/pages/Oxyloans/Admin/borrowersapplications/ViewVanNumber";
import LendersLoanApplications from "./components/pages/Oxyloans/Admin/LENDERS/LendersLoanApplications";
import LenderWallettransactions from "./components/pages/Oxyloans/Admin/LENDERS/LenderWallettransactions";
import Uploadtransactions from "./components/pages/Oxyloans/Admin/LENDERS/Uploadtransactions";
import PoolingLendrs from "./components/pages/Oxyloans/Admin/LENDERS/PoolingLendrs";
import Lenderreferalinfo from "./components/pages/Oxyloans/Admin/LENDERS/Lenderreferalinfo";
import ApproveReferenceamount from "./components/pages/Oxyloans/Admin/LENDERS/ApproveReferenceamount";
import EditReferenceDeatils from "./components/pages/Oxyloans/Admin/LENDERS/EditReferenceDeatils";
import EditGroupinfo from "./components/pages/Oxyloans/Admin/LENDERS/EditGroupinfo";
import Lenderstatistics from "./components/pages/Oxyloans/Admin/LENDERS/Lenderstatistics";
import SumofDealAmountInfo2 from "./components/pages/Oxyloans/Admin/LENDERS/SumofDealAmountInfo2";
import LendersInAllEquityDeals from "./components/pages/Oxyloans/Admin/LENDERS/LendersInAllEquityDeals";
import FromDeal from "./components/pages/Oxyloans/Admin/WithdrawalRequests/FromDeal";
import DisplaylenderwithdrawalfundsList from "./components/pages/Oxyloans/Admin/WithdrawalRequests/DisplaylenderwithdrawalfundsList";
import CheckLenderDashboard from "./components/pages/Oxyloans/LendersWallet/CheckLenderDashboard";
import Lenderwalletamountdetails from "./components/pages/Oxyloans/LendersWallet/Lenderwalletamountdetails";
import Lendersemiamount from "./components/pages/Oxyloans/LendersWallet/Lendersemiamount";
import Addloanowner from "./components/pages/Oxyloans/LendersWallet/Addloanowner";
import GetOxyFounding from "./components/pages/Oxyloans/LendersWallet/GetOxyFounding";
import ClosedLoans from "./components/pages/Oxyloans/Admin/LoanRecords/ClosedLoans";
import ClosedLoansByPlatform from "./components/pages/Oxyloans/Admin/LoanRecords/ClosedLoansByPlatform";
import LenderRunningsloans from "./components/pages/Oxyloans/Admin/LoanRecords/LenderRunningsloans";
import PaidBorrower from "./components/pages/Oxyloans/Admin/LoanRecords/PaidBorrower";


const CreateDeal = React.lazy(() =>
  import("./components/pages/Oxyloans/Admin/Deals/CreateDeal/CreateDeal")
);
const EscrowDeals = React.lazy(() =>
  import("./components/pages/Oxyloans/Admin/Deals/EscrowDeals/EscrowDeals")
);

const MainAdminDashboard = React.lazy(() =>
  import("./components/pages/Oxyloans/Admin/MainAdminDashboard")
);

const TestDeals = React.lazy(() =>
  import("./components/pages/Oxyloans/Admin/Deals/TestDeals/TestDeals")
);

const ViewCurrentDayDeals = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/ViewCurrentDayDeals")
);

const ViewDeals = React.lazy(() =>
  import("./components/pages/Oxyloans/Admin/Deals/CreateDeal/ViewDeals")
);

const TestDeal = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/TestDeal")
);

const Login = React.lazy(() => import("./components/pages/Authentication"));

const Participatedeal = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/Participatedeal")
);
const Admlogin = React.lazy(() =>
  import("./components/pages/Authentication/Admlogin")
);

const Membership = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/Membership")
);

const Spining = React.lazy(() =>
  import("./components/pages/Oxyloans/Lender/Spining")
);

const Loginotp = React.lazy(() =>
  import("./components/pages/Authentication/Loginotp")
);

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

export const newRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/dashboard",
    element: <AdminDashboard />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/loadwaletThroughQr",
    element: <LoadwaletThroughQr />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/loginotp",
    element: <Loginotp />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/register",
    element: <LenderRegister />,
    errorElement: <Error404></Error404>,
  },

  {
    path: "/borrower_register",
    element: <BorrowerRegister />,
    errorElement: <Error404></Error404>,
  },

  {
    path: "/register_active_proceed",
    element: <Register_active_proceed />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <Error404></Error404>,
  },

  {
    path: "/forgotpassword1",
    element: <ForgotPassword3 />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/partnerRegister",
    element: <PartnerRegister />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/escrowDeals",
    element: <EscrowDeals />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/loadwalletThroughVirtualAccount",
    element: <LoadwalletThroughVirtualAccount />,
    errorElement: <Error404></Error404>,
  },

  {
    path: "/withdrawdealfromwallet",
    element: <Withdrawdealfromwallet />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/mainadmindashboard",
    element: <MainAdminDashboard />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/holdAmountBreakUp",
    element: <HoldAmountBreakUp />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/transferFunds",
    element: <TransferFunds />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/SearchfdUsers",
    element: <SearchfdUsers />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/viewListOfFds",
    element: <ViewListOfFds />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/fdPaymentDetails",
    element: <FdPaymentDetails />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/insertPendingInformation",
    element: <InsertPendingInformation />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/verifyPaymentDetail",
    element: <VerifyPaymentDetail />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/pendingamountUser",
    element: <PendingamountUser />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/fdClosedDetails",
    element: <FdClosedDetails />,

    errorElement: <Error404></Error404>,
  },
  {
    path: "/loanAprroved",
    element: <LoanAprroved />,
    
    errorElement: <Error404></Error404>,
  },
  {
    path: "/newDisbursed",
    element: <NewDisbursed />,
    
    errorElement: <Error404></Error404>,
  },
  {
    path: "/fdexecutedPayment",
    element: <FdexecutedPayment />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/fdmonthlyloansInfo",
    element: <FdmonthlyloansInfo />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/fddownloadInvoice",
    element: <FddownloadInvoice />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/fdStatistics",
    element: <FdStatistics />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/uploadFdData",
    element: <UploadFdData />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/walletToWalletHistory",
    element: <WalletToWalletHistory />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/borrowerLoanStatus",
    element: <BorrowerLoanStatus />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/checkLenderDashboard",
    element: <CheckLenderDashboard />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/lenderwalletamountdetails",
    element: <Lenderwalletamountdetails />,
    errorElement: <Error404></Error404>,
  },{
    path: "/lendersemiamount",
    element: <Lendersemiamount />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/addloanowner",
    element: <Addloanowner />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/getOxyFounding",
    element: <GetOxyFounding />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/uploadtransactions",
    element: <Uploadtransactions />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/poolingLendrs",
    element: <PoolingLendrs />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/lenderreferalinfo",
    element: <Lenderreferalinfo />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/sumofDealAmountInfo",
    element: <SumofDealAmountInfo2 />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/displaylenderwithdrawalfundsList",
    element: <DisplaylenderwithdrawalfundsList />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/paidBorrower",
    element: <PaidBorrower />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/lenderRunningsloans",
    element: <LenderRunningsloans />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/closedLoans",
    element: <ClosedLoans />,
    errorElement: <Error404></Error404>,
  },
  
  {
    path: "/closedLoansByPlatform",
    element: <ClosedLoansByPlatform />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/fromDeal",
    element: <FromDeal />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/lendersInAllEquityDeals",
    element: <LendersInAllEquityDeals />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/lenderstatistics",
    element: <Lenderstatistics />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/approveReferenceamount",
    element: <ApproveReferenceamount />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/editGroupinfo",
    element: <EditGroupinfo />,
    errorElement: <Error404></Error404>,EditGroupinfo
  },
  {
    path: "/editReferenceDeatils",
    element: <EditReferenceDeatils />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/approvedloan",
    element: <Approvedloan />,
    errorElement: <Error404></Error404>,
  },
  
  {
    path: "/applicationLevelDisbursed",
    element: <ApplicationLevelDisbursed />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/lenderWallettransactions",
    element: <LenderWallettransactions />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/lendersLoanApplications",
    element: <LendersLoanApplications />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/viewVanNumber",
    element: <ViewVanNumber />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/intrested",
    element: <Intrested />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/borrowerRunningsinfo",
    element: <BorrowerRunningsinfo />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/holdAmountRequest",
    element: <HoldAmountRequest />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/viewdeals",
    element: <ViewDeals />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/escrowDeals",
    element: <EscrowDeals />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/createdeal",
    element: <CreateDeal />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/testDeals",
    element: <TestDeals />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/spining",
    element: <Spining />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/admlogin",
    element: <Admlogin />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/withdrawdealfromDeal",
    element: <WithdrawdealfromDeal />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/transferWalletToWallet",
    element: <TransferWalletToWallet />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/mywithdrawalHistory",
    element: <MywithdrawalHistory />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/writetous",
    element: <Writetous />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/viewTicketHistory",
    element: <ViewTicketHistory />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/viewCurrentDayDeals",
    element: <ViewCurrentDayDeals />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/emicalculator",
    element: <Emicalculator />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/configautoInvest",
    element: <ConfigautoInvest />,
    errorElement: <Error404></Error404>,
  },

  {
    path: "/membership",
    element: <Membership />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/viewAutoHistory",
    element: <ViewAutoHistory />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/participatedeal",
    element: <Participatedeal />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/regularRunningDeal",
    element: <RegularRunningDeal />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/testDeal",
    element: <TestDeal />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/regularEscrowDeals",
    element: <RegularEscrowDeals />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/regularPersonalDeal",
    element: <RegularPersonalDeal />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/myRunningDelas",
    element: <MyRunningDelas />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/myclosedDeals",
    element: <MyclosedDeals />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/myholdamount",
    element: <Myholdamount />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/mypartiallClosedDeal",
    element: <MypartiallClosedDeal />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/ticketHistory",
    element: <TicketHistory />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/myinterestEarning",
    element: <MyinterestEarning />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/myhighvalueDeals",
    element: <MyhighvalueDeals />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/earningCertificate",
    element: <EarningCertificate />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/myloansStatement",
    element: <MyloansStatement />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/referaFriend",
    element: <ReferaFriend />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/myreferalStatus",
    element: <MyreferalStatus />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/mycontacts",
    element: <Mycontacts />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/walletToWalletHistory",
    element: <WalletToWalletHistory />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/myEarnings",
    element: <MyEarnings />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/loanListings",
    element: <LoanListings />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/WalletToWallet",
    element: <WalletToWallet />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/withdrawalFromWallet",
    element: <WithdrawalFromWallet />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/withdrawdealFounds",
    element: <WithdrawdealFounds />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/membershipHistory",
    element: <MembershipHistory />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/mytransactions",
    element: <Mytransactions />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/autoInvestHistory",
    element: <AutoInvestHistory />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/dashboardTransactions",
    element: <DashboardTransactions />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/loadwalletThroughVirtualAccount",
    element: <LoadwalletThroughVirtualAccount />,
    errorElement: <Error404></Error404>,
  },
  {
    path: "/whatapplogin",
    element: <Whatapplog />,
    errorElement: <Error404></Error404>,
  },
]);
