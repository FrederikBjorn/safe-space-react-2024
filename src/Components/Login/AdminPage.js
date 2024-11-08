import { useState } from "react";
import Parse from "parse";
import "./AdminPage.css";

//this is the admin page for adding elements into the databse, for patient and professional users
//should be handled by an administrator of safespace only
//missing functionality would be an admin login, but it seems out of scope for this project.
//it handles the hashing of passwords fir sfate storage in the db

export default function Admin() {
  //state and schema specification from db schema
  const [patientUser, setPatientUser] = useState({
    userName: "",
    password: "",
    email: "",
    fullName: "",
  });
  const [professionalUser, setProfessionalUser] = useState({
    userName: "",
    password: "",
    email: "",
    name: "",
    numberOfPatients: 0,
  });

  const handleChange = (e, userType) => {
    const { name, value } = e.target;

    if (userType === "patient") {
      // Update patientUser state
      setPatientUser({ ...patientUser, [name]: value });
    } else if (userType === "professional") {
      // Update professionalUser state, ensuring numberOfPatients is a number
      setProfessionalUser({
        ...professionalUser,
        [name]: name === "numberOfPatients" ? parseInt(value) || 0 : value,
      });
    }
  };

  //  add a patient user method, should be async
  const addPatientUser = async () => {
    try {
      // Note that these values come from state variables that we've declared before
      const usernameValue = patientUser.userName;
      const passwordValue = patientUser.password;
      try {
        // Since the signUp method returns a Promise, we need to call it using await
        const createdUser = await Parse.User.signUp(
          usernameValue,
          passwordValue
        );
        alert(
          `Success! User ${createdUser.getUsername()} was successfully created!`
        );
        return true;
      } catch (error) {
        // signUp can fail if any parameter is blank or failed an uniqueness check on the server
        alert(`Error! ${error}`);
        return false;
      }
    } catch (error) {
      console.error("Error adding patient user:", error);
      alert("Failed to add patient user.");
    }
  };

  // Function to add a professional user
  const addProfessionalUser = async () => {
    try {
      const ProfessionalUser = new Parse.Object("professionalUser");
      ProfessionalUser.set("userName", professionalUser.userName);
      ProfessionalUser.set("password", ProfessionalUser.password);
      ProfessionalUser.set("email", professionalUser.email);
      ProfessionalUser.set("fullName", professionalUser.fullname);
      await ProfessionalUser.save();
      alert("Professional user added successfully!");
      // Clear form after submission
      setProfessionalUser({
        userName: "",
        password: "",
        email: "",
        fullName: "",
      });
    } catch (error) {
      console.error("Error adding professional user:", error);
      alert("Failed to add professional user.");
    }
  };

  return (
    <div className="AdminPage">
      <h1>Admin Panel</h1>

      {/* Form for adding Patient User */}
      <h2>Add Patient User</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPatientUser();
        }}
      >
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={patientUser.userName}
          onChange={(e) => handleChange(e, "patient")}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={patientUser.password}
          onChange={(e) => handleChange(e, "patient")}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={patientUser.email}
          onChange={(e) => handleChange(e, "patient")}
          required
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={patientUser.fullName}
          onChange={(e) => handleChange(e, "patient")}
        />
        <button type="submit">Add Patient User</button>
      </form>

      {/* Form for adding Professional User */}
      <h2>Add Professional User</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addProfessionalUser();
        }}
      >
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={professionalUser.userName}
          onChange={(e) => handleChange(e, "professional")}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={professionalUser.password}
          onChange={(e) => handleChange(e, "professional")}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={professionalUser.email}
          onChange={(e) => handleChange(e, "professional")}
          required
        />
        <input
          type="text"
          name="fullName"
          placeholder="FullName"
          value={professionalUser.fullName}
          onChange={(e) => handleChange(e, "professional")}
        />
        <button type="submit">Add Professional User</button>
      </form>
    </div>
  );
}
