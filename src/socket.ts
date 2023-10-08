import Cookies from "js-cookie";
import { io } from "socket.io-client";

const socket = io("http://127.0.0.1:3000/game", {
    transports: ["websocket"],
    auth: {
        token: "Bearer " + Cookies.get("jwt"),
    },
});

export default socket;