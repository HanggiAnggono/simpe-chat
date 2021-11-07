import { Box, BoxProps } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ChatScreen from "../components/ChatScreen";
import CurrentUser from "../components/CurrentUser";
import RoomList from "../components/RoomList";
import { useAppDispatch } from "../hooks/redux";
import { setCurrentUser } from "../store/currentUserSlice";
import { RootState } from "../store/store";
import { getRandomUser } from "../utils/randomUser";

export default function MainLayout() {
  const roomId = useSelector((state: RootState) => state.chat.roomId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getRandomUser().then((data) => {
      const currentUser: any = data.data.results[0];
      console.log({ currentUser });
      dispatch(setCurrentUser(currentUser));
    });
  }, [dispatch]);

  return (
    <Box display="flex" bg="white" minH="100vh" maxH="100vh">
      {/* room list */}
      <Column flex="2" bg="gray.100" position="relative" overflowY="scroll">
        <CurrentUser />
        <RoomList />
      </Column>

      {/* chat */}
      <Column flex="3">
        <ChatScreen />
      </Column>

      {/* profile/detail */}
      <Column flex={roomId ? 2 : 0}></Column>
    </Box>
  );
}

const Column = (props: BoxProps) => (
  <Box
    minHeight="100%"
    __css={{
      "::-webkit-scrollbar": { width: 1.5 },
      "::-webkit-scrollbar-thumb": {
        background: "gray.400",
      },
    }}
    {...props}
  />
);
