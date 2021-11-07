import { Box, IconButton, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaEllipsisH } from "react-icons/fa";
import { useAppSelector } from "../hooks/redux";

export default function CurrentUser() {
  const user = useAppSelector((s) => s.currentUser.data);

  return (
    <Box
      p="3"
      position="sticky"
      top={0}
      left={0}
      right={0}
      bg="gray.100"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Image src={user?.picture?.medium} borderRadius="full" />

      <Text fontSize="x-large">
        {user?.name?.first} {user?.name?.last}
      </Text>
      <IconButton aria-label="menu" as={FaEllipsisH} color="gray.500" p="1" fontSize="sm" />
    </Box>
  );
}
