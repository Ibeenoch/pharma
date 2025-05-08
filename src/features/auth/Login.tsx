import { FormEvent, lazy, useEffect, useState } from "react";
import { COMPANY_NAME, MARGIN_TOP } from "../../constants/appText";
import manWalk from "../../assets/images/manwalk.png";
import Email from "../../assets/icons/email.svg?react";
import Google from "../../assets/icons/google-colored.svg?react";
import Facebook from "../../assets/icons/facebook-colored.svg?react";
import Lock from "../../assets/icons/lock.svg?react";
import { useNavigate } from "react-router-dom";
import { validator } from "../../utils/validator";
import { useAppDispatch, } from "../../hooks/reduxHooks";
import { facebookLogin, googleLogin, loginUser, } from "./authSlice";
import { UserDataProps } from "../../types/auth/UserData";
const AlertModal = lazy(() =>import("../../components/auth/AlertModal"));
const Toast = lazy(() =>import("../../components/common/Toast"));
const CustomInput = lazy(() => import('../../components/common/Input'));
const CustomText = lazy(() => import("../../components/common/Text"));
const CustomButton = lazy(() => import("../../components/common/Button"));

interface LoginProps {
  redirectUrl?: string;
}

const Login: React.FC<LoginProps> = ({ redirectUrl }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  const [openErrToast, setOpenErrToast] = useState<boolean>(false);
  const [error, setError] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (openErrToast) {
      timer = setTimeout(() => {
        setOpenErrToast(false);
      }, 5000);
    }

    // Cleanup function to clear timeout when the component unmounts or openErrToast changes
    return () => clearTimeout(timer);
  }, [openErrToast]);

  const hideErrToast = () => {
    setOpenErrToast(false);
  };

  const switchToRegisterPage = () => {
    navigate("/register");
  };

  const resetPasswordPage = () => {
    navigate("/forgotpassword");
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisSubmitting(true);
    const emailValid = validator(email, "email");
    const passwordValid = validator(password, "password");

    if (!emailValid || !passwordValid) {
      setError({
        email: emailValid ? undefined : "Email Address is Invalid",
        password: passwordValid
          ? undefined
          : "Password must be at least 8 characters, include a number & special character",
      });
      setisSubmitting(false);
      return;
    }
    dispatch(
      loginUser({
        email,
        password,
      })
    ).then((res) => {
      const payload = res.payload as UserDataProps;
      typeof res.payload === "string"
        ? handleErr()
        : payload?.role === "Admin"
          ? redirectUrl
            ? navigate(redirectUrl)
            : navigate(`/admin/dashboard/${payload.userId}`)
          : redirectUrl
            ? navigate(redirectUrl)
            : navigate("/");
    });
  };

  const handleErr = () => {
    setOpenErrToast(true);
    setisSubmitting(false);
  };

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  const handleFacebookLogin = () => {
    dispatch(facebookLogin());
  };

  useEffect(() => {
    window.scrollTo(0,0)
  }, [])

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
          rightTextFunc={switchToRegisterPage}
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

          <div
            onClick={resetPasswordPage}
            className="flex justify-end cursor-pointer"
          >
            <CustomText
              text="Forgot Password?"
              textType="small"
              weightType="bold"
              color="text-amber-500"
              extraStyle="my-2"
            />
          </div>

          <CustomButton
            text="Sign In"
            isLoading={isSubmitting}
            type="submit"
            className="w-full my-3"
          />
        </form>

        <article className="mx-auto flex items-center " >
        <CustomText
          text={`Don't have an account`}
          textType="normal"
          weightType="medium"
          color="text-gray-600"
          extraStyle="text-[14px]"
        />
        <CustomText
          textType="normal"
          weightType="medium"
          isTwoSpanText={true}
          leftText="you can"
          rightText="sign up here!"
          color="text-gray-600"
          extraStyle="text-[14px]"
          rightTextFunc={switchToRegisterPage}
        />
      </article>

        <div className="flex gap-1 my-5 items-center justify-center">
          <div className="w-[35%] border border-gray-300"></div>
          <CustomText
            text="Or Continue With"
            textType="small"
            color="text-gray-500"
          />
          <div className="w-[35%] border border-gray-300"></div>
        </div>
        {openErrToast && (
          <Toast
            isOpen={openErrToast}
            onClose={hideErrToast}
            children={
              <AlertModal
                isSuccess={false}
                text={
                  "Invalid credentials. Please check the email and password."
                }
              />
            }
          />
        )}


        <div className="flex gap-4 items-center justify-center">
          <div
            onClick={handleGoogleLogin}
            className="p-3 flex justify-center items-center bg-white cursor-pointer rounded-lg"
          >
            <Google className="w-6 h-6" />
          </div>

          <div
            onClick={handleFacebookLogin}
            className="p-3 flex justify-center items-center bg-white cursor-pointer rounded-lg"
          >
            <Facebook className="w-6 h-6" />
          </div>
        </div>
      </section>
    </section>
  );
};

export default Login;
