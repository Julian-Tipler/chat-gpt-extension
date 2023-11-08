import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import PromptsContextProvider from "./contexts/PromptsContext.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { colors, styles } from "./theme";

const theme = extendTheme({ colors, styles });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <PromptsContextProvider>
        <App />
      </PromptsContextProvider>
    </ChakraProvider>
  </React.StrictMode>
);
