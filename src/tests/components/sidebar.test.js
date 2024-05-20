import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "../../components/sidebar";
import { AuthProvider } from "../../utils/authContext";
import "@testing-library/jest-dom";

jest.mock("../../utils/authContext", () => ({
    ...jest.requireActual("../../utils/authContext"),
    useAuth: jest.fn(() => ({
        setIsLoggedIn: jest.fn(),
        setAuthUser: jest.fn(),
        authUser: {
            email: "test@example.com",
            homeId: "myHome",
            role: "OWNER",
        },
    })),
}));

describe("Sidebar component", () => {
    beforeEach(() => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <Sidebar />
                </BrowserRouter>
            </AuthProvider>
        );
    });

    test("renders sidebar elements", () => {
        const homeLink = screen.getByText("Home");
        expect(homeLink).toBeInTheDocument();
    });

    test("navigates to default page when home icon is clicked", () => {
        const homeIcon = screen.getByAltText("Home or default page");
        fireEvent.click(homeIcon);
        expect(window.location.pathname).toBe("/default");
    });

    test("logs out when logout icon is clicked", () => {
        const logoutIcon = screen.getByTestId("logout-test");
        fireEvent.click(logoutIcon);
        expect(window.location.pathname).toBe("/");
    });
});
