import CustomText from "../../components/common/Text";
import { COMPANY_NAME } from "../../constants/appText";
import manWalk from "../../assets/images/manwalk.png";

const Login = () => {
  return (
    <section className={`h-screen md:grid md:grid-cols-3 items-center `}>
      <article className="hidden md:block">
        <CustomText text="Sign In to" textType="huge" weightType="bold" />
        <CustomText
          text={`${COMPANY_NAME}`}
          textType="huge"
          weightType="bold"
        />

        <CustomText
          text={`You don't have an account`}
          textType="normal"
          weightType="medium"
          color="text-gray-600"
          extraStyle="mt-8"
        />
        <CustomText
          textType="normal"
          weightType="medium"
          isTwoSpanText={true}
          leftText="you can"
          rightText="Register here!"
          color="text-gray-600"
          extraStyle="text-[14px]"
        />
      </article>

      <div className="hidden md:block">
        <img src={manWalk} alt="man walking to store" className="h-80 w-auto" />
      </div>
    </section>
  );
};

export default Login;
