import {
  VStack,
  Grid,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  Flex,
} from "@chakra-ui/react";
import { Card } from "../../components/Card";
import {
  Form,
  Link,
  useActionData,
  useLocation,
  useNavigation,
} from "react-router-dom";

export const LoginPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const from = params.get("from") || "/";

  const navigation = useNavigation();
  const isLoggingIn = navigation.formData?.get("email") != null;
  const actionData = useActionData() as { error: string } | undefined;

  return (
    <Grid p={3}>
      <VStack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Card rounded={"lg"} boxShadow={"lg"} p={8} minWidth={"22rem"}>
          <Text fontSize={"lg"} fontWeight={600}>
            Sign in to your account
          </Text>
          <Form method="post" replace>
            <input type="hidden" name="redirectTo" value={from} />
            <FormControl id="email" isRequired mt={4}>
              <FormLabel color="text.primary">Email address</FormLabel>
              <Input color="text.primary" type="email" name="email" />
            </FormControl>
            <FormControl id="password" isRequired mt={4}>
              <FormLabel color="text.primary">Password</FormLabel>
              <Input color="text.primary" type="password" name="password" />
            </FormControl>
            <Flex justifyContent={"space-between"}>
              <Button
                disabled={isLoggingIn}
                type="submit"
                colorScheme="blue"
                size="md"
                fontSize="md"
                mt={8}
              >
                {isLoggingIn ? "Logging in..." : "Login"}
              </Button>
              <Link to={`/signup?from=${encodeURIComponent(from)}`}>
                <Button
                  colorScheme="transparent"
                  size="md"
                  fontSize="md"
                  mt={8}
                  _hover={{ color: "brand.primary" }}
                >
                  Create Account
                </Button>
              </Link>
            </Flex>
            {actionData && actionData.error ? (
              <p style={{ color: "red" }}>{actionData.error}</p>
            ) : null}
          </Form>
        </Card>
      </VStack>
    </Grid>
  );
};
