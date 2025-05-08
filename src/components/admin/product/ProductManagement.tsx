import { lazy } from "react";
const AllProduct = lazy(() => import("./AllProduct"));


const ProductManagement = () => {
  return (
    <main className="mt-16 pb-3 ">
      <section className="my-3 ">
        <AllProduct />
      </section>
    </main>
  );
};

export default ProductManagement;
