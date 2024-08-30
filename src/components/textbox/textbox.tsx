import React, { useState, useRef, MouseEvent } from 'react';
import styles from './textbox.module.css';

interface TextBoxProps {
  text: string;
  setText: (text: string) => void;
  fontSize: number;
  setFontSize: (fontSize: number) => void;
}

const TextBox: React.FC<TextBoxProps> = ({ text, setText, fontSize, setFontSize }) => {

  return (
    <div className={styles.textbox}>
      <div>
        <label className={styles.label} htmlFor="textbox">Text: </label>
        <input
          id="textbox"
          data-testid="textbox"
          type="text"
          className={styles.input}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text"
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="fontSize">Font Size: </label>
        <input
          id="fontSize"
          data-testid="fontSize"
          type="number"
          className={`${styles.input} ${styles.fontSize}`}
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          placeholder="Enter font size"
        />
      </div>
    </div>
  );
};

export default TextBox;