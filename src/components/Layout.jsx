import React from "react"
import Sidebar from "./sidebar"
import { useState } from "react"

function PageWithSidebar({ mainComponent: MainComponent }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ flex: 1 }}>
        <MainComponent />
      </main>
    </div>
  )
}

export default PageWithSidebar
