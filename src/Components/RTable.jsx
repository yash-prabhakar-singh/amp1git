import { Box, Button, Paper, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography, createTheme ,Grid, MenuItem, FormControl, Select, InputLabel} from '@mui/material';
import * as React from 'react';
import axios from 'axios';
import  { getcompletedauctions } from './api';
import {  ThemeProvider } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import CommonFilters from './CommonFilters';
// import AdditionalFilters from './AdditionalFilters';
// import DateTimeFilters from './DateTimeFilters';



// function RTable() {

// const columns = [
//   { field: 'platform', headerName: 'Platform', width: 100 },
//   { field: 'domain', headerName: 'Domain', width: 210 },
//   { field: 'result', headerName: 'Status', width: 100 },
//   { field: 'auctiontype', headerName: 'Auction Type', width: 120 },
//   {
//     field: 'currbid',
//     headerName: 'High Bid',
//     type: 'number',
//     width: 110,
//   },
//   {
//     field: 'bidAmount',
//     headerName: 'Our Max Bid',
//     type: 'number',
//     width: 110,
//   },
//   {
//     field: 'endTimeist',
//     headerName: 'Auction Date',
//     description: 'This column has a value getter and is not sortable.',
//     //sortable: false,
//     type:'date-time',
//     width: 150,
//     valueGetter: (params) =>
//       {return params.row.endTimeist.substring(0,16)},
//   }
// ];

//     let fn=(row)=>{if(row.bidPlaced)
//         return "Yes";
//         else
//         return "No";}

//         const [psize, setPsize] = React.useState(50);

//     const [rows, setRows] = React.useState([]);
//     const [cbid, setCbid] = React.useState("");
// React.useEffect(()=>{getcompletedauctions().then((response)=>{setRows(response.data)}).catch((Error)=>console.log(Error))},[]);
//   //const handleChange = (event) => {
//     //setValue(event.target.value);
//  // };
//     return (
    
//     <Box>
//       <Stack direction='row' justifyContent='center' width='100%'>
//       <Stack direction='column' alignItems='flex-start' spacing={2.5}>
//         <Typography alignSelf='left' fontWeight='bold' color='text.primary'>
//             Auctions' Report
//         </Typography>

  
//       <Box sx={{width:910}} >
//       <DataGrid autoHeight sx={{ width: '100%'}}
//         rows={rows}
//         columns={columns}
//         pageSize={psize}
//         onPageSizeChange={(p)=>{setPsize(p)}}
//         rowsPerPageOptions={[10,25,50,100]}
//         disableSelectionOnClick
//         components={{
//           Toolbar: GridToolbar
//         }}
//         //checkboxSelection
//         //onSelectionModelChange={itm => console.log(itm)}
//       /></Box>
//       </Stack>
//       </Stack>
//       </Box>)}

function RTable() {
  const columns = useMemo(() => [
    { accessorKey: 'platform', header: 'Platform', size: 100 },
    { accessorKey: 'domain', header: 'Domain', size: 210 },
    { accessorKey: 'result', header: 'Status', size: 100 },
    { accessorKey: 'auctiontype', header: 'Auction Type', size: 120 },
    {
      accessorKey: 'currbid',
      header: 'High Bid',
      size: 110,
      Cell: ({ cell }) => cell.getValue(), // Display as string 
    },
    {
      accessorKey: 'bidAmount',
      header: 'Our Max Bid',
      size: 110,
      Cell: ({ cell }) => cell.getValue(), // Display as string
    },
    {
      accessorKey: 'endTimeist',
      header: 'Auction Date',
      size: 150,
      Cell: ({ cell }) => cell.getValue().substring(0, 16), // Display as string
    },
  ], []);

  const [psize, setPsize] = useState(50);
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]); // Store original data
  const [filterColumns, setFilterColumns] = useState([]);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [disabledFilters, setDisabledFilters] = useState({});


  useEffect(() => {
    getcompletedauctions()
      .then((response) => {
        setRows(response.data);
        setOriginalRows(response.data)
        console.log(response.data);
      })
      .catch((Error) => console.log(Error));
  }, []);


  useEffect(() => {
    const initialFilters = columns.reduce((acc, col) => {
      acc[col.accessorKey] = '';
      if (col.accessorKey.includes('Price') || col.accessorKey.includes('currbid') || col.accessorKey.includes('bidAmount') || col.accessorKey.includes('GDV') || col.accessorKey.includes('EST') || col.accessorKey.includes('EUB') || col.accessorKey.includes('ABY') || col.accessorKey.includes('LSV') || col.accessorKey.includes('CPC')) {
        acc[`${col.accessorKey}Min`] = '';
        acc[`${col.accessorKey}Max`] = '';
      }
      return acc;
    }, {});
    // Add domain-specific filters
    initialFilters.allowlistStartsWith = '';
    initialFilters.allowlistContains = '';
    initialFilters.allowlistEndsWith = '';
    initialFilters.blocklistStartsNotWith = '';
    initialFilters.blocklistContainsNot = '';
    initialFilters.blocklistEndsNotWith = '';
    initialFilters.domainNameContains = '';
    initialFilters.vowelsMin = '';
    initialFilters.vowelsMax = '';
    initialFilters.charactersMin = '';
    initialFilters.charactersMax = '';
    initialFilters.platform = '';
    initialFilters.result = ''; // Add status filter
    initialFilters.auctiontype = ''; // Add auctionType filter
    initialFilters.containsAnd = '';
    initialFilters.allowlistOnly = '';
    initialFilters.allowlistAny = '';
    initialFilters.allowlistAll = '';
    initialFilters.blocklist = '';
    initialFilters.patternAllowlist = '';
    initialFilters.patternBlocklist = '';
    initialFilters.noNumbers = false;
    initialFilters.noCharacters = false;
    initialFilters.noHyphens = false;
    initialFilters.noConsecutiveHyphens = false;
    initialFilters.onlyNumbers = false;
    initialFilters.onlyCharacters = false;
    initialFilters.noAdultNames = false;
    initialFilters.lengthMin = '';
    initialFilters.lengthMax = '';
    initialFilters.hyphensMin = '';
    initialFilters.hyphensMax = '';
    initialFilters.vowelsMin = '';
    initialFilters.vowelsMax = '';
    initialFilters.consonantsMin = '';
    initialFilters.consonantsMax = '';
    initialFilters.numbersMin = '';
    initialFilters.numbersMax = '';
    initialFilters.completedEndDate = '';
    initialFilters.completedNamedEnding = '';
    setFilters(initialFilters);
    // setFilterColumns(columns.map(col => col.accessorKey));
    const disabled = {
      auctiontype: !columns.some(col => col.accessorKey === 'auctiontype'),
      currPriceMin: !columns.some(col => col.accessorKey === 'currPrice'),
      currPriceMax: !columns.some(col => col.accessorKey === 'currPrice'),
      ourPriceMin: !columns.some(col => col.accessorKey === 'ourPrice'),
      ourPriceMax: !columns.some(col => col.accessorKey === 'ourPrice'),
      result: !columns.some(col => col.accessorKey === 'result'),
      bidMin: !columns.some(col => col.accessorKey === 'bid'),
      bidMax: !columns.some(col => col.accessorKey === 'bid'),
      gdvMin: !columns.some(col => col.accessorKey === 'gd'),
      gdvMax: !columns.some(col => col.accessorKey === 'gd'),
      estMin: !columns.some(col => col.accessorKey === 'est'),
      estMax: !columns.some(col => col.accessorKey === 'est'),
      eubMin: !columns.some(col => col.accessorKey === 'eub'),
      eubMax: !columns.some(col => col.accessorKey === 'eub'),
      abyMin: !columns.some(col => col.accessorKey === 'aby'),
      abyMax: !columns.some(col => col.accessorKey === 'aby'),
      lsvMin: !columns.some(col => col.accessorKey === 'lsv'),
      lsvMax: !columns.some(col => col.accessorKey === 'lsv'),
      cpcMin: !columns.some(col => col.accessorKey === 'cpc'),
      cpcMax: !columns.some(col => col.accessorKey === 'cpc'),
      endTimeist: !columns.some(col => col.accessorKey === 'endTimeist'),
      currBidMin: !columns.some(col => col.accessorKey === 'currBid'),
      currBidMax: !columns.some(col => col.accessorKey === 'currBid'),
      bidAmountMin: !columns.some(col => col.accessorKey === 'bidAmount'),
      bidAmountMax: !columns.some(col => col.accessorKey === 'bidAmount'),
      registrarContains: !columns.some(col => col.accessorKey === 'registrar'),
      registrarContainsNot: !columns.some(col => col.accessorKey === 'registrar'),
      extns: !columns.some(col => col.accessorKey === 'extns'),
      
      // Add other filters as needed
    };
    setDisabledFilters(disabled);
  }, [columns]);

  useEffect(() => {
    console.log("filters",filters)
  },[filters])
  

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // const applyFilters = () => {
    
  //   console.log('Original rows:', originalRows); // Debugging original rows
  //   const filteredRows = originalRows.filter(row => {
  //     console.log("filters.auctionType",filters.auctiontype,"row.auctionType",row.auctiontype)
  //     return (
  //       (filters.allowlistStartsWith === '' || row.domain.startsWith(filters.allowlistStartsWith)) &&
  //       (filters.allowlistContains === '' || row.domain.includes(filters.allowlistContains)) &&
  //       (filters.allowlistEndsWith === '' || row.domain.endsWith(filters.allowlistEndsWith)) &&
  //       (filters.blocklistStartsNotWith === '' || !row.domain.startsWith(filters.blocklistStartsNotWith)) &&
  //       (filters.blocklistContainsNot === '' || !row.domain.includes(filters.blocklistContainsNot)) &&
  //       (filters.blocklistEndsNotWith === '' || !row.domain.endsWith(filters.blocklistEndsNotWith)) &&
  //       (filters.domainNameContains === '' || row.domain.includes(filters.domainNameContains)) &&
  //       (filters.vowelsMin === '' || (row.domain.match(/[aeiou]/gi) || []).length >= filters.vowelsMin) &&
  //       (filters.vowelsMax === '' || (row.domain.match(/[aeiou]/gi) || []).length <= filters.vowelsMax) &&
  //       (filters.charactersMin === '' || row.domain.length >= filters.charactersMin) &&
  //       (filters.charactersMax === '' || row.domain.length <= filters.charactersMax) &&
  //       (filters.platform === '' || row.platform.includes(filters.platform)) &&
  //       (filters.result === '' || row.result === filters.result) && // Apply status filter
  //       (filters.auctiontype === '' || row.auctiontype === filters.auctiontype) && // Apply auctionType filter
  //       (filters.containsAnd === '' || row.domain.includes(filters.containsAnd)) &&
  //       (filters.allowlistOnly === '' || row.domain === filters.allowlistOnly) &&
  //       (filters.allowlistAny === '' || row.domain.includes(filters.allowlistAny)) &&
  //       (filters.allowlistAll === '' || row.domain.split('').every(char => filters.allowlistAll.includes(char))) &&
  //       (filters.blocklist === '' || !row.domain.includes(filters.blocklist)) &&
  //       (filters.patternAllowlist === '' || new RegExp(filters.patternAllowlist).test(row.domain)) &&
  //       (filters.patternBlocklist === '' || !new RegExp(filters.patternBlocklist).test(row.domain)) &&
  //       (!filters.noNumbers || !/\d/.test(row.domain)) &&
  //       (!filters.noCharacters || !/[a-zA-Z]/.test(row.domain)) &&
  //       (!filters.noHyphens || !/-/.test(row.domain)) &&
  //       (!filters.noConsecutiveHyphens || !/--/.test(row.domain)) &&
  //       (!filters.onlyNumbers || /^\d+$/.test(row.domain)) &&
  //       (!filters.onlyCharacters || /^[a-zA-Z]+$/.test(row.domain)) &&
  //       (!filters.noAdultNames || !/adult|sex|xxx|porn/.test(row.domain)) &&
  //       (filters.lengthMin === '' || row.domain.length >= filters.lengthMin) &&
  //       (filters.lengthMax === '' || row.domain.length <= filters.lengthMax) &&
  //       (filters.hyphensMin === '' || (row.domain.match(/-/g) || []).length >= filters.hyphensMin) &&
  //       (filters.hyphensMax === '' || (row.domain.match(/-/g) || []).length <= filters.hyphensMax) &&
  //       (filters.vowelsMin === '' || (row.domain.match(/[aeiou]/gi) || []).length >= filters.vowelsMin) &&
  //       (filters.vowelsMax === '' || (row.domain.match(/[aeiou]/gi) || []).length <= filters.vowelsMax) &&
  //       (filters.consonantsMin === '' || (row.domain.match(/[^aeiou]/gi) || []).length >= filters.consonantsMin) &&
  //       (filters.consonantsMax === '' || (row.domain.match(/[^aeiou]/gi) || []).length <= filters.consonantsMax) &&
  //       (filters.numbersMin === '' || (row.domain.match(/\d/g) || []).length >= filters.numbersMin) &&
  //       (filters.numbersMax === '' || (row.domain.match(/\d/g) || []).length <= filters.numbersMax)
  //     );
  //   });
  //   setRows(filteredRows);
  // };


  const applyFilters = () => {
    console.log('Applying filters:', filters);
    console.log('Original rows:', originalRows); // Debugging original rows
  
    const filteredRows = originalRows.filter(row => {
      const allowlistStartsWithMatch = filters.allowlistStartsWith === '' || row.domain.startsWith(filters.allowlistStartsWith);
      const allowlistContainsMatch = filters.allowlistContains === '' || row.domain.includes(filters.allowlistContains);
      const allowlistEndsWithMatch = filters.allowlistEndsWith === '' || row.domain.endsWith(filters.allowlistEndsWith);
      const blocklistStartsNotWithMatch = filters.blocklistStartsNotWith === '' || !row.domain.startsWith(filters.blocklistStartsNotWith);
      const blocklistContainsNotMatch = filters.blocklistContainsNot === '' || !row.domain.includes(filters.blocklistContainsNot);
      const blocklistEndsNotWithMatch = filters.blocklistEndsNotWith === '' || !row.domain.endsWith(filters.blocklistEndsNotWith);
      const domainNameContainsMatch = filters.domainNameContains === '' || row.domain.includes(filters.domainNameContains);
      const vowelsMinMatch = filters.vowelsMin === '' || (row.domain.match(/[aeiou]/gi) || []).length >= filters.vowelsMin;
      const vowelsMaxMatch = filters.vowelsMax === '' || (row.domain.match(/[aeiou]/gi) || []).length <= filters.vowelsMax;
      const charactersMinMatch = filters.charactersMin === '' || row.domain.length >= filters.charactersMin;
      const charactersMaxMatch = filters.charactersMax === '' || row.domain.length <= filters.charactersMax;
      const platformMatch = filters.platform === '' || row.platform.includes(filters.platform);
      const resultMatch = filters.result === '' || row.result === filters.result; // Apply status filter
      const auctiontypeMatch = filters.auctiontype === '' || row.auctiontype === filters.auctiontype; // Apply auctionType filter
      const containsAndMatch = filters.containsAnd === '' || row.domain.includes(filters.containsAnd);
      const allowlistOnlyMatch = filters.allowlistOnly === '' || row.domain === filters.allowlistOnly;
      const allowlistAnyMatch = filters.allowlistAny === '' || row.domain.includes(filters.allowlistAny);
      const allowlistAllMatch = filters.allowlistAll === '' || row.domain.split('').every(char => filters.allowlistAll.includes(char));
      const blocklistMatch = filters.blocklist === '' || !row.domain.includes(filters.blocklist);
      const patternAllowlistMatch = filters.patternAllowlist === '' || new RegExp(filters.patternAllowlist).test(row.domain);
      const patternBlocklistMatch = filters.patternBlocklist === '' || !new RegExp(filters.patternBlocklist).test(row.domain);
      const noNumbersMatch = !filters.noNumbers || !/\d/.test(row.domain);
      const noCharactersMatch = !filters.noCharacters || !/[a-zA-Z]/.test(row.domain);
      const noHyphensMatch = !filters.noHyphens || !/-/.test(row.domain);
      const noConsecutiveHyphensMatch = !filters.noConsecutiveHyphens || !/--/.test(row.domain);
      const onlyNumbersMatch = !filters.onlyNumbers || /^\d+$/.test(row.domain);
      const onlyCharactersMatch = !filters.onlyCharacters || /^[a-zA-Z]+$/.test(row.domain);
      const noAdultNamesMatch = !filters.noAdultNames || !/adult|sex|xxx|porn/.test(row.domain);
      const lengthMinMatch = filters.lengthMin === '' || row.domain.length >= filters.lengthMin;
      const lengthMaxMatch = filters.lengthMax === '' || row.domain.length <= filters.lengthMax;
      const hyphensMinMatch = filters.hyphensMin === '' || (row.domain.match(/-/g) || []).length >= filters.hyphensMin;
      const hyphensMaxMatch = filters.hyphensMax === '' || (row.domain.match(/-/g) || []).length <= filters.hyphensMax;
      const consonantsMinMatch = filters.consonantsMin === '' || (row.domain.match(/[^aeiou]/gi) || []).length >= filters.consonantsMin;
      const consonantsMaxMatch = filters.consonantsMax === '' || (row.domain.match(/[^aeiou]/gi) || []).length <= filters.consonantsMax;
      const numbersMinMatch = filters.numbersMin === '' || (row.domain.match(/\d/g) || []).length >= filters.numbersMin;
      const numbersMaxMatch = filters.numbersMax === '' || (row.domain.match(/\d/g) || []).length <= filters.numbersMax;

      console.log("row.currbid", row.currbid);
      const highBid = parseFloat((row.currbid || '').toString().replace(/[^0-9.-]+/g, ''));

      console.log("row.bidAmount", row.bidAmount);
      const ourMaxBid = parseFloat((row.bidAmount || '').toString().replace(/[^0-9.-]+/g, ''));

      const highBidMinMatch = filters.currbidMin === '' || highBid >= parseFloat(filters.currbidMin);
      const highBidMaxMatch = filters.currbidMax === '' || highBid <= parseFloat(filters.currbidMax);

      const ourMaxBidMinMatch = filters.bidAmountMin === '' || ourMaxBid >= parseFloat(filters.bidAmountMin);
      const ourMaxBidMaxMatch = filters.bidAmountMax === '' || ourMaxBid <= parseFloat(filters.bidAmountMax);

      const completedEndDateMatch = filters.completedEndDate === '' || row.endTimeist.startsWith(filters.completedEndDate);
      const completedNamedEndingMatch = filters.completedNamedEnding === '' || (filters.completedNamedEnding === 'Ended Today' && new Date(row.endTimeist).toDateString() === new Date().toDateString()) || (filters.completedNamedEnding === 'Ended Yesterday' && new Date(row.endTimeist).toDateString() === new Date(Date.now() - 86400000).toDateString());
  
      const matches = {
        allowlistStartsWithMatch,
        allowlistContainsMatch,
        allowlistEndsWithMatch,
        blocklistStartsNotWithMatch,
        blocklistContainsNotMatch,
        blocklistEndsNotWithMatch,
        domainNameContainsMatch,
        vowelsMinMatch,
        vowelsMaxMatch,
        charactersMinMatch,
        charactersMaxMatch,
        platformMatch,
        resultMatch,
        auctiontypeMatch,
        containsAndMatch,
        allowlistOnlyMatch,
        allowlistAnyMatch,
        allowlistAllMatch,
        blocklistMatch,
        patternAllowlistMatch,
        patternBlocklistMatch,
        noNumbersMatch,
        noCharactersMatch,
        noHyphensMatch,
        noConsecutiveHyphensMatch,
        onlyNumbersMatch,
        onlyCharactersMatch,
        noAdultNamesMatch,
        lengthMinMatch,
        lengthMaxMatch,
        hyphensMinMatch,
        hyphensMaxMatch,
        consonantsMinMatch,
        consonantsMaxMatch,
        numbersMinMatch,
        numbersMaxMatch,
        highBidMinMatch,
        highBidMaxMatch,
        ourMaxBidMinMatch,
        ourMaxBidMaxMatch,
        completedEndDateMatch,
        completedNamedEndingMatch
      };
  
      console.log('Row:', row);
      console.log("row.bidAmount",row.bidAmount)
      console.log('Matches:', matches);
  
      return Object.values(matches).every(Boolean);
    });
  
    console.log('Filtered rows:', filteredRows); // Debugging filtered rows
    setRows(filteredRows);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };



  const table = useMaterialReactTable({
    columns,
    data: rows,
    initialState: {
      pagination: { pageSize: psize },
      sorting: [{ id: 'endTimeist', desc: true }],
    },
    muiTablePaperProps:{
      sx: { width: '100%' },
    }
    // state: {
    //   pagination: { pageSize: psize },
    // },
    // onPaginationChange: ({ pageSize }) => setPsize(pageSize),
  });

    return (
       <ThemeProvider theme={createTheme({
      palette: {
        primary: { main: '#000' },
        secondary: { main: '#edf2ff' },
      },
      typography: {
        fontFamily: ['Nunito', 'Train One', 'Roboto', 'sans-serif', 'cursive'].join(","),
      },
    })}>
      <Stack direction='column' alignItems='flex-start' sx={{ width: '100%' }} spacing={3}>
        <Box sx={{ width: '100%', paddingLeft: 2, paddingTop: 2 }}>
          <Stack direction="column" alignItems="flex-start" spacing={2}>
            <Typography variant="h4" gutterBottom>Auctions' Report</Typography>
            <Button onClick={() => setShowFilters(!showFilters)} sx={{ marginBottom: 2 }}>
              {showFilters ? 'Hide Filters' : 'Apply Filter'}
            </Button>
          </Stack>
        </Box>
        {showFilters && (
          <Paper elevation={3} sx={{ padding: 2, marginBottom: 2, width: '100%' }}>
            <Tabs value={selectedTab} onChange={handleTabChange} aria-label="filter tabs">
              <Tab label="Common" />
              <Tab label="Additional" />
              <Tab label="Date/Time" />
            </Tabs>
            <Box sx={{ padding: 2 }}>
              {selectedTab === 0 && (
                <CommonFilters filters={filters} 
                  setFilters={setFilters} 
                  handleFilterChange={handleFilterChange} 
                  // filterColumns={filterColumns}
                />
              )}
              {selectedTab === 1 && (
                <AdditionalFilters filters={filters} 
                  handleFilterChange={handleFilterChange} 
                  disabledFilters={disabledFilters}
                  // filterColumns={filterColumns}
                />
              )}
              {selectedTab === 2 && (
                <DateTimeFilters filters={filters} 
                  handleFilterChange={handleFilterChange} 
                  originalRows={originalRows}
                  // filterColumns={filterColumns}
                /> 
              )}
            </Box>
            <Button onClick={applyFilters} sx={{ marginTop: 2 }}>Apply Filters</Button>
          </Paper>
        )}
        <Box sx={{ width: '100%', overflowX: 'auto' }}>
          <Box sx={{ minWidth: 910 }}>
            <MaterialReactTable table={table} />
          </Box>
        </Box>
      </Stack>
    </ThemeProvider>
    );
  }

  const AdditionalFilters = ({ filters, handleFilterChange, disabledFilters}) => {
    const boxStyle = {
      flex: 1,
      marginBottom: 2,
      border: '1px solid #5A5A5A',
      padding: 2,
      borderWidth: 2,
      borderRadius: 2,
      height: 'auto', // Adjust height to auto to fit content
    };
  
    // const [isStatusDisabled, setIsStatusDisabled] = React.useState(false);
    // const [isAuctionTypeDisabled, setIsAuctionTypeDisabled] = React.useState(false);
    // const [isCurrentPriceDisabled, setIsCurrentPriceDisabled] = React.useState(false);
    // const [isOurPriceDisabled, setIsOurPriceDisabled] = React.useState(false);  
    // const [isHighBidDisabled, setIsHighBidDisabled] = React.useState(false);  
    // const [isOurMaxBidDisabled, setIsOurMaxBidDisabled] = React.useState(false);
    // const [isGDVDisabled, setIsGDVDisabled] = React.useState(false);
    // const [isESTDisabled, setIsESTDisabled] = React.useState(false);
    // const [isEUBDisabled, setIsEUBDisabled] = React.useState(false);
    // const [isABYDisabled, setIsABYDisabled] = React.useState(false);
    // const [isLSVDisabled, setIsLSVDisabled] = React.useState(false);
    // const [isCPCDisabled, setIsCPCDisabled] = React.useState(false);
    // const [isRegistrarDisabled, setIsRegistrarDisabled] = React.useState(false);
    // const [isExtnsDisabled, setIsExtnsDisabled] = React.useState(false);
  
    // React.useEffect(() => {
    //   setIsStatusDisabled(!filterColumns?.includes('status'));
    //   setIsAuctionTypeDisabled(!filterColumns?.includes('auctionType'));
    //   setIsCurrentPriceDisabled(!filterColumns?.includes('currPrice'));
    //   setIsOurPriceDisabled(!filterColumns?.includes('ourPrice'));
    //   setIsHighBidDisabled(!filterColumns?.includes('highBid'));
    //   setIsOurMaxBidDisabled(!filterColumns?.includes('bidAmount'));
    //   setIsGDVDisabled(!filterColumns?.includes('gdv'));
    //   setIsESTDisabled(!filterColumns?.includes('estibot'));
    //   setIsEUBDisabled(!filterColumns?.includes('end_users_buyers'));
    //   setIsABYDisabled(!filterColumns?.includes('wayback_age'));
    //   setIsLSVDisabled(!filterColumns?.includes('keyword_exact_lsv'));
    //   setIsCPCDisabled(!filterColumns?.includes('keyword_exact_cpc'));
    //   setIsRegistrarDisabled(!filterColumns?.includes('whois_registrar'));
    //   setIsExtnsDisabled(!filterColumns?.includes('extensions_taken'));
    // }, [filterColumns]);
  
    // React.useEffect(() => {
    //   console.log('filterColumns', filterColumns);
    // }, [filterColumns]);
  
    // const disabledStates = {
    //   'Current price': isCurrentPriceDisabled,
    //   'Our price': isOurPriceDisabled,
    //   'High bid': isHighBidDisabled,
    //   'Our max bid': isOurMaxBidDisabled,
    //   'GDV': isGDVDisabled,
    //   'EST': isESTDisabled,
    //   'EUB': isEUBDisabled,
    //   'ABY': isABYDisabled,
    //   'LSV': isLSVDisabled,
    //   'CPC': isCPCDisabled,
    // };
  
    return (
      <Box sx={{ padding: 3, border: '3px solid #636363', borderRadius: 2, marginBottom: 2, width: '100%', overflow: 'auto' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>Additional Filters</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={boxStyle}>
              <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Status</Typography>
              <FormControl fullWidth margin="dense" size="small">
                <InputLabel>Status</InputLabel>
                <Select
                  name="result"
                  value={filters.result}
                  onChange={handleFilterChange}
                  label="Status"
                  disabled={disabledFilters.result}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="Won">Won</MenuItem>
                  <MenuItem value="Lost">Lost</MenuItem>
                  <MenuItem value="Bought">Bought</MenuItem>
                  <MenuItem value="In Cart">In Cart</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <Box sx={boxStyle}>
              <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Auction Type</Typography>
              <FormControl fullWidth margin="dense" size="small">
                <InputLabel>Auction Type</InputLabel>
                <Select
                  name="auctiontype"
                  value={filters.auctiontype}
                  onChange={handleFilterChange}
                  label="Auction Type"
                  disabled={disabledFilters.auctiontype}
                  // disabled={isAuctionTypeDisabled}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  <MenuItem value="Bid">Bid</MenuItem>
                  <MenuItem value="PreRelease">PreRelease</MenuItem>
                  <MenuItem value="expired">Expired</MenuItem>
                  <MenuItem value="Offer">Offer</MenuItem>
                  <MenuItem value="BuyNow">BuyNow</MenuItem>
                  <MenuItem value="portfolio">portfolio</MenuItem>
                  <MenuItem value="Offer With BuyNow">Offer with BuyNow</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Grid>
  
          {['currPrice', 'ourPrice', 'currbid', 'bidAmount', 'gdv', 'est', 'eub', 'aby', 'lsv', 'cpc'].map((filter) => (
            <Grid item xs={12} sm={6} key={filter}>
              <Box sx={boxStyle}>
                <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>{filter}</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField    
                      label="Min"
                      name={`${filter}Min`}
                      value={filters[`${filter}Min`]}
                      onChange={handleFilterChange}
                      fullWidth
                      margin="dense"
                      size="small"
                      disabled={disabledFilters[`${filter}Min`]}
                      // disabled={disabledStates[filter]}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="Max"
                      name={`${filter}Max`}
                      value={filters[`${filter}Max`]}
                      onChange={handleFilterChange}
                      fullWidth
                      margin="dense"
                      size="small"
                      disabled={disabledFilters[`${filter}Max`]}
                      // disabled={disabledStates[filter]}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
          <Grid item xs={12} sm={6}>
            <Box sx={boxStyle}>
              <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Registrar</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  label="contains"
                  name="registrarContains"
                  value={filters.registrarContains}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1 }}
                  disabled={disabledFilters.registrarContains}
                  // disabled={isRegistrarDisabled}
                />
                <TextField
                  label="contains not"
                  name="registrarContainsNot"
                  value={filters.registrarContainsNot}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1 }}
                  disabled={disabledFilters.registrarContainsNot}
                  // disabled={isRegistrarDisabled}
                />
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={boxStyle}>
              <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Extns</Typography>
              <TextField
                label="Extns"
                name="extns"
                value={filters.extns}
                onChange={handleFilterChange}
                fullWidth
                margin="dense"  
                size="small"
                sx={{ marginBottom: 1 }}
                disabled={disabledFilters.extns}
                // disabled={isExtnsDisabled}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

  const DateTimeFilters = ({ filters, handleFilterChange, originalRows }) => {
    const boxStyle = {
      flex: 1,
      marginBottom: 2,
      border: '1px solid #5A5A5A',
      padding: 2,
      borderWidth: 2,
      borderRadius: 2,
      height: 'auto', // Adjust height to auto to fit content
    };
  
    const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  
    return (
      <Box sx={{ padding: 3, border: '3px solid #636363', borderRadius: 2, marginBottom: 2, width: '100%', overflow: 'auto' }}>
        <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 2 }}>Date/Time Filters</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box sx={boxStyle}>
              <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Running Auction</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <InputLabel sx={{ fontWeight:700 }}>End Date</InputLabel>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth margin="dense" size="small">
                    <Select
                      name="runningEndDate"
                      value={filters.runningEndDate}
                      onChange={handleFilterChange}
                      label="End Date"
                      disabled
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="date1">Date 1</MenuItem>
                      <MenuItem value="date2">Date 2</MenuItem>
                      {/* Add more options as needed */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel sx={{ fontWeight:700 }}>Named Ending</InputLabel>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth margin="dense" size="small">
                    <Select
                      name="runningNamedEnding"
                      value={filters.runningNamedEnding}
                      onChange={handleFilterChange}
                      label="Named Ending"
                      disabled
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="name1">Name 1</MenuItem>
                      <MenuItem value="name2">Name 2</MenuItem>
                      {/* Add more options as needed */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel sx={{ fontWeight:700 }}>Ends in Hours</InputLabel>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="min"
                    name="runningEndsInDaysMin"
                    value={filters.runningEndsInDaysMin}
                    onChange={handleFilterChange}
                    fullWidth
                    margin="dense"
                    size="small"
                    sx={{ marginBottom: 1 }}
                    disabled
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="max"
                    name="runningEndsInDaysMax"
                    value={filters.runningEndsInDaysMax}
                    onChange={handleFilterChange}
                    fullWidth
                    margin="dense"
                    size="small"
                    sx={{ marginBottom: 1 }}
                    disabled
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
  
          <Grid item xs={12} sm={6}>
            <Box sx={boxStyle}>
              <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Completed Auctions</Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={4}>
                  <InputLabel sx={{ fontWeight:700 }}>End Date</InputLabel>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth margin="dense" size="small">
                    <Select
                      name="completedEndDate"
                      value={filters.completedEndDate}
                      onChange={handleFilterChange}
                      // label="End Date"
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      {originalRows.map(row => (
                        <MenuItem key={row.endTimeist} value={row.endTimeist.split(' ')[0]}>
                          {row.endTimeist.split(' ')[0]}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel sx={{ fontWeight:700 }}>Named Ending</InputLabel>
                </Grid>
                <Grid item xs={8}>
                  <FormControl fullWidth margin="dense" size="small">
                    <Select
                      name="completedNamedEnding"
                      value={filters.completedNamedEnding}
                      onChange={handleFilterChange}
                      // label="Named Ending"
                    >
                      <MenuItem value=""><em>None</em></MenuItem>
                      <MenuItem value="endedToday">Ended today</MenuItem>
                      <MenuItem value="endedYesterday">Ended yesterday</MenuItem>
                      {/* Add more options as needed */}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <InputLabel sx={{ fontWeight:700 }}>Ends in Days</InputLabel>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="min"
                    name="completedEndsInDaysMin"
                    value={filters.completedEndsInDaysMin}
                    onChange={handleFilterChange}
                    fullWidth
                    margin="dense"
                    size="small"
                    sx={{ marginBottom: 1 }}
                    disabled
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    label="max"
                    name="completedEndsInDaysMax"
                    value={filters.completedEndsInDaysMax}
                    onChange={handleFilterChange}
                    fullWidth
                    margin="dense"
                    size="small"
                    sx={{ marginBottom: 1 }}
                    disabled
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  };

export default RTable;