import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView as EV } from '@codemirror/view';
import { python } from '@codemirror/lang-python';
import { useNavigate } from 'react-router-dom';

const style = {

  position: 'absolute',
  // marginTop: '150px',
  // marginBottom: '-200px',
  // left: '40%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: 500,
};

const EditorView = (props) => {
  // const handleExit= () => {
  //     props.handleView(props.code);

  // }
  // const onChange = (update) => {
  //   };
  console.log(props.partner);
  return (
    <div className="h-full w-9/12 mb-20 mt-3">
      <Typography variant="h5" component="div">
        Interview with
        {' '}
        {props.partner}
      </Typography>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Completed on
        {' '}
        {props.completedOn}
        {' '}
        in
        {' '}
        {props.duration}
      </Typography>
      <CodeMirror
        className="h-full mt-5"
        value={props.code}
        readOnly
        autoFocus
        theme="dark"
        height="100%"
        placeholder="print('Hello world')"
        extensions={[python(), EV.lineWrapping]}
      />
    </div>
  );
};

export default EditorView;
