import { Box } from "@chakra-ui/layout";
import React from "react";
import { useAppSelector } from "../hooks/redux";
import RoomItem from "./RoomItem";

export default function RoomList() {
  const rooms = useAppSelector((state) => state.rooms.data);

  return (
    <Box>
      {rooms.map((room, i) => {
        return <RoomItem key={room.id} room={room} />;
      })}
    </Box>
  );
}
