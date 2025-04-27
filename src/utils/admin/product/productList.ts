import emzor from "../../../assets/images/b2_emzor.png";
import fidson from "../../../assets/images/fidsonImg.png";
import mayAndBayer from "../../../assets/images/may&bayerimg.png";
import neimeth from "../../../assets/images/neimethImg.png";
import swiss from "../../../assets/images/swissPharmaImg.png";
import mecure from "../../../assets/images/mercureImg.png";
import morison from "../../../assets/images/morisonImg.png";
import dana from "../../../assets/images/danaImg.png";
import dailyNeed from "../../../assets/images/dailyNeedImg.png";
import evans from "../../../assets/images/evansImg.png";
import juhel from "../../../assets/images/juhelImg.png";
import greenlife from "../../../assets/images/greenLifeImg.png";
import pharmatex from "../../../assets/images/pharmatexImg.png";
import archy from "../../../assets/images/ArachisImg.png";
import ngc from "../../../assets/images/NigerianGermanChemicalsPlcImg.png";
import dgfpharma from "../../../assets/images/dfgImg.png";
import adpharm from "../../../assets/images/adipharmaImg.png";
import alphapharmacy from "../../../assets/images/alphapharmImg.png";
import elbepharma from "../../../assets/images/eibeImg.png";
import geneith from "../../../assets/images/geneithPharmImg.png";
import hovid from "../../../assets/images/hovidImg.png";
import maydon from "../../../assets/images/maydonImg.png";
import newheights from "../../../assets/images/newheightPharImg.png";
import phamatex from "../../../assets/images/phamatexImg.png";
import ranbaxy from "../../../assets/images/ranbaxyImg.png";
import skg from "../../../assets/images/skgImg.png";
import vixa from "../../../assets/images/vixaImg.png";
import zolon from "../../../assets/images/zolonImg.png";
import gsk from '../../../assets/images/ng-glaxos-logo.png';
import pfizer from '../../../assets/images/pfizer.png';

export const navLists = [
  { tabName: "All Product", route: "/admin/product/all" },
  { tabName: "Add Product", route: "/admin/product/add" },
];
// subtitle: 'fast relieve for headache',
export const allproductLists = [
  {
    id: 1,
    name: "Emzor Paracetamol",
    category: "Pain Killers",
    brand: "Emzor",
    stock: 23,
    qtysold: 11,
    expired: 3,
    unitPrice: "₦3500",
    dateAdded: "23rd Jan, 2025",
    actions: "Actions",
  },
  {
    id: 2,
    name: "Ibuprofen Tablets",
    category: "Pain Killers",
    brand: "M&B",
    stock: 45,
    qtysold: 20,
    expired: 2,
    unitPrice: "₦1500",
    dateAdded: "5th Feb, 2025",
    actions: "Actions",
  },
  {
    id: 3,
    name: "Vitamin C 1000mg",
    category: "Supplements",
    brand: "Emzor",
    stock: 50,
    qtysold: 30,
    expired: 5,
    unitPrice: "₦500",
    dateAdded: "12th Mar, 2025",
    actions: "Actions",
  },
  {
    id: 4,
    name: "Cough Syrup",
    category: "Cold & Flu",
    brand: "Benylin",
    stock: 35,
    qtysold: 15,
    expired: 1,
    unitPrice: "₦2800",
    dateAdded: "18th Apr, 2025",
    actions: "Actions",
  },
  {
    id: 5,
    name: "Amoxicillin Capsules",
    category: "Antibiotics",
    brand: "GSK",
    stock: 60,
    qtysold: 40,
    expired: 0,
    unitPrice: "₦4500",
    dateAdded: "25th May, 2025",
    actions: "Actions",
  },
  {
    id: 6,
    name: "Diclofenac Gel",
    category: "Pain Relief",
    brand: "Novartis",
    stock: 20,
    qtysold: 10,
    expired: 0,
    unitPrice: "₦2200",
    dateAdded: "30th Jun, 2025",
    actions: "Actions",
  },
  {
    id: 7,
    name: "Insulin Injection",
    category: "Diabetes Care",
    brand: "Novo Nordisk",
    stock: 18,
    qtysold: 5,
    expired: 1,
    unitPrice: "₦7200",
    dateAdded: "10th Jul, 2025",
    actions: "Actions",
  },
  {
    id: 8,
    name: "Multivitamin Capsules",
    category: "Supplements",
    brand: "Wellman",
    stock: 40,
    qtysold: 22,
    expired: 2,
    unitPrice: "₦3500",
    dateAdded: "15th Aug, 2025",
    actions: "Actions",
  },
  {
    id: 9,
    name: "Cetrizine Tablets",
    category: "Allergy Relief",
    brand: "Zyrtec",
    stock: 25,
    qtysold: 18,
    expired: 0,
    unitPrice: "₦1300",
    dateAdded: "1st Sep, 2025",
    actions: "Actions",
  },
  {
    id: 10,
    name: "Chloroquine Tablets",
    category: "Malaria Treatment",
    brand: "Swipha",
    stock: 30,
    qtysold: 12,
    expired: 4,
    unitPrice: "₦2800",
    dateAdded: "20th Oct, 2025",
    actions: "Actions",
  },
  {
    id: 11,
    name: "Folic Acid Tablets",
    category: "Pregnancy Care",
    brand: "Emzor",
    stock: 70,
    qtysold: 35,
    expired: 3,
    unitPrice: "₦900",
    dateAdded: "11th Nov, 2025",
    actions: "Actions",
  },
  {
    id: 12,
    name: "Artemether Injection",
    category: "Malaria Treatment",
    brand: "Lonart",
    stock: 22,
    qtysold: 10,
    expired: 1,
    unitPrice: "₦3500",
    dateAdded: "28th Dec, 2025",
    actions: "Actions",
  },
  {
    id: 13,
    name: "Hydroxychloroquine",
    category: "Anti-inflammatory",
    brand: "Sanofi",
    stock: 27,
    qtysold: 9,
    expired: 0,
    unitPrice: "₦4800",
    dateAdded: "3rd Jan, 2026",
    actions: "Actions",
  },
  {
    id: 14,
    name: "Prednisolone Tablets",
    category: "Steroids",
    brand: "Pfizer",
    stock: 32,
    qtysold: 18,
    expired: 1,
    unitPrice: "₦3200",
    dateAdded: "14th Feb, 2026",
    actions: "Actions",
  },
  {
    id: 15,
    name: "Metformin Tablets",
    category: "Diabetes Care",
    brand: "Merck",
    stock: 40,
    qtysold: 25,
    expired: 2,
    unitPrice: "₦2500",
    dateAdded: "22nd Mar, 2026",
    actions: "Actions",
  },
  {
    id: 16,
    name: "Omeprazole Capsules",
    category: "Ulcer Treatment",
    brand: "Gaviscon",
    stock: 36,
    qtysold: 15,
    expired: 1,
    unitPrice: "₦2800",
    dateAdded: "5th Apr, 2026",
    actions: "Actions",
  },
];

export const allproductColumn = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "brand", label: "Brand" },
  { key: "stock", label: "Stock" },
  { key: "qtysold", label: "Quantity Sold" },
  { key: "expired", label: "Expired" },
  { key: "unitPrice", label: "Unit Price" },
  { key: "dateAdded", label: "Date Added" },
  { key: "actions", label: "Actions" },
];

export const allPrescriptionColumn = [
  { key: "sn", label: "S/N" },
  { key: "image", label: "Image" },
  { key: "name", label: "Name" },
  { key: "frequency", label: "Frequency" },
  { key: "methodOfUsage", label: "Usage Method" },
  { key: "concentration", label: "Concentration" },
  { key: "dosage", label: "Dosage" },
  { key: "ageRange", label: "Age Range" },
  { key: "actions", label: "Actions" },
];



export const productCategories = [
  { value: "", label: "Select Category", image: "" },
  { value: "Cough & Cold", label: "Cough & Cold", image: "cough.png" },
  { value: "Anti-Malaria", label: "Anti-Malaria", image: "malaria.png" },
  { value: "Antibiotics", label: "Antibiotics", image: "antibiotics.png" },
  {
    value: "Pain Relief & Analgesics",
    label: "Pain Relief & Analgesics",
    image: "pain.png",
  },
  {
    value: "Vitamins & Supplements",
    label: "Vitamins & Supplements",
    image: "vitamins.png",
  },
  {
    value: "Antifungal Medications",
    label: "Antifungal Medications",
    image: "antifungal.png",
  },
  {
    value: "Antiviral Medications",
    label: "Antiviral Medications",
    image: "antiviral.png",
  },
  {
    value: "Sexual Health & Libido",
    label: "Sexual Health & Libido",
    image: "sexual.png",
  },
  {
    value: "Antacids & Ulcer Care",
    label: "Antacids & Ulcer Care",
    image: "ulcer.png",
  },
  {
    value: "Blood Pressure Medications",
    label: "Blood Pressure Medications",
    image: "bp.png",
  },
  { value: "Diabetes Care", label: "Diabetes Care", image: "diabetes.png" },
  { value: "Eye Care", label: "Eye Care", image: "eye.png" },
  {
    value: "Skin Care & Dermatologicals",
    label: "Skin Care & Dermatologicals",
    image: "skin.png",
  },
  {
    value: "Pregnancy & Fertility",
    label: "Pregnancy & Fertility",
    image: "pregnancy.png",
  },
  {
    value: "Baby & Child Health",
    label: "Baby & Child Health",
    image: "baby.png",
  },
  { value: "Women's Health", label: "Women's Health", image: "women.png" },
  { value: "Men's Health", label: "Men's Health", image: "men.png" },
  { value: "Immune Boosters", label: "Immune Boosters", image: "immune.png" },
  {
    value: "First Aid & Wound Care",
    label: "First Aid & Wound Care",
    image: "firstaid.png",
  },
  {
    value: "Mental Health & Antidepressants",
    label: "Mental Health & Antidepressants",
    image: "mental.png",
  },
  {
    value: "Allergy & Hay Fever",
    label: "Allergy & Hay Fever",
    image: "allergy.png",
  },
  {
    value: "Asthma & Respiratory Care",
    label: "Asthma & Respiratory Care",
    image: "asthma.png",
  },
  {
    value: "Digestive Health & Laxatives",
    label: "Digestive Health & Laxatives",
    image: "digestive.png",
  },
  {
    value: "Cardiovascular Medications",
    label: "Cardiovascular Medications",
    image: "cardio.png",
  },
  {
    value: "Weight Management",
    label: "Weight Management",
    image: "weight.png",
  },
  {
    value: "Herbal & Natural Remedies",
    label: "Herbal & Natural Remedies",
    image: "herbal.png",
  },
  {
    value: "Cancer Care Medications",
    label: "Cancer Care Medications",
    image: "cancer.png",
  },
  {
    value: "Neurological Medications",
    label: "Neurological Medications",
    image: "neuro.png",
  },
  { value: "Ear Care", label: "Ear Care", image: "ear.png" },
  {
    value: "Oral & Dental Care",
    label: "Oral & Dental Care",
    image: "oral.png",
  },
  {
    value: "HIV/AIDS Treatment",
    label: "HIV/AIDS Treatment",
    image: "hiv.png",
  },
  {
    value: "Hepatitis Treatment",
    label: "Hepatitis Treatment",
    image: "hepatitis.png",
  },
  {
    value: "Anti-Inflammatory Drugs",
    label: "Anti-Inflammatory Drugs",
    image: "inflammation.png",
  },
  {
    value: "Surgical & Hospital Equipment",
    label: "Surgical & Hospital Equipment",
    image: "surgical.png",
  },
  {
    value: "Diagnostic Tools & Kits",
    label: "Diagnostic Tools & Kits",
    image: "diagnostic.png",
  },
  {
    value: "Injections & Infusions",
    label: "Injections & Infusions",
    image: "injection.png",
  },
  { value: "Vaccines", label: "Vaccines", image: "vaccine.png" },
  {
    value: "Anesthetics & Sedatives",
    label: "Anesthetics & Sedatives",
    image: "anesthesia.png",
  },
  {
    value: "Bone & Joint Health",
    label: "Bone & Joint Health",
    image: "bone.png",
  },
  {
    value: "Sleep Aids & Sedatives",
    label: "Sleep Aids & Sedatives",
    image: "sleep.png",
  },
  {
    value: "others",
    label: "others",
    image: "sleep.png",
  },
];

export const productBrands = [
  {
    value: "",
    label: "Select Brand",
    companyImage: emzor,
  },
  {
    value: "EmzorPharmaceuticalIndustriesLimited",
    label: "Emzor Pharmaceutical Industries Limited",
    companyImage: emzor,
  },
  {
    value: "GlaxoSmithKline",
    label: "GlaxoSmithKline",
    companyImage: gsk,
  },
  {
    value: "BenylinPharmaceuticalIndustriesLimited",
    label: "Benylin Pharmaceutical Industries Limited",
    companyImage: emzor,
  },
  {
    value: "pfizer",
    label: "pfizer",
    companyImage: pfizer,
  },
  {
    value: "FidsonHealthcarePlc",
    label: "Fidson Healthcare Plc",
    companyImage: fidson,
  },
  {
    value: "MayAndBakerNigeriaPlc",
    label: "May & Baker Nigeria Plc",
    companyImage: mayAndBayer,
  },
  {
    value: "NeimethInternationalPharmaceuticalsPlc",
    label: "Neimeth International Pharmaceuticals Plc",
    companyImage: neimeth,
  },
  {
    value: "SwissPharmaNigeriaLimited",
    label: "Swiss Pharma Nigeria Limited (Swipha)",
    companyImage: swiss,
  },
  {
    value: "MecureIndustriesPlc",
    label: "Mecure Industries Plc",
    companyImage: mecure,
  },
  {
    value: "MorisonIndustriesPlc",
    label: "Morison Industries Plc",
    companyImage: morison,
  },
  {
    value: "DanaDrugsLimited",
    label: "Dana Drugs Limited",
    companyImage: dana,
  },
  {
    value: "DailyNeedIndustriesLimited",
    label: "Daily Need Industries Limited",
    companyImage: dailyNeed,
  },
  {
    value: "EvansMedicalPlc",
    label: "Evans Medical Plc",
    companyImage: evans,
  },
  {
    value: "JuhelNigeriaLimited",
    label: "Juhel Nigeria Limited",
    companyImage: juhel,
  },
  {
    value: "GreenlifePharmaceuticalsLimited",
    label: "Greenlife Pharmaceuticals Limited",
    companyImage: greenlife,
  },
  {
    value: "PharmatexNigeriaLimited",
    label: "Pharmatex Nigeria Limited",
    companyImage: pharmatex,
  },
  {
    value: "ArachisPharmaceuticalNigeriaLimited",
    label: "Arachis Pharmaceutical Nigeria Limited",
    companyImage: archy,
  },

  {
    value: "NigerianGermanChemicalsPlc",
    label: "Nigerian German Chemicals Plc",
    companyImage: ngc,
  },
  {
    value: "DGFPharmaNigeriaPlc",
    label: "DGF Pharma Nigeria Plc",
    companyImage: dgfpharma,
  },
  {
    value: "AdipharmPharmaceuticalsLimited",
    label: "Adipharm Pharmaceuticals Limited",
    companyImage: adpharm,
  },
  {
    value: "AlphaPharmacyAndStoresLimited",
    label: "Alpha Pharmacy and Stores Limited",
    companyImage: alphapharmacy,
  },
  {
    value: "ElbePharmaNigeriaLimited",
    label: "Elbe Pharma Nigeria Limited",
    companyImage: elbepharma,
  },
  {
    value: "GeneithPharmaceuticalsLimited",
    label: "Geneith Pharmaceuticals Limited",
    companyImage: geneith,
  },
  {
    value: "HovidNigeriaLimited",
    label: "Hovid Nigeria Limited",
    companyImage: hovid,
  },
  {
    value: "MaydonPharmaceuticalsLimited",
    label: "Maydon Pharmaceuticals Limited",
    companyImage: maydon,
  },
  {
    value: "NewHeightsPharmaceuticalsLimited",
    label: "New Heights Pharmaceuticals Limited",
    companyImage: newheights,
  },
  {
    value: "PhamatexIndustriesLimited",
    label: "Phamatex Industries Limited",
    companyImage: phamatex,
  },
  {
    value: "RanbaxyNigeriaLimited",
    label: "Ranbaxy Nigeria Limited",
    companyImage: ranbaxy,
  },
  {
    value: "SKGPharmaLimited",
    label: "SKG Pharma Limited",
    companyImage: skg,
  },
  {
    value: "VixaPharmaceuticalCompanyLimited",
    label: "Vixa Pharmaceutical Company Limited",
    companyImage: vixa,
  },
  {
    value: "ZolonHealthcareLimited",
    label: "Zolon Healthcare Limited",
    companyImage: zolon,
  },
  {
    value: "Others",
    label: "Others",
    companyImage: zolon,
  },
];

export  const frequencyArr = ['1-0-0', '0-1-0', '0-0-1', '1-1-0', '1-0-1', '0-1-1', '1-1-1'];
export const whenToTakeArr = ['Before Meal', 'After Meal', 'During Meal', 'Any Time' ];
export const methodOfUsageArr = ['Apply to the affected area', 'Shake well before use', 'Take with enough water', 'Take with warm water' ];
export const dosageFormArr = ['Tablets', 'Capsules', 'Syrup', 'injection', 'Gels', 'Eye Drops' ];
export  const ageRangeArr = ['Neonates (0-28 days)', 'Infants (29 days - 1 year)', 'Children (1-11 years)', 'Adolescents (12-17 years)', 'Adults (18-64 years)', 'Older Adults (65 years and older)', 'Any Age' ];
export  const durationArr = ['1 day', '2 days', '3 days', '4 days', '5 days', '6 days', '1 week', '2 weeks', '3 weeks', '1 month', 'more than 1 month'  ];
export const dosageArr = [
  "1 tablet",
  "2 tablets",
  "3 tablets",
  "4 tablets",
  "1 capsule",
  "2 capsule",
  "3 capsules",
  "4 capsules",
  "Instill 1 drop into each eye.",
  "Apply 2 drops to affected area.",
  "1 teaspoon",
  "2 teaspoons",
  "3 teaspoons",
  "4 teaspoons",
  "5 teaspoons",
  "Use 1 spray in each nostril",
  "Apply a thin layer to the affected area",
  "Insert 1 suppository rectally at bedtime.",
  "Place 1 lozenge in the mouth and allow to dissolve slowly.",
  "Take 5 mL (1 teaspoon) every 4–6 hours as needed.",
  "Apply 1 patch to clean, dry skin once a week."
];