import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import Ball from "./ball";
import Player from "./player";

export interface Game {
    playerOne: Player;
    playerTwo: Player;
    ball: Ball;
    roomID: String;
    playerNo: Number;
    isGameStarted: Boolean;
}

const socket = io("http://localhost:3000", {
    transports: ["websocket"],
});

function App() {
    const ref = useRef(null);
    const [state, setState] = useState("");
    const [number, setNumber] = useState();
    const [game] = useState<Game>({
        playerOne: new Player(0, 200, 20, 100, "transparent", 1),
        playerTwo: new Player(780, 200, 20, 100, "transparent", 2),
        ball: new Ball(400, 245, 10, "transparent"),
        isGameStarted: false,
        playerNo: 0,
        roomID: "",
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
        const canvas: any = ref.current;
        const context = canvas.getContext("2d");

        socket.on("connect", () => {
            if (!socket.connected) setState("Error connecting the the server");
        });

        socket.on("playerNo", (newPlayerNo) => {
            setNumber(newPlayerNo);
            game.playerNo = newPlayerNo;
        });

        socket.on("startingGame", () => {
            setState("The game is about to start...");
        });

        socket.on("startedGame", (room) => {
            setState("1");
            game.roomID = room.id;

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
                            roomID: game.roomID,
                            playerNo: game.playerNo,
                            direction: "up",
                        });
                    } else if (e.key === "ArrowDown") {
                        socket.emit("move", {
                            roomID: game.roomID,
                            playerNo: game.playerNo,
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
            if (game.playerNo === room.winner) {
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
        setState("Waiting for other players to join...");
    };

    return (
        <>
            {!state && (
                <button id="joinButton" onClick={handleJoin}>
                    Join game
                </button>
            )}
            <p id="messageArea">{state}</p>
            <div id="body">
                <div>
                    <div style={{color: '#fff'}}>{number}</div>
                    <div>Good</div>
                </div>
                <canvas id="gameFrame" width={800} height={500} ref={ref} />
            </div>
        </>
    );
}

export default App;
