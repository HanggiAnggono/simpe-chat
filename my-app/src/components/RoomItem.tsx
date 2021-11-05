import { Box, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/redux";
import { selectRoom } from "../store/chatSlice";

export default function RoomItem() {
  const [user, setUser] = useState<any>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getRandomUser().then((data) => setUser(data.data?.results?.[0]));
  }, []);

  function handleClick() {
    dispatch(
      selectRoom({
        roomId: user?.login?.uuid,
        roomName: `${user?.name?.first} ${user?.name?.last}`,
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
      <Image src={user?.picture?.thumbnail} borderRadius="full" height="70px" width="70px" />
      <Box paddingLeft="4">
        <Text fontWeight="semibold" color="blue.500">
          {user?.name?.first} {user?.name?.last}
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

function getRandomUser() {
  return axios.get("https://randomuser.me/api/");
}
