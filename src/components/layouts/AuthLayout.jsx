import { Suspense } from "react";
import { useLoaderData, useOutlet, Await } from "react-router-dom";
import { AuthProvider } from "../../hooks/useAuth";
import { Alert, Loader } from "@mantine/core";

export const AuthLayout = () => {
  const outlet = useOutlet();

  const { userPromise } = useLoaderData();

  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={userPromise}
        errorElement={
          <Alert title="Oh No!" color="red">
            Something went wrong!
          </Alert>
        }
        children={(user) => (
          <AuthProvider userData={user}>{outlet}</AuthProvider>
        )}
      />
    </Suspense>
  );
};
