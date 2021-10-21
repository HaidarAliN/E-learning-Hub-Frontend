import {Button, makeStyles, Typography} from '@material-ui/core'
import React from 'react'
import { Table } from 'react-bootstrap'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import InfoIcon from '@material-ui/icons/Info';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  btnSuccess:{
    width: "100%",
    color:'#fff',
    backgroundColor:'#1cc88a',
    borderColor:'#1cc88a',
    '&:hover': {
      color:'#fff',
      backgroundColor:'#37F783',
      borderColor:'#169b6b'
    }
  },
  btnInfo:{
    width: "100%",
    color:'#fff',
    backgroundColor:'#7AD2CD',
    borderColor:'#36b9cc',
    '&:hover': {
      color:'#fff',
      backgroundColor:'#2c9faf',
      borderColor:'#2a96a5'
    },
    [theme.breakpoints.down('xs')]: {
      display : "none"
  
      }
  },
  btnDanger:{
    width: "100%",
    color:'#fff',
    backgroundColor:'#e74a3b',
    borderColor:'#e74a3b',
    '&:hover': {
      color:'#fff',
      backgroundColor:'#e02d1b',
      borderColor:'#d52a1a'
    }
  },
  success:{
    textAlign: "center",
    alignItems:"center",
    color:'#fff',

  },
  gradient:{
    width: "100%",
    color:'#fff',
    backgroundColor:'#7A88FF',
    borderColor:'#5a5c69',
    '&:hover': {
      color:'#fff',
      backgroundColor:'#7280F0',
      borderColor:'#7280F0'
    },
    [theme.breakpoints.down('xs')]: {
      display : "none"
  
      }
  },
  msg:{
    [theme.breakpoints.down('xs')]: {
      fontSize: "70%"
  
      }
  },
  smallBtn:{
    width: "100%",
    color:'#fff',
    backgroundColor:'#7A88FF',
    borderColor:'#5a5c69',
    '&:hover': {
      color:'#fff',
      backgroundColor:'#7280F0',
      borderColor:'#7280F0'
    },
    [theme.breakpoints.up('sm')]: {
      display : "none"
      }
  },

}));

export default function Notification({data, handleRead, NavigateToCourse}) {
    const classes = useStyles();

    const markAsRead = (id)=>{
        handleRead(id);
    }
   
    const handleNavigate = (course_id) =>{
        NavigateToCourse(course_id);
      }
  
      return (
        <TableContainer component={Paper} >

          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Message</th>
                  <th>Action</th>
                  <th>Navigation</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                <tr 
                   key={item.id} id={item.id}
                >
  
                    <td>
                    <Typography
                      className={classes.msg}
                      style={{wordWrap: "break-word"}}
                      >
                      {item.body}
                      </Typography>
                       </td>
                    {item.is_read == 0?
                    <td><Button 
                    className={classes.btnInfo}
                    color="secondary" 
                    variant="contained"
                    onClick={() => markAsRead(item.id)}
                    startIcon={<InfoIcon />}
                    >
                          Mark As Read
                    </Button>

                    <Button 
                    className={classes.smallBtn}
                    color="secondary" 
                    variant="contained"
                    onClick={() => markAsRead(item.id)}
                    startIcon={<InfoIcon />}
                    >
                      seen
                    </Button> 

                    </td>
                    :
                    <td style={{backgroundColor: "#37F783"}}>Read<DoneAllIcon/></td>
                    }
                    <td><Button 
                    className={classes.gradient}
                    color="secondary" 
                    variant="contained"
                    onClick={() => handleNavigate(item.course_id)}
                    endIcon={<ArrowForwardIosIcon />}
                    >
                          Navigate To course
                    </Button>
                    
                    <Button 
                    className={classes.smallBtn}
                    color="secondary" 
                    variant="contained"
                    onClick={() => handleNavigate(item.course_id)}
                    endIcon={<ArrowForwardIosIcon />}
                    >
                          Go
                    </Button>
                    
                    </td>
                </tr>
                   ))} 
              </tbody>
            </Table>
          </div>
          </TableContainer>
      )
  }
