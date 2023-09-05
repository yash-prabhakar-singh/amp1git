import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Box,
} from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
import RYesterday from "./RYesterday";
import Pastdata from "./Pastdata";


const initialData = [
  {
    platforms: "Platform A",
    domains: "Domain X",
    wonPrice: "$150",
  },
  {
    platforms: "Platform A",
    domains: "Domain X",
    wonPrice: "$920",
  },
  {
    platforms: "Platform A",
    domains: "Domain X",
    wonPrice: "$700",
  },
  // Add more mock data here
];

const ReportsM = () => {
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
    <Box>
      <Typography
        fontWeight="bold"
        fontSize="1.3rem"
        padding="20px 10px 10px"
        letterSpacing={0.5}
        color="GrayText"
      >
        Accusations
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
                        color: "#311b92",
                        fontWeight: "bold",
                      }}
                    >
                      Won Price
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
                      <TableCell>{row.platforms}</TableCell>
                      <TableCell>{row.domains}</TableCell>
                      <TableCell>{row.wonprice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>
      </Grid>
      <RYesterday />
      <Pastdata />
    </Box>
  );
};

export default ReportsM;
