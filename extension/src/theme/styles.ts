import { colors } from "./colors";

export const styles = {
  global: {
    html: {
      fontSize: "16px",
      overflowY: "hidden",
      borderRadius: "10px"
    },
    // styles for the `body`
    body: {
      bg: colors.brand.background,
      color: "#fff",
      display: "block",
      margin: 0,
      height: "600px",
      width: "300px",
    },
    // styles for the `a`
    a: {
      _hover: {
        textDecoration: "underline",
      },
    },
  },
};
