import { lazy } from "react";
import emailpics from "../../assets/images/email.png";
const CustomText = lazy(() =>import('../../components/common/Text'));


const EmailVerificationPending = () => {
  return (
    <section
      className={`h-screen  pt-[20%] lg:mt-0 pt-15 lg:pt-0 lg:grid lg:grid-cols-2 items-center `}
    >
      <div className="flex justify-center items-center lg:block mx-auto">
        <img
          src={emailpics}
          alt="email picture"
          className="h-20 lg:h-40 w-auto"
        />
      </div>
      <article className="pt-5 lg:block">
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
          extraStyle="text-center pt-5"
        />
        <CustomText
          text={`Please check your email to complete the process.`}
          textType="normal"
          weightType="medium"
          color="text-gray-600"
          extraStyle="text-center"
        />
      </article>


    </section>
  );
};

export default EmailVerificationPending;
