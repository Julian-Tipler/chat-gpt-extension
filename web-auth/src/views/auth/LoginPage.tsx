import { VStack, Grid, Button } from "@chakra-ui/react";
import supabase from "../../supabase/supabaseClient";

export const LoginPage = () => {
  return (
    <Grid p={3}>
      <VStack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Button onClick={loginWithGoogle}>Login with Google</Button>
      </VStack>
    </Grid>
  );
};

const loginWithGoogle = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
};
