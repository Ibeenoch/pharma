export const validator = (value: string, type: string) => {
  switch (type) {
    case "email":
      return validateEmail(value);
      break;
    case "password":
      return validatePassword(value);
      break;
    default:
      return validateOther(value);
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

const validateOther = (value: string) => {
  return value.trim().length > 1; // ✅ Always returns boolean
};
