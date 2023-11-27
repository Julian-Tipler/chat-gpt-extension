import { Button, Link, Text } from "@chakra-ui/react";
import React from "react";

export const Login = () => {
  const webAuthUrl =
    import.meta.env.VITE_WEB_AUTH_URL || "http://localhost:5173";
  return (
    <>
      <Text>Login here: No credit card required!</Text>
      <Link href={webAuthUrl} isExternal>
        <Button colorScheme="teal" size="md" onClick={chromeLogin}>
          Login Here
        </Button>
      </Link>
    </>
  );
};

const chromeLogin = () => {
  const manifest = chrome.runtime.getManifest();
  const url = new URL("https://accounts.google.com/o/oauth2/auth");

  url.searchParams.set("client_id", manifest.oauth2.client_id);
  url.searchParams.set("response_type", "id_token");
  url.searchParams.set("access_type", "offline");
  url.searchParams.set(
    "redirect_uri",
    `https://${chrome.runtime.id}.chromiumapp.org`
  );
  url.searchParams.set("scope", manifest.oauth2.scopes.join(" "));

  chrome.identity.launchWebAuthFlow(
    {
      url: url.href,
      interactive: true,
    },
    async (redirectedTo) => {
      if (chrome.runtime.lastError) {
        // auth was not successful
      } else {
        // auth was successful, extract the ID token from the redirectedTo URL
        const url = new URL(redirectedTo);
        const params = new URLSearchParams(url.hash);

        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: params.get("id_token"),
        });
      }
    }
  );
};
