import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

import "@fontsource-variable/montserrat";
import "@fontsource-variable/dosis";
import "@fontsource-variable/roboto-condensed";
import "@fontsource/mouse-memoirs";

import { UserProvider } from "./context/UserProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </HelmetProvider>
);
