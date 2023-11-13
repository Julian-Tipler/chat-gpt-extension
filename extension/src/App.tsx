import {
  RouterProvider,
  createHashRouter,
  redirect,
  Outlet,
} from "react-router-dom";
import { Login } from "./views/auth/Login";
import { PromptsPage } from "./views/prompts/PromptsPage";
import { SettingsPage } from "./views/settings/SettingsPage";
import { MainLayout } from "./MainLayout";
import { Flex } from "@chakra-ui/layout";
const App = () => {
  const router = createHashRouter([
    {
      id: "root",
      path: "/",
      element: (
        <Flex
          className="app"
          maxHeight={"100%"}
          border={"solid red 2px"}
          overflow={"hidden"}
          flexDirection={"column"}
        >
          <Outlet />
        </Flex>
      ),
      children: [
        {
          path: "/",
          element: <MainLayout />,
          loader: protectedLoader,
          children: [
            { index: true, element: <PromptsPage /> },
            { path: "settings", element: <SettingsPage /> },
          ],
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "*",
          element: <div>Error</div>,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
};

async function protectedLoader() {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const auth = await isAuthenticated();
  // something like this: const session = supabase.auth.session();
  if (!auth) {
    return redirect("/login");
  }
  return { auth };
}

const isAuthenticated = async (): Promise<boolean> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["wiseSessionToken"], function(result) {
      if (result.wiseSessionToken) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

export default App;
