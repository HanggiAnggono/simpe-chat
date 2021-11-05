import { Box, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";
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
    <Box position="relative" height="100%">
      <ChatTopbar />
      <Box p="3" py="20">
        {messages.map((message, i) => {
          const isMe = message.username === username;

          return (
            <Box
              key={`${i}_${message.username}`}
              display="flex"
              justifyContent={isMe ? "end" : "start"}
            >
              <ChatMessage
                message={message.message}
                name={message.username}
                style={isMe ? { bg: "blue.300", color: "white" } : undefined}
              />
            </Box>
          );
        })}
      </Box>
      <ChatInput onSubmit={submitMessage} />
    </Box>
  );
}

function ChatTopbar() {
  const chatStore = useAppSelector((state) => state.chat);

  return (
    <Box boxShadow="lg" p="10">
      <Text as="h1" fontSize="x-large">
        {chatStore?.roomName}
      </Text>
    </Box>
  );
}
