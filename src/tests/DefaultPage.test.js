import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../utils/authContext";
import DefaultPage from "../pages/DefaultPage";
import fetchMock from "jest-fetch-mock";
import { act } from "react";

jest.mock("../components/Sideboard", () => {
    return () => <div data-testid="mock-sideboard">Mock SideBoard</div>;
});

const renderDefaultPage = () => {
    render(
        <AuthProvider>
            <BrowserRouter>
                <DefaultPage />
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

describe("DefaultPage", () => {
    beforeAll(() => {
        fetchMock.enableMocks();
    });

    beforeEach(() => {
        fetchMock.resetMocks();
        fetchMock.mockResponse(
            JSON.stringify({
                message: "Devices retrieved successfully",
                devices: {
                    fan: false,
                    RFan: false,
                    motion: false,
                    buzzer: true,
                    relay: false,
                    door: 0,
                    window: 0,
                    yellowLed: 0,
                    gasSensor: 0,
                    photocell: 0,
                    soilSensor: 0,
                    steamSensor: 0,
                    whiteLed: false,
                    button1: false,
                    button2: false,
                    lights: false,
                },
            }),
            {
                status: 200,
            }
        );
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    afterAll(() => {
        fetchMock.disableMocks();
    });

    test("DefaultPage should be loaded, with response ok", async () => {
        renderDefaultPage();
        await waitFor(() =>
            expect(
                document.getElementsByClassName("boards-sensors")[0]
            ).toBeInTheDocument()
        );
    });

    test("should render sensors container", async () => {
        renderDefaultPage();
        await screen.findByTestId("sensors-container");
        expect(screen.getByTestId("sensors-container")).toBeInTheDocument();
    });

    test("should displays sensors correctly", async () => {
        renderDefaultPage();
        await screen.findByTestId("sensors-container");
        await waitFor(() => {
            expect(screen.getByText("door")).toBeInTheDocument();
            expect(screen.getByText("window")).toBeInTheDocument();
            expect(screen.getByText("lights")).toBeInTheDocument();
        });
    });
});
