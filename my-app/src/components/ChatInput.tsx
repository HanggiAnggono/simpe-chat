import { Box, Button, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";

interface ChatInputProps {
  onSubmit?(message: string): void;
}

export default function ChatInput(props: ChatInputProps) {
  const [message, setMessage] = useState("");

  function handleSubmit(e: any) {
    e.preventDefault();

    props?.onSubmit?.(message);
    setMessage("");
  }
  return (
    <Box bg="white" p="3" position="absolute" bottom={0} left={0} right={0}>
      <Box as="form" display="flex" onSubmit={handleSubmit}>
        <Textarea
          mr="2"
          rows={1}
          placeholder="Type your message here..."
          flex="5"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleSubmit(e);
            }
          }}
        />
        <Button type="submit" children="Send" flex="1" />
      </Box>
    </Box>
  );
}

console.log();
