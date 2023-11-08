import {
  createBrowserRouter,
  HashRouter,
  LoaderFunctionArgs,
  Navigate,
  redirect,
  Route,
  RouterProvider,
  Routes,
  useNavigate,
} from "react-router-dom";
import { Login } from "./views/auth/Login";
import supabase from "./supabase/supabaseClient";
import { Error } from "./components/Error";
import { Main } from "./views/Main";
import { ReactNode, useEffect, useState } from "react";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Main />
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
      if (result.sessionToken) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

// const router = createBrowserRouter([
//   {
//     id: "root",
//     path: "/",
//     children: [
//       {
//         path: "login",
//         loader: async () => {
//           const session = await supabase.auth.getSession();
//           const loggedIn = session?.data?.session;
//           if (loggedIn) {
//             return redirect("/");
//           }
//           return null;
//         },
//         action: loginAction,
//         element: <Login />,
//         // action possibly to be used for redirecting to home if logged in
//       },
//       {
//         path: "signup",
//         loader: async () => {
//           const session = await supabase.auth.getSession();
//           const loggedIn = session?.data?.session;
//           if (loggedIn) {
//             return redirect("/");
//           }
//           return null;
//         },
//         action: signupAction,
//         element: <Signup />,
//         // action possibly to be used for redirecting to home if logged in
//       },
//       {
//         path: "please-verify",
//         element: <Error message="Please verify your email" />,
//       },
//       {
//         path: "splash",
//         element: <div>splash</div>,
//       },
//       {
//         path: "/",
//         loader: protectedLoader,
//         element: <Main />,
//       },
//       {
//         path: "*",
//         element: <Error message="404" />,
//       },
//     ],
//   },
//   {
//     path: "/logout",
//     async action() {
//       await supabase.auth.signOut();
//       return redirect("/login");
//     },
//   },
// ]);
// return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;

export default App;

async function protectedLoader({ request }: LoaderFunctionArgs) {
  console.log("protectedLoader");
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const auth = await supabase.auth.getSession();
  // something like this: const session = supabase.auth.session();
  if (!auth.data.session) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return { auth };
}

async function loginAction({ request }: LoaderFunctionArgs) {
  console.log("loginAction");
  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!email) {
    return {
      error: "You must provide a email to log in",
    };
  }
  if (!password) {
    return {
      error: "You must provide a password to log in",
    };
  }

  try {
    await supabase.auth.signInWithPassword({ email, password });
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // email/password combinations - just like validating the inputs
    // above
    return {
      error: "Invalid login attempt",
    };
  }

  const redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/");
}

async function signupAction({ request }: LoaderFunctionArgs) {
  console.log("signupAction");
  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  // Validate form inputs and handle errors similarly to the loginAction
  if (!email || !password) {
    return {
      error: "You must provide both email and password to create an account",
    };
  }

  try {
    await supabase.auth.signUp({ email, password });
  } catch (error) {
    return {
      error: "Error creating account",
    };
  }
  // Decide where to redirect after successful signup
  return redirect("/please-verify"); // You might want to redirect to '/login' or elsewhere
}

