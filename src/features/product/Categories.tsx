import CustomInput from "../../components/common/Input";
import CustomText from "../../components/common/Text";

const Categories = () => {
  return (
    <main className={`block md:grid mt-20 md:grid-cols-[20%_80%]`}>
      <section className="p-4 bg-white">
        <div>
          <CustomText
            text="Product Categories"
            textType="medium"
            weightType="bold"
            extraStyle="border-b border-black w-max"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              value={"Skin Care"}
              name="categories"
              id="categories"
            />
            <CustomText
              text="Skin Care"
              textType="small"
              weightType="bold"
              extraStyle="my-2"
            />
          </div>
        </div>
      </section>
      <section></section>
    </main>
  );
};

export default Categories;
