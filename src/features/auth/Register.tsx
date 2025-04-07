import { COMPANY_NAME, MARGIN_TOP } from "../../constants/appText";
import manWalk from "../../assets/images/1547272465.png";
import CustomInput from "../../components/common/Input";
import { ChangeEvent, useState } from "react";
import CustomText from "../../components/common/Text";
import Email from "../../assets/icons/email.svg?react";
import Google from "../../assets/icons/google-colored.svg?react";
import Facebook from "../../assets/icons/facebook-colored.svg?react";
import User from "../../assets/icons/user.svg?react";
import Date from "../../assets/icons/date.svg?react";
import Gender from "../../assets/icons/gender.svg?react";
import Lock from "../../assets/icons/lock.svg?react";
import CustomButton from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { validator } from "../../utils/validator";
import CustomSelect from "../../components/common/Select";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { facebookLogin, googleLogin, registerUser } from "./authSlice";

const Register = () => {
  const [firstName, setFirstNamel] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dob, setDob] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [passcode, setPasscode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<{
    firstName?: string;
    lastName?: string;
    dob?: string;
    gender?: string;
    email?: string;
    password?: string;
    role?: string;
    passcode?: string;
  }>({});
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Others", label: "Others" },
  ];
  const roleOptions = [
    { value: "", label: "Select Role" },
    { value: "Customer", label: "Customer" },
    { value: "Pharmarcist", label: "Pharmarcist" },
    { value: "Admin", label: "Admin" },
  ];
  const switchToLoginPage = () => {
    navigate("/login");
  };

  const handleFormSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const firstNameValid = validator(firstName, "others");
    const lastNameValid = validator(lastName, "others");
    const dobValid = validator(dob, "others");
    const genderValid = validator(gender, "others");
    const emailValid = validator(email, "email");
    const passwordValid = validator(password, "password");
    const roleValid = validator(role, "role");
    const passcodeValid = validator(passcode, "passcode");

    if (
      !firstNameValid ||
      !lastNameValid ||
      !dobValid ||
      !genderValid ||
      !emailValid ||
      !passwordValid ||
      !role
    ) {
      setError({
        firstName: firstNameValid ? undefined : "First name is required",
        lastName: lastNameValid ? undefined : "Last name is required",
        dob: dobValid ? undefined : "Date of birth is required",
        gender: genderValid ? undefined : "Gender is required",
        email: emailValid ? undefined : "Email address is required",
        password: passwordValid
          ? undefined
          : "Password must be at least 8 characters, include a number & special character",
        role: roleValid ? undefined : "Role is required",
      });
      setIsSubmitting(false);
      return;
    }
    if (role === "Admin" && !passcode) {
      setError({
        passcode: passcodeValid ? undefined : "Passcode is required",
      });
      setIsSubmitting(false);
      return;
    }
    // Passing!123&4
    // Ty2t8+!eyej7

    dispatch(
      registerUser({
        firstName,
        lastName,
        dob,
        email,
        gender,
        passcode,
        password,
        role,
      })
    ).then((res) => {
      res.payload !== undefined
        ? navigate("/verify/pending")
        : setIsSubmitting(false);
    });
  };
  //

  const handleGoogleLogin = () => {
    dispatch(googleLogin());
  };

  const handleFacebookLogin = () => {
    dispatch(facebookLogin());
  };
  return (
    <section className={`h-full lg:grid lg:grid-cols-3 mt-20 items-center `}>
      <article className="hidden lg:block">
        <CustomText text="Sign Up to" textType="huge" weightType="bold" />
        <CustomText
          text={`${COMPANY_NAME}`}
          textType="huge"
          weightType="bold"
        />

        <CustomText
          text={`You already have an account`}
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
          rightText="login here!"
          color="text-gray-600"
          extraStyle="text-[14px]"
          rightTextFunc={switchToLoginPage}
        />
      </article>

      <article className={`block ${MARGIN_TOP} lg:mt-0 lg:hidden`}>
        <CustomText
          text={`Sign up to ${COMPANY_NAME}`}
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
          <div className="lg:flex gap-3 items-center">
            <CustomInput
              prefixIcon={<User className="w-4 h-4" />}
              label="First Name"
              Id="firstName"
              type="text"
              value={firstName}
              onChange={setFirstNamel}
              required={true}
              showFullWidth={true}
              placeholder="Your First Name"
              validate={(value) => validator(value, "others")}
              errorMessage={error.firstName || "First name is required"}
            />
            <CustomInput
              prefixIcon={<User className="w-4 h-4" />}
              label="Last Name"
              Id="lastName"
              type="text"
              value={lastName}
              onChange={setLastName}
              required={true}
              showFullWidth={true}
              placeholder="Your Last Name"
              validate={(value) => validator(value, "others")}
              errorMessage={error.lastName || "Last name is required"}
            />
          </div>

          <div className="lg:flex gap-3 items-center">
            <CustomInput
              prefixIcon={<Date className="w-4 h-4" />}
              label="Date Of Birth"
              Id="dob"
              type="date"
              value={dob}
              onChange={setDob}
              required={true}
              showFullWidth={true}
              placeholder="Your Date Of Birth"
              validate={(value) => validator(value, "others")}
              errorMessage={error.dob || "Select your date of birth"}
            />
            <CustomSelect
              options={genderOptions}
              value={gender}
              onChange={setGender}
              label="Gender"
              required={true}
              Id="gender"
              showFullWidth={true}
              prefixIcon={<Gender className="w-4 h-4" />}
              validate={(value) => validator(value, "others")}
              errorMessage={error.gender || "Select your gender"}
            />
          </div>
          <div className="flex gap-3 items-center">
            <CustomSelect
              options={roleOptions}
              value={role}
              onChange={setRole}
              label="Role"
              required={true}
              Id="role"
              showFullWidth={true}
              prefixIcon={<User className="w-4 h-4" />}
              validate={(value) => validator(value, "others")}
              errorMessage={error.role || "Select your role"}
            />
            {role === "Admin" && (
              <CustomInput
                prefixIcon={<Lock className="w-4 h-4" />}
                label="Passcode"
                Id="passcode"
                type="text"
                value={passcode}
                onChange={setPasscode}
                required={true}
                showFullWidth={true}
                placeholder="Enter Your Passcode"
                validate={(value) => validator(value, "others")}
                errorMessage={error.passcode || "Passcode is required"}
              />
            )}
          </div>

          <CustomInput
            prefixIcon={<Email className="w-4 h-4" />}
            label="Email Address"
            Id="email"
            type="email"
            value={email}
            onChange={setEmail}
            required={true}
            showFullWidth={true}
            placeholder="Your Email Address"
            validate={(value) => validator(value, "email")}
            errorMessage={error.email || "Email Address is required"}
          />
          <CustomInput
            prefixIcon={<Lock className="w-4 h-4" />}
            label="Password"
            isPassword={true}
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

          <CustomButton
            text="Sign Up"
            isLoading={isSubmitting}
            type="submit"
            className="w-full my-3"
            // onClick={setIsSubmitting(true)}
          />
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

export default Register;
