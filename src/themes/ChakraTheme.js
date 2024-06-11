// theme.js
import { extendTheme } from "@chakra-ui/react";
import { COLORS } from "../constants";

const ChakraTheme = extendTheme({
  styles: {
    global: {
      "html, body": {
        backgroundColor: COLORS.BACKGROUND,
        color: COLORS.TEXT, // This ensures the text is visible on the black background
      },
    },
  },
});

export default ChakraTheme;
