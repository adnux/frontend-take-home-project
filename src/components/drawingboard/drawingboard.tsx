'use client';

import { blackColor } from '@/utils/colors';
import React, { useState } from 'react';
import Canvas from '../canvas/canvas';
import Toolbox from '../toolbox/toolbox';
import styles from './drawingboard.module.css';
import { toolType } from './drawingboard.types';


const DrawingBoard: React.FC = () => {
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);

  const [tool, setTool] = useState<toolType>('pencil');
  const [color, setColor] = useState(blackColor);
  const [text, setText] = useState<string>('Enter text here');
  const [isTextBoxOpen, setIsTextBoxOpen] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(24);

  return (
    <div data-testid="drawing-board" className={styles.drawingBoard}>
      <Toolbox
        selectedTool={tool}
        setTool={setTool}
        setColor={setColor}
        text={text}
        setText={setText}
        isTextBoxOpen={isTextBoxOpen}
        setIsTextBoxOpen={setIsTextBoxOpen}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />
      <Canvas
        context={context}
        setContext={setContext}
        drawingHistory={drawingHistory}
        setDrawingHistory={setDrawingHistory}
        tool={tool}
        color={color}
        text={text}
        fontSize={fontSize}
      />
    </div>
  );
};

export default DrawingBoard;
