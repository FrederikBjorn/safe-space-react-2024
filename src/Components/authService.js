import Parse from "parse";

// // Register a new user with hashed password
// export async function registerUser(username, password) {
//   try {
//     const PatientUser = new Parse.Object("patientUser"); // Ensure the class name matches exactly
//     PatientUser.set("userName", username); // Ensure field names match
//     PatientUser.set("password", password);

//     await PatientUser.save();
//     console.log("User registered successfully");
//     return true;
//   } catch (error) {
//     console.error("Error registering user:", error);
//     return false;
//   }
// }

export async function registerUser(username, password) {
  // Note that these values come from state variables that we've declared before
  const usernameValue = username;
  const passwordValue = password;
  try {
    // Since the signUp method returns a Promise, we need to call it using await
    const createdUser = await Parse.User.signUp(usernameValue, passwordValue);
    alert(
      `Success! User ${createdUser.getUsername()} was successfully created!`
    );
    return true;
  } catch (error) {
    // signUp can fail if any parameter is blank or failed an uniqueness check on the server
    alert(`Error! ${error}`);
    return false;
  }
}
