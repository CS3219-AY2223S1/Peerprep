import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import EditorView from './EditorView';
import { URL_USER_SESSION_SVC } from '../../configs';
import { useAuthContext } from '../../contexts/AuthContext';

interface Column {
  id: 'partner' | 'completedOn' | 'difficulty' | 'duration' | 'action';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center';
  format?: (value: number) => string;
}

interface UserCred {
  username: String;
  id: String;
  iat: Number;
  exp: Number;
}

const columns: readonly Column[] = [
  { id: 'partner', label: 'Partner', minWidth: 170 },
  { id: 'completedOn', label: 'Completed On', minWidth: 150 },
  { id: 'difficulty', label: 'Difficulty', minWidth: 100 },
  {
    id: 'duration',
    label: 'Duration',
    minWidth: 100,
    align: 'center',
  },
  {
    id: 'action',
    label: 'Action',
    minWidth: 170,
    align: 'center',
  },
];

interface Data {
  partner: string;
  completedOn: string;
  difficulty: string;
  duration: string;
  action: string;
}

function createData(
  partner: string,
  completedOn: string,
  difficulty: string,
  duration: string,
  action: string,
): Data {
  return {
    partner, completedOn, difficulty, duration, action,
  };
}

const style = {
  position: 'absolute',
  top: '40%',
  left: '59%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: 500,
  alignItems: 'left',
};

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openView, setOpenView] = useState(false);
  const [code, setCode] = useState('');
  const { user, cookie } = useAuthContext();
  const [partner, setPartner] = useState('');
  const [date, setDate] = useState('');
  const [username, setUsername] = useState<String>('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    fetchRowData();
    setOpenView(false);
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const fetchRowData = async () => {
    const accessToken = cookie.userCred;
    const { username } = decodeToken(cookie.userCred) as UserCred;
    setUsername(username);
    const res = await axios
      .get(URL_USER_SESSION_SVC, { headers: { authorization: accessToken } })
      .catch((err) => {
        console.log(err);
      });
    if (res && res.data) {
      const tempRows = [];
      res.data.map((row) => {
        const partner = row.userOneName === username ? row.userTwoName : row.userOneName;
        tempRows.push(createData(partner, row.completedOn, row.difficulty, row.duration, row.code));
      });
      setRows(tempRows);
    }
  };
  const handleCodeView = (code, partner, date, duration) => {
    setCode(code);
    setPartner(partner);
    setDuration(duration);
    setDate(date);

    handleView();
  };

  const handleView = () => {
    setOpenView(!openView);
  };

  const getFormattedDate = (date: string) => {
    const inp = new Date(date);
    const yyyy = inp.getFullYear();
    const mm = (inp.getMonth() + 1); // Months start at 0!
    const dd = inp.getDate();
    let dd_str = dd.toString();
    let mm_str = mm.toString();
    if (dd < 10) {
      dd_str = `0${dd_str}`;
    }
    if (mm < 10) {
      mm_str = `0${mm_str}`;
    }
    return `${dd_str}/${mm_str}/${yyyy}` as string;
  };

  const getFormattedDuration = (duration: string) => {
    let seconds = +duration / 1000;
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="mt-10">

      { openView
        ? (
          <Box sx={style}>
            <EditorView code={code} partner={partner} date={getFormattedDate(date)} duration={getFormattedDuration(duration)} />
            <Button variant="contained" size="small" onClick={handleView}>Back</Button>
          </Box>
        )
        : (
          <div className="flex flex-col justify-center items-center">
            <Typography variant="h3" align="center" marginBottom="15px">
              {username}
              's PeerPrep History
            </Typography>
            <Paper sx={{ width: '80%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ minWidth: column.minWidth }}
                        >
                          {column.label}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row, index) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === 'action' ? (
                                  <Button variant="contained" size="small" onClick={() => handleCodeView(row.action, row.partner, row.completedOn, row.duration)}>
                                    View
                                  </Button>
                                )
                                  : column.id === 'completedOn' ? (getFormattedDate(row.completedOn))
                                    : column.id === 'duration' ? (getFormattedDuration(row.duration))
                                      : column.format && typeof value === 'number'
                                        ? column.format(value) : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </div>
        )}

    </div>
  );
}
