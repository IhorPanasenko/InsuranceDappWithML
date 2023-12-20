const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://Ihor_Panansenko:Igor2410@cluster0.hmzg3go.mongodb.net/Insurances",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`Connected to MongoDB: ${connection.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process if there is an error connecting to the database
  }
};

module.exports = connectToDatabase;
