import { QueryClientProvider } from "react-query";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "./queryClient";
import { NotificationsProvider } from "@mantine/notifications";
import { appRouter } from "./routes/appRouter";
import "./App.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <NotificationsProvider position="top-right">
          <RouterProvider router={appRouter} />
        </NotificationsProvider>
      </div>
    </QueryClientProvider>
  );
}

export default App;
