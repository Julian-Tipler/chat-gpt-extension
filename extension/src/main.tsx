import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import PromptsContextProvider from "./contexts/PromptsContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PromptsContextProvider>
      <App />
    </PromptsContextProvider>
  </React.StrictMode>
);
