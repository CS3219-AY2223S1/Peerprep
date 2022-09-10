import React, { Dispatch, SetStateAction } from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.min.css';

interface Props {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const AlreadyInQueueModal = ({ visible, setVisible }: Props) => (
  <Modal title="Already In Queue" open={visible} onCancel={() => setVisible(false)} footer={false} centered>
    <p>You are already queuing. Please try again in 10s.</p>
  </Modal>
);
