import React, { useState } from "react";
import "../style/addUser.css";
import { getCookie } from "../helperFunctions/getCookie";

function AddUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    role: "",
    response: "",
  });

  const validateEmail = (email) => {
    if (!email) {
      return "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email address is invalid.";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password) {
      return "Password is required.";
    } else if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return "";
  };

  const validateRole = (role) => {
    if (role === "") {
      return "Role is required.";
    }
    return "";
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setErrors({ ...errors, email: validateEmail(newEmail) });
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setErrors({ ...errors, password: validatePassword(newPassword) });
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const submit = (event) => {
    event.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const roleError = validateRole(role);

    if (emailError || passwordError || roleError) {
      setErrors({
        email: emailError,
        password: passwordError,
        role: roleError,
      });
      return; // Stop the form from submitting
    }

    const token = getCookie("SmartHouseToken");
    console.log("cookies", localStorage.getItem("SmartHouseToken"));
    if (token) {
      console.log(" the Token:", token); // Should log the actual token if present

      fetch("http://localhost:8000/api/owner/addUser/", {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUserEmail: email,
          newUserPassword: password,
          newUserRole: role,
        }),
        cookies: token,
      })
        .then((response) => response.json())
        .then((res) => {
          console.log("Response:", res);
          if (res.message == "TENANT account created!") {
            setEmail("");
            setRole("");
            setPassword("");
            setErrors({ ...errors, response: "" });
          } else {
            setErrors({ ...errors, response: res.message });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          setErrors({ ...error, response: res.message });
        });
    } else {
      console.log("Token not found");
    }
  };

  return (
    <div className="hid">
      <form onSubmit={submit}>
        <img src="/SEA-logo.png" alt="Logo of the app"></img>
        <h2>Add New User</h2>
        <input
          type="email"
          required
          placeholder="Email"
          maxLength="50"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <input
          type="password"
          required
          placeholder="Password (min 6 letters)"
          minLength="6"
          name="password"
          maxLength="50"
          value={password}
          onChange={handlePasswordChange}
        />
        {errors.password && <div className="error">{errors.password}</div>}
        <select name="role" value={role} onChange={handleRoleChange} required>
          <option value="">Select Role</option>
          <option value="TENANT">Tenant</option>
        </select>
        {errors.response && <div className="error">{errors.response}</div>}
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;
