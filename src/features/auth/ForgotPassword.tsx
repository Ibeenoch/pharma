import { MARGIN_TOP } from "../../constants/appText";
import manWalk from "../../assets/images/forgetpassword1.png";
import CustomInput from "../../components/common/Input";
import { ChangeEvent, useState } from "react";
import CustomText from "../../components/common/Text";
import Email from "../../assets/icons/email.svg?react";
import CustomButton from "../../components/common/Button";
import { validator } from "../../utils/validator";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<{ email?: string }>({});

  const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailValid = validator(email, "email");

    if (!emailValid) {
      setError({
        email: emailValid ? undefined : "Email Address is Invalid",
      });
      return;
    }
  };
  return (
    <section className={`h-screen md:grid md:grid-cols-3 items-center `}>
      <article className="hidden md:block">
        <CustomText
          text="Forgot Your Password?"
          textType="huge"
          weightType="bold"
        />

        <CustomText
          text={`We can help you reset your password.`}
          textType="normal"
          weightType="medium"
          color="text-gray-600"
          extraStyle=""
        />
        <CustomText
          text={`put your email address to continue`}
          textType="normal"
          weightType="medium"
          color="text-gray-600"
          extraStyle=""
        />
      </article>

      <article className={`block ${MARGIN_TOP} md:mt-0 md:hidden`}>
        <CustomText
          text={`Forgot Your Password?`}
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
            validate={(value) => validator(value, "email")}
            errorMessage={error.email || "Email address is required"}
          />

          <CustomButton
            text="Reset Password"
            type="submit"
            className="w-full my-3"
          />
        </form>
      </section>
    </section>
  );
};

export default ForgotPassword;
