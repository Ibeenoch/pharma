import { MARGIN_TOP } from "../../constants/appText";
import manWalk from "../../assets/images/resetpassword.png";
import CustomInput from "../../components/common/Input";
import { ChangeEvent, useState } from "react";
import CustomText from "../../components/common/Text";
import Lock from "../../assets/icons/lock.svg?react";
import CustomButton from "../../components/common/Button";
import { validator } from "../../utils/validator";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<{ password?: string }>({});

  const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordValid = validator(password, "password");

    if (!passwordValid) {
      setError({
        password: passwordValid
          ? undefined
          : "Password must be at least 8 characters, include a number & special character",
      });
      return;
    }
  };
  return (
    <section className={`h-screen md:grid md:grid-cols-3 items-center `}>
      <article className="hidden md:block">
        <CustomText
          text="Reset your password"
          textType="huge"
          weightType="bold"
        />

        <CustomText
          text={`To create a new password`}
          textType="normal"
          weightType="medium"
          color="text-gray-600"
        />
        <CustomText
          text={`We recommend you use a strong and long password`}
          textType="normal"
          weightType="medium"
          color="text-gray-600"
        />
      </article>

      <article className={`block ${MARGIN_TOP} md:mt-0 md:hidden`}>
        <CustomText
          text={`Reset your password`}
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
        <form onSubmit={handleFormSubmit}>
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
            validate={(value) => validator(value, "password")}
            errorMessage={error.password || "Password is required"}
          />

          <CustomButton text="Sign In" type="submit" className="w-full my-3" />
        </form>
      </section>
    </section>
  );
};

export default ResetPassword;
