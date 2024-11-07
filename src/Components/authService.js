import bcrypt from "bcryptjs";
import Parse from "parse";
import { Await } from "react-router-dom";

// Register a new user with hashed password
export async function registerUser(username, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password with bcrypt
    const PatientUser = new Parse.Object("patientUser"); // Ensure the class name matches exactly
    PatientUser.set("userName", username); // Ensure field names match
    PatientUser.set("password", hashedPassword);

    await PatientUser.save();
    console.log("User registered successfully");
    return true;
  } catch (error) {
    console.error("Error registering user:", error);
    return false;
  }
}
