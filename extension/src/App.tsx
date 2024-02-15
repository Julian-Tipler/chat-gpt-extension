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
import supabase from "./supabase/supabaseClient";
import { Session } from "@supabase/supabase-js";
import "./App.css";

const App = () => {
  const router = createHashRouter([
    {
      id: "root",
      path: "/",
      element: (
        <div className="app">
          <Outlet />
        </div>
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
  const auth = await supabase.auth.getUser(wiseSessionToken.access_token);
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
  const auth = await supabase.auth.getUser(wiseSessionToken?.access_token);
  if (!auth.data?.user) {
    return redirect("/login");
  }
  return { auth };
}

export default App;