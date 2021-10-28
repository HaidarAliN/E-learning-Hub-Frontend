import { Button, makeStyles } from "@material-ui/core";
import React from "react";
import { Table } from "react-bootstrap";
import InfoIcon from "@material-ui/icons/Info";
import DeleteIcon from "@material-ui/icons/Delete";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  btnSuccess: {
    width: "100%",
    color: "#fff",
    backgroundColor: "#1cc88a",
    borderColor: "#1cc88a",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#17a673",
      borderColor: "#169b6b",
    },
  },
  btnInfo: {
    width: "100%",
    color: "#fff",
    backgroundColor: "#36b9cc",
    borderColor: "#36b9cc",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#2c9faf",
      borderColor: "#2a96a5",
    },
  },
  btnDanger: {
    width: "100%",
    color: "#fff",
    backgroundColor: "#e74a3b",
    borderColor: "#e74a3b",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#e02d1b",
      borderColor: "#d52a1a",
    },
  },
  success: {
    textAlign: "center",
    alignItems: "center",
    color: "#fff",
  },
}));

export default function Materials({ handleEdit, data, handleRemove }) {
  const classes = useStyles();

  const editChapter = (id) => {
    handleEdit(id);
  };
  const removeChapter = (id) => {
    handleRemove(id);
  };

  return (
    <TableContainer component={Paper}>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} id={item.id}>
                <td>{item.name} </td>
                <td>{item.description} </td>
                <td>
                  <Button
                    className={classes.btnInfo}
                    color="secondary"
                    variant="contained"
                    onClick={() => editChapter(item.id)}
                    startIcon={<InfoIcon />}
                  >
                    Edit Chapter
                  </Button>
                </td>
                <td>
                  <Button
                    className={classes.btnDanger}
                    color="secondary"
                    variant="contained"
                    onClick={() => removeChapter(item.id)}
                    startIcon={<DeleteIcon />}
                  >
                    Drop chpater
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </TableContainer>
  );
}
