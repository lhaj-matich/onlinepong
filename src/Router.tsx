import { createBrowserRouter } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Game from "./Game";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path:"/login",
        element: <Login />
    },
    {
        path: "/game",
        element: <Game />
    }
]);

export default router;