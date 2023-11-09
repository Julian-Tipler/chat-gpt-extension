import {
  HashRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Login } from "./views/auth/Login";
import { PromptsPage } from "./views/prompts/PromptsPage";
import { ReactNode, useEffect, useState } from "react";
import { SettingsPage } from "./views/settings/SettingsPage";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PromptsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        {/* Other routes can be added here */}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </HashRouter>
  );
};

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated().then((isAuthenticated) => {
      setIsAuth(isAuthenticated);
      if (!isAuthenticated) {
        navigate("/login");
      }
    });
  }, []);

  if (isAuth === null) {
    // Render nothing or a loading indicator until the auth check completes
    return <div>Loading...</div>;
  }

  return isAuth ? children : <div>Not authenticated</div>;
};

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
