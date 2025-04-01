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
import UsersPage from "./pages/admin/UsersPage";
import ProductPage from "./pages/admin/ProductPage";
import OrderPage from "./pages/admin/OrderPage";
import TransactionPage from "./pages/admin/TransactionPage";
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
    element: <DashBoardPage />,
  },
  {
    path: "/admin/users",
    element: <UsersPage />,
  },
  {
    path: "/admin/product",
    element: <ProductPage />,
  },
  {
    path: "/admin/order",
    element: <OrderPage />,
  },
  {
    path: "/admin/transaction",
    element: <TransactionPage />,
  },
]);

export default router;
