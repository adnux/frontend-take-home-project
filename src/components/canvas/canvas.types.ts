export interface CanvasProps {
  context: CanvasRenderingContext2D | null;
  setContext: (context: CanvasRenderingContext2D | null) => void;
  drawingHistory: ImageData[];
  setDrawingHistory: React.Dispatch<React.SetStateAction<ImageData[]>>;
  tool: string;
  color: string;
  text: string;
  fontSize: number;
}

