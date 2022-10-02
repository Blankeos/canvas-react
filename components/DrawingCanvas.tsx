import React, { MutableRefObject, useEffect, useRef, useState } from "react";

const DrawingCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef() as MutableRefObject<CanvasRenderingContext2D>;

  const [isDrawing, setIsDrawing] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 500;
    canvas.height = 500;

    const context = canvas.getContext("2d");
    if (context) {
      context.lineCap = "round";
      context.lineWidth = 5;
      context.strokeStyle = "white";
      contextRef.current = context;
    }
  }, []);

  function startDrawing({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();
  }

  function draw({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    nativeEvent.preventDefault();
  }

  function stopDrawing({ nativeEvent }: React.MouseEvent<HTMLCanvasElement>) {
    contextRef.current.closePath();
    setIsDrawing(false);
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      className="canvas border-2 border-blue-500"
    ></canvas>
  );
};

export default DrawingCanvas;
