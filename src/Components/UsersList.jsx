import * as React from 'react';
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { deleteUser, getUsers } from "./api";
import { Cancel, CheckCircle, Delete } from "@mui/icons-material";

export default function UsersList() {

    const Del=(params)=>{

        const [open, setOpen] = React.useState(false);
        const [open1, setOpen1] = React.useState(false);
        const [open2, setOpen2] = React.useState(false);

        const handleClickOpen = () => {
          setOpen(true);
        };
      
        const handleClose = () => {
          setOpen(false);
        };
        return (<Box><Snackbar open={open2} autoHideDuration={4000} anchorOrigin={{ vertical: "top", horizontal: "center" }} onClose={()=>{setOpen(false);}}>
        <Alert onClose={()=>{setOpen2(false);}} severity="info" sx={{ width: '100%' }}>
          User: {params.user.firstName} deleted successfully.
        </Alert>
      </Snackbar>
      <Snackbar open={open1} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} onClose={()=>{setOpen1(false);}}>
        <Alert onClose={()=>{setOpen1(false);}} severity="error" sx={{ width: '100%' }}>
        User: {params.user.firstName} not deleted.
        </Alert>
      </Snackbar><IconButton onClick={handleClickOpen}><Delete/></IconButton> <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete User!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, you want to delete {params.user.firstName} from your database?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Nopes</Button>
          <Button onClick={()=>{deleteUser(params.user.id).then((res)=>{setOpen2(true);setRows(res.data)}).catch((err)=>{setOpen2(true);console.log(err)});handleClose()}} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog></Box>);
    };
    const [rows, setRows] = React.useState([]);
    const columns = [
        { field: 'firstName', headerName: 'User', width: 150 },
        { field: 'lastName', headerName: 'Last Name', width: 150 },
        { field: 'email', headerName: 'E-Mail', width: 400 },
         {
        field: 'telegram',
        headerName: 'Telegram',
        renderCell: (params)=>{if(!params.row.telegram) return(<Box><Cancel sx={{color:'red'}}/> </Box>);
      else
      return(<Box><CheckCircle sx={{color:'green'}}/> </Box>);},
        width: 80,
      },
      {
        field: 'delete',
        headerName: 'Action',
        renderCell: (params)=>{return(<Del user={params.row}/>)},
        width: 70,
      }];
      const [psize,setPsize]=React.useState(50);

React.useEffect(()=>{getUsers()
  .then((response)=>{setRows(response.data);console.log(response.data)}).catch((Error)=>console.log(Error))},[]);


    return(<Box sx={{}}>
        <Stack direction='column' alignItems='flex-start' spacing={2.5}>
          <Typography alignSelf='left' fontWeight='bold' color='text.primary' >
              Users
          </Typography>
              <Box sx={{ width: 852}} >
        <DataGrid autoHeight sx={{ width: '100%'}}
          rows={rows}
          columns={columns}
          pageSize={psize}
          onPageSizeChange={(p)=>{setPsize(p)}}
          rowsPerPageOptions={[10,25,50,100,500]}
          disableSelectionOnClick
          disableColumnSelector
          initialState={{
            columns: {
              columnVisibilityModel: {
                // Hide columns status and traderName, the other columns will remain visible
            
              },
            },
          }}
        
        /></Box>
      
              </Stack></Box>);
}