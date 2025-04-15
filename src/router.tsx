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
import FavePage from "./pages/FavePage";
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
    path: "/product_details/:id",
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
    path: "/wishlist",
    element: <FavePage />,
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
    element: <SecureAdminPage child={<DashBoardPage />} redirectUrl="/admin/dashboard" />,
  },

  {
    path: "/admin/users/all",
    element: <SecureAdminPage child={<ALlUsersPage />} redirectUrl="/admin/users/all" />,
  },
  {
    path: "/admin/users/admin",
    element: <SecureAdminPage child={<UsersAdminPage />} redirectUrl="/admin/users/admin"/>,
  },
  {
    path: "/admin/users/pharmacy",
    element: <SecureAdminPage child={<PharmacyPage />} redirectUrl="/admin/users/pharmacy" />,
  },
  {
    path: "/admin/users/customer",
    element: <SecureAdminPage child={<CustomerPage />} redirectUrl="/admin/users/customer" />,
  },
  {
    path: "/admin/product/all",
    element: <SecureAdminPage child={<ProductPage />} redirectUrl="/admin/product/all" />,
  },
  {
    path: "/admin/product/add",
    element: <SecureAdminPage child={<AddProductPage />} redirectUrl="/admin/product/add" />,
  },
  {
    path: "/admin/product/update/:id",
    element: <SecureAdminPage child={<AddProductPage />} />,
  },
  {
    path: "/admin/order/all",
    element: <SecureAdminPage child={<OrderPage />} redirectUrl="/admin/order/all" />,
  },
  {
    path: "/admin/order/active",
    element: <SecureAdminPage child={<ActiveOrderPage />} redirectUrl="/admin/order/active" />,
  },
  {
    path: "/admin/order/cancelled",
    element: <SecureAdminPage child={<CancelledOrderPage />} redirectUrl="/admin/order/cancelled" />,
  },
  {
    path: "/admin/order/pending",
    element: <SecureAdminPage child={<PendingOrderPage />} redirectUrl="/admin/order/pending" />,
  },
  {
    path: "/admin/order/completed",
    element: <SecureAdminPage child={<CompletedOrderPage />} redirectUrl="/admin/order/completed" />,
  },
  {
    path: "/admin/transaction/all",
    element: <SecureAdminPage child={<TransactionPage />} redirectUrl="/admin/transaction/all" />,
  },
  {
    path: "/admin/transaction/pending",
    element: <SecureAdminPage child={<PendingTransactionPage />} redirectUrl="/admin/transaction/pending" />,
  },
  {
    path: "/admin/transaction/completed",
    element: <SecureAdminPage child={<CompletedTransactionPage />} redirectUrl="/admin/transaction/completed" />,
  },
  {
    path: "/admin/transaction/cancelled",
    element: <SecureAdminPage child={<CancelledTransactionPage />} redirectUrl="/admin/transaction/cancelled" />,
  },
  {
    path: "/admin/settings/account",
    element: <SecureAdminPage child={<AccountSettingsPage />} redirectUrl="/admin/settings/account" />,
  },
  {
    path: "/admin/settings/general",
    element: <SecureAdminPage child={<GeneralSettingsPage />} redirectUrl="/admin/settings/general"/>,
  },
]);

export default router;
