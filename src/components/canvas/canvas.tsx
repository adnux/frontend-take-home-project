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
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineWidth = tool === 'eraser' ? 10 : 5;
        ctx.fillStyle = 'white';
        setContext(ctx);
        setDrawingHistory([ctx.getImageData(0, 0, canvas.width, canvas.height)]);
      }
    }
  }, [tool]);

  const undo = useCallback(() => {
    if (drawingHistory.length > 1 && context) {
      const canvas = canvasRef.current;
      if (canvas) {
        const newHistory = drawingHistory.slice(0, -1);
        context.putImageData(newHistory[newHistory.length - 1], 0, 0);
        setDrawingHistory(newHistory);
      }
    }
  }, [context, drawingHistory]);

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

  const saveDrawingState = useCallback((context: CanvasRenderingContext2D) => {
    if (context && canvasRef.current) {
      setDrawingHistory(prev => [
        ...prev,
        context.getImageData(0, 0, canvasRef.current!.width, canvasRef.current!.height)
      ]);
    }
  }, [context]);

  const startDrawing = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!context) return;
    if (tool === 'text') {
      context.font = `${fontSize}px Arial`;
      context.fillStyle = color;
      context.textAlign = 'center';
      context.textBaseline = 'middle';
      context.fillText(text, event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    }
    if (tool === 'pencil') {
      setIsDrawing(true);
      context.beginPath();
      context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    }
    if (tool === 'eraser') {
      setIsDrawing(true);
      context.beginPath();
      context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    }
  };

  const draw = (event: MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;
    if (tool === 'pencil') {
      context.strokeStyle = color;
      context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      context.stroke();
    }
    if (tool === 'eraser') {
      context.clearRect(event.nativeEvent.offsetX - 10, event.nativeEvent.offsetY - 10, 20, 20);
    }
  };

  const stopDrawing = () => {
    if (context) {
      context.closePath();
      saveDrawingState(context)
    }
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={1000}
      height={600}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      className={styles.canvas}
      // style={{ border: '1px solid #000', backgroundColor: whiteColor }}
    />
  );
};

export default Canvas;