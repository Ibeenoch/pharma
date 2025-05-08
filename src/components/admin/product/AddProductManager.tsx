import { lazy } from "react";
const AddProduct = lazy(() => import("./AddProduct"));


const AddProductManager = () => {
  return (
    <main className="mt-16 pb-3">
      <section className="my-3">
        <AddProduct />
      </section>
    </main>
  );
};

export default AddProductManager;
