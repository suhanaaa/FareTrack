// testConnection.js
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI; // Ensure this is your connection string

async function testConnection() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
  }
}

testConnection();
