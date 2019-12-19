import React from "react";
import Navbar from "./components/Navbar/Navbar";

import Products from "./components/Products/Products";
import RequestContextProvider from "./context/request-context";
function App() {
    return (
        <div className="App">
            <RequestContextProvider>
                <Navbar />
                <Products />
            </RequestContextProvider>
        </div>
    );
}

export default App;
