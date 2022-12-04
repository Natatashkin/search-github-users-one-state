import "./styles/index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
serviceWorkerRegistration.register();
