import React, { useState } from 'react';
import {
  Box, Button, Modal, Typography,
} from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
const dummyHeader = '2 Sum';
const dummyBody = 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.';

const QuestionModal = () => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [body, setBody] = useState(dummyBody);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleCopy = () => {
    setCopied(true);
    setOpen(false);
  };
  return (
    <div>
      <Button variant="contained" size="small" onClick={handleOpen}>
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
            {dummyHeader}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            {dummyBody}
          </Typography>
          <Box className="float-right flex grow-0 flex-row justify-items-end w-100">
            <CopyToClipboard text={body} onCopy={handleCopy}>
              <Button variant="contained" size="small">
                Copy
              </Button>
            </CopyToClipboard>
            <div className="mr-1 ml-1" />
            <Button variant="contained" size="small">
              Next
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default QuestionModal;
