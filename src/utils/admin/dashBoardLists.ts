import Cross from "../../assets/icons/cross-fig.svg?react";
import Cash from "../../assets/icons/cash.svg?react";
import StockOut from "../../assets/icons/stock-out.svg?react";
import Users from "../../assets/icons/users-2-yellow.svg?react";
import {
  darkblue,
  darkblueText,
  darkGreen,
  darkGreenText,
  darkOrange,
  darkredText,
  darkyellow,
  darkyellowText,
} from "../../constants/appColor";
import DashBoard from "../../assets/icons/dashboard.svg?react";
import User from "../../assets/icons/users-2-black.svg?react";
import Product from "../../assets/icons/product-tag.svg?react";
import Order from "../../assets/icons/order.svg?react";
import Transaction from "../../assets/icons/transaction.svg?react";
import Settings from "../../assets/icons/setting.svg?react";
import Admin from "../../assets/icons/admin2.svg?react";
import Pharmacist from "../../assets/icons/pharmacist.svg?react";
import AddProduct from "../../assets/icons/addproduct.svg?react";
import Customer from "../../assets/icons/user.svg?react";
import OrderActive from "../../assets/icons/activeorder.svg?react";
import OrderCancelled from "../../assets/icons/ordercancelled.svg?react";
import OrderCompleted from "../../assets/icons/completeorder.svg?react";
import OrderPending from "../../assets/icons/order.svg?react";
import SuccessTran from "../../assets/icons/status-success.svg?react";
import FailedTran from "../../assets/icons/failed-transaction.svg?react";
import PendingTran from "../../assets/icons/contract-pending.svg?react";
import AllTran from "../../assets/icons/allpayment.svg?react";
import Settings1 from "../../assets/icons/setting-1.svg?react";
import Settings2 from "../../assets/icons/setting-2.svg?react";

export const navIcons = [
  { icons: DashBoard, text: "Dashboard" },
  { icons: User, text: "User" },
  { icons: Product, text: "Product" },
  { icons: Order, text: "Order" },
  { icons: Transaction, text: "Transaction" },
  { icons: Settings, text: "Settings" },
];
export const subNavIcons = [
  {
    name: "User",
    children: [
      { icons: User, text: "All", route: "/admin/users/all" },
      { icons: Admin, text: "Admin", route: "/admin/users/admin" },
      { icons: Pharmacist, text: "Pharmacist", route: "/admin/users/pharmacy" }, // customer
      { icons: Customer, text: "Customer", route: "/admin/users/customer" },
    ],
  },
  {
    name: "Product",
    children: [
      { icons: Product, text: "All", route: "/admin/product/all" },
      { icons: AddProduct, text: "Add", route: "/admin/product/add" },
    ],
  },
  {
    name: "Order",
    children: [
      { icons: Order, text: "All", route: "/admin/order/all" },
      { icons: OrderActive, text: "Active", route: "/admin/order/active" },
      { icons: OrderPending, text: "Pending", route: "/admin/order/pending" },
      {
        icons: OrderCancelled,
        text: "Cancelled",
        route: "/admin/order/cancelled",
      },
      {
        icons: OrderCompleted,
        text: "Completed",
        route: "/admin/order/completed",
      },
    ],
  },
  {
    name: "Transaction",
    children: [
      { icons: AllTran, text: "All", route: "/admin/transaction/all" },
      {
        icons: PendingTran,
        text: "Pending",
        route: "/admin/transaction/pending",
      },
      {
        icons: FailedTran,
        text: "Cancelled",
        route: "/admin/transaction/cancelled",
      },
      {
        icons: SuccessTran,
        text: "Completed",
        route: "/admin/transaction/completed",
      },
    ],
  },
  {
    name: "Settings",
    children: [
      { icons: Settings1, text: "General", route: "/admin/settings/general" },
      { icons: Settings2, text: "Account", route: "/admin/settings/account" },
    ],
  },
];

export const cardLists = [
  {
    Icon: Cross,
    topText: "Medical Product",
    middleText: "517",
    endText: "Manage inventory",
    color: `bg-gradient-to-r from-blue-300 to-blue-800`,
    textColor: darkblueText,
    iconColor: darkblueText,
  },
  {
    Icon: Cash,
    topText: "Total Revenue",
    middleText: "₦705,360",
    endText: "View Details",
    color: `bg-gradient-to-r from-green-300 to-green-600`,
    textColor: darkGreenText,
    iconColor: darkGreenText,
  },
  {
    Icon: Users,
    topText: "Total User",
    middleText: "15,124",
    endText: "View Details",
    color: `bg-gradient-to-r from-[#fff7d5] to-yellow-400`,
    textColor: darkyellowText,
    iconColor: darkyellowText,
  },
  {
    Icon: StockOut,
    topText: "Low Stock",
    middleText: "8",
    endText: "Restock Now",
    color: `bg-gradient-to-r from-[#ffcfc8] to-red-700`,
    textColor: darkredText,
    iconColor: darkredText,
  },
];

// {month: 'Jan', category: 'Painkiller', qty: 45, }
export const salesData = [
  { month: "Jan", category: "Painkiller", qty: 45 },
  { month: "Jan", category: "Antibiotics", qty: 30 },
  { month: "Jan", category: "Vitamins", qty: 20 },
  { month: "Jan", category: "Cough Syrup", qty: 15 },

  { month: "Feb", category: "Painkiller", qty: 60 },
  { month: "Feb", category: "Antibiotics", qty: 50 },
  { month: "Feb", category: "Vitamins", qty: 35 },
  { month: "Feb", category: "Cough Syrup", qty: 25 },

  { month: "Mar", category: "Painkiller", qty: 40 },
  { month: "Mar", category: "Antibiotics", qty: 45 },
  { month: "Mar", category: "Vitamins", qty: 30 },
  { month: "Mar", category: "Cough Syrup", qty: 50 },

  { month: "Apr", category: "Painkiller", qty: 70 },
  { month: "Apr", category: "Antibiotics", qty: 55 },
  { month: "Apr", category: "Vitamins", qty: 40 },
  { month: "Apr", category: "Cough Syrup", qty: 30 },

  { month: "May", category: "Painkiller", qty: 55 },
  { month: "May", category: "Antibiotics", qty: 40 },
  { month: "May", category: "Vitamins", qty: 35 },
  { month: "May", category: "Cough Syrup", qty: 15 },
];

export const inventoryData = [
  { name: "Total Products", value: 500, color: darkblue },
  { name: "Out of Stock", value: 80, color: darkGreen },
  { name: "Expired", value: 50, color: darkOrange },
  { name: "Returned", value: 30, color: darkyellow },
];

export const recentPaymentData = [
  {
    order_id: "9875635",
    customer_name: "Nayeem Bhuiyan",
    date: "22/10/2023",
    payment_method: "Card",
    price: "$65",
    status: "Complete",
  },
  {
    order_id: "8596635",
    customer_name: "John Alex",
    date: "22/10/2023",
    payment_method: "Card",
    price: "$54",
    status: "Complete",
  },
  {
    order_id: "7589632",
    customer_name: "Sophia Carter",
    date: "21/10/2023",
    payment_method: "Bank Transfer",
    price: "$120",
    status: "Pending",
  },
  {
    order_id: "6321458",
    customer_name: "Michael Brown",
    date: "21/10/2023",
    payment_method: "Cash",
    price: "$45",
    status: "Complete",
  },
  {
    order_id: "9517536",
    customer_name: "Emily Johnson",
    date: "20/10/2023",
    payment_method: "Card",
    price: "$88",
    status: "Complete",
  },
  {
    order_id: "3571598",
    customer_name: "David Wilson",
    date: "19/10/2023",
    payment_method: "PayPal",
    price: "$77",
    status: "Failed",
  },
  {
    order_id: "2648391",
    customer_name: "Jessica Miller",
    date: "18/10/2023",
    payment_method: "Card",
    price: "$92",
    status: "Complete",
  },
  {
    order_id: "7984123",
    customer_name: "Chris Evans",
    date: "17/10/2023",
    payment_method: "Bank Transfer",
    price: "$150",
    status: "Pending",
  },
  {
    order_id: "6482917",
    customer_name: "Olivia Thomas",
    date: "16/10/2023",
    payment_method: "Cash",
    price: "$39",
    status: "Complete",
  },
  {
    order_id: "3857204",
    customer_name: "Daniel Smith",
    date: "15/10/2023",
    payment_method: "PayPal",
    price: "$110",
    status: "Complete",
  },
];

export const paymentColumns = [
  { key: "order_id", label: "Order ID" },
  { key: "customer_name", label: "Customer Name" },
  { key: "date", label: "Date Paid" },
  { key: "payment_method", label: "Payment Method" },
  { key: "price", label: "Price" },
  {
    key: "status",
    label: "Status",
  },
];
