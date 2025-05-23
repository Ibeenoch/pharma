import Users from '../../../assets/icons/users-2-black.svg?react'

export const userLists = [
  "All Users",
  "Admins",
  "Pharmacists",
  "Customers",
];

export const allUsersData = [
  {
    id: "#1001",
    name: "Chinedu Okafor",
    email: "chinedu.okafor@example.com",
    role: "Admin",
    dateAdded: "31 Jul 2023",
    address: "12 Bode Thomas Street, Surulere, Lagos",
    actions: "Actions",
  },
  {
    id: "#1002",
    name: "Aisha Bello",
    email: "aisha.bello@example.com",
    role: "Customer",
    dateAdded: "01 Aug 2023",
    address: "25 Yakubu Avenue, Garki, Abuja",
    actions: "Actions",
  },
  {
    id: "#1003",
    name: "Tunde Adebayo",
    email: "tunde.adebayo@example.com",
    role: "Pharmacist",
    dateAdded: "02 Aug 2023",
    address: "7 Obafemi Awolowo Way, Ikeja, Lagos",
    actions: "Actions",
  },
  {
    id: "#1004",
    name: "Emeka Nwosu",
    email: "emeka.nwosu@example.com",
    role: "Customer",
    dateAdded: "02 Aug 2023",
    address: "18 Aba Road, Port Harcourt, Rivers",
    actions: "Actions",
  },
  {
    id: "#1005",
    name: "Grace Uche",
    email: "grace.uche@example.com",
    role: "Admin",
    dateAdded: "03 Aug 2023",
    address: "3 Nnamdi Azikiwe Street, Enugu",
    actions: "Actions",
  },
  {
    id: "#1006",
    name: "Yusuf Lawal",
    email: "yusuf.lawal@example.com",
    role: "Pharmacist",
    dateAdded: "03 Aug 2023",
    address: "10 Ahmadu Bello Way, Kaduna",
    actions: "Actions",
  },
  {
    id: "#1007",
    name: "Kemi Adeyemi",
    email: "kemi.adeyemi@example.com",
    role: "Customer",
    dateAdded: "04 Aug 2023",
    address: "22 Ring Road, Ibadan, Oyo",
    actions: "Actions",
  },
  {
    id: "#1008",
    name: "Umar Garba",
    email: "umar.garba@example.com",
    role: "Admin",
    dateAdded: "04 Aug 2023",
    address: "15 Sokoto Road, Kano",
    actions: "Actions",
  },
  {
    id: "#1009",
    name: "Oluwakemi Balogun",
    email: "oluwakemi.balogun@example.com",
    role: "Pharmacist",
    dateAdded: "05 Aug 2023",
    address: "8 Lekki Phase 1, Victoria Island, Lagos",
    actions: "Actions",
  },
  {
    id: "#1010",
    name: "Segun Alabi",
    email: "segun.alabi@example.com",
    role: "Customer",
    dateAdded: "05 Aug 2023",
    address: "11 Ekiti Close, Akure, Ondo",
    actions: "Actions",
  },
];
export const allUsersColumn = [
  { key: "id", label: "S/N" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "dateAdded", label: "Date Joined" },
  { key: "role", label: "Role" },
];

export const userStatitics = [
{
  text: 'Total Users',
  Icon: Users,
  qty: 579,
},
{
  text: 'New Users',
  Icon: Users,
  qty: 6,
},
{
  text: 'Active Users',
  Icon: Users,
  qty: 88,
},
]