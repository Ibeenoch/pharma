import { MARGIN_TOP } from "../../constants/appText";
import manWalk from "../../assets/images/forgetpassword1.png";
import CustomInput from "../../components/common/Input";
import { ChangeEvent, useState } from "react";
import CustomText from "../../components/common/Text";
import Email from "../../assets/icons/email.svg?react";
import CustomButton from "../../components/common/Button";
import { validator } from "../../utils/validator";
import AlertModal from "../../components/auth/AlertModal";
import Toast from "../../components/common/Toast";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  passwordRecoveryLink,
  selectAuth,
  setRecoveryPasswordLink,
} from "./authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<{ email?: string }>({});
  const { sentRecoveryEmail } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const hideModal = () => {
    dispatch(setRecoveryPasswordLink(false));
  };
  const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const emailValid = validator(email, "email");

    if (!emailValid) {
      setError({
        email: emailValid ? undefined : "Email Address is Invalid",
      });
      setIsSubmitting(false);
      return;
    }
    dispatch(passwordRecoveryLink(email)).then(
      (res) => res.payload !== undefined && setIsSubmitting(false)
    );
  };
  return (
    <section
      className={`h-screen pt-15 lg:pt-0 lg:grid lg:grid-cols-3 items-center `}
    >
      <article className=" lg:block">
        <CustomText
          text="Forgot Your Password?"
          textType="huge"
          weightType="bold"
          extraStyle="text-center lg:text-left"
        />

        <CustomText
          text={`We can help you reset your password.`}
          textType="normal"
          weightType="medium"
          color="text-gray-600"
          extraStyle="text-center lg:text-justify"
        />
        <CustomText
          text={`put your email address to continue`}
          textType="normal"
          weightType="medium"
          color="text-gray-600"
          extraStyle="text-center lg:text-justify"
        />
      </article>

      <article className={`block ${MARGIN_TOP} lg:mt-0 lg:hidden`}>
        <CustomText
          text={`Forgot Your Password?`}
          textType="medium"
          weightType="bold"
          extraStyle="text-center"
        />
      </article>

      <div className="flex justify-center lg:block mx-auto">
        <img
          src={manWalk}
          alt="man walking to store"
          className="h-38 lg:h-80 w-auto"
        />
      </div>

      <section className={`px-7 mt-5 lg:mt-0`}>
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
            isLoading={isSubmitting}
          />
        </form>
        {sentRecoveryEmail && (
          <Toast
            isOpen={sentRecoveryEmail}
            onClose={hideModal}
            children={
              <AlertModal
                isSuccess={true}
                text="Password reset link has been sent, check your email to reset your password"
              />
            }
          />
        )}
      </section>
    </section>
  );
};

export default ForgotPassword;
