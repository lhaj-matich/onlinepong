import { HTMLProps, useEffect, useRef } from "react";

interface CanvasProps extends HTMLProps<HTMLCanvasElement> {
  draw: (context: any) => void;
}

const Canvas = ({draw, ...rest }: CanvasProps) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas: any = ref.current;
    const context = canvas.getContext("2d");
    draw(context);
  });


  return <canvas ref={ref} {...rest} />;
};

export default Canvas;
