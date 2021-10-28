import { makeStyles, TableContainer, Typography } from "@material-ui/core";
import React from "react";
import { Table } from "react-bootstrap";

const useStyles = makeStyles((theme) => ({
  btnSuccess: {
    width: "100%",
    color: "#fff",
    backgroundColor: "#1cc88a",
    borderColor: "#1cc88a",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#37F783",
      borderColor: "#169b6b",
    },
  },
  btnInfo: {
    width: "100%",
    color: "#fff",
    backgroundColor: "#7AD2CD",
    borderColor: "#36b9cc",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#2c9faf",
      borderColor: "#2a96a5",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
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
  gradient: {
    width: "100%",
    color: "#fff",
    backgroundColor: "#7A88FF",
    borderColor: "#5a5c69",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#7280F0",
      borderColor: "#7280F0",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  msg: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "70%",
    },
  },
  smallBtn: {
    width: "100%",
    color: "#fff",
    backgroundColor: "#7A88FF",
    borderColor: "#5a5c69",
    "&:hover": {
      color: "#fff",
      backgroundColor: "#7280F0",
      borderColor: "#7280F0",
    },
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default function Submissions({ data }) {
  const classes = useStyles();
  return (
    <TableContainer>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} id={item.id}>
                <td>
                  <Typography
                    className={classes.msg}
                    style={{ wordWrap: "break-word" }}
                  >
                    {item.name}
                  </Typography>
                </td>
                <td>
                  <Typography
                    className={classes.msg}
                    style={{ wordWrap: "break-word" }}
                  >
                    {item.email}
                  </Typography>
                </td>
                <td>
                  <Typography
                    className={classes.msg}
                    style={{ wordWrap: "break-word" }}
                  >
                    {item.score}
                  </Typography>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </TableContainer>
  );
}
