import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const URL = "ws://localhost:5000";
let ws = new WebSocket(URL);

type Message = {
  message?: string;
  username?: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>(`user${Math.random().toString().substr(1, 5)}`);

  function appendMessages(message: Message) {
    setMessages((prev) => [...prev, message]);
  }

  function submitMessage(messageString: string) {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { username, message: messageString };
    ws.send(JSON.stringify(message));
    appendMessages(message);
  }

  useEffect(() => {
    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);

      appendMessages(message);
      console.log({ receivedMessage: message });
    };

    ws.onclose = () => {
      ws = new WebSocket(URL);
    };
  }, []);

  return (
    <Box position="relative">
      <Input
        placeholder="Set username..."
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        position="absolute"
        top="2px"
        bg="white"
        borderRadius="none"
        border="unset"
      />
      <Box background="gray.100" p="3" py="20" height="90vh" overflowY="scroll">
        {messages.map((message, i) => {
          console.log({ message });
          return (
            <Box
              key={`${i}_${message.username}`}
              display="flex"
              justifyContent={message.username === username ? "end" : "start"}
            >
              <ChatMessage message={message.message} name={message.username} />
            </Box>
          );
        })}
      </Box>
      <ChatInput onSubmit={submitMessage} />
    </Box>
  );
}
