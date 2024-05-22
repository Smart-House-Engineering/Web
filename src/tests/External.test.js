// ExternalPage.test.js

import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "../utils/authContext";
import ExternalPage from "../pages/ExternalPage";

// Mock the useAuth hook
jest.mock("../utils/authContext", () => ({
  useAuth: jest.fn(),
}));

// Mock the fetch call
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        devices: { sensor1: true, sensor2: false, sensor3: 1 },
      }),
  })
);

describe("ExternalPage", () => {
  const mockNavigate = jest.fn();
  const mockSetAuthUser = jest.fn();
  const mockSetIsLoggedIn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAuth.mockReturnValue({
      isLoggedIn: true,
      authUser: { role: "EXTERNAL" },
      setIsLoggedIn: mockSetIsLoggedIn,
      setAuthUser: mockSetAuthUser,
    });
  });

  it("renders correctly for authorized users", async () => {
    render(
      <Router>
        <ExternalPage />
      </Router>
    );

    expect(screen.getByText("staff view")).toBeInTheDocument();
    expect(screen.getByText("Currently active devices")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("sensor1")).toBeInTheDocument()
    );
    expect(screen.queryByText("sensor2")).not.toBeInTheDocument();
    expect(screen.getByText("sensor3")).toBeInTheDocument();
  });

  it("redirects unauthorized users", async () => {
    useAuth.mockReturnValueOnce({
      isLoggedIn: true,
      authUser: { role: "USER" },
      setIsLoggedIn: mockSetIsLoggedIn,
      setAuthUser: mockSetAuthUser,
    });

    render(
      <Router>
        <ExternalPage />
      </Router>
    );

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/unauthorized")
    );
  });

  it("handles logout correctly", async () => {
    render(
      <Router>
        <ExternalPage />
      </Router>
    );

    screen.getByText("Logout").click();

    expect(mockSetAuthUser).toHaveBeenCalledWith(null);
    expect(mockSetIsLoggedIn).toHaveBeenCalledWith(false);
    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/"));
  });

  it("shows no active devices message when there are no active devices", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ devices: { sensor1: false, sensor2: 0 } }),
      })
    );

    render(
      <Router>
        <ExternalPage />
      </Router>
    );

    await waitFor(() =>
      expect(screen.getByText("No active devices")).toBeInTheDocument()
    );
  });
});
