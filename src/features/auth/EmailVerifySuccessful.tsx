import { MARGIN_TOP } from "../../constants/appText";
import emailpics from "../../assets/images/emailverify.png";
import CustomText from "../../components/common/Text";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { emailVerifing } from "./authSlice";
import { useEffect } from "react";

const EmailVerifySuccessful = () => {
  const dispatch = useAppDispatch();
  const urlParams = new URLSearchParams(window.location.search);
  const secret = urlParams.get("secret");
  const userId = urlParams.get("userId");
  const activateEmailVerification = () => {
    if (!userId || !secret) {
      console.error("Missing userId or secret");
      return;
    }
    const verifyData = {
      userId,
      secret,
    };
    dispatch(emailVerifing(verifyData));
  };
  useEffect(() => {
    activateEmailVerification();
  }, []);

  return (
    <section
      className={`h-screen pt-15 lg:pt-0 lg:grid lg:grid-cols-2 items-center `}
    >
      <div className="flex justify-center lg:block mx-auto">
        <img
          src={emailpics}
          alt="email picture"
          className="h-38 lg:h-75 w-auto"
        />
      </div>
      <article className=" lg:block">
        <CustomText
          text="Email Verification Successful"
          textType="huge"
          weightType="bold"
          extraStyle="text-center"
        />

        <CustomText
          text={`Your email address has been successfully verified.`}
          textType="normal"
          weightType="medium"
          color="text-gray-600"
          extraStyle="text-center"
        />
        <CustomText
          text={`You're all set to continue!`}
          textType="normal"
          weightType="medium"
          color="text-gray-600"
          extraStyle="text-center"
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
    </section>
  );
};

export default EmailVerifySuccessful;
