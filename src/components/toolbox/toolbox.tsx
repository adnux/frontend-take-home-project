import React from 'react';
import TextBox from '../textbox/textbox';
import styles from './toolbox.module.css';

interface ToolboxProps {
  selectedTool: string;
  text: string;
  setTool: (tool: string) => void;
  setColor: (color: string) => void;
  setText: (text: string) => void;
  isTextBoxOpen: boolean;
  setIsTextBoxOpen: (isOpen: boolean) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
}

const buildButtonClasses = ({ tool, selectedTool }: { tool: string; selectedTool: string }) => {
  return `${styles.button} tool ${styles[tool]} ${selectedTool === tool ? styles.selected : ''}`;
};

const Toolbox: React.FC<ToolboxProps> = ({
  selectedTool,
  setTool,
  setColor,
  isTextBoxOpen,
  text,
  setText,
  setIsTextBoxOpen,
  fontSize,
  setFontSize,
}) => {

  const handleChangeTool = (tool: string) => {
    if (tool === 'text') {
      setIsTextBoxOpen(true);
    } else {
      setIsTextBoxOpen(false);
    }
    setTool(tool);
  };

  return (
    <div className={styles.toolbox}>
      <button
        name="pencil"
        type="button"
        data-testid="pencil"
        className={buildButtonClasses({ tool: 'pencil', selectedTool })}
        onClick={() => { handleChangeTool('pencil') }}
      />
      <button
        name="eraser"
        type="button"
        data-testid="eraser"
        className={buildButtonClasses({ tool: 'eraser', selectedTool })}
        onClick={() => { handleChangeTool('eraser') }}
      />
      <button
        name="text"
        type="button"
        data-testid="text"
        className={buildButtonClasses({ tool: 'text', selectedTool })}
        onClick={() => { handleChangeTool('text') }}
      />
      <button
        name="rectangle"
        type="button"
        disabled={true}
        title="Coming soon"
        data-testid="rectangle"
        className={buildButtonClasses({ tool: 'rectangle', selectedTool })}
        onClick={() => { handleChangeTool('rectangle') }}
      />
      <span className={styles.extra}>
        <input type="color" onChange={(e) => setColor(e.target.value)} defaultValue="#000000" />
      </span>
      {isTextBoxOpen && (
        <span className={styles.extra}>
          <TextBox text={text} setText={setText} fontSize={fontSize} setFontSize={setFontSize} />
        </span>
      )}
    </div>
  );
};

export default Toolbox;
