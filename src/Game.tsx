import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Ball from "./ball";
import Player from "./player";
import GameHeader from "./GameHeader";
import Cookies from "js-cookie";
import { Box } from "@chakra-ui/react";
import useGame from "./hooks/useGame";
import { useNavigate } from "react-router-dom";

export interface Game {
    playerOne: Player;
    playerTwo: Player;
    ball: Ball;
    gameID: String;
    playerID: Number;
    isGameStarted: Boolean;
}

const socket = io("http://127.0.0.1:3000/game", {
    transports: ["websocket"],
    autoConnect: false,
    auth: {
        token: "Bearer " + Cookies.get("jwt"),
    },
});

const Game = () => {
    const ref = useRef(null);
    const navigate = useNavigate();
    const [state, setState] = useState("");
    const [visible, setVisible] = useState(true);
    const { gameSettings } = useGame();
    console.log(gameSettings);
    const [game] = useState<Game>({
        playerOne: new Player(0, 200, 20, 100, "transparent", 1),
        playerTwo: new Player(780, 200, 20, 100, "transparent", 2),
        ball: new Ball(400, 245, 10, "transparent"),
        isGameStarted: false,
        playerID: 0,
        gameID: "",
    });

    const paint = (context: any) => {
        if (game.isGameStarted) {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);

            game.playerOne.draw(context);
            game.playerTwo.draw(context);
            game.ball.draw(context);

            context.strokeStyle = "white";
            context.beginPath();
            context.setLineDash([10, 10]);
            context.moveTo(400, 5);
            context.lineTo(400, 495);
            context.stroke();
        }
    };

    const clearCanvas = (context: any) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        console.log("clearing screen");
    };
    
    useEffect(() => {
        if (!gameSettings.playerID || !gameSettings.gameID) navigate("/");
        const canvas: any = ref.current;
        const context = canvas.getContext("2d");

        socket.on("connect", () => {
            if (!socket.connected) setState("Error connecting the the server");
        });

        socket.on("playerNo", (newPlayerNo) => {
            game.playerID = newPlayerNo;
        });

        socket.on("startingGame", () => {
            setState("The game is about to start...");
        });

        socket.on("hello", () => {
            console.log("User leftgame");
            setVisible(false);
            setState("Other player has left the game");
            setTimeout(() => {
                navigate("/");
            }, 3000);
        });

        socket.on("startedGame", (room) => {
            setState("");
            game.gameID = room.id;

            game.playerOne = new Player(0, 200, 20, 100, "#DC585B", 1);
            game.playerTwo = new Player(780, 200, 20, 100, "#D9D9D9", 2);
            game.ball = new Ball(400, 245, 10, "#D9D9D9");

            game.playerOne.score = room.players[0].score;
            game.playerTwo.score = room.players[1].score;

            game.isGameStarted = true;

            window.addEventListener("keydown", (e) => {
                if (game.isGameStarted) {
                    if (e.key === "ArrowUp") {
                        socket.emit("move", {
                            roomID: game.gameID,
                            playerNo: game.playerID,
                            direction: "up",
                        });
                    } else if (e.key === "ArrowDown") {
                        socket.emit("move", {
                            roomID: game.gameID,
                            playerNo: game.playerID,
                            direction: "down",
                        });
                    }
                }
            });
            paint(context);
        });

        socket.on("endGame", (room) => {
            clearCanvas(context);
            game.isGameStarted = false;
            if (game.playerID === room.winner) {
                return setState("Congrats. You won this game");
            }
            setState("You lost this game");
        });

        socket.on("updateGame", (room) => {
            game.playerOne.y = room.players[0].y;
            game.playerTwo.y = room.players[1].y;

            game.playerOne.score = room.players[0].score;
            game.playerTwo.score = room.players[1].score;

            game.ball.x = room.ball.x;
            game.ball.y = room.ball.y;
            paint(context);
        });
    });

    const handleJoin = () => {
        if (!socket.connected) {
            return setState("Error connecting to the game server please refresh...");
        }
        socket.emit("join");
        setState("Waiting for other player to join...");
        setVisible(false);
    };

    return (
        <>
            {visible && (
                <button id="joinButton" onClick={handleJoin}>
                    Join game
                </button>
            )}
            <p id="messageArea">{state}</p>
            <div id="body">
                <Box backgroundColor="#1D222C" padding="2rem" borderRadius={12}>
                    <GameHeader user={gameSettings.me} opponent={gameSettings.opponent} />
                    <canvas id="gameFrame" width={800} height={500} ref={ref} />
                </Box>
            </div>
        </>
    );
};

export default Game;
