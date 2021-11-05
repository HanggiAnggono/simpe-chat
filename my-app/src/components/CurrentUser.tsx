import { Box, Text, IconButton, Image } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaEllipsisH } from "react-icons/fa";

export default function CurrentUser() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getRandomUser().then((data) => setUser(data.data?.results?.[0]));
  }, []);

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

function getRandomUser() {
  return axios.get("https://randomuser.me/api/");
}
