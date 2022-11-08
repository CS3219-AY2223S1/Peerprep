import {
  Card, CardContent, Button, Box,
} from '@mui/material';
import { CircleRounded } from '@mui/icons-material';
import React from 'react';
import QuestionModal from './QuestionModal';

export interface FooterProps {
  username: String;
  partnername: String;
  onLeave: () => void;
}

const Footer = ({ username, partnername, onLeave }: FooterProps) => (
  <Card className="relative bottom-0 inset-x-0">
    <CardContent className="flex align-middle border-2 boarder-gray-800">
      <div className="flex space-x-2 font-serif font-base text-lg w-full">
        {username ? (
          <div>
            <CircleRounded className="text-green-500" />
            {` ${username}`}
          </div>
        ) : null}
        {partnername ? (
          <div>
            <CircleRounded className="text-green-500" />
            {` ${partnername}`}
          </div>
        ) : null}
      </div>
      <Box className="float-right flex grow-0 flex-row justify-items-end w-100">
        <QuestionModal />
        <div className="mr-1 ml-1" />
        <Button
          variant="contained"
          className="float-right"
          size="small"
          onClick={onLeave}
        >
          Leave
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default Footer;
