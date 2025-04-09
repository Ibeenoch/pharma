import { MARGIN_TOP } from "../../constants/appText";
import manWalk from "../../assets/images/resetpassword.png";
import CustomInput from "../../components/common/Input";
import { ChangeEvent, useEffect, useState } from "react";
import CustomText from "../../components/common/Text";
import Lock from "../../assets/icons/lock.svg?react";
import CustomButton from "../../components/common/Button";
import { validator } from "../../utils/validator";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { hidePasswordResetModal, passwordReset, selectAuth } from "./authSlice";
import Toast from "../../components/common/Toast";
import AlertModal from "../../components/auth/AlertModal";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [secret, setSecret] = useState<string>("");
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<{ password?: string }>({});
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { passwordIsReset } = useAppSelector(selectAuth);
  
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if(passwordIsReset){
      timer = setTimeout(() => {
        dispatch(hidePasswordResetModal(false));
      }, 5000)
    }

    return () => clearTimeout(timer);
  }, [passwordIsReset])
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    setUserId(params.get("userId") as string);
    setSecret(params.get("secret") as string);
  };

  useEffect(() => {
    getQueryParams();
  }, []);


  const handleFormSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setisSubmitting(true);
    const passwordValid = validator(password, "password");

    if (!passwordValid) {
      setError({
        password: passwordValid
          ? undefined
          : "Password must be at least 8 characters, include a number & special character",
      });
      setisSubmitting(false);
      return;
    }

    const resetPasswordData = {
      userId,
      secret,
      password,
    };
    dispatch(passwordReset(resetPasswordData)).then(
      () =>  setisSubmitting(false)
    );
  };
  const hideModal = () => {
    dispatch(hidePasswordResetModal(false));
    navigate("/login");
  };
  return (
    <section className={`h-screen lg:grid lg:grid-cols-3 items-center `}>
      <article className="lg:block">
        <CustomText
          text="Reset your password"
          textType="huge"
          weightType="bold"
          extraStyle="text-center lg:text-left"
        />

        <CustomText
          text={`To create a new password`}
          textType="normal"
          weightType="medium"
          color="text-gray-600"
          extraStyle="text-center lg:text-left"
        />
        <CustomText
          text={`We recommend you use a strong and long password`}
          textType="normal"
          weightType="medium"
          color="text-gray-600"
          extraStyle="text-center lg:text-left"
        />
      </article>

      <article className={`block ${MARGIN_TOP} lg:mt-0 lg:hidden`}>
        <CustomText
          text={`Reset your password`}
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
            prefixIcon={<Lock className="w-4 h-4" />}
            label="New Password"
            isPassword={true}
            labelStyle="text-sm font-bold mb-2"
            Id="password"
            type="password"
            value={password}
            onChange={setPassword}
            required={true}
            showFullWidth={true}
            placeholder="Enter Your New Password"
            validate={(value) => validator(value, "password")}
            errorMessage={error.password || "Password is required"}
          />

          <CustomButton
            text="Reset Password"
            type="submit"
            className="w-full my-3"
            isLoading={isSubmitting}
          />
        </form>
        <Toast
          isOpen={passwordIsReset}
          onClose={hideModal}
          children={
            <AlertModal
              isSuccess={true}
              text="Your password has been successfully reset, please login to continue"
            />
          }
        />
      </section>
    </section>
  );
};

export default ResetPassword;
