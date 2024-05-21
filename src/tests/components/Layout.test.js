import React from "react"
import { render, screen } from "@testing-library/react"
import PageWithSidebar from "../../components/Layout"
import Sidebar from "../../components/sidebar"
import "@testing-library/jest-dom"

jest.mock("../../components/Sidebar", () => () => (
  <div data-testid='sidebar'>Sidebar</div>
))

const MockMainComponent = () => (
  <div data-testid='main-component'>Main Component</div>
)

describe("PageWithSidebar", () => {
  test("renders Sidebar and MainComponent", () => {
    render(<PageWithSidebar mainComponent={MockMainComponent} />)

    const sidebar = screen.getByTestId("sidebar")
    expect(sidebar).toBeInTheDocument()

    const mainComponent = screen.getByTestId("main-component")
    expect(mainComponent).toBeInTheDocument()
  })

  test("Sidebar and MainComponent are in correct layout", () => {
    const { container } = render(
      <PageWithSidebar mainComponent={MockMainComponent} />
    )

    const flexContainer = container.firstChild
    expect(flexContainer).toHaveStyle("display: flex")

    const mainSection = screen.getByTestId("main-component").parentNode
    expect(mainSection).toHaveStyle("flex: 1")
  })
})
