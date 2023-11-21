import { Button, Link, Text } from "@chakra-ui/react";
import React from "react";

export const Login = () => {
  const webAuthUrl =
    import.meta.env.VITE_WEB_AUTH_URL || "http://localhost:5173";
  return (
    <>
      <Text>Login here: No credit card required!</Text>
      <Link href={webAuthUrl} isExternal>
        <Button colorScheme="teal" size="md">
          Login Here
        </Button>
      </Link>
    </>
  );
};
