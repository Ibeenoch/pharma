import Cross from "../../assets/icons/cross-fig.svg?react";
import Cash from "../../assets/icons/cash.svg?react";
import StockOut from "../../assets/icons/stock-out.svg?react";
import Users from "../../assets/icons/users-2-yellow.svg?react";

export const cardLists = [
  {
    Icon: Cross,
    topText: "Medical Product",
    middleText: "517",
    endText: "Manage inventory",
    color: "bg-[#3f3114]",
  },
  {
    Icon: Cash,
    topText: "Total Revenue",
    middleText: "₦705,360",
    endText: "View Details",
    color: "bg-[#ab7843]",
  },
  {
    Icon: Users,
    topText: "Total User",
    middleText: "15,124",
    endText: "View Details",
    color: "bg-[#6d3914]",
  },
  {
    Icon: StockOut,
    topText: "Low Stock",
    middleText: "8",
    endText: "Restock Now",
    color: "bg-[#4c2b08]",
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
  { name: "Total Products", value: 500, color: "#3f3114" }, // Blue
  { name: "Out of Stock", value: 80, color: "#ab7843" }, // Red
  { name: "Expired", value: 50, color: "#6d3914" }, // Yellow
  { name: "Returned", value: 30, color: "#4c2b08" }, // Green
];

export const recentPaymentData = [
  {
    order_id: "9875635",
    customer_name: "Nayeem Bhuiyan",
    date: "22/10/2023",
    payment_method: "Card",
    price: "$65",
    invoice: "Complete",
  },
  {
    order_id: "8596635",
    customer_name: "John Alex",
    date: "22/10/2023",
    payment_method: "Card",
    price: "$54",
    invoice: "Complete",
  },
  {
    order_id: "7589632",
    customer_name: "Sophia Carter",
    date: "21/10/2023",
    payment_method: "Bank Transfer",
    price: "$120",
    invoice: "Pending",
  },
  {
    order_id: "6321458",
    customer_name: "Michael Brown",
    date: "21/10/2023",
    payment_method: "Cash",
    price: "$45",
    invoice: "Complete",
  },
  {
    order_id: "9517536",
    customer_name: "Emily Johnson",
    date: "20/10/2023",
    payment_method: "Card",
    price: "$88",
    invoice: "Complete",
  },
  {
    order_id: "3571598",
    customer_name: "David Wilson",
    date: "19/10/2023",
    payment_method: "PayPal",
    price: "$77",
    invoice: "Failed",
  },
  {
    order_id: "2648391",
    customer_name: "Jessica Miller",
    date: "18/10/2023",
    payment_method: "Card",
    price: "$92",
    invoice: "Complete",
  },
  {
    order_id: "7984123",
    customer_name: "Chris Evans",
    date: "17/10/2023",
    payment_method: "Bank Transfer",
    price: "$150",
    invoice: "Pending",
  },
  {
    order_id: "6482917",
    customer_name: "Olivia Thomas",
    date: "16/10/2023",
    payment_method: "Cash",
    price: "$39",
    invoice: "Complete",
  },
  {
    order_id: "3857204",
    customer_name: "Daniel Smith",
    date: "15/10/2023",
    payment_method: "PayPal",
    price: "$110",
    invoice: "Complete",
  },
];
