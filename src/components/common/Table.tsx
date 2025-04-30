import React, { useState } from "react";
import Prescription from "../../assets/icons/prescription-pills.svg?react";
import Trash from "../../assets/icons/trash-bin.svg?react";
import Pen from "../../assets/icons/edit-clipboard.svg?react";
import {
  lightgreenBgColor,
  lightredBgColor,
  lightyellowBgColor,
  adminDefaultBgColor,
  darkredText,
  darkyellowText,
  darkGreenText,
  lightgrayBgColor,
} from "../../constants/appColor";
import { useAppDispatch } from "../../hooks/reduxHooks";
import {
  deleteproduct,
  invalidateFetchAllProductCache,
} from "../../features/admin/product/productSlice";
import { useNavigate } from "react-router-dom";
import {
  mappedProductProps,
} from "../../types/product/ProductData";
import Modal from "./Modal";
import ProductDetails from "../admin/product/ProductDetails";
import { mappedAllOrdersProps } from "../../types/order/OrderType";
import OrderDetails from "../admin/order/OrderDetails";

interface Columns {
  key: string;
  label: string;
  className?: string;
  conditionalFormat?: (value: any) => string; // function for conditional styling
}

interface TableProps {
  columns: Columns[];
  data: any[];
  rowClassname?: string; // optional classname
  onRowClick?: (row: any) => void; // optional event clicked
  tableHeaderBg?: string;
  tableHeaderTxtColor?: string;
  whichTable: string;
  textWrap?: boolean;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  rowClassname,
  tableHeaderBg,
  tableHeaderTxtColor,
  whichTable,
  textWrap = false,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);
  const [product, setProduct] = useState<mappedProductProps>({
    id: "",
    $id: "",
    name: "",
    category: "",
    brand: "",
    stock: 0,
    qtysold: 0,
    expired: "",
    unitPrice: "",
    dateAdded: "",
    imagesUrl: [],
    description: "",
    discount: 0,
    additionalInfo: "",
    price: 0,
    productSerialNo: "",
  });
  const [orderPreview, setOrderPreview] = useState<mappedAllOrdersProps>({
    image: "",
    address: "",
    customerName: "",
    email: "",
    orderDate: "",
    orderId: "",
    paymentMethod: "",
    phone: "",
    status: "",
    totalAmount: "",
    totalItems: 0,
    $id: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const previewRow = (row: any, ) => {
    // preview product table
    if (whichTable.toLowerCase() === "product") {
      let productPreview = row as mappedProductProps;
      productPreview && productPreview?.$id && setProduct(productPreview);
      setShowModal(true);
    } else if (whichTable.toLowerCase() === "order") {
      let order = row as mappedAllOrdersProps;
      console.log('orders ', order)
      order && order?.$id && setOrderPreview(order);
      setShowOrderModal(true);
    }
  };

  const hideProductModal = () => setShowModal(false);
  const hideOrderModal = () => setShowOrderModal(false);
  return (
    <>
        {/* smaller screen  */}
        <div className={`md:hidden w-full block bg-white rounded-lg`}>
          {
         
          data && Array.isArray(data) && data.map((row) => (
            <div className={`my-4 ${lightgrayBgColor} w-full rounded-lg border-b border-gray-300 py-4 px-2`}>
            {
                columns && Array.isArray(columns) && columns.map((col) => {
                let key = col && col.key, label = col && col.label;  
                return (
                  <div className="w-full grid grid-cols-[42%_53%] gap-3 p-2 break-words whitespace-normal">
                  <p className="">{ col.label} </p>

                  {/* row[col.key] === "Complete" ||
                      String(row[col.key]).toLowerCase() === "success" ||
                      String(row[col.key]).toLowerCase() === "successful" ||
                      row[col.key] === "Delivered" ? (
                      <div
                        className={`flex justify-center items-center p-1 rounded-md ${darkGreenText} ${lightgreenBgColor}`}
                      >
                        <p>{row[col.key]}</p>
                      </div>
                    ) : row[col.key] === "Pending" ||
                      row[col.key] === "Processing" ||
                      row[col.key] === "Shipped" ? (
                      <div
                        className={`flex justify-center items-center p-1 rounded-md ${darkyellowText} ${lightyellowBgColor}`}
                      >
                        <p>{row[col.key]}</p>
                      </div>
                    ) : row[col.key] === "Failed" ||
                      row[col.key] === "Cancelled" ? (
                      <div
                        className={`flex justify-center items-center p-1 rounded-md ${darkredText} ${lightredBgColor}`}
                      >
                        <p>{row[col.key]}</p>
                      </div>
                    ) : (
                      row[col.key]
                    ) */}


                  <p className="text-gray-500 ">
                    
                    {/* handle action button on small devices */}
                    { 
                     whichTable.toLowerCase() === 'prescription' || whichTable.toLowerCase() === 'product'  && label.toLowerCase() === 'image' ? (
                      <div className="rounded-lg p-2 bg-white w-max">
                        <img src={row[key]} alt="image prescription" className="w-12 h-12 rounded-md" />
                      </div>
                    ) :
                    key && key.toLowerCase() !== 'actions' && (row[key])} 

                  {
                    key && key.toLowerCase() === 'actions' && (
                      <>
                      {/* handle for product action button for mobile devices  */}
                      {
                        whichTable.toLowerCase() === 'product' && (
                          <div className="flex justify-between items-center">
                            <div   onClick={() => {
                              const id = row[key].split("_")[1];
                              navigate(id);
                            }}
                            >
                              <Pen className="w-6 h-6 text-blue-500" />
                            </div>
                            <div
                              onClick={() => {
                                const id = row[key].lastIndexOf('/');
                                navigate(id);
                              }}
                            >
                          <div
                          onClick={(e) => {
                            e.stopPropagation();
                            let id = row[col.key] as string;
                            if(whichTable === 'prescription'){
                              let prescriptionId = typeof id === 'string' && id.split('_')[1];
                              let route = `/admin/product/prescription/${prescriptionId}`
                              navigate(route);
                            }

                            if(whichTable === 'product'){                            
                              id = id.substring(id.lastIndexOf('/') + 1);
                              let route = `/admin/product/prescription/${id}`
                              navigate(route);
                            }
                          }}
                          className="cursor-pointer"
                        >
                          <Prescription className="w-5 h-5 text-blue-600" />
                        </div>
                            </div>

                            <div
                          // handle logic for deleting a row
                          onClick={() => {
                            const id = row[col.key].split("/").pop();
                            if (!id) return;
                            if (whichTable.toLowerCase() === "product") {
                              const deleteProduct = (id: string) => {
                                let confirmDelete = window.confirm(
                                  `Do you really want to delete this item?\nThis action cannot be undo!`
                                );
                                if (confirmDelete) proceedTodeleteProduct(id);
                              };

                              const proceedTodeleteProduct = (id: string) => {
                                dispatch(deleteproduct(id)).then(() =>
                                  dispatch(invalidateFetchAllProductCache(false))
                                );
                              };

                              deleteProduct(id);
                            }
                          }}
                          className="cursor-pointer"
                        >
                          <Trash className="w-5 h-5 text-red-500" />
                        </div>
                          </div>
                        ) 
                      }
                      {
                        whichTable.toLowerCase() === 'prescription' && (
                          <div className="flex justify-between items-center">
                          
                            <div
                              onClick={() => {
                                const id = row[key].lastIndexOf('/');
                                navigate(id);
                              }}
                            >
                                 <div
                          onClick={(e) => {
                            e.stopPropagation();
                            let id = row[col.key] as string;
                            if(whichTable === 'prescription'){
                              let prescriptionId = typeof id === 'string' && id.split('_')[1];
                              let route = `/admin/product/prescription/${prescriptionId}`
                              navigate(route);
                            }

                            if(whichTable === 'product'){                            
                              id = id.substring(id.lastIndexOf('/') + 1);
                              let route = `/admin/product/prescription/${id}`
                              navigate(route);
                            }
                          }}
                          className="cursor-pointer"
                        >
                          <Prescription className="w-5 h-5 text-blue-600" />
                        </div>
                            </div>

                           
                          </div>
                        ) 
                      }

                      </>
                    )
                  }
                  </p>
                  
                </div>
                )
               })
            }
            </div>
          ))
          }
        </div>

      <div className="hidden md:block w-full overflow-x-auto">
        
        {/* large screen  */}
          <table className=" min-w-full border-collapse border-none table-auto">
            <thead className="overflow-x-auto">
              <tr
                className={`border-0 ${
                  tableHeaderTxtColor ? tableHeaderTxtColor : "text-white"
                }  ${tableHeaderBg ? tableHeaderBg : `${adminDefaultBgColor}`}`}
              >
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`text-[10px] sm:text-[12px] first:rounded-tl-xl last:rounded-tr-xl px-3 text-left first:rounded-bl-xl last:rounded-br-xl font-normal py-3 text-black border-0`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.map((row, rowIndex) => {
               
                return (
                  <tr
                    key={rowIndex}
                    className={`border-0 ${rowClassname} hover:bg-gray-50 cursor-pointer`}
                    onClick={() => previewRow(row)}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`text-[10px] sm:text-[12px] text-gray-800 px-3 py-3 text-align border-b border-gray-300/80 ${
                          col.className 
                        } ${
                          col.conditionalFormat
                            ? col.conditionalFormat(row[col.key])
                            : ""
                        }  ${row[col.key]?.length > 8 ? `${textWrap ? "max-w-xs break-words whitespace-normal" : "max-w-xs break-words whitespace-normal"}` : ""}`}
                        style={{
                          maxWidth: "10rem",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {typeof row[col.key] === "string" &&
                        row[col.key].includes("Actions")  ? (
                          <div className="flex gap-2 items-center justify-center">
                          { whichTable === 'product' && <div
                              onClick={() => {
                                const id = row[col.key].split("_")[1];
                                navigate(id);
                              }}
                              className="cursor-pointer"
                            >
                              <Pen className="w-5 h-5 text-blue-600" />
                            </div>}
  
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                let id = row[col.key] as string;
                                if(whichTable === 'prescription'){
                                  let prescriptionId = typeof id === 'string' && id.split('_')[1];
                                  let route = `/admin/product/prescription/${prescriptionId}`
                                  navigate(route);
                                }
  
                                if(whichTable === 'product'){
  
                                
                                  id = id.substring(id.lastIndexOf('/') + 1);
                                  let route = `/admin/product/prescription/${id}`
                                  navigate(route);
                                }
                              }}
                              className="cursor-pointer"
                            >
                              <Prescription className="w-5 h-5 text-blue-600" />
                            </div>
  
                            <div
                              // handle logic for deleting a row
                              onClick={() => {
                                const id = row[col.key].split("/").pop();
                                if (!id) return;
                                if (whichTable.toLowerCase() === "product") {
                                  const deleteProduct = (id: string) => {
                                    let confirmDelete = window.confirm(
                                      `Do you really want to delete this item?\nThis action cannot be undo!`
                                    );
                                    if (confirmDelete) proceedTodeleteProduct(id);
                                  };
  
                                  const proceedTodeleteProduct = (id: string) => {
                                    dispatch(deleteproduct(id)).then(() =>
                                      dispatch(invalidateFetchAllProductCache(false))
                                    );
                                  };
  
                                  deleteProduct(id);
                                }
                              }}
                              className="cursor-pointer"
                            >
                              <Trash className="w-5 h-5 text-red-500" />
                            </div>
                          </div>
                        ) :   whichTable.toLowerCase() === 'prescription'  && typeof row[col.key] === 'string' && row[col.key].includes('http') ? (
                          <div className={`rounded-lg p-2 ${lightgrayBgColor} w-max`}>
                            <img src={row[col.key]} alt="image prescription" className="w-12 h-12 rounded-md" />
                          </div>
                        ) : whichTable.toLowerCase() === 'product' && row[col.key] === row['image']  ? (
                          <div className={`rounded-lg p-2 ${lightgrayBgColor} w-max`}>
                          <img src={row[col.key]} alt="image prescription" className="w-12 h-12 rounded-md" />
                        </div>
                        ) : // handle logic for status
                        row[col.key] === "Complete" ||
                          String(row[col.key]).toLowerCase() === "success" ||
                          String(row[col.key]).toLowerCase() === "successful" ||
                          row[col.key] === "Delivered" ? (
                          <div
                            className={`flex justify-center items-center p-1 rounded-md ${darkGreenText} ${lightgreenBgColor}`}
                          >
                            <p>{row[col.key]}</p>
                          </div>
                        ) : row[col.key] === "Pending" ||
                          row[col.key] === "Processing" ||
                          row[col.key] === "Shipped" ? (
                          <div
                            className={`flex justify-center items-center p-1 rounded-md ${darkyellowText} ${lightyellowBgColor}`}
                          >
                            <p>{row[col.key]}</p>
                          </div>
                        ) : row[col.key] === "Failed" ||
                          row[col.key] === "Cancelled" ? (
                          <div
                            className={`flex justify-center items-center p-1 rounded-md ${darkredText} ${lightredBgColor}`}
                          >
                            <p>{row[col.key]}</p>
                          </div>
                        ) : (
                          row[col.key]
                        )}
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        {showModal && (
          <Modal
            isOpen={showModal}
            onClose={hideProductModal}
            children={<ProductDetails product={product} />}
          />
        )}
        {showOrderModal && (
          <Modal
            isOpen={showOrderModal}
            onClose={hideOrderModal}
            children={<OrderDetails order={orderPreview} />}
          />
        )}
      </div>
    </>
  );
};

export default Table;
