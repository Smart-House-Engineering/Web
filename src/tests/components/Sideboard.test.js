import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import SideBoard from "../../components/Sideboard";
import { AuthProvider } from "../../utils/authContext";
import fetchMock from "jest-fetch-mock";

const renderDefaultPage = (Val, setV) => {
    render(
        <AuthProvider>
            <BrowserRouter>
                <SideBoard Val={Val} setV={setV} />
            </BrowserRouter>
        </AuthProvider>
    );
};

jest.mock("../../utils/authContext", () => ({
    ...jest.requireActual("../../utils/authContext"),
    useAuth: jest.fn(() => ({
        isLoggedIn: true,
        authUser: {
            email: "test@example.com",
            homeId: "myHome",
            role: "OWNER",
        },
    })),
}));

describe("SideBoard component", () => {
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
        global.fetch = jest.fn();
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                main: {
                    temp: 20,
                },
                weather: [
                    {
                        description: "Sunny",
                    },
                ],
            }),
        });
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
        jest.useRealTimers();
    });

    test("renders weather data correctly", async () => {
        const Val = { idValue: "Devices" };
        const setV = jest.fn();

        renderDefaultPage(Val, setV);
        jest.advanceTimersByTime(1000);

        await waitFor(() => {
            expect(screen.getByText(getCurrentTime())).toBeInTheDocument();
        });

        jest.advanceTimersByTime(1000);
        await waitFor(() => {
            expect(screen.getByText(getCurrentTime())).toBeInTheDocument();
        });
    });

    test("renders 'CURRENTLY ACTIVE' title correctly", () => {
        const Val = { idValue: "Devices" };
        const setV = jest.fn();
        renderDefaultPage(Val, setV);

        const titleElement = screen.getByText("CURRENTLY ACTIVE");
        expect(titleElement).toBeInTheDocument();
    });

    test("renders current time correctly", async () => {
        const Val = { idValue: "Devices" };
        const setV = jest.fn();
        renderDefaultPage(Val, setV);

        const currentTime = getCurrentTime();
        await waitFor(() => {
            expect(screen.getByText(currentTime)).toBeInTheDocument();
        });
    });

    test("logs error message when fetching user data returns 401", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 401,
        });

        console.error = jest.fn();
        const Val = { idValue: "Devices" };
        const setV = jest.fn();
        renderDefaultPage(Val, setV);

        await waitFor(() => {
            expect(console.error).toHaveBeenCalledWith(
                "Failed to fetch user data"
            );
        });
    });
});

function getCurrentTime() {
    const today = new Date();
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const seconds = String(today.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}
