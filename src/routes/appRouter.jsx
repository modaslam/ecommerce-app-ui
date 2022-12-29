import { createBrowserRouter, createRoutesFromElements, Route, defer } from "react-router-dom";
import { ProtectedLayout } from "../components/layouts/ProtectedLayout";
import { PublicLayout } from "../components/layouts/PublicLayout";
import { AuthLayout } from "../components/layouts/AuthLayout";
import { Login } from "../pages/login/Login";
import { HomePage } from "../pages/homepage/HomePage";
import { NotFound } from "../pages/not-found/NotFound";

// ideally this would be an API call to server to get logged in user data
const getUserData = () =>
  new Promise((resolve) =>
    setTimeout(() => {
      const user = window.localStorage.getItem("user");
      resolve(user);
    }, 2000)
  );

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route
      element={<AuthLayout />}
      loader={() => defer({ userPromise: getUserData() })}
    >
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>
  )
);
