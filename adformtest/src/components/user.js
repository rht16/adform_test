import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import {addUser} from "../actions/userAction";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
const moment = require("moment");
const Users = () => {
    const state = useSelector((state) => state);
    const [value, setValue] = React.useState([null, null]);
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('')
    const [err, setErr] = useState('')
    const dispatch = useDispatch();
    useEffect(() => {
      console.log('setting')
        const res = fetch('https://jsonplaceholder.typicode.com/users')
        .then((res)=> res.json()).then((data) => {
          dispatch(addUser(data))
          setUsers(data);
        })
        .catch((err) => {
          setErr('Something went wrong!')
        })

    }, [])

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));
    
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));

    function randomDate(start, end) {
      return moment(new Date(+(new Date()) - Math.floor(Math.random()*10000000000)))
      .format('MM/DD/YYYY');
    }
    

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    
    const searchName = () => { 
      const filterdUser = users.filter(e => e.name === name);
      if(!filterdUser.length){
       setErr('User not found')
      } 
      setUsers(filterdUser)
    }

    useEffect(() => {
      if(!name){
        setUsers(state.user)
        setErr('')
      }
    }, [name])
    
    useEffect(() => {
      if(value && value.length && value[1]){
        // Not implementing this feature because api hasn't date filed
      }
    }, [value])

  return (
    <div className="cart">
      <div
        style={{
          display: "flex",
          flexDirection: "right",
          justifyContent: "space-between",
          padding: "10px",
          height: "50px",
        }}
      >
        <LocalizationProvider
          dateAdapter={AdapterMoment}
          localeText={{ start: "Start Date", end: "End Date" }}
        >
          <DateRangePicker
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(startProps, endProps) => (
              <React.Fragment>
                <TextField {...startProps} style={{ marginRight: "10px" }} />
                <TextField {...endProps} />
              </React.Fragment>
            )}
          />
        </LocalizationProvider>
        <div>
          <input
            type="text"
            name="user"
            placeholder="Search By name"
            style={{ height: "50px", marginRight: "5px" }}
            onChange={(e) => setName(e.target.value)}
          />
          <button style={{ height: "55px", width: "90px" }} disabled={!name} onClick={(e) => searchName()}>Search</button>
        </div>
      </div>
      {err && <Alert severity="error">{err}</Alert>}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">User Name</StyledTableCell>
              <StyledTableCell align="right">Start Date</StyledTableCell>
              <StyledTableCell align="right">End Date</StyledTableCell>
              <StyledTableCell align="right">Active</StyledTableCell>
              <StyledTableCell align="right">Budget</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => {
              const startDate = randomDate(new Date(2012, 0, 1), new Date());
              const endDate = randomDate(
                new Date(2000, 0, 1),
                new Date(+new Date() + Math.floor(Math.random() * 10000000000))
              );
              const today = moment(new Date()).format("MM/DD/YYYY");
              var targetDate = new Date();
              targetDate.setDate(
                targetDate.getDate() + getRandomArbitrary(-100, 100)
              );
              const temp = moment(targetDate).format("MM/DD/YYYY");
              const budget = Math.floor(Math.random() * 100);
              var diffDays = parseInt(
                (new Date(temp) - new Date(today)) / (1000 * 60 * 60 * 24),
                10
              );
              return (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.username}
                  </StyledTableCell>
                  <StyledTableCell align="right">{startDate}</StyledTableCell>
                  <StyledTableCell align="right">{temp}</StyledTableCell>
                  <StyledTableCell align="right">
                    <div
                      style={{
                        backgroundColor: diffDays >= 0 ? "green" : "red",
                        width: "10px",
                        height: "10px",
                        borderRadius: "5px",
                        marginLeft: "10px",
                      }}
                    ></div>
                    &nbsp;{diffDays >= 0 ? "Active" : "Inactive"}
                  </StyledTableCell>
                  <StyledTableCell align="right">{budget}K USD</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;