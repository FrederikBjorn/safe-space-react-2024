import bcrypt from "bcryptjs";
import Parse from "parse";

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

// Login a user by checking hashed password
export async function loginUser(username, password) {
  try {
    const query = new Parse.Query("patientUser"); // Use exact class name "patientUser"
    query.equalTo("userName", username); // Match field names exactly

    const user = await query.first();

    if (user) {
      const storedHashedPassword = user.get("password");
      const isPasswordValid = await bcrypt.compare(
        password,
        storedHashedPassword
      );

      return isPasswordValid ? user : null; // Return user if valid, otherwise null
    }
    return null;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
}
