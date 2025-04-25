export const orderRowsData = [
  {
    id: "#00123",
    qty: 3,
    paymentMethod: "PayStack",
    status: "Pending",
    total: 2800,
  },
  {
    id: "#00132",
    qty: 1,
    paymentMethod: "FlutterWave",
    status: "Cancelled",
    total: 5600,
  },
  {
    id: "#00144",
    qty: 4,
    paymentMethod: "FlutterWave",
    status: "Delivered",
    total: 6680,
  },
];

export const orderColumns = [
  { key: "id", label: "ID" },
  { key: "qty", label: "Product Quantity" },
  { key: "paymentMethod", label: "Payment Method" },
  {
    key: "status",
    label: "Status",
    conditionalFormat: (value: string) =>
      value === "Pending"
        ? "text-yellow-500"
        : value === "Cancelled"
        ? "text-red-500"
        : value === "Delivered"
        ? "text-green-500"
        : "",
  },
  { key: "total", label: "Total" },
];
