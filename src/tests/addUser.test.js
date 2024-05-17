import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../utils/authContext";
import AddUser from "../pages/addUser";
import fetchMock from "jest-fetch-mock";
import { act } from "react";

fetchMock.enableMocks();

beforeEach(() => {
    fetch.resetMocks();
});

const renderAddUser = () => {
    render(
        <AuthProvider>
            <BrowserRouter>
                <AddUser />
            </BrowserRouter>
        </AuthProvider>
    );
};

describe("AddUser", () => {
    test("renders without errors", () => {
        renderAddUser();
        expect(screen.getByText("Add New User")).toBeInTheDocument();
    });

    test("validates email field", async () => {
        renderAddUser();
        const emailInput = screen.getByPlaceholderText("Email");
        fireEvent.change(emailInput, { target: { value: "invalidemail" } });
        expect(
            screen.getByText("Email address is invalid.")
        ).toBeInTheDocument();
    });

    test("validates password field", async () => {
        renderAddUser();
        const passwordInput = screen.getByPlaceholderText(
            "Password (min 6 letters)"
        );
        fireEvent.change(passwordInput, { target: { value: "short" } });
        expect(
            screen.getByText("Password must be at least 6 characters.")
        ).toBeInTheDocument();
    });

    it("submits form with valid data", async () => {
        renderAddUser();

        const mockResponse = { message: "TENANT account created!" };
        fetch.mockResponseOnce(JSON.stringify(mockResponse));

        fireEvent.change(screen.getByPlaceholderText("Email"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(
            screen.getByPlaceholderText("Password (min 6 letters)"),
            { target: { value: "password" } }
        );
        fireEvent.change(screen.getByRole("combobox"), {
            target: { value: "TENANT" },
        });
        fireEvent.click(screen.getByText("Add User"));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledTimes(1);
        });

        expect(fetch).toHaveBeenCalledWith(
            "https://evanescent-beautiful-venus.glitch.me/api/owner/addUser/",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    newUserEmail: "test@example.com",
                    newUserPassword: "password",
                    newUserRole: "TENANT",
                }),
            }
        );

        await waitFor(() => {
            expect(screen.getByPlaceholderText("Email")).toHaveValue("");
            expect(
                screen.getByPlaceholderText("Password (min 6 letters)")
            ).toHaveValue("");
            expect(screen.getByRole("combobox")).toHaveValue("");
        });
    });
});
