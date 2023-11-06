// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   MenuItem,
//   Select,
//   Switch,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React, { useState } from "react";

// const Buy = () => {
//   const [plat, setPlat] = useState("Namecheap");
//   const [toggleState, setToggleState] = useState(false);
//   const [selectedOption, setSelectedOption] = useState("");

//   const handleToggle = () => {
//     setToggleState(!toggleState);
//   };
//   const handleOptionChange = (event) => {
//     setSelectedOption(event.target.value);
//   };

//   return (
//     <div>
//       <Typography
//         fontWeight="bold"
//         fontSize="1.2rem"
//         padding="20px 15px 10px"
//         letterSpacing={0.5}
//         color="GrayText"
//       >
//         Bulk Buy Closeouts
//       </Typography>

//       <Box
//         sx={{
//           padding: "5px 10px 5px 15px",
//         }}
//       >
//         <Typography variant="button" color="GrayText">
//           Choose a Platform
//         </Typography>

//         <Select
//           sx={{ alignSelf: "center" }}
//           labelId="demo-simple-select-label"
//           id="demo-simple-select"
//           fullWidth={true}
//           // value={plat}
//           label="Platforms"
//           // onChange={(event) => {
//           //   setPlat(event.target.value);
//           // }}
//           value={selectedOption}
//           onChange={handleOptionChange}
//         >
    
//             <MenuItem value={"Dynadot"}>Dynadot</MenuItem>
//             <MenuItem value={"GoDaddy"}>GoDaddy</MenuItem>
//             <MenuItem value={"Dropcatch"}>Dropcatch</MenuItem>
//             <MenuItem value={"Namecheap"}>Namecheap</MenuItem>
//         </Select>
//       </Box>
//       <Box
//         sx={{ 
//           padding: "20px 10px 5px 15px",
//         }}
//       >
//         {/* <Typography variant="button" color="GrayText">
//           Enter Domains
//         </Typography> */}
//         <TextField
//           id="outlined-textarea"
//           label="Enter a list of Domains"
//           placeholder="Domains"
//           multiline
//           rows={8}
//           margin="normal"
//           fullWidth={true}
//         />
//         <Box
//           sx={{
//             padding: "3px 0px 2px",
//           }}
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <Typography variant="h6" color={"#2D2467"}>
//             Instant Bid
//           </Typography>
//           <Switch
//             checked={toggleState}
//             onChange={handleToggle}
//             color="success"
//           />
//         </Box>
//       </Box>
//       <Box
//         sx={{
//           padding: "20px 10px 5px 15px",
//         }}
//       >
//         <Button
//           style={{
//             width: "100%",
//             borderRadius: "20px",
//             backgroundColor: "#5041B8",
//             color: "#FFF",
//           }}
//           variant="contained"
//           size="large"
//         >
//           Bulk Buy
//         </Button>
//       </Box>
//     </div>
//   );
// };

// export default Buy; 