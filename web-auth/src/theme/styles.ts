import { colors } from "./colors";

export const styles = {
  global: {
    // styles for the `body`
    body: {
      bg: colors.brand.background,
      color: "#fff",
      minWidth: "100vw",
    },
    // styles for the `a`
    a: {
      _hover: {
        textDecoration: "underline",
      },
    },
  },
};
