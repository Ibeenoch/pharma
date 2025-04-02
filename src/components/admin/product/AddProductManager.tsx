import {
  selectAdmin,
  setAdminProductTabIndex,
} from "../../../features/admin/adminSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { navLists } from "../../../utils/admin/product/productList";
import NavTab from "../NavTab";
import AddProduct from "./AddProduct";

const AddProductManager = () => {
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
        <AddProduct />
        {/* {adminProducttabIndex === 0 ? (
          <AllProduct />
        ) : adminProducttabIndex === 1 ? (
          <AddProduct />
        ) : adminProducttabIndex === 2 ? (
          <></>
        ) : adminProducttabIndex === 3 ? (
          <></>
        ) : (
          <div className="flex justify-center items-center">No User Found</div>
        )} */}
      </section>
    </main>
  );
};

export default AddProductManager;
