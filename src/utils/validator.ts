export const validator = (value: string | number, type: string) => {
  switch (type) {
    case "email":
      return validateEmail(value as string);
      break;
    case "password":
      return validatePassword(value as string);
      break;
    case "phone":
      return validatePhone(value as string);
      break;
    default:
      return validateOther(value as any);
      break;
  }
};

// Validation function for email
const validateEmail = (value: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value); // Returns true if valid, false if not
};

const validatePassword = (value: string) => {
  const minLength = value.length >= 8; // At least 8 characters
  const hasLetter = /[A-Za-z]/.test(value); // At least one letter
  const hasNumber = /\d/.test(value); // At least one number
  const hasSpecialChar = /[@$!%*?&]/.test(value); // At least one special character

  return minLength && hasLetter && hasNumber && hasSpecialChar;
};

const validateOther = (value: any) => {
  return typeof value === "string" ? value.trim().length > 1 : !isNaN(value); //  Always returns boolean
};

const validatePhone = (value: string) => {
  const nigeriaPhoneRegex =
    /^(?:\+234|0)(70|80|81|90|91|701|702|703|704|705|706|707|708|709|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|901|902|903|904|905|906|907|908|909|911|912|913|914|915|916|917|918|919)\d{6}$/;

  return nigeriaPhoneRegex.test(value);
};
