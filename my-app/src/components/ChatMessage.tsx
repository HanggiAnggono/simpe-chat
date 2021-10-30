import { Box, BoxProps } from "@chakra-ui/layout";
import { useStyleConfig } from "@chakra-ui/system";
import React, { ReactNode } from "react";

interface ChatMessageProps {
  name?: ReactNode;
  message?: ReactNode;
  variant?: "base" | "flat";
  style?: BoxProps;
}

export default function ChatMessage(props: ChatMessageProps) {
  const styles = useStyleConfig("Card", { variant: props.variant });
  return (
    <Box __css={styles} {...props.style}>
      <Box fontWeight="semibold">{props.name}</Box>
      <Box whiteSpace="break-spaces">{props.message}</Box>
    </Box>
  );
}
