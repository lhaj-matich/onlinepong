import { HTMLProps, useEffect, useRef } from "react";
import { Game } from "./App";

interface CanvasProps extends HTMLProps<HTMLCanvasElement> {
  game: Game
}

const Canvas = ({game, ...rest }: CanvasProps) => {
  const ref = useRef(null);

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

  useEffect(() => {
    const canvas: any = ref.current;
    const context = canvas.getContext("2d");
    paint(context);
    console.log('Redrawing');
  }, [game]);


};

export default Canvas;
