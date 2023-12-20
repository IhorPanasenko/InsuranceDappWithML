const express = require("express");
const connectToDatabase = require("./config/database");
const cors = require("cors");

const roleRoutes = require("./routes/roleRoutes");
const companyRoutes = require("./routes/insuranceCompanyRoutes");
const authenticationRoutes = require('./routes/authenticationRoutes')
const insuranceCategoryRoutes = require('./routes/insuranceCategoryRoutes');
const userRoutes = require('./routes/userRoutes');
const insurancePolicyRoutes = require('./routes/insurancePolicyRoutes');

const app = express();
app.use(cors());
connectToDatabase();

app.use(express.json());

app.use(roleRoutes);
app.use(companyRoutes);
app.use(authenticationRoutes);
app.use(insuranceCategoryRoutes);
app.use(userRoutes);
app.use(insurancePolicyRoutes)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
