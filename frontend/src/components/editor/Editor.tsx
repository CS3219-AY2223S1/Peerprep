import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";
import { python } from "@codemirror/lang-python";

interface EditorProps {
  text: string;
  setText: (text: string) => void;
}

const Editor = ({ text, setText }: EditorProps) => {
  const onChange = React.useCallback((value, _) => {
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
      extensions={[python(), EditorView.lineWrapping]}
    />
  );
};
export default Editor;
