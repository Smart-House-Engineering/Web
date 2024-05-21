import React from "react"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import App from "../App"
import { AuthProvider } from "../utils/authContext"

// Helper function to wrap App in necessary contexts
const renderWithProviders = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route)
  return render(ui, {
    wrapper: ({ children }) => (
      <AuthProvider>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </AuthProvider>
    ),
  })
}

describe("App component routing", () => {
  it("should render the login page as default", () => {
    renderWithProviders(<App />)
    expect(screen.getByText(/login/i)).toBeInTheDocument()
  })

  it("should navigate to the default page", () => {
    renderWithProviders(<App />, { route: "/default" })
    expect(screen.getByText(/default page content/i)).toBeInTheDocument() // Modify as per actual content
  })

  it("should navigate to the unauthorized page", () => {
    renderWithProviders(<App />, { route: "/unauthorized" })
    expect(screen.getByText(/unauthorized/i)).toBeInTheDocument()
  })

  it("should show not found page for unknown route", () => {
    renderWithProviders(<App />, { route: "/some-unknown-route" })
    expect(screen.getByText(/not found/i)).toBeInTheDocument()
  })
})
