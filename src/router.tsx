import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const BrandPage = lazy(() => import("./pages/BrandPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const SearchResultPage = lazy(() => import("./pages/SearchResultPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckOutPage = lazy(() => import("./pages/CheckOutPage"));
const PaymentStatusPage = lazy(() => import("./pages/PaymentStatusPage"));
const OrderTrackingPage = lazy(() => import("./pages/OrderTrackingPage"));
const OrderHistoryPage = lazy(() => import("./pages/OrderHistoryPage"));
const AccountCreatedPage = lazy(() => import("./pages/AccountCreatedPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const DashBoardPage = lazy(() => import("./pages/admin/DashBoardPage"));
const TransactionPage = lazy(() => import("./pages/admin/transactions/TransactionPage"));
const ALlUsersPage = lazy(() => import("./pages/admin/users/AllUsersPage"));
const UsersAdminPage = lazy(() => import("./pages/admin/users/UsersAdminPage"));
const PharmacyPage = lazy(() => import("./pages/admin/users/PharmacyPage"));
const CustomerPage = lazy(() => import("./pages/admin/users/CustomerPage"));
const ProductPage = lazy(() => import("./pages/admin/products/ProductPage"));
const AddProductPage = lazy(() => import("./pages/admin/products/AddProductPage"));
const OrderPage = lazy(() => import("./pages/admin/orders/OrderPage"));
const ActiveOrderPage = lazy(() => import("./pages/admin/orders/ActiveOrderPage"));
const CancelledOrderPage = lazy(() => import("./pages/admin/orders/CancelledOrderPage"));
const PendingOrderPage = lazy(() => import("./pages/admin/orders/PendingOrderPage"));
const CompletedOrderPage = lazy(() => import("./pages/admin/orders/CompletedOrderPage"));
const PendingTransactionPage = lazy(() => import("./pages/admin/transactions/PendingTransactionPage"));
const CompletedTransactionPage = lazy(() => import("./pages/admin/transactions/CompletedTransactionPage"));
const CancelledTransactionPage = lazy(() => import("./pages/admin/transactions/CancelledTransactionPage"));
const AccountSettingsPage = lazy(() => import("./pages/admin/settings/AccountSettingsPage"));
const GeneralSettingsPage = lazy(() => import("./pages/admin/settings/GeneralSettingsPage"));
const EmailVerificationPendingPage = lazy(() => import("./pages/EmailVerificationPendingPage"));
const EmailVerificationSuccessfulPage = lazy(() => import("./pages/EmailVerificationSuccessfulPage"));
const SecureAdminPage = lazy(() => import("./features/auth/SecureAdminPage"));
const FavePage = lazy(() => import("./pages/FavePage"));
const SecureUserPage = lazy(() => import("./features/auth/SecureUserPage"));
const AllProductPage = lazy(() => import("./pages/AllProductPage"));
const PrescriptionPage = lazy(() => import("./pages/PrescriptionPage"));
const ProductPrescriptionPage = lazy(() => import("./pages/admin/products/ProductPrescriptionPage"));
const AllProductPrescription = lazy(() => import("./features/admin/product/AllProductPrescription"));
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
    path: "/allProduct",
    element: <AllProductPage />,
  },
  {
    path: "/prescription",
    element: <PrescriptionPage />,
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
    path: "/brand/:name",
    element: <BrandPage />,
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
    path: "/admin/product/prescription/:productId",
    element: (
      <SecureAdminPage
        child={<ProductPrescriptionPage />}
        redirectUrl="/admin/product/prescription/:productId"
      />
    ),
  },
  {
    path: "/admin/product/prescriptions/:userId",
    element: (
      <SecureAdminPage
        child={<AllProductPrescription />}
        redirectUrl="/admin/product/prescriptions/:userId"
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
