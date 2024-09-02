import { toolType } from '../drawingboard/drawingboard.types';

export interface ToolboxProps {
  selectedTool: toolType;
  text: string;
  setTool: (tool: toolType) => void;
  setColor: (color: string) => void;
  setText: (text: string) => void;
  isTextBoxOpen: boolean;
  setIsTextBoxOpen: (isOpen: boolean) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
}

