import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useAppDispatch } from "../hooks/redux";
import { selectRoom } from "../store/chatSlice";
import { Room } from "../store/roomSlice";
import getRandomPhotoUrl from "../utils/getRandomPhoto";

interface RoomItemProps {
  room?: Room | null;
}

export default function RoomItem({ room = null }: RoomItemProps) {
  const dispatch = useAppDispatch();
  console.log({ room });

  function handleClick() {
    dispatch(
      selectRoom({
        roomId: room?.id,
        roomName: room?.name,
      })
    );
  }

  return (
    <Box
      padding="8"
      display="flex"
      _hover={{ background: "gray.400" }}
      alignItems="center"
      role="button"
      onClick={handleClick}
    >
      <Image src={getRandomPhotoUrl(room?.name)} borderRadius="full" height="70px" width="70px" />
      <Box paddingLeft="4">
        <Text fontWeight="semibold" color="blue.500">
          {room?.name}
        </Text>
        <Box>
          <Text overflow="hidden" textOverflow="ellipsis">
            Lorem ipsum dolor sit amet consectetur
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
