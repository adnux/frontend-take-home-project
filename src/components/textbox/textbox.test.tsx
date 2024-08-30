import { fireEvent, render, screen } from '@testing-library/react';
import TextBox from './textbox';

describe('TextBox', () => {
  it('should render the TextBox component', () => {
    render(
      <TextBox text="Hello" setText={() => { }} fontSize={16} setFontSize={() => { }} />
    );
    const textbox = screen.getByRole('textbox');
    expect(textbox).toBeDefined();
  })

  it('should render the TextBox component with the correct inputs', () => {
    const setTextMock = jest.fn();
    const setFontSizeMock = jest.fn();

    const { getByTestId } = render(
      <TextBox text="" setText={setTextMock} fontSize={24} setFontSize={setFontSizeMock} />
    );
    const textbox = getByTestId('textbox');
    expect((textbox as HTMLInputElement).value).toBe('');
    fireEvent.change(textbox, { target: { value: 'test input' } });
    expect(setTextMock).toHaveBeenCalledWith('test input');

    const fontSizeInput = getByTestId('fontSize');
    expect((fontSizeInput as HTMLInputElement).value).toBe('24');
    fireEvent.change(fontSizeInput, { target: { value: 20 } });
    expect(setFontSizeMock).toHaveBeenCalledWith(20);
  })
})