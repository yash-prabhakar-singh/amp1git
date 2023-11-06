import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Box,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const initialData = [
  { id: 1, domain: "somethingelse.com", ourmaxbid: 30, endedprice: 300 },
  { id: 2, domain: "somethingelse.in", ourmaxbid: 40, endedprice: 500 },
  { id: 3, domain: "somethingelse.com", ourmaxbid: 50, endedprice: 800 },
];

const EditableTable = () => {
  const [data, setData] = useState(initialData);
  const [selectedRow, setSelectedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editedDomain, setEditedDomain] = useState("");
  const [ourmaxbid, setOurMaxBid] = useState("");
  const [endedprice, setEndedPrice] = useState("");

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setEditedDomain(row.name);
    setOurMaxBid(row.ourmaxvalue);
    setOpenDialog(true);
    setEndedPrice(row.endedprice);
  };

  const handleSaveChanges = () => {
    const updatedData = data.map((row) =>
      row.id === selectedRow.id
        ? {
            ...row,
            domain: editedDomain,
            ourmaxbid: ourmaxbid,
            endedprice: endedprice,
          }
        : row
    );
    setData(updatedData);
    setOpenDialog(false);
  };
  const handleDeleteClick = (row) => {
    const updatedData = data.filter((item) => item.id !== row.id);
    setData(updatedData);
  };
  const columns = [
    { field: "Domain", headerName: "Domain", width: 150 },
    { field: "Our Max Bid", headerName: "Our Max Bid", width: 150 },
    {
      field: "Ended Price",
      headerName: "Ended Price",
      width: 150,
      renderCell: (params) => {
        const profit = params.value > 0;
        return (
          <div style={{ color: profit ? "green" : "red" }}>
            {profit ? `+${params.value}` : params.value}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <>
          <Button onClick={() => handleEditClick(params.row)}>
            <EditIcon />
          </Button>
          <Button onClick={() => handleDeleteClick(params.row)}>
            <DeleteIcon />
          </Button>
        </>
      ),
    },
  ];
  return (
    <div>
       <Typography
        fontWeight="bold"
        fontSize="1.3rem"
        padding="20px 10px 0px"
        letterSpacing={0.5}
        color="GrayText"
      >
        Scheduled Table
      </Typography>
    <Box padding ='50px 10px'>
      <Grid container spacing={0}>
            <Grid item xs={12}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          checkboxSelection
        />
      </div>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Edit Row</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <TextField
                label="Domain"
                value={editedDomain}
                onChange={(e) => setEditedDomain(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Our Max Bid"
                value={ourmaxbid}
                onChange={(e) => setOurMaxBid(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Ended Price"
                value={endedprice}
                onChange={(e) => setEndedPrice(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogActions>
      </Dialog>
      </Grid>
      </Grid>
    </Box>
    </div>
  );
};
export default EditableTable;
