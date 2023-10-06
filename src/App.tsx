import { useRef } from "react";
import Canvas from "./Canvas";
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

function App() {
  const ref = useRef(null);
    const game: Game = {
        playerOne: new Player(0, 200, 20, 100, "#DC585B", 1),
        playerTwo: new Player(780, 200, 20, 100, "#D9D9D9", 2),
        ball: new Ball(395, 245, 10, "#D9D9D9"),
        isGameStarted: false,
        playerNo: 0,
        roomID: "",
    };

    const paint = (context: any) => {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        game.playerOne.draw(context);
        game.playerTwo.draw(context);
        context.strokeStyle = "white";
        context.beginPath();
        context.setLineDash([10, 10]);
        context.moveTo(400, 5);
        context.lineTo(400, 495);
        context.stroke();
    };

    setTimeout(() => {
        game.playerOne.y = game.playerOne.y + 10;
        game.playerTwo.y = game.playerOne.y - 10;
    }, 3000);

    return (
        <>
            <div id="body">
                <Canvas ref={ref} id="gameFrame" width={800} height={500} draw={paint} />
            </div>
        </>
    );
}

export default App;
