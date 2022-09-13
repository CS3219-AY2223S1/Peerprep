import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';

interface EditorProps {
  text: string;
  setText: (text: string) => void;
}

const Editor = ({ text, setText }: EditorProps) => {
  const onChange = React.useCallback((value, viewUpdate) => {
    setText(value);
  }, []);

  return (
    <CodeMirror
      className="h-full"
      value={text}
      onChange={onChange}
      autoFocus
      theme="dark"
      height="100%"
      placeholder="print('Hello world')"
      extensions={[python()]}
    />
  );
};
export default Editor;