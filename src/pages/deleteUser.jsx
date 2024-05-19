import React, { useState, useEffect } from "react";
import "../style/deleteUser.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";

function DeleteUser() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, authUser } = useAuth();

  useEffect(() => {
    if (authUser?.role !== "OWNER" || authUser?.role !== "OWNER") {
      navigate("/unauthorized");
    }
    const fetchAllUsers = async () => {
      const response = await fetch(
        "https://evanescent-beautiful-venus.glitch.me/api/user/allMembers/",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          cookies: localStorage.getItem("SmartHouseToken"),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error(`Error fetching users:", ${response.status}`);
      }
    };
    fetchAllUsers();
  }, []);

  const deleteUser = async (deleteUserEmail) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete user "${deleteUserEmail}" ?`
    );
    if (confirmation) {
      const response = await fetch(
        "https://evanescent-beautiful-venus.glitch.me/api/owner/deleteUser/",
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deleteUserEmail }),
        }
      );
      if (response.ok) {
        const res = await response.json();
        console.log(res);
        if (res.message === "User deleted successfully!") {
          setUsers(users.filter((user) => user.email !== deleteUserEmail));
        } else {
          console.error("Error deleting user:", res.message);
        }
      } else {
        console.error(`Error fetching users:", ${response.status}`);
      }
    } else {
      console.log("Deletion cancelled.");
    }
  };

  return (
    <div className="container">
      <img src="/SEA-logo.png" alt="Logo of the app" />
      <h2>Want to delete a User?</h2>
      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.email}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => deleteUser(user.email)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeleteUser;
