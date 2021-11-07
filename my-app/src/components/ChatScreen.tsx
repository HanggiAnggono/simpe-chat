import { Box, Text } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { addRoom, setRooms } from "../store/roomSlice";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const URL = "ws://localhost:5000";
export let ws = new WebSocket(URL);

type Message = {
  message?: string;
  name?: string;
  username?: string;
};

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const dispatch = useAppDispatch();
  const [currentUser, rooms] = useAppSelector((state) => {
    return [state.currentUser.data, state.rooms.data];
  });

  const username = currentUser?.login?.username;
  const name = `${currentUser?.name?.first} ${currentUser?.name?.last}`;

  function appendMessages(message: Message) {
    setMessages((prev) => [...prev, message]);
  }

  function submitMessage(messageString: string) {
    // on submitting the ChatInput form, send the message, add it to the list and reset the input
    const message = { username, name, message: messageString };
    ws.send(JSON.stringify(message));
    appendMessages(message);
  }

  useEffect(() => {
    ws.onopen = () => {};

    ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);

      if (message.type === "connected") {
        console.log(rooms);
        dispatch(
          addRoom({
            name: `${message.payload.name.first} ${message.payload.name.last}`,
            id: message.payload.id.value,
          })
        );
      } else {
        appendMessages(message);
      }
    };

    ws.onclose = () => {
      ws = new WebSocket(URL);
    };
  }, []);

  useEffect(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type: "connected", payload: currentUser }));
    }
  }, [currentUser]);

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
                name={message.name}
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
