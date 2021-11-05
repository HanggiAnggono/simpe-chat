import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import * as React from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import ChatScreen from "./components/ChatScreen";
import MainLayout from "./layout/MainLayout";
import appTheme from "./theme/appTheme";
import { Provider } from "react-redux";
import { store } from "./store/store";

export const App = () => (
  <ChakraProvider theme={appTheme}>
    <Provider store={store}>
      <MainLayout />
    </Provider>
  </ChakraProvider>
);
