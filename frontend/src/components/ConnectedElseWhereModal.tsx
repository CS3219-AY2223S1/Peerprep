import React from 'react';
import { Modal } from 'antd';
import 'antd/dist/antd.min.css';

interface Props {
  visible: boolean;
}

export const ConnectedElseWhereModal = ({ visible }: Props) => (
  <Modal title="Disconnected" open={visible} footer={false} closable={false} centered>
    <p>You have been disconnected because another connection was made.</p>
  </Modal>
);
