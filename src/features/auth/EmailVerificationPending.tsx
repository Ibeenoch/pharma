import { MARGIN_TOP } from "../../constants/appText";
import emailpics from "../../assets/images/email.png";
import CustomText from "../../components/common/Text";

const EmailVerificationPending = () => {
  return (
    <section
      className={`h-screen pt-[15%] lg:mt-0 pt-15 lg:pt-0 lg:grid lg:grid-cols-2 items-center `}
    >
      <div className="flex justify-center items-center lg:block mx-auto">
        <img
          src={emailpics}
          alt="email picture"
          className="h-32 lg:h-40 w-auto"
        />
      </div>
      <article className=" lg:block">
        <CustomText
          text="Verify Your Email Address"
          textType="huge"
          weightType="bold"
          extraStyle="text-center"
        />

        <CustomText
          text={`We've sent a verification link to your email.`}
          textType="normal"
          weightType="medium"
          color="text-gray-600"
          extraStyle="text-center"
        />
        <CustomText
          text={`Please check your email to complete the process.`}
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

export default EmailVerificationPending;
