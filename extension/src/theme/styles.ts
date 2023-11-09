import { colors } from "./colors";

export const styles = {
  global: {
    html: {
      fontSize: "16px",
    },
    // styles for the `body`
    body: {
      bg: colors.brand.background,
      color: "#fff",
    },
    // styles for the `a`
    a: {
      _hover: {
        textDecoration: "underline",
      },
    },
  },
};
