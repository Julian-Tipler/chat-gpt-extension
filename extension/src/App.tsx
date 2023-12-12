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
import { Session } from "@supabase/supabase-js";
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
  const wiseSessionToken = await isAuthenticated();
  if (!wiseSessionToken) {
    return redirect("/login");
  }
  const auth = await supabase.auth.getUser("123");
  if (!auth.data?.user) {
    return redirect("/login");
  }
  return { wiseSessionToken };
}
const isAuthenticated = async (): Promise<Session | false> => {
  return new Promise((resolve) => {
    chrome.storage.local.get(["wiseSessionToken"], function(result) {
      if (result.wiseSessionToken) {
        resolve(result.wiseSessionToken);
      } else {
        resolve(false);
      }
    });
  });
};

async function settingsLoader() {
  const { wiseSessionToken } = await chrome.storage.local.get([
    "wiseSessionToken",
  ]);
  const user = await supabase.auth.getUser(wiseSessionToken?.access_token);
  console.log("user", user);
}

export default App;
