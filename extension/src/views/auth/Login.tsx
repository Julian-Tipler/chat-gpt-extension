import { Button, Flex, Link, Text } from "@chakra-ui/react";

export const Login = () => {
  const webAuthUrl =
    import.meta.env.VITE_WEB_AUTH_URL || "http://localhost:5173";
  return (
    <Flex
      height={"100vh"}
      flexDir={"column"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Text>Login here: No credit card required!</Text>
      <Link isExternal href={webAuthUrl}>
        <Button colorScheme="teal" size="md">
          Login Here
        </Button>
        {/* <Button onClick={chromeLogin} colorScheme="teal" size="md">
          Experimental google auth
        </Button> */}
      </Link>
    </Flex>
  );
};

// const chromeLogin = () => {
//   const manifest = chrome.runtime.getManifest();
//   console.log("identity", chrome.identity.getRedirectURL());
//   console.log(chrome.runtime.id);
//   const url = new URL("https://accounts.google.com/o/oauth2/auth");

//   const client_id = manifest?.oauth2?.client_id || "";
//   const scopes = manifest?.oauth2?.scopes || [];
//   url.searchParams.set("client_id", client_id);
//   url.searchParams.set("response_type", "id_token");
//   url.searchParams.set(
//     "redirect_uri",
//     `https://${chrome.runtime.id}.chromiumapp.org`
//   );
//   url.searchParams.set("access_type", "offline");
//   url.searchParams.set("scope", scopes.join(" "));
//   console.log("url", url.href);
//   chrome.identity.launchWebAuthFlow(
//     {
//       url: url.href,
//       interactive: true,
//     },
//     async (redirectedTo) => {
//       console.log("redirectedTo", redirectedTo);
//       if (chrome.runtime.lastError) {
//         console.log("error", chrome.runtime.lastError.message);
//       } else {
//         // auth was successful, extract the ID token from the redirectedTo URL
//         if (!redirectedTo) throw new Error("redirectedTo is undefined");
//         const url = new URL(redirectedTo);
//         const params = new URLSearchParams(url.hash);
//         const token = params.get("id_token");
//         if (token) {
//           const { data, error } = await supabase.auth.signInWithIdToken({
//             provider: "google",
//             token: token,
//           });
//           console.log("***");
//           console.log(data, error);
//           console.log("***");
//         } else {
//           throw new Error("id_token not found");
//         }
//       }
//     }
//   );
// };
