import {
  selectAdmin,
  setAdminProductTabIndex,
} from "../../../features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { navLists } from "../../../utils/admin/product/productList";
import NavTab from "../NavTab";
import AllProduct from "./AllProduct";

const ProductManagement = () => {
  const dispatch = useAppDispatch();
  const { adminProducttabIndex } = useAppSelector(selectAdmin);

  const handleProductTabs = (index: number) => {
    dispatch(setAdminProductTabIndex(index));
  };

  return (
    <main className="mt-16 pb-3">
      <NavTab
        handleTabclicked={handleProductTabs}
        indexClicked={adminProducttabIndex}
        navLists={navLists}
      />

      <section className="my-3">
        <AllProduct />
      
      </section>
    </main>
  );
};

export default ProductManagement;
