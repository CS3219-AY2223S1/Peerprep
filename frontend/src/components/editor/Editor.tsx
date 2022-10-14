import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { CollabSocketEvent } from '../../constants';

interface EditorProps {
  socket: Socket;
}

const Editor = ({ socket }: EditorProps) => {
  const [code, setCode] = useState<string>();
  const navigate = useNavigate();
  useEffect(() => {
    socket.on(CollabSocketEvent.INIT, (code: string) => {
      setCode(code);
    });
    socket.on(CollabSocketEvent.CODE_UPDATE, (code: string) => {
      setCode(code);
    });
    socket.on(CollabSocketEvent.DISCONNECT_ALL, () => {
      navigate('/match');
    });
  }, [socket]);

  const onChange = (update) => {
    // TODO: Hacky fix for infinite updates
    if (update !== code) {
      setCode(code);
      socket.emit(CollabSocketEvent.CODE_UPDATE, update);
    }
  };

  return (
    <CodeMirror
      className="h-full"
      value={code}
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
