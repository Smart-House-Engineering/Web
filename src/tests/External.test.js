import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ExternalPage from "../pages/ExternalPage"; // Adjust the import path as needed
import { useAuth } from "../utils/authContext"; // Adjust the import path as needed

// Mocking necessary dependencies
jest.mock("../utils/authContext", () => ({
  useAuth: jest.fn(),
}));
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ devices: { sensor1: true, sensor2: false } }),
  })
);

describe("ExternalPage Component", () => {
  const mockNavigate = jest.fn();
  const mockSetAuthUser = jest.fn();
  const mockSetIsLoggedIn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockImplementation(() => ({
      isLoggedIn: true,
      authUser: { role: "EXTERNAL" },
      setIsLoggedIn: mockSetIsLoggedIn,
      setAuthUser: mockSetAuthUser,
    }));
    require("react-router-dom").useNavigate.mockImplementation(
      () => mockNavigate
    );
  });

  test("redirects unauthorized users", async () => {
    useAuth.mockImplementation(() => ({
      isLoggedIn: true,
      authUser: { role: "USER" },
      setIsLoggedIn: jest.fn(),
      setAuthUser: jest.fn(),
    }));

    render(<ExternalPage />, { wrapper: BrowserRouter });
    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/unauthorized")
    );
  });

  test("fetches data on mount and renders active sensors", async () => {
    render(<ExternalPage />, { wrapper: BrowserRouter });
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    expect(screen.getByText("sensor1")).toBeInTheDocument();
    expect(screen.queryByText("sensor2")).not.toBeInTheDocument(); // sensor2 should not render since it's false
  });

  test("handles logout", async () => {
    render(<ExternalPage />, { wrapper: BrowserRouter });
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);
    await waitFor(() => {
      expect(mockSetAuthUser).toHaveBeenCalledWith(null);
      expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
