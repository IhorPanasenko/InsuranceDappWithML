const jwt = require('jsonwebtoken');

const generateJwtToken = (userId, userEmail, userRole) => {
  const tokenPayload = {
    userId,
    userEmail,
    userRole,
    // Add other default data as needed
  };

  // Sign the token with a secret key (replace 'your-secret-key' with a secure key)
  const token = jwt.sign(tokenPayload, "RukyaasdfndfasdomyerthGenerhyd5fdsg46ate342dKe43bdfgx25edghy", { expiresIn: "1h" });

  return token;
};

module.exports = generateJwtToken;
