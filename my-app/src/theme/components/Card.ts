import { ComponentSingleStyleConfig } from "@chakra-ui/react";

const Card: ComponentSingleStyleConfig = {
  baseStyle: (props) => {
    return {
      background: props.colorMode === "light" ? "white" : "black",
      boxShadow: "md",
      padding: 4,
      borderRadius: "xl",
      width: "max-content",
      marginBottom: 3,
    };
  },
  variants: {
    flat: {
      borderRadius: "unset",
    },
  },
};

export default Card;
