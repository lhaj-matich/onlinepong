import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router.tsx";
import GameProvider from "./Providers/GameProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ChakraProvider>
        <GameProvider>
            <RouterProvider router={router} />
        </GameProvider>
    </ChakraProvider>
);
