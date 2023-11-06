import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

const initialData = [
  {
    platforms: "Platform A",
    domains: "Domain X",
    closeoutPrice: "$130",
    ourMaxPrice: "$120",
  },
  {
    platforms: "Platform B",
    domains: "Domain X",
    closeoutPrice: "$180",
    ourMaxPrice: "$100",
  },
  {
    platforms: "Platform C",
    domains: "Domain X",
    closeoutPrice: "$177",
    ourMaxPrice: "$120",
  },
  // Add more mock data here
];
function RYesterday() {
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
    <div>
      <Typography
        fontWeight="bold"
        fontSize="1.3rem"
        padding="20px 10px 10px"
        letterSpacing={0.5}
        color="GrayText"
      >
        Yesterday Loses :
      </Typography>
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
                        {row.platforms}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.domains}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.closeoutPrice}
                      </TableCell>
                      <TableCell>
                        {editIndex === index ? (
                          <TextField
                            tyle={{ whiteSpace: "nowrap" }}
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
    </div>
  );
}

export default RYesterday;
