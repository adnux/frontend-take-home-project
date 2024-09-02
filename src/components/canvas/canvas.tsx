'use client'

import { whiteColor } from '@/utils/colors';
import React, { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import styles from './canvas.module.css';

interface CanvasProps {
  context: CanvasRenderingContext2D | null;
  setContext: (context: CanvasRenderingContext2D | null) => void;
  drawingHistory: ImageData[];
  setDrawingHistory: React.Dispatch<React.SetStateAction<ImageData[]>>;
  tool: string;
  color: string;
  text: string;
  fontSize: number;
}

const Canvas: React.FC<CanvasProps> = (props) => {
  const {
    context,
    setContext,
    drawingHistory,
    setDrawingHistory,
    tool,
    color,
    text,
    fontSize,
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const initializeCanvas = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
          context.lineCap = 'round';
          context.lineWidth = tool === 'eraser' ? 10 : 5;
          context.fillStyle = 'white';
          setContext(context);
          setDrawingHistory([
            context.getImageData(0, 0, canvas.width, canvas.height)
          ]);
        }
      }
    };

    initializeCanvas();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const undo = useCallback(() => {
    if (drawingHistory.length > 1 && !!context) {
      const canvas = canvasRef.current;
      if (canvas) {
        const newHistory = drawingHistory.slice(0, -1);
        context.putImageData(newHistory[newHistory.length - 1], 0, 0);
        setDrawingHistory(newHistory);
      }
    }
  }, [context, drawingHistory, setDrawingHistory]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'z') {
        undo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [undo]);

  const saveDrawingState = useCallback(() => {
    if (context && canvasRef.current) {
      setDrawingHistory(prev => [
        ...prev,
        context.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height)
      ]);
    }
  }, [context, setDrawingHistory]);

  const startDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    if (tool === 'text') {
      drawText(event);
    } else {
      beginDrawing(event);
    }
  };

  const drawText = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    context.font = `${fontSize}px Arial`;
    context.fillStyle = color;
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(text, event.nativeEvent.offsetX, event.nativeEvent.offsetY);
  };

  const beginDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    setIsDrawing(true);
    context.beginPath();
    context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
  };

  const draw = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    if (tool === 'pencil') {
      drawPencil(event);
    } else if (tool === 'eraser') {
      erase(event);
    }
  };

  const drawPencil = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    context.strokeStyle = color;
    context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    context.stroke();
  };

  const erase = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    const eraserSize = 20;
    context.clearRect(
      event.nativeEvent.offsetX - eraserSize / 2,
      event.nativeEvent.offsetY - eraserSize / 2,
      eraserSize,
      eraserSize
    );
  };

  const stopDrawing = () => {
    if (context) {
      context.closePath();
      saveDrawingState();
    }
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      data-testid="canvas"
      width={1000}
      height={600}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      className={styles.canvas}
    />
  );
};

export default Canvas;