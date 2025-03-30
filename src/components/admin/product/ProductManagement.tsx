import {
  selectAdmin,
  setAdminProductTabIndex,
} from "../../../features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { navLists } from "../../../utils/admin/product/productList";
import NavTab from "../NavTab";
import AddProduct from "./AddProduct";
import AllProduct from "./AllProduct";

const ProductManagement = () => {
  const dispatch = useAppDispatch();
  const { adminProducttabIndex } = useAppSelector(selectAdmin);

  const handleProductTabs = (index: number) => {
    dispatch(setAdminProductTabIndex(index));
  };

  return (
    <main className="mt-12">
      <NavTab
        handleTabclicked={handleProductTabs}
        indexClicked={adminProducttabIndex}
        navLists={navLists}
      />

      <section>
        {adminProducttabIndex === 0 ? (
          <AllProduct />
        ) : adminProducttabIndex === 1 ? (
          <AddProduct />
        ) : adminProducttabIndex === 2 ? (
          <></>
        ) : adminProducttabIndex === 3 ? (
          <></>
        ) : (
          <div className="flex justify-center items-center">No User Found</div>
        )}
      </section>
    </main>
  );
};

export default ProductManagement;
