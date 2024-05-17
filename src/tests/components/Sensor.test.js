import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Sensor from "../../components/Sensor";
import fetchMock from "jest-fetch-mock";

describe("Sensor component", () => {
    beforeAll(() => {
        fetchMock.enableMocks();
    });

    beforeEach(() => {
        fetchMock.resetMocks();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    afterAll(() => {
        fetchMock.disableMocks();
    });

    test("renders with correct initial state", () => {
        const props = {
            keyName: "door",
            value: false,
            Val: { idValue: 0 },
            setV: jest.fn(),
        };

        const { getByText, getByTestId } = render(<Sensor {...props} />);

        expect(getByText("Closed")).toBeInTheDocument();
        expect(getByTestId("door-switch")).not.toBeChecked();
    });

    test("toggles state when clicked", async () => {
        const props = {
            keyName: "door",
            value: false,
            Val: { idValue: 0 },
            setV: jest.fn(),
        };

        const { getByTestId } = render(<Sensor {...props} />);

        fireEvent.click(getByTestId("door-switch"));

        await waitFor(() => {
            expect(getByTestId("door-switch")).toBeChecked();
        });
    });

    test("displays correct initial value based on keyName", () => {
        const props = {
            keyName: "door",
            value: false,
            Val: { idValue: 0 },
            setV: jest.fn(),
        };

        const { getByText } = render(<Sensor {...props} />);

        expect(getByText("Closed")).toBeInTheDocument();
    });

    test("displays correct state when clicked", () => {
        const props = {
            keyName: "door",
            value: false,
            Val: { idValue: 0 },
            setV: jest.fn(),
        };

        const { getByTestId } = render(<Sensor {...props} />);

        fireEvent.click(getByTestId("door-switch"));
        expect(getByTestId("door-switch")).toBeChecked();
    });

    test("updates state based on server response", async () => {
        const props = {
            keyName: "door",
            value: false,
            Val: { idValue: 0 },
            setV: jest.fn(),
        };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve({
                        updatedHome: { devices: { door: true } }, // Simulated server response
                    }),
            })
        );

        const { getByTestId } = render(<Sensor {...props} />);

        fireEvent.click(getByTestId("door-switch"));
        await waitFor(() => {
            expect(getByTestId("door-switch")).toBeChecked();
        });
    });
});
