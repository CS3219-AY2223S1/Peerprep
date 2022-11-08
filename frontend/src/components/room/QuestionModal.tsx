import React, { useEffect, useState } from 'react';
import {
  Box, Button, Modal, Typography,
} from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import { URL_QUESTION_GET_RANDOM } from '../../configs';
import { STATUS_CODE_SUCCESS } from '../../constants';
import { useSocketContext } from '../../contexts/SocketContext';
import { useAuthContext } from '../../contexts/AuthContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const QuestionModal = () => {
  const { difficulty } = useSocketContext();
  const [open, setOpen] = useState(false);
  const [printBody, setPrintBody] = useState('Uh oh... No questions yet');
  const [printTitle, setPrintTitle] = useState('No title');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [render, setRender] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { cookie } = useAuthContext();

  useEffect(() => {
    setPrintTitle(title);
    setPrintBody(body);
    setRender(false);
  }, [render]);

  const handleOpenQuestionModal = async () => {
    handleOpen();
    await getQuestion();
    setRender(true);
  };

  const handleNextQuestion = async () => {
    await getQuestion();
    setRender(true);
  };

  const getQuestion = async () => {
    const res = await axios
      .get(URL_QUESTION_GET_RANDOM, {
        headers: { difficulty: difficulty, authorization: cookie.userCred }, //eslint-disable-line
      })
      .catch((err) => {
        console.log(err);
      });
    if (res && res.status === STATUS_CODE_SUCCESS) {
      setTitle(res.data.message.title);
      setBody(res.data.message.content);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        size="small"
        onClick={handleOpenQuestionModal}
      >
        Question
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {printTitle}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            {printBody}
          </Typography>
          <Box className="float-right flex grow-0 flex-row justify-items-end w-100">
            <CopyToClipboard text={body} onCopy={handleClose}>
              <Button variant="contained" size="small">
                Copy
              </Button>
            </CopyToClipboard>
            <div className="mr-1 ml-1" />
            <Button
              variant="contained"
              size="small"
              onClick={handleNextQuestion}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default QuestionModal;
