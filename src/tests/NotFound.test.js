import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import { AuthProvider } from "../utils/authContext";
import "@testing-library/jest-dom";

const renderPage = () => {
    render(
        <AuthProvider>
            <BrowserRouter>
                <NotFoundPage />
            </BrowserRouter>
        </AuthProvider>
    );
};

jest.mock("../utils/authContext", () => ({
    ...jest.requireActual("../utils/authContext"),
    useAuth: jest.fn(() => ({
        isLoggedIn: true,
        authUser: {
            email: "test@example.com",
            homeId: "myHome",
            role: "OWNER",
        },
    })),
}));

test("renders 404 message", () => {
    renderPage();

    const notFoundHeading = screen.getByText("404 - Page Not Found");
    expect(notFoundHeading).toBeInTheDocument();

    const notFoundMessage = screen.getByText(
        "The page you are looking for does not exist."
    );
    expect(notFoundMessage).toBeInTheDocument();
});

test("renders back to home link", () => {
    renderPage();

    const backToHomeLink = screen.getByText("Go back to home");
    expect(backToHomeLink).toBeInTheDocument();
    expect(backToHomeLink).toHaveAttribute("href", "/default");
});
