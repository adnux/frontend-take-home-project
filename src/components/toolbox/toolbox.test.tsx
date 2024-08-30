
import React from 'react';
import Toolbox from './toolbox';

import { fireEvent, render, screen } from '@testing-library/react';

describe('Toolbox', () => {
  it('should render component successfully', () => {
    const setToolMock = jest.fn();
    const setColorMock = jest.fn();
    const setIsTextBoxOpenMock = jest.fn();
    const setFontSizeMock = jest.fn();
    const setTextMock = jest.fn();
    render(
      <Toolbox
        selectedTool=""
        text=""
        setTool={setToolMock}
        setColor={setColorMock}
        isTextBoxOpen={false}
        setIsTextBoxOpen={setIsTextBoxOpenMock}
        fontSize={16}
        setFontSize={setFontSizeMock}
        setText={setTextMock}

      />
    );
    expect(screen.getByTestId('pencil')).toBeDefined();
    expect(screen.getByTestId('eraser')).toBeDefined();
    expect(screen.getByTestId('text')).toBeDefined();
    expect(screen.getByTestId('rectangle')).toBeDefined();
  });

  it('should handle click events', () => {
    const setToolMock = jest.fn();
    const setColorMock = jest.fn();
    const setIsTextBoxOpenMock = jest.fn();
    const setFontSizeMock = jest.fn();
    const setTextMock = jest.fn();
    render(
      <Toolbox
        selectedTool=""
        text=""
        setTool={setToolMock}
        setColor={setColorMock}
        isTextBoxOpen={false}
        setIsTextBoxOpen={setIsTextBoxOpenMock}
        fontSize={16}
        setFontSize={setFontSizeMock}
        setText={setTextMock}

      />
    );
    const pencilButton = screen.getByTestId('pencil');
    const eraserButton = screen.getByTestId('eraser');
    const textButton = screen.getByTestId('text');
    const rectangleButton = screen.getByTestId('rectangle');

    fireEvent.click(pencilButton);
    expect(setToolMock).toHaveBeenCalledWith('pencil');

    fireEvent.click(eraserButton);
    expect(setToolMock).toHaveBeenCalledWith('eraser');

    fireEvent.click(textButton);
    expect(setToolMock).toHaveBeenCalledWith('text');

    fireEvent.click(rectangleButton);
    expect(setToolMock).toHaveBeenCalledTimes(3);
  });

});