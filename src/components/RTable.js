import {Button, makeStyles} from '@material-ui/core'
import React from 'react'
import { Table } from 'react-bootstrap'
import DoneAllIcon from '@material-ui/icons/DoneAll';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';
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
      backgroundColor:'#17a673',
      borderColor:'#169b6b'
    }
  },
  btnInfo:{
    width: "100%",
    color:'#fff',
    backgroundColor:'#36b9cc',
    borderColor:'#36b9cc',
    '&:hover': {
      color:'#fff',
      backgroundColor:'#2c9faf',
      borderColor:'#2a96a5'
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

  }

}));

export default function RTable({data, handlePending, handleRemove}) {
  const classes = useStyles();

  const removeStudent = (id)=>{
    handleRemove(id);
  }
  const acceptStudent = (id)=>{
    handlePending(id);
  }

    return (
        <div>
          <TableContainer component={Paper} >

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Remove student</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
              <tr key={item.id} id={item.id}>

                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  
                    {item.status == 0 ? <td ><Button 
                  className={classes.btnInfo}
                      color="secondary" 
                      variant="contained"
                      onClick={() => acceptStudent(item.id)}
                      startIcon={<InfoIcon />}
                      >
                        Pending
                  </Button>
                  </td>
                   : <td class={classes.success} style={{backgroundColor: "#1cc88a"}}>Enrolled <DoneAllIcon/></td> }
                  
                  <td><Button 
                  className={classes.btnDanger}
                      color="secondary" 
                      variant="contained"
                      onClick={() => removeStudent(item.id)}
                      startIcon={<DeleteIcon />}
                      >
                        Drop student
                  </Button></td>
              </tr>
                ))}
            </tbody>
          </Table>
          </TableContainer>

        </div>
    )
}
