import { Flex } from "@chakra-ui/layout";
import React from "react";

export const Error = ({ message }: { message: string }) => {
  console.log(window.location.href);

  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      {message}
    </Flex>
  );
};
