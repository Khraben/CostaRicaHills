import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext";
import i18n from "./config/i18n.js";
import { I18nextProvider } from "react-i18next";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </UserProvider>
  </React.StrictMode>
);
