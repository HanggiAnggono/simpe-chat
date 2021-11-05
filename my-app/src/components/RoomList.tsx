import { Box } from "@chakra-ui/layout";
import React from "react";
import RoomItem from "./RoomItem";

export default function RoomList() {
  return (
    <Box>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
        return <RoomItem key={i} />;
      })}
    </Box>
  );
}
