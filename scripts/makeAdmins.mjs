import mongoose from "mongoose";

const MONGODB_URI = "mongodb://127.0.0.1:27017/cafe";

const UserSchema = new mongoose.Schema({
  role: String,
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function makeAllAdmins() {
  try {
    await mongoose.connect(MONGODB_URI);
    const result = await User.updateMany({}, { $set: { role: "admin" } });
    console.log(`Updated ${result.modifiedCount} users to admin role.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

makeAllAdmins();
