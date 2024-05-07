import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../utils/authContext"; // Ensure correct path
import Login from "../pages/Login"; // Ensure correct path

// Helper to render the component within the required providers
const renderLogin = () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </AuthProvider>
  );
};

describe("Login Component", () => {
  test("inputs should be initially empty", () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText(
      "Password (min 6 letters)"
    );
    expect(emailInput.value).toBe("");
    expect(passwordInput.value).toBe("");
  });

  test("should allow entering email and password", () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText(
      "Password (min 6 letters)"
    );
    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password");
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password");
  });

  test("should submit the form", () => {
    renderLogin();
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText(
      "Password (min 6 letters)"
    );
    const submitButton = screen.getByRole("button", { name: "LOGIN" });

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password");
    fireEvent.click(submitButton);

    // Add expectation depending on what happens after submission
    // This could be a mock of your API call to verify it was called correctly.
    // Example:
    // expect(mockedFunction).toHaveBeenCalledWith(expect.anything());
  });
});
