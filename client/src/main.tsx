import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CampaignPage from "./pages/campaign/index.tsx";
import GroupPage from "./pages/group/index.tsx";

const router = createBrowserRouter([
  {
    path: "campaign",
    element: <CampaignPage />,
  },
  {
    path: "group",
    element: <GroupPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
