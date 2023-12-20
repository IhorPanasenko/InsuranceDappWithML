// passwordValidator.js
const validatePassword = (password) => {
  // Use a regular expression to enforce password complexity rules
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
  return passwordRegex.test(password);
};

module.exports = validatePassword;
