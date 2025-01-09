import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { client } from "./config/quary-client";
import { ConfigProvider, App as AntApp } from "antd";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <BrowserRouter>
      <ConfigProvider theme={{ token: { colorPrimary: "#2C3033" } }}>
        <AntApp>
          <App />
        </AntApp>
      </ConfigProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
