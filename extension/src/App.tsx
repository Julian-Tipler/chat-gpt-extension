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
import supabase from "./supabase/supabaseClient";
const App = () => {
  const router = createHashRouter([
    {
      id: "root",
      path: "/",
      element: (
        <Flex className="app" height={"100%"} flexDirection={"column"}>
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
            {
              path: "settings",
              element: <SettingsPage />,
              loader: settingsLoader,
            },
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
  const auth = await isAuthenticated();
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

async function settingsLoader() {
  const jwt: any = await chrome.storage.local.get(["wiseSessionToken"]);
  console.log("jwt", jwt);
  const user = await supabase.auth.getUser(jwt?.wiseSessionToken?.access_token);
  console.log("user", user);
}

export default App;
