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
  Typography,
  TextField,
  Grid,
  Box,
  Pagination,
  PaginationItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";

const initialData = [
  {
    platform: "Platform A",
    domain: "Domain X",
    timeleft: "0d 23hr 22m",
    price: "$100",
    target: "$120",
    gdcreports: "Won",
  },
  {
    platform: "Platform B",
    domain: "Domain X",
    timeleft: "59 min",
    price: "$100",
    target: "$120",
    gdcreports: "Won",
  },
  {
    platform: "Platform C",
    domain: "Domain X",
    timeleft: "0d 11hr",
    price: "$100",
    target: "$120",
    gdcreports: "Won",
  },
  {
    platform: "Platform D",
    domain: "Domain X",
    timeleft: "0d 23hr 22m",
    price: "$100",
    target: "$120",
    gdcreports: "Won",
  },
  {
    platform: "Platform E",
    domain: "Domain X",
    timeleft: "59 min",
    price: "$100",
    target: "$120",
    gdcreports: "Won",
  },
  {
    platform: "Platform F",
    domain: "Domain X",
    timeleft: "0d 11hr",
    price: "$100",
    target: "$120",
    gdcreports: "Won",
  },
  // Add more mock data here
];

const WatchlistM = () => {
  const [data, setData] = useState(initialData);
  const [editIndex, setEditIndex] = useState(-1);
  const [page, setPage] = useState(1); // Current page state

  const itemsPerPage = 5; // Number of items to display per page
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const paginatedData = data.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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
        My Watchlist
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
                        fontWeight: 'bold'
                      }}
                    >
                      Platform
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      Domain
                    </TableCell>
                    <TableCell
                      style={{
                        whiteSpace: "nowrap",
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      Time-Left
                    </TableCell>
                    <TableCell
                      style={{
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      Price
                    </TableCell>
                    <TableCell
                      style={{
                        whiteSpace: "nowrap",
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      Target
                    </TableCell>
                    <TableCell
                      style={{
                        whiteSpace: "nowrap",
                        color: "#311b92",
                        fontWeight: 'bold'
                      }}
                    >
                      GDC Reports
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
                        {row.platform}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.domain}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.timeleft}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.price}
                      </TableCell>
                      <TableCell style={{ whiteSpace: "nowrap" }}>
                        {row.target}
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="body1"
                          style={{
                            color: row.result === "Lost" ? "red" : "green",
                          }}
                        >
                          {row.gdcreports}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box
              sx={{
                display: "flex ",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Pagination
                count={10}
                page={page}
                onChange={handleChangePage}
                renderItem={(item) => (
                  <PaginationItem
                    component={Box}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: "#3E338F",
                        color: "white",
                        width: "auto",
                      },
                    }}
                    {...item}
                  />
                )}
                nextIcon={<ArrowForwardIosRoundedIcon />}
                prevIcon={<ArrowBackIosNewRoundedIcon />}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WatchlistM;
