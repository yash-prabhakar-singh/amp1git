import * as React from 'react';
import { Box, Button, Stack, Typography, Paper, Tabs, Tab, Snackbar, Alert, TextField, IconButton, createTheme,ThemeProvider,Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { useMemo, useState, useEffect, useRef } from 'react';
import { getscheduledauctions, schedulebiddcsingle, schedulebiddynasingle, schedulebidgdsingle, schedulebidncsingle, schedulebidnssingle, cancelBidDc, cancelBidDd, cancelBidGd, cancelBidNc, cancelBidNs } from './api';
import CommonFilters from './CommonFilters';
// import AdditionalFilters from './AdditionalFilters';
// import DateTimeFilters from './DateTimeFilters';
import { canBidDC, canBidDD, canBidGD, canBidNC, canBidNS } from './msalService';
import { Gavel, Delete, Cancel, CheckCircle } from '@mui/icons-material';

export default function ScheduledTable() {
  const columns = useMemo(() => [
    { accessorKey: 'platform', header: 'Platform', size: 100 },
    { accessorKey: 'domain', header: 'Domain', size: 210 },
    { accessorKey: 'type', header: 'Type', size: 50, 
      Cell: ({ cell }) => {
        const value = cell.getValue();
        return value && value.charAt(0).toUpperCase() === 'E' ? 'E' : 'O';
      }
    },
    { accessorKey: 'status', header: 'Status', size: 70, 
      Cell: ({ cell }) => cell.getValue() === 'Outbid' ? <Cancel sx={{ color: 'red' }} /> : <CheckCircle sx={{ color: 'green' }} /> 
    },
    { accessorKey: 'bidders', header: 'Bidders', size: 70 },
    { accessorKey: 'estibot', header: 'EST', size: 90 },
    { accessorKey: 'gdv', header: 'GDV', size: 90 },
    { accessorKey: 'currbid', header: 'Current Bid', size: 95 },
    { accessorKey: 'time_left', header: 'Time Left', size: 120, 
      Cell: ({ cell }) => cell.getValue(), 
      sortingFn: (rowA, rowB) => new Date(rowA.original.endTimeist) - new Date(rowB.original.endTimeist)
    },
    { accessorKey: 'bidAmount', header: 'Our Max Bid', size: 120, 
      //Cell: ({ cell }) => <MaxBid {...cell.row.original} /> 
    },
    { accessorKey: 'extensions_taken', header: 'Extns', size: 50 },
    { accessorKey: 'keyword_exact_lsv', header: 'LSV', size: 60 },
    { accessorKey: 'keyword_exact_cpc', header: 'CPC', size: 60 },
    { accessorKey: 'whois_registrar', header: 'Registrar', size: 130 },
    { accessorKey: 'end_users_buyers', header: 'EUB', size: 60 },
    { accessorKey: 'wayback_age', header: 'ABY', size: 60 },
  ], []);

  const [psize, setPsize] = useState(50);
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]); // Store original data
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [disabledFilters, setDisabledFilters] = useState({});
  const res = useRef("");

  useEffect(() => {
    getscheduledauctions().then((response) => {
      setRows(response.data);
      setOriginalRows(response.data); // Ensure originalRows is set
    }).catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const initialFilters = columns.reduce((acc, col) => {
      acc[col.accessorKey] = '';
      if (col.accessorKey.includes('Price') || col.accessorKey.includes('estibot') || col.accessorKey.includes('gdv') || col.accessorKey.includes('currbid') || col.accessorKey.includes('maxbid') || col.accessorKey.includes('keyword_exact_lsv') || col.accessorKey.includes('keyword_exact_cpc') || col.accessorKey.includes('whois_registrar') || col.accessorKey.includes('end_users_buyers') || col.accessorKey.includes('wayback_age')) {
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
    initialFilters.auctiontype = ''; // Add auctionType filter
    // Add date/time filters
    initialFilters.runningEndDate = '';
    initialFilters.runningNamedEnding = '';
    initialFilters.runningEndsInDaysMin = '';
    initialFilters.runningEndsInDaysMax = '';
    initialFilters.completedEndDate = '';
    initialFilters.completedNamedEnding = '';
    initialFilters.completedEndsInDaysMin = '';
    initialFilters.completedEndsInDaysMax = '';
    initialFilters.whois_registrarContains = '';
    initialFilters.whois_registrarContainsNot = '';
    setFilters(initialFilters);

    const disabled = {
      auctionType: !columns.some(col => col.accessorKey === 'auctionType'),
      currPriceMin: !columns.some(col => col.accessorKey === 'currPrice'),
      currPriceMax: !columns.some(col => col.accessorKey === 'currPrice'),
      ourPriceMin: !columns.some(col => col.accessorKey === 'ourPrice'),
      ourPriceMax: !columns.some(col => col.accessorKey === 'ourPrice'),
      status: !columns.some(col => col.accessorKey === 'status'),
      bidMin: !columns.some(col => col.accessorKey === 'bid'),
      bidMax: !columns.some(col => col.accessorKey === 'bid'),
      gdvMin: !columns.some(col => col.accessorKey === 'gdv'),
      gdvMax: !columns.some(col => col.accessorKey === 'gdv'),
      estMin: !columns.some(col => col.accessorKey === 'estibot'),
      estMax: !columns.some(col => col.accessorKey === 'estibot'),
      eubMin: !columns.some(col => col.accessorKey === 'eub'),
      eubMax: !columns.some(col => col.accessorKey === 'eub'),
      abyMin: !columns.some(col => col.accessorKey === 'aby'),
      abyMax: !columns.some(col => col.accessorKey === 'aby'),
      lsvMin: !columns.some(col => col.accessorKey === 'lsv'),
      lsvMax: !columns.some(col => col.accessorKey === 'lsv'),
      cpcMin: !columns.some(col => col.accessorKey === 'cpc'),
      cpcMax: !columns.some(col => col.accessorKey === 'cpc'),
      endTimeist: !columns.some(col => col.accessorKey === 'endTimeist'),
      highBidMin: !columns.some(col => col.accessorKey === 'currbid'),
      highBidMax: !columns.some(col => col.accessorKey === 'currbid'),
      ourMaxBidMin: !columns.some(col => col.accessorKey === 'maxbid'),
      ourMaxBidMax: !columns.some(col => col.accessorKey === 'maxbid'),
      whois_registrarContains: !columns.some(col => col.accessorKey === 'whois_registrar'),
      whois_registrarContainsNot: !columns.some(col => col.accessorKey === 'whois_registrar'),
      extns: !columns.some(col => col.accessorKey === 'extns'),
      
      // Add other filters as needed
    };
    setDisabledFilters(disabled);
  }, [columns]);

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: type === 'checkbox' ? checked : value,
    }));
    console.log('Updated filters:', { ...filters, [name]: type === 'checkbox' ? checked : value }); // Debugging filter changes
  };

  const applyFilters = () => {
    console.log('Applying filters:', filters);
    console.log('Original rows:', originalRows); // Debugging original rows

    const filteredRows = originalRows.filter(row => {
      const allowlistStartsWithMatch = filters.allowlistStartsWith === '' || row.domain.toLowerCase().startsWith(filters.allowlistStartsWith.toLowerCase().trim());
      const allowlistContainsMatch = filters.allowlistContains === '' || row.domain.toLowerCase().includes(filters.allowlistContains.toLowerCase().trim());
      const allowlistEndsWithMatch = filters.allowlistEndsWith === '' || row.domain.toLowerCase().endsWith(filters.allowlistEndsWith.toLowerCase().trim());
      const blocklistStartsNotWithMatch = filters.blocklistStartsNotWith === '' || !row.domain.toLowerCase().startsWith(filters.blocklistStartsNotWith.toLowerCase().trim());
      const blocklistContainsNotMatch = filters.blocklistContainsNot === '' || !row.domain.toLowerCase().includes(filters.blocklistContainsNot.toLowerCase().trim());
      const blocklistEndsNotWithMatch = filters.blocklistEndsNotWith === '' || !row.domain.toLowerCase().endsWith(filters.blocklistEndsNotWith.toLowerCase().trim());
      const domainNameContainsMatch = filters.domainNameContains === '' || row.domain.toLowerCase().includes(filters.domainNameContains.toLowerCase().trim());
      const vowelsMinMatch = filters.vowelsMin === '' || (row.domain.match(/[aeiou]/gi) || []).length >= filters.vowelsMin;
      const vowelsMaxMatch = filters.vowelsMax === '' || (row.domain.match(/[aeiou]/gi) || []).length <= filters.vowelsMax;
      const charactersMinMatch = filters.charactersMin === '' || row.domain.length >= filters.charactersMin;
      const charactersMaxMatch = filters.charactersMax === '' || row.domain.length <= filters.charactersMax;
      const platformMatch = filters.platform === '' || row.platform.toLowerCase().includes(filters.platform.toLowerCase().trim());
      const auctiontypeMatch = filters.auctiontype === '' || row.auctype.toLowerCase() === filters.auctiontype.toLowerCase().trim();
      console.log("row.currbid",typeof(row.currbid))
      console.log("row.maxbid",typeof(row.bidAmount))
      const currPrice = parseFloat(row.currbid.replace(/[^0-9.-]+/g, ""));
      const estibot = row.estibot;
      const gdv = row.gdv;
      const maxbid = parseFloat(row.bidAmount.replace(/[^0-9.-]+/g, ""));
      const lsv = row.keyword_exact_lsv;
      const cpc = row.keyword_exact_cpc;
      const eub = row.end_users_buyers;
      const aby = row.wayback_age;

      // const ourpriceMinMatch = filters.ourPriceMin === '' || ourPrice >= parseFloat(filters.ourPriceMin);
      // const ourpriceMaxMatch = filters.ourPriceMax === '' || ourPrice <= parseFloat(filters.ourPriceMax);
      const currpriceMinMatch = filters.currbidMin === '' || currPrice >= parseFloat(filters.currbidMin);
      const currpriceMaxMatch = filters.currbidMax === '' || currPrice <= parseFloat(filters.currbidMax);
      const estibotMinMatch = filters.estibotMin === '' || estibot >= parseFloat(filters.estibotMin);
      const estibotMaxMatch = filters.estibotMax === '' || estibot <= parseFloat(filters.estibotMax);
      const gdvMinMatch = filters.gdvMin === '' || gdv >= parseFloat(filters.gdvMin);
      const gdvMaxMatch = filters.gdvMax === '' || gdv <= parseFloat(filters.gdvMax);
      const maxbidMinMatch = filters.maxbidMin === '' || maxbid >= parseFloat(filters.maxbidMin);
      const maxbidMaxMatch = filters.maxbidMax === '' || maxbid <= parseFloat(filters.maxbidMax);
      const lsvMinMatch = filters.keyword_exact_lsvMin === '' || lsv >= parseFloat(filters.keyword_exact_lsvMin);
      const lsvMaxMatch = filters.keyword_exact_lsvMax === '' || lsv <= parseFloat(filters.keyword_exact_lsvMax);
      const cpcMinMatch = filters.keyword_exact_cpcMin === '' || cpc >= parseFloat(filters.keyword_exact_cpcMin);
      const cpcMaxMatch = filters.keyword_exact_cpcMax === '' || cpc <= parseFloat(filters.keyword_exact_cpcMax);
      const eubMinMatch = filters.end_users_buyersMin === '' || eub >= parseFloat(filters.end_users_buyersMin);
      const eubMaxMatch = filters.end_users_buyersMax === '' || eub <= parseFloat(filters.end_users_buyersMax);
      const abyMinMatch = filters.wayback_ageMin === '' || aby >= parseFloat(filters.wayback_ageMin);
      const abyMaxMatch = filters.wayback_ageMax === '' || aby <= parseFloat(filters.wayback_ageMax);

      // const runningEndDateMatch = filters.runningEndDate === '' || row.runningEndDate === filters.runningEndDate;
      // const runningNamedEndingMatch = filters.runningNamedEnding === '' || row.runningNamedEnding === filters.runningNamedEnding;
      // const runningEndsInHoursMinMatch = filters.runningEndsInDaysMin === '' || row.runningEndsInDays >= filters.runningEndsInDaysMin;
      // const runningEndsInHoursMaxMatch = filters.runningEndsInDaysMax === '' || row.runningEndsInDays <= filters.runningEndsInDaysMax;

      const runningEndDateMatch = filters.runningEndDate === '' || row.time_left.startsWith(filters.runningEndDate);
      const runningNamedEndingMatch = filters.runningNamedEnding === '' || (filters.runningNamedEnding === 'endingToday' && new Date(row.time_left).toDateString() === new Date().toDateString()) || (filters.runningNamedEnding === 'endedYesterday' && new Date(row.time_left).toDateString() === new Date(Date.now() - 86400000).toDateString() || (filters.runningNamedEnding==="endingTommorrow" ) && new Date(row.time_left).toDateString() === new Date(Date.now() + 86400000).toDateString());
    
      // const completedEndDateMatch = filters.completedEndDate === '' || row.completedEndDate === filters.completedEndDate;
      // const completedNamedEndingMatch = filters.completedNamedEnding === '' || row.completedNamedEnding === filters.completedNamedEnding;
      // const completedEndsInDaysMinMatch = filters.completedEndsInDaysMin === '' || row.completedEndsInDays >= filters.completedEndsInDaysMin;
      // const completedEndsInDaysMaxMatch = filters.completedEndsInDaysMax === '' || row.completedEndsInDays <= filters.completedEndsInDaysMax;

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
        auctiontypeMatch,
        // ourpriceMinMatch,
        // ourpriceMaxMatch,
        currpriceMinMatch,
        currpriceMaxMatch,
        estibotMinMatch,
        estibotMaxMatch,
        gdvMinMatch,
        gdvMaxMatch,
        maxbidMinMatch,
        maxbidMaxMatch,
        lsvMinMatch,
        lsvMaxMatch,
        cpcMinMatch,
        cpcMaxMatch,
        eubMinMatch,
        eubMaxMatch,
        abyMinMatch,
        abyMaxMatch,
        runningEndDateMatch,
        runningNamedEndingMatch,
        // runningEndsInHoursMinMatch,
        // runningEndsInHoursMaxMatch,
        // completedEndDateMatch,
        // completedNamedEndingMatch,
        // completedEndsInDaysMinMatch,
        // completedEndsInDaysMaxMatch
      };

      console.log('Row:', row);
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
    columns: columns,
    data: rows,
    initialState: {
      pagination: { pageSize: psize },
      sorting: [{ id: 'endTimeist', desc: true }],
    },
    manualPagination: true,
    pageCount: Math.ceil(rows.length / psize),
    onPaginationChange: (pagination) => setPsize(pagination.pageSize),
    muiTablePaginationProps: {
      rowsPerPageOptions: [10, 25, 50, 100, 500],
      onPageSizeChange: (newPageSize) => setPsize(newPageSize),
    },
  });

  const theme = createTheme({
    palette: {
      primary: { main: '#000' },
      secondary: { main: '#edf2ff' },
    },
    typography: {
      fontFamily: ['Nunito', 'Train One', 'Roboto', 'sans-serif', 'cursive'].join(","),
    },
  });

  const MaxBid = (props) => {
    const [mb, setMb] = useState(props.maxBid);
    const handleChange = (event) => {
      setMb(event.target.value);
    };
    const disabledc = () => {
      if ((props.platform === "Dynadot" && canBidDD()) || (props.platform === "Dropcatch" && canBidDC()) ||
        (props.platform === "Namecheap" && canBidNC()) || (props.platform === "GoDaddy" && canBidGD()) ||
        (props.platform === "Namesilo" && canBidNS())) { return false; }
      else return true;
    }
    const disabled = () => {
      if (!disabledc()) { if (mb > props.currbid) return false; else return true; }
      else return true;
    }

    const MaxBid = (props) => {
      const [mb, setMb] = useState(props.bidAmount);
      const handleChange = (event) => {
        setMb(event.target.value);
      };
      const disabledc = () => {
        if ((props.platform === "Dynadot" && canBidDD()) || (props.platform === "Dropcatch" && canBidDC()) ||
          (props.platform === "Namecheap" && canBidNC()) || (props.platform === "GoDaddy" && canBidGD()) ||
          (props.platform === "Namesilo" && canBidNS())) { return false; }
        else return true;
      }
      const disabled = () => {
        if (!disabledc()) { if (mb > props.currbid) return false; else return true; }
        else return true;
      }
  
      return (
        <Stack direction="row" spacing={1} alignItems="center">
          <TextField
            size="small"
            value={mb || ''}
            onChange={handleChange}
            variant="outlined"
            sx={{ width: '100px' }}
          />
          <IconButton 
            color="primary" 
            disabled={disabled()} 
            size="small"
          >
            <Gavel />
          </IconButton>
          <IconButton 
            color="error" 
            disabled={disabledc()} 
            size="small"
          >
            <Delete />
          </IconButton>
        </Stack>
      );
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack direction='column' alignItems='flex-start' sx={{ width: '100%' }} spacing={3}>
        <Box sx={{ width: '100%', paddingLeft: 2, paddingTop: 2 }}>
          <Stack direction="column" alignItems="flex-start" spacing={2}>
            <Typography variant="h4" gutterBottom>Scheduled Bids</Typography>
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
                />
              )}
              {selectedTab === 1 && (
                <AdditionalFilters filters={filters} 
                  handleFilterChange={handleFilterChange}
                  disabledFilters={disabledFilters}
                />
              )}
              {selectedTab === 2 && (
                <DateTimeFilters filters={filters} 
                  handleFilterChange={handleFilterChange}
                  originalRows={originalRows}
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
                name="status"
                value={filters.result}
                onChange={handleFilterChange}
                label="Status"
                disabled={disabledFilters.status}
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
                name="auctionType"
                value={filters.auctionType}
                onChange={handleFilterChange}
                label="Auction Type"
                disabled={disabledFilters.auctionType}
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

        {['currPrice', 'ourPrice', 'currbid', 'maxbid', 'gdv', 'estibot', 'end_users_buyers', 'wayback_age', 'keyword_exact_lsv', 'keyword_exact_cpc'].map((filter) => (
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
                name="whois_registrarContains"
                value={filters.whois_registrarContains}
                onChange={handleFilterChange}
                fullWidth
                margin="dense"
                size="small"
                sx={{ marginBottom: 1 }}
                disabled={disabledFilters.whois_registrarContains}
                // disabled={isRegistrarDisabled}
              />
              <TextField
                label="contains not"
                name="whois_registrarContainsNot"
                value={filters.whois_registrarContainsNot}
                onChange={handleFilterChange}
                fullWidth
                margin="dense"
                size="small"
                sx={{ marginBottom: 1 }}
                disabled={disabledFilters.whois_registrarContainsNot}
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
              name="extensions_taken"
              value={filters.extensions_taken}
              onChange={handleFilterChange}
              fullWidth
              margin="dense"
              size="small"
              sx={{ marginBottom: 1 }}
              disabled={disabledFilters.extensions_taken}
              // disabled={isExtnsDisabled}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const DateTimeFilters = ({ filters, handleFilterChange,originalRows }) => {
  const boxStyle = {
    flex: 1,
    marginBottom: 2,
    border: '1px solid #5A5A5A',
    padding: 2,
    borderWidth: 2,
    borderRadius: 2,
    height: 'auto', // Adjust height to auto to fit content
  };

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
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {originalRows.map(row => (
                      <MenuItem key={row.time_left} value={row.time_left.split(' ')[0]}>
                        {row.time_left.split(' ')[0]}
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
                    name="runningNamedEnding"
                    value={filters.runningNamedEnding}
                    onChange={handleFilterChange}
                    // label="Named Ending"
                  >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="endingTommorrow">Ending Tommorrow</MenuItem>
                    <MenuItem value="endingToday">Ending today</MenuItem>
                    <MenuItem value="endedYesterday">Ended yesterday</MenuItem>
                    
                    
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
                    name="completedNamedEnding"
                    value={filters.completedNamedEnding}
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