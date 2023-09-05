import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Input,
  Typography,
  TextField,
  Grid,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { InputOutlined } from "@mui/icons-material";

const initialData = [
  {
    date: "2023-08-21",
    platforms: "Platform A",
    domains: "Domain X",
    est: "Est Value",
    closeoutPrice: "$100",
    ourMaxPrice: "$120",
    result: "Won",
  },
  {
    date: "2023-08-21",
    platforms: "Platform A",
    domains: "Domain X",
    est: "Est Value",
    closeoutPrice: "$100",
    ourMaxPrice: "$120",
    result: "Lost",
  },
  // Add more mock data here
];

const TableReport = () => {
  const [data, setData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(-1);

  const handleEditClick = (index) => {
    setEditIndex(index);
  };

  const handleMaxPriceChange = (event, index) => {
    const newData = [...data];
    newData[index].ourMaxPrice = event.target.value;
    setData(newData);
  };

  return (
    <Grid container spacing={0}>
      <Grid item xs={12}>
        <Box
          sx={{
            padding: "30px 10px",
          }}
        >
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      color: "#311b92",
                      fontWeight: "bold",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#311b92",
                      fontWeight: "bold",
                    }}
                  >
                    Platforms
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#311b92",
                      fontWeight: "bold",
                    }}
                  >
                    Domains
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#311b92",
                      fontWeight: "bold",
                    }}
                  >
                    Est
                  </TableCell>
                  <TableCell
                    style={{
                      whiteSpace: "nowrap",
                      color: "#311b92",
                      fontWeight: "bold",
                    }}
                  >
                    Closeout Price
                  </TableCell>
                  <TableCell
                    style={{
                      whiteSpace: "nowrap",
                      color: "#311b92",
                      fontWeight: "bold",
                    }}
                  >
                    Our Max Price
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#311b92",
                      fontWeight: "bold",
                    }}
                  >
                    Result
                  </TableCell>
                  <TableCell
                    style={{
                      color: "#311b92",
                      fontWeight: "bold",
                    }}
                  >
                    Edit
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      backgroundColor: index % 2 === 0 ? "white" : "#f5f5f5",
                    }}
                  >
                    <TableCell style={{ whiteSpace: "nowrap" }}>
                      {row.date}
                    </TableCell>
                    <TableCell style={{ whiteSpace: "nowrap" }}>
                      {row.platforms}
                    </TableCell>
                    <TableCell style={{ whiteSpace: "nowrap" }}>
                      {row.domains}
                    </TableCell>
                    <TableCell style={{ whiteSpace: "nowrap" }}>
                      {row.est}
                    </TableCell>
                    <TableCell style={{ whiteSpace: "nowrap" }}>
                      {row.closeoutPrice}
                    </TableCell>
                    <TableCell style={{ whiteSpace: "nowrap" }}>
                      {editIndex === index ? (
                        <TextField
                          style={{ whiteSpace: "nowrap" }}
                          id="outlined-basic"
                          variant="outlined"
                          value={row.ourMaxPrice}
                          onChange={(event) =>
                            handleMaxPriceChange(event, index)
                          }
                        />
                      ) : (
                        row.ourMaxPrice
                      )}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        style={{
                          color: row.result === "Lost" ? "red" : "green",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {row.result}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(index)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Grid>
  );
};

export default TableReport;
