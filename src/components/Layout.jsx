import React from "react";
import Sidebar from "./Sidebar";

function PageWithSidebar({ mainComponent: MainComponent }) {
    return (
        <div style={{ display: "flex" }}>
            <Sidebar />
            <main style={{ flex: 1 }}>
                <MainComponent />
            </main>
        </div>
    );
}

export default PageWithSidebar;
