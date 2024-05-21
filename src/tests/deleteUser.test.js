import React from "react"
import { render, screen, waitFor, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { BrowserRouter } from "react-router-dom"
import { AuthProvider } from "../utils/authContext"
import DeleteUser from "../pages/deleteUser"
import fetchMock from "jest-fetch-mock"
import { act } from "react"

fetchMock.enableMocks()

beforeEach(() => {
  fetch.resetMocks()
})

const renderDeleteUser = () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <DeleteUser />
      </BrowserRouter>
    </AuthProvider>
  )
}

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
}))

jest.spyOn(window, "confirm").mockImplementation(() => true)

afterEach(() => {
  window.confirm.mockRestore()
})

describe("DeleteUser", () => {
  test("displays user list and delete button", async () => {
    const users = [
      { email: "user1@example.com", role: "ROLE1" },
      { email: "user2@example.com", role: "ROLE2" },
    ]
    fetch.mockResponseOnce(JSON.stringify(users))

    renderDeleteUser()

    await waitFor(() => {
      expect(screen.getAllByRole("row").length).toBe(users.length + 1)
    })

    users.forEach(user => {
      expect(screen.getByText(user.email)).toBeInTheDocument()
      expect(screen.getByText(user.role)).toBeInTheDocument()
    })

    const deleteButtons = screen.getAllByText("Delete")
    expect(deleteButtons.length).toBe(users.length)

    fetch.mockResponseOnce(
      JSON.stringify({ message: "User deleted successfully!" })
    )

    fireEvent.click(deleteButtons[0])

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2)
      expect(fetch).toHaveBeenLastCalledWith(
        "https://evanescent-beautiful-venus.glitch.me/api/owner/deleteUser/",
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deleteUserEmail: users[0].email }),
        }
      )

      expect(screen.queryByText(users[0].email)).not.toBeInTheDocument()
    })
  })
})
