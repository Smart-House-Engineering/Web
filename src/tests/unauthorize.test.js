import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Unauthorized from "../pages/unauthorize";
import { AuthProvider } from "../utils/authContext";
import "@testing-library/jest-dom";

describe("Unauthorized component", () => {
    beforeEach(() => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <Unauthorized />
                </BrowserRouter>
            </AuthProvider>
        );
    });

    test("renders unauthorized message", () => {
        const unauthorizedMessage = screen.getByText("Unauthorized Access");
        expect(unauthorizedMessage).toBeInTheDocument();
    });

    test("renders login button", () => {
        const loginButton = screen.getByText("Login");
        expect(loginButton).toBeInTheDocument();
    });

    test("redirects to login page when login button is clicked", () => {
        const loginButton = screen.getByText("Login");
        fireEvent.click(loginButton);
        expect(window.location.pathname).toBe("/");
    });
});
