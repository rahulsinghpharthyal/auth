import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
// //when we dont use the redux store only use the rtk query so use this
// import { ApiProvider } from "@reduxjs/toolkit/query/react"; 
// import { api } from "./app/api/apiSlice.js";


// if we use redux-persist to persist the data this is genrally use the local-storage;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
