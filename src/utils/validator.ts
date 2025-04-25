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
    case "passcode":
      return validatePasscode(value as string);
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

const validatePasscode = (value: string) => {
  return (
    typeof value === "string" && value.trim() === import.meta.env.VITE_PASS_CODE
  ); //  Always returns boolean
};

const validateOther = (value: any) => {
  return typeof value === "string" ? value.trim().length > 1 : !isNaN(value); //  Always returns boolean
};

const validatePhone = (value: string) => {
  const nigeriaPhoneRegex =
    /^\+?(\d{1,4})?[-.\s]?(\(?\d{3}\)?)[-.\s]?\d{3}[-.\s]?\d{4}$/;
  return nigeriaPhoneRegex.test(value);
};
