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
import SecureUserPage from "./features/auth/SecureUserPage";
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
    path: "/checkout/:userId",
    element: <SecureUserPage child={<CheckOutPage />} />,
  },
  {
    path: "/payment_status/:userId/:orderId",
    element: <SecureUserPage child={<PaymentStatusPage />} />,
  },
  {
    path: "/order_tracking/:userId/:orderId",
    element: <SecureUserPage child={<OrderTrackingPage />} />,
  },
  {
    path: "/order_history/:userId",
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
    path: "/admin/dashboard/:userId",
    element: (
      <SecureAdminPage
        child={<DashBoardPage />}
        redirectUrl="/admin/dashboard/:userId"
      />
    ),
  },

  {
    path: "/admin/users/all/:userId",
    element: (
      <SecureAdminPage
        child={<ALlUsersPage />}
        redirectUrl="/admin/users/all/:userId"
      />
    ),
  },
  {
    path: "/admin/users/admin/:userId",
    element: (
      <SecureAdminPage
        child={<UsersAdminPage />}
        redirectUrl="/admin/users/admin/:userId"
      />
    ),
  },
  {
    path: "/admin/users/pharmacy/:userId",
    element: (
      <SecureAdminPage
        child={<PharmacyPage />}
        redirectUrl="/admin/users/pharmacy/:userId"
      />
    ),
  },
  {
    path: "/admin/users/customer/:userId",
    element: (
      <SecureAdminPage
        child={<CustomerPage />}
        redirectUrl="/admin/users/customer/:userId"
      />
    ),
  },
  {
    path: "/admin/product/all/:userId",
    element: (
      <SecureAdminPage
        child={<ProductPage />}
        redirectUrl="/admin/product/all/:userId"
      />
    ),
  },
  {
    path: "/admin/product/add/:userId",
    element: (
      <SecureAdminPage
        child={<AddProductPage />}
        redirectUrl="/admin/product/add"
      />
    ),
  },
  {
    path: "/admin/product/update/:id",
    element: <SecureAdminPage child={<AddProductPage />} />,
  },
  {
    path: "/admin/order/all/:userId",
    element: (
      <SecureAdminPage
        child={<OrderPage />}
        redirectUrl="/admin/order/all/:userId"
      />
    ),
  },
  {
    path: "/admin/order/active/:userId",
    element: (
      <SecureAdminPage
        child={<ActiveOrderPage />}
        redirectUrl="/admin/order/active/:userId"
      />
    ),
  },
  {
    path: "/admin/order/cancelled/:userId",
    element: (
      <SecureAdminPage
        child={<CancelledOrderPage />}
        redirectUrl="/admin/order/cancelled/:userId"
      />
    ),
  },
  {
    path: "/admin/order/pending/:userId",
    element: (
      <SecureAdminPage
        child={<PendingOrderPage />}
        redirectUrl="/admin/order/pending/:userId"
      />
    ),
  },
  {
    path: "/admin/order/completed/:userId",
    element: (
      <SecureAdminPage
        child={<CompletedOrderPage />}
        redirectUrl="/admin/order/completed/:userId"
      />
    ),
  },
  {
    path: "/admin/transaction/all/:userId",
    element: (
      <SecureAdminPage
        child={<TransactionPage />}
        redirectUrl="/admin/transaction/all/:userId"
      />
    ),
  },
  {
    path: "/admin/transaction/pending/:userId",
    element: (
      <SecureAdminPage
        child={<PendingTransactionPage />}
        redirectUrl="/admin/transaction/pending/:userId"
      />
    ),
  },
  {
    path: "/admin/transaction/completed/:userId",
    element: (
      <SecureAdminPage
        child={<CompletedTransactionPage />}
        redirectUrl="/admin/transaction/completed/:userId"
      />
    ),
  },
  {
    path: "/admin/transaction/cancelled/:userId",
    element: (
      <SecureAdminPage
        child={<CancelledTransactionPage />}
        redirectUrl="/admin/transaction/cancelled/:userId"
      />
    ),
  },
  {
    path: "/admin/settings/account/:userId",
    element: (
      <SecureAdminPage
        child={<AccountSettingsPage />}
        redirectUrl="/admin/settings/account/:userId"
      />
    ),
  },
  {
    path: "/admin/settings/general/:userId",
    element: (
      <SecureAdminPage
        child={<GeneralSettingsPage />}
        redirectUrl="/admin/settings/general/:userId"
      />
    ),
  },
]);

export default router;
