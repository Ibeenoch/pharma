import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ProfilePage from "./pages/ProfilePage";
import SearchResultPage from "./pages/SearchResultPage";
import CategoriesPage from "./pages/CategoriesPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import PaymentStatusPage from "./pages/PaymentStatusPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import AccountCreatedPage from "./pages/AccountCreatedPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import DashBoardPage from "./pages/admin/DashBoardPage";
import TransactionPage from "./pages/admin/transactions/TransactionPage";
import ALlUsersPage from "./pages/admin/users/AllUsersPage";
import UsersAdminPage from "./pages/admin/users/UsersAdminPage";
import PharmacyPage from "./pages/admin/users/PharmacyPage";
import CustomerPage from "./pages/admin/users/CustomerPage";
import ProductPage from "./pages/admin/products/ProductPage";
import AddProductPage from "./pages/admin/products/AddProductPage";
import OrderPage from "./pages/admin/orders/OrderPage";
import ActiveOrderPage from "./pages/admin/orders/ActiveOrderPage";
import CancelledOrderPage from "./pages/admin/orders/CancelledOrderPage";
import PendingOrderPage from "./pages/admin/orders/PendingOrderPage";
import CompletedOrderPage from "./pages/admin/orders/CompletedOrderPage";
import PendingTransactionPage from "./pages/admin/transactions/PendingTransactionPage";
import CompletedTransactionPage from "./pages/admin/transactions/CompletedTransactionPage";
import CancelledTransactionPage from "./pages/admin/transactions/CancelledTransactionPage";
import AccountSettingsPage from "./pages/admin/settings/AccountSettingsPage";
import GeneralSettingsPage from "./pages/admin/settings/GeneralSettingsPage";
import EmailVerificationPendingPage from "./pages/EmailVerificationPendingPage";
import EmailVerificationSuccessfulPage from "./pages/EmailVerificationSuccessfulPage";
import SecureAdminPage from "./features/auth/SecureAdminPage";
const Home = lazy(() => import("./pages/Home"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/verify/pending",
    element: <EmailVerificationPendingPage />,
  },
  {
    path: "/verify/successfully",
    element: <EmailVerificationSuccessfulPage />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/resetpassword",
    element: <ResetPasswordPage />,
  },
  {
    path: "/categories",
    element: <CategoriesPage />,
  },
  {
    path: "/search_result",
    element: <SearchResultPage />,
  },
  {
    path: "/product_details",
    element: <ProductDetailsPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/cart",
    element: <CartPage />,
  },
  {
    path: "/checkout",
    element: <CheckOutPage />,
  },
  {
    path: "/payment_status",
    element: <PaymentStatusPage />,
  },
  {
    path: "/order_tracking",
    element: <OrderTrackingPage />,
  },
  {
    path: "/order_history",
    element: <OrderHistoryPage />,
  },
  {
    path: "/account_created",
    element: <AccountCreatedPage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
  },
  {
    path: "/admin/dashboard",
    element: <SecureAdminPage child={<DashBoardPage />} /> ,
  },

  {
    path: "/admin/users/all",
    element: <SecureAdminPage child={<ALlUsersPage />} /> ,
  },
  {
    path: "/admin/users/admin",
    element: <SecureAdminPage child={<UsersAdminPage />} />,
  },
  {
    path: "/admin/users/pharmacy",
    element: <SecureAdminPage child={<PharmacyPage />} />,
  },
  {
    path: "/admin/users/customer",
    element: <SecureAdminPage child={<CustomerPage />} />,
  },
  {
    path: "/admin/product/all",
    element: <SecureAdminPage child={<ProductPage />} />,
  },
  {
    path: "/admin/product/add",
    element: <SecureAdminPage child={<AddProductPage />} />,
  },
  {
    path: "/admin/product/update/:id",
    element: <SecureAdminPage child={<AddProductPage />} />,
  },
  {
    path: "/admin/order/all",
    element: <SecureAdminPage child={<OrderPage />} />,
  },
  {
    path: "/admin/order/active",
    element: <SecureAdminPage child={<ActiveOrderPage />} />,
  },
  {
    path: "/admin/order/cancelled",
    element: <SecureAdminPage child={<CancelledOrderPage />} />,
  },
  {
    path: "/admin/order/pending",
    element: <SecureAdminPage child={<PendingOrderPage />} />,
  },
  {
    path: "/admin/order/completed",
    element: <SecureAdminPage child={<CompletedOrderPage />} />,
  },
  {
    path: "/admin/transaction/all",
    element: <SecureAdminPage child={<TransactionPage />} />,
  },
  {
    path: "/admin/transaction/pending",
    element: <SecureAdminPage child={<PendingTransactionPage />} />,
  },
  {
    path: "/admin/transaction/completed",
    element: <SecureAdminPage child={<CompletedTransactionPage />} />,
  },
  {
    path: "/admin/transaction/cancelled",
    element: <SecureAdminPage child={<CancelledTransactionPage />} />,
  },
  {
    path: "/admin/settings/account",
    element: <SecureAdminPage child={<AccountSettingsPage />} />,
  },
  {
    path: "/admin/settings/general",
    element: <SecureAdminPage child={<GeneralSettingsPage />} />,
  },
]);

export default router;
