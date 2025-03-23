import { COMPANY_NAME, MARGIN_TOP } from "../../constants/appText";
import manWalk from "../../assets/images/manwalk.png";
import CustomInput from "../../components/common/Input";
import { useState } from "react";
import CustomText from "../../components/common/Text";
import Email from "../../assets/icons/email.svg?react";
import Google from "../../assets/icons/google-colored.svg?react";
import Facebook from "../../assets/icons/facebook-colored.svg?react";
import Lock from "../../assets/icons/lock.svg?react";
import CustomButton from "../../components/common/Button";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
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
          rightText="register here!"
          color="text-gray-600"
          extraStyle="text-[14px]"
        />
      </article>

      <article className={`block ${MARGIN_TOP} md:mt-0 md:hidden`}>
        <CustomText
          text={`Sign in to ${COMPANY_NAME}`}
          textType="medium"
          weightType="bold"
          extraStyle="text-center"
        />
      </article>

      <div className="flex justify-center md:block mx-auto">
        <img
          src={manWalk}
          alt="man walking to store"
          className="h-38 md:h-80 w-auto"
        />
      </div>

      <section className={`px-7 mt-5 md:mt-0`}>
        <form>
          <CustomInput
            prefixIcon={<Email className="w-4 h-4" />}
            label="Email Address"
            labelStyle="text-sm font-bold mb-2"
            Id="email"
            type="email"
            value={email}
            onChange={setEmail}
            required={true}
            showFullWidth={true}
            placeholder="Your Email Address"
          />
          <CustomInput
            prefixIcon={<Lock className="w-4 h-4" />}
            label="Password"
            isPassword={true}
            labelStyle="text-sm font-bold mb-2"
            Id="password"
            type="password"
            value={password}
            onChange={setPassword}
            required={true}
            showFullWidth={true}
            placeholder="Your Password"
          />

          <div className="flex justify-end cursor-pointer">
            <CustomText
              text="Forgot Password?"
              textType="small"
              weightType="bold"
              color="text-amber-500"
              extraStyle="my-2"
            />
          </div>

          <CustomButton text="Sign In" type="submit" className="w-full my-3" />
        </form>

        <div className="flex gap-1 my-5 items-center justify-center">
          <div className="w-[35%] border border-gray-300"></div>
          <CustomText
            text="Or Continue With"
            textType="small"
            color="text-gray-500"
          />
          <div className="w-[35%] border border-gray-300"></div>
        </div>

        <div className="flex gap-4 items-center justify-center">
          <div className="p-3 flex justify-center items-center bg-white cursor-pointer rounded-lg">
            <Google className="w-6 h-6" />
          </div>

          <div className="p-3 flex justify-center items-center bg-white cursor-pointer rounded-lg">
            <Facebook className="w-6 h-6" />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Login;
