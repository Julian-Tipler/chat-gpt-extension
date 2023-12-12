import { Box, Button, Flex } from "@chakra-ui/react";
import "./NavigationBar.css";
import { Title } from "./components/Title";
const items = [
  {
    text: "Prompts",
    path: "/",
  },
  {
    text: "Settings",
    path: "/settings",
  },
];

export const NavigationBar = () => {
  const { pathname } = useLocation();
  return (
    <Box paddingTop={"1rem"} backgroundColor={"brand.cardBackground"}>
      <Title />
      <Flex
        className="navigation-items-container"
        p={"0.5rem"}
        gap={"2rem"}
        alignItems={"center"}
        justifyContent={"space-around"}
      >
        {items.map((item) => (
          <Item
            key={item.path}
            text={item.text}
            path={item.path}
            selected={pathname === item.path}
          />
        ))}
      </Flex>
    </Box>
  );
};

import { useLocation, useNavigate } from "react-router";

export const Item = ({
  text,
  path,
  selected,
}: {
  text: string;
  path: string;
  selected: boolean;
}) => {
  const navigate = useNavigate();
  return (
    <Flex flexDirection={"column"}>
      <Button
        onClick={() => navigate(path)}
        variant={"link"}
        border="none"
        _focus={{ outline: "none", border: "none" }}
        textDecoration={selected ? "underline" : ""}
        size={"sm"}
        color={"text.primary"}
      >
        {text}
      </Button>
    </Flex>
  );
};
