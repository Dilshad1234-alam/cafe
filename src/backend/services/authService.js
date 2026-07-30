import "server-only";
import connectToDatabase from "@/backend/config/db";
import User from "@/backend/models/User";
import bcrypt from "bcryptjs";

export function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    fullname: user.fullname,
    email: user.email,
    phone: user.phone || "",
    role: user.role,
    isActive: user.isActive,
    lastLoginAt: user.lastLoginAt,
  };
}

export async function findUserByEmail(email, selectPassword = false) {
  await connectToDatabase();
  const query = User.findOne({ email });
  if (selectPassword) {
    query.select("+password");
  }
  return query.exec();
}

export async function createUserAccount(data) {
  await connectToDatabase();
  
  // Hash the password with bcryptjs
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(data.password, saltRounds);
  
  const newUser = await User.create({
    fullname: data.fullname,
    email: data.email,
    password: hashedPassword,
    role: "user", // Enforce role as user for new public accounts
  });
  
  return newUser;
}

export async function authenticateUser(email, password) {
  await connectToDatabase();
  
  const user = await findUserByEmail(email, true);
  if (!user) {
    return null; // Return null generic invalid-credentials
  }
  
  if (!user.isActive) {
    throw new Error("Account is inactive");
  }
  
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return null;
  }
  
  // Update lastLoginAt
  user.lastLoginAt = new Date();
  await user.save();
  
  return user;
}

export async function getUserById(userId) {
  await connectToDatabase();
  return User.findById(userId);
}
