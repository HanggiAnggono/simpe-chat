import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import * as React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import ChatScreen from "./components/ChatScreen";
import appTheme from "./theme/appTheme";

export const App = () => (
  <ChakraProvider theme={appTheme}>
    <Container>
      <Box textAlign="center" fontSize="xl" p="3">
        <ColorModeSwitcher justifySelf="flex-end" />
      </Box>
      <ChatScreen />
    </Container>
  </ChakraProvider>
);
