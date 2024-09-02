import React from 'react';
import { fireEvent, render } from '@testing-library/react';
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
      putImageData: jest.fn(),
    } as unknown as CanvasRenderingContext2D;

    const setContextMock = jest.fn();
    const setDrawingHistoryMock = jest.fn();

    const imageDataMock = {
      data: new Uint8ClampedArray(4),
      width: 100,
      height: 100,
    } as unknown as ImageData;
    const drawingHistoryMock = [imageDataMock];

    const { getByTestId } = render(
      <Canvas
        context={context}
        setContext={setContextMock}
        drawingHistory={drawingHistoryMock}
        setDrawingHistory={setDrawingHistoryMock}
        tool="pencil"
        color="black"
        text="Test"
        fontSize={16}
      />
    );
    expect(getByTestId('canvas')).toBeDefined();
    expect(setDrawingHistoryMock).toHaveBeenCalledTimes(1);
  });

  it('draws successfully in the canvas', () => {
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
      putImageData: jest.fn(),
    } as unknown as CanvasRenderingContext2D;

    const setContextMock = jest.fn();
    const setDrawingHistoryMock = jest.fn();

    const imageDataMock = {
      data: new Uint8ClampedArray(4),
      width: 100,
      height: 100,
    } as unknown as ImageData;
    const drawingHistoryMock = [imageDataMock];

    const { getByTestId } = render(
      <Canvas
        context={context}
        setContext={setContextMock}
        drawingHistory={drawingHistoryMock}
        setDrawingHistory={setDrawingHistoryMock}
        tool="pencil"
        color="black"
        text="Test"
        fontSize={16}
      />
    );
    expect(getByTestId('canvas')).toBeDefined();
    expect(setDrawingHistoryMock).toHaveBeenCalledTimes(1);

    const canvas = getByTestId('canvas') as HTMLCanvasElement;
    fireEvent.mouseDown(canvas, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(canvas);

    expect(setDrawingHistoryMock).toHaveBeenCalledTimes(2);
    drawingHistoryMock.push({
      ...imageDataMock,
      width: 120,
      height: 120,
    })

    expect(context.beginPath).toHaveBeenCalled();
    expect(context.moveTo).toHaveBeenCalled();
    expect(context.lineTo).toHaveBeenCalled();
    expect(context.stroke).toHaveBeenCalled();
    expect(setContextMock).toHaveBeenCalledTimes(1);

  });

  it('draws and undo successfully in the canvas', () => {
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
      putImageData: jest.fn(),
    } as unknown as CanvasRenderingContext2D;

    const setContextMock = jest.fn();
    const setDrawingHistoryMock = jest.fn();

    const imageDataMock = {
      data: new Uint8ClampedArray(4),
      width: 100,
      height: 100,
    } as unknown as ImageData;
    const drawingHistoryMock = [imageDataMock];

    const { getByTestId } = render(
      <Canvas
        context={context}
        setContext={setContextMock}
        drawingHistory={drawingHistoryMock}
        setDrawingHistory={setDrawingHistoryMock}
        tool="pencil"
        color="black"
        text="Test"
        fontSize={16}
      />
    );
    expect(getByTestId('canvas')).toBeDefined();
    expect(setDrawingHistoryMock).toHaveBeenCalledTimes(1);

    const canvas = getByTestId('canvas') as HTMLCanvasElement;
    fireEvent.mouseDown(canvas, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(canvas);

    expect(setDrawingHistoryMock).toHaveBeenCalledTimes(2);
    drawingHistoryMock.push({
      ...imageDataMock,
      width: 120,
      height: 120,
    })

    expect(context.beginPath).toHaveBeenCalled();
    expect(context.moveTo).toHaveBeenCalled();
    expect(context.lineTo).toHaveBeenCalled();
    expect(context.stroke).toHaveBeenCalled();
    expect(setContextMock).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(canvas, { metaKey: true, key: 'z' });
    expect(setDrawingHistoryMock).toHaveBeenCalledTimes(3);

  });

  it('should erases successfully', () => {

    let contextMock = {
      canvas: document.createElement('canvas'),
      getContextAttributes: jest.fn(),
      globalAlpha: 1,
      globalCompositeOperation: 'source-over',
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      closePath: jest.fn(),
      putImageData: jest.fn(),
      clearRect: jest.fn(),
    } as unknown as CanvasRenderingContext2D;

    const setContextMock = jest.fn();
    const setDrawingHistoryMock = jest.fn();

    const imageDataMock = {
      data: new Uint8ClampedArray(4),
      width: 100,
      height: 100,
    } as unknown as ImageData;
    const drawingHistoryMock = [imageDataMock];

    const { rerender, getByTestId } = render(
      <Canvas
        context={contextMock}
        setContext={setContextMock}
        drawingHistory={drawingHistoryMock}
        setDrawingHistory={setDrawingHistoryMock}
        tool="pencil"
        color="black"
        text="Test"
        fontSize={16}
      />
    );
    let canvas = getByTestId('canvas') as HTMLCanvasElement;
    expect(canvas).toBeDefined();
    expect(setDrawingHistoryMock).toHaveBeenCalledTimes(1);

    fireEvent.mouseDown(canvas, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(canvas);

    expect(setDrawingHistoryMock).toHaveBeenCalledTimes(2);
    drawingHistoryMock.push({
      ...imageDataMock,
      width: 120,
      height: 120,
    })

    rerender(
      <Canvas
        context={contextMock}
        setContext={setContextMock}
        drawingHistory={drawingHistoryMock}
        setDrawingHistory={setDrawingHistoryMock}
        tool="eraser"
        color="black"
        text="Test"
        fontSize={16}
      />
    );

    expect(setDrawingHistoryMock).toHaveBeenCalledTimes(2);

    fireEvent.mouseDown(canvas, { clientX: 0, clientY: 0 });
    fireEvent.mouseMove(canvas, { clientX: 100, clientY: 100 });
    fireEvent.mouseUp(canvas);
    expect(setDrawingHistoryMock).toHaveBeenCalledTimes(3);
    expect(contextMock.clearRect).toHaveBeenCalledTimes(1);
  })
});
