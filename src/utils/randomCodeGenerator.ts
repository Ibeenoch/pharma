export const generateRandomCode = (): string => {
  const timestamp = Date.now().toString(36); // convert timestamp to base-36 (a-z, 0-9)
  const randomChars = Math.random().toString(36).substring(2); // get random string
  const combo = timestamp + randomChars;
  return combo.substring(0, 7).toUpperCase(); // limit to 5 characters, make uppercase
};
