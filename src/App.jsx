import { useState } from "react";
import { QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "./queryClient";
import { appRouter } from "./routes/appRouter";
import { Button } from "@mantine/core";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <RouterProvider router={appRouter} />
      </div>
    </QueryClientProvider>
  );
}

export default App;
