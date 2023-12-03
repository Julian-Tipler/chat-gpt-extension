import {
  createBrowserRouter,
  LoaderFunctionArgs,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { SuccessPage } from "./views/SuccessPage";
import { LoginPage } from "./views/auth/LoginPage";
import { SignupPage } from "./views/auth/SignupPage";
import supabase from "./supabase/supabaseClient";
import { Error } from "./components/Error";

const App = () => {
  const router = createBrowserRouter([
    {
      id: "root",
      path: "/",
      children: [
        {
          path: "login",
          loader: async () => {
            const session = await supabase.auth.getSession();
            const loggedIn = session?.data?.session;
            if (loggedIn) {
              return redirect("/");
            }
            return null;
          },
          action: loginAction,
          element: <LoginPage />,
          // action possibly to be used for redirecting to home if logged in
        },
        {
          path: "signup",
          loader: async () => {
            const session = await supabase.auth.getSession();
            const loggedIn = session?.data?.session;
            if (loggedIn) {
              return redirect("/");
            }
            return null;
          },
          action: signupAction,
          element: <SignupPage />,
          // action possibly to be used for redirecting to home if logged in
        },
        {
          path: "please-verify",
          element: <Error message="Please verify your email" />,
        },
        {
          index: true,
          loader: protectedLoader,
          element: <SuccessPage />,
        },
        {
          path: "*",
          element: <Error message="404" />,
        },
      ],
    },
    {
      path: "/logout",
      async action() {
        await supabase.auth.signOut();
        return redirect("/login");
      },
    },
  ]);
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
};

export default App;

async function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  const auth = await supabase.auth.getSession();
  console.log("auth", auth);
  // something like this: const session = supabase.auth.session();
  if (!auth?.data?.session) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return { auth };
}

async function loginAction({ request }: LoaderFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;
  const redirectTo = formData.get("redirectTo") as string | null;

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
    const session = await supabase.auth.getSession();
    const extensionId = import.meta.env.VITE_EXTENSION_ID;

    let success = false;
    if (session?.data?.session && chrome.runtime) {
      chrome.runtime.sendMessage(
        extensionId,
        {
          action: "saveWiseSessionToken",
          token: session.data.session,
        },
        (response) => {
          if (response?.success) {
            success = true;
            return redirect(redirectTo || "/");
          } else {
            console.error("Error saving token", response.error);
            return redirect("/login");
          }
        }
      );
    }
    //actions have to return something so 🤷
    return {
      success,
    };
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // email/password combinations - just like validating the inputs
    // above
    return {
      error: "Invalid login attempt",
    };
  }
}

async function signupAction({ request }: LoaderFunctionArgs) {
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
