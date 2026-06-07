"use client";

import { createContext, useContext } from "react";

const DashboardContext = createContext(null);

export const useDashboard = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboard must be used inside DashboardProvider"
    );
  }

  return context;
};

export default DashboardContext;