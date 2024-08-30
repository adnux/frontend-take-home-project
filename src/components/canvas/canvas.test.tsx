import React from 'react';
import { render, screen } from '@testing-library/react';
import Canvas from './canvas';

describe('Canvas', () => {
  it('renders without crashing', () => {
    let context = {
      canvas: document.createElement('canvas'),
      getContextAttributes: jest.fn(),
      globalAlpha: 1,
      globalCompositeOperation: 'source-over',
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      closePath: jest.fn(),
    } as unknown as CanvasRenderingContext2D;

    const handleContextUpdate = jest.fn();

    render(
      <Canvas
        context={context}
        setContext={handleContextUpdate}
        drawingHistory={[]}
        setDrawingHistory={() => { }}
        tool="pencil"
        color="black"
        text="Test"
        fontSize={16}
      />
    );
    expect(screen.getByTestId('canvas')).toBeDefined();

    const canvas = screen.getByTestId('canvas') as HTMLCanvasElement;
    context = canvas.getContext('2d')!;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(100, 100);
    context.stroke();

    expect(context.beginPath).toHaveBeenCalled();
    expect(context.moveTo).toHaveBeenCalled();
    expect(context.lineTo).toHaveBeenCalled();
    expect(context.stroke).toHaveBeenCalled();
    expect(handleContextUpdate).toHaveBeenCalled();
  });
});
