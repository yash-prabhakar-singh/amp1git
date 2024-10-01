import * as React from 'react';
import { Box, Button, Stack, Typography, Paper, Tabs, Tab,Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createTheme, ThemeProvider,TextField } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { getscheduledcloseouts } from './api';
import CommonFilters from './CommonFilters';
// import AdditionalFilters from './AdditionalFilters';
import DateTimeFilters from './DateTimeFilters';

export default function CloseoutList() {
  const columns = useMemo(() => [
    { accessorKey: 'platform', header: 'Platform', size: 100 },
    { accessorKey: 'domain', header: 'Domain', size: 210 },
    { accessorKey: 'auctype', header: 'Auction Type', size: 120 },
    { accessorKey: 'ourPrice', header: 'Our Price', size: 110, type: 'number' },
    { accessorKey: 'currPrice', header: 'Current Price', size: 110, type: 'number' },
    { accessorKey: 'timeLeft', header: 'Time Left', size: 110, type: 'date-time' },
  ], []);

  const [psize, setPsize] = useState(50);
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]); // Store original data
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [disabledFilters, setDisabledFilters] = useState({});

  useEffect(() => {
    getscheduledcloseouts().then((response) => {
      console.log('Fetched data:', response.data); // Debugging fetched data
      setRows(response.data);
      setOriginalRows(response.data); // Ensure originalRows is set
    }).catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const initialFilters = columns.reduce((acc, col) => {
      acc[col.accessorKey] = '';
      if (col.accessorKey.includes('Price') || col.accessorKey.includes('Bid') || col.accessorKey.includes('gdv') || col.accessorKey.includes('est') || col.accessorKey.includes('eub') || col.accessorKey.includes('aby') || col.accessorKey.includes('lsv') || col.accessorKey.includes('cpc')) {
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
    initialFilters.auctype = ''; // Add auctionType filter
    // Add date/time filters
    initialFilters.runningEndDate = '';
    initialFilters.runningNamedEnding = '';
    initialFilters.runningEndsInDaysMin = '';
    initialFilters.runningEndsInDaysMax = '';
    initialFilters.completedEndDate = '';
    initialFilters.completedNamedEnding = '';
    initialFilters.completedEndsInDaysMin = '';
    initialFilters.completedEndsInDaysMax = '';
    setFilters(initialFilters);

    const disabled = {
      auctype: !columns.some(col => col.accessorKey === 'auctype'),
      currPriceMin: !columns.some(col => col.accessorKey === 'currPrice'),
      currPriceMax: !columns.some(col => col.accessorKey === 'currPrice'),
      ourPriceMin: !columns.some(col => col.accessorKey === 'ourPrice'),
      ourPriceMax: !columns.some(col => col.accessorKey === 'ourPrice'),
      status: !columns.some(col => col.accessorKey === 'status'),
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
      highBidMin: !columns.some(col => col.accessorKey === 'highBid'),
      highBidMax: !columns.some(col => col.accessorKey === 'highBid'),
      ourMaxBidMin: !columns.some(col => col.accessorKey === 'ourMaxBid'),
      ourMaxBidMax: !columns.some(col => col.accessorKey === 'ourMaxBid'),
      registrarContains: !columns.some(col => col.accessorKey === 'registrar'),
      registrarContainsNot: !columns.some(col => col.accessorKey === 'registrar'),
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

  // const applyFilters = () => {
  //   console.log("------------------------------")
  //   console.log('Applying filters:', filters);
  //   console.log('Original rows:', originalRows); // Debugging original rows
    
  //   const filteredRows = originalRows.filter(row => {
  //     console.log("filters", filters, "row", row);
  //     console.log("row.domain.toLowerCase().startsWith(filters.allowlistStartsWith.toLowerCase().trim())", row.domain.toLowerCase().startsWith(filters.allowlistStartsWith.toLowerCase().trim()));
  //     // if (filters.allowlistStartsWith === 'william') {
  //     //   return true;
  //     // }
  //     return (
  //       (filters.allowlistStartsWith === '' || row.domain.toLowerCase().startsWith(filters.allowlistStartsWith.toLowerCase().trim())) &&
  //       (filters.allowlistContains === '' || row.domain.toLowerCase().includes(filters.allowlistContains.toLowerCase().trim())) &&
  //       (filters.allowlistEndsWith === '' || row.domain.toLowerCase().endsWith(filters.allowlistEndsWith.toLowerCase().trim())) &&
  //       (filters.blocklistStartsNotWith === '' || !row.domain.toLowerCase().startsWith(filters.blocklistStartsNotWith.toLowerCase().trim())) &&
  //       (filters.blocklistContainsNot === '' || !row.domain.toLowerCase().includes(filters.blocklistContainsNot.toLowerCase().trim())) &&
  //       (filters.blocklistEndsNotWith === '' || !row.domain.toLowerCase().endsWith(filters.blocklistEndsNotWith.toLowerCase().trim())) &&
  //       (filters.domainNameContains === '' || row.domain.toLowerCase().includes(filters.domainNameContains.toLowerCase().trim())) &&
  //       (filters.vowelsMin === '' || (row.domain.match(/[aeiou]/gi) || []).length >= filters.vowelsMin) &&
  //       (filters.vowelsMax === '' || (row.domain.match(/[aeiou]/gi) || []).length <= filters.vowelsMax) &&
  //       (filters.charactersMin === '' || row.domain.length >= filters.charactersMin) &&
  //       (filters.charactersMax === '' || row.domain.length <= filters.charactersMax) &&
  //       (filters.platform === '' || row.platform.toLowerCase().includes(filters.platform.toLowerCase().trim())) &&
  //       (filters.auctiontype === '' || row.auctype.toLowerCase() === filters.auctiontype.toLowerCase().trim()) && // Apply auctionType filter
  //       (filters.ourpriceMin === '' || row.ourPrice >= filters.ourpriceMin) &&
  //       (filters.ourpriceMax === '' || row.ourPrice <= filters.ourpriceMax) &&
  //       (filters.currpriceMin === '' || row.currPrice >= filters.currpriceMin) &&
  //       (filters.currpriceMax === '' || row.currPrice <= filters.currpriceMax) &&
  //       // Apply date/time filters
  //       (filters.runningEndDate === '' || row.runningEndDate === filters.runningEndDate) &&
  //       (filters.runningNamedEnding === '' || row.runningNamedEnding === filters.runningNamedEnding) &&
  //       (filters.runningEndsInDaysMin === '' || row.runningEndsInDays >= filters.runningEndsInDaysMin) &&
  //       (filters.runningEndsInDaysMax === '' || row.runningEndsInDays <= filters.runningEndsInDaysMax) &&
  //       (filters.completedEndDate === '' || row.completedEndDate === filters.completedEndDate) &&
  //       (filters.completedNamedEnding === '' || row.completedNamedEnding === filters.completedNamedEnding) &&
  //       (filters.completedEndsInDaysMin === '' || row.completedEndsInDays >= filters.completedEndsInDaysMin) &&
  //       (filters.completedEndsInDaysMax === '' || row.completedEndsInDays <= filters.completedEndsInDaysMax)
  //     );
  //   });
  //   setRows(filteredRows);
  // };


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
      const auctiontypeMatch = filters.auctype === '' || row.auctype.toLowerCase() === filters.auctype.toLowerCase().trim();
      
    const ourPrice = parseFloat(row.ourPrice.replace(/[^0-9.-]+/g, ""));
    const currPrice = parseFloat(row.currPrice.replace(/[^0-9.-]+/g, ""));
    // console.log("filters.currentpriceMin",filters.currentpriceMin)
    // console.log("parseInt(filters.currentpriceMin)",parseFloat(filters.currentpriceMin))
    const ourpriceMinMatch = filters.ourPriceMin === '' || ourPrice >= parseFloat(filters.ourPriceMin);
    const ourpriceMaxMatch = filters.ourPriceMax === '' || ourPrice <= parseFloat(filters.ourPriceMax);
    const currpriceMinMatch = filters.currPriceMin === '' || currPrice >= parseFloat(filters.currPriceMin);
    const currpriceMaxMatch = filters.currPriceMax === '' || currPrice <= parseFloat(filters.currPriceMax);

    // console.log(`ourPrice: ${ourPrice}, currPrice: ${currPrice}`);
    // console.log(`ourpriceMinMatch: ${ourpriceMinMatch}, ourpriceMaxMatch: ${ourpriceMaxMatch}`);
    // console.log(`currpriceMinMatch: ${currpriceMinMatch}, currpriceMaxMatch: ${currpriceMaxMatch}`);
  
      const runningEndDateMatch = filters.runningEndDate === '' || row.runningEndDate === filters.runningEndDate;
      const runningNamedEndingMatch = filters.runningNamedEnding === '' || row.runningNamedEnding === filters.runningNamedEnding;
      const runningEndsInDaysMinMatch = filters.runningEndsInDaysMin === '' || row.runningEndsInDays >= filters.runningEndsInDaysMin;
      const runningEndsInDaysMaxMatch = filters.runningEndsInDaysMax === '' || row.runningEndsInDays <= filters.runningEndsInDaysMax;
      const completedEndDateMatch = filters.completedEndDate === '' || row.completedEndDate === filters.completedEndDate;
      const completedNamedEndingMatch = filters.completedNamedEnding === '' || row.completedNamedEnding === filters.completedNamedEnding;
      const completedEndsInDaysMinMatch = filters.completedEndsInDaysMin === '' || row.completedEndsInDays >= filters.completedEndsInDaysMin;
      const completedEndsInDaysMaxMatch = filters.completedEndsInDaysMax === '' || row.completedEndsInDays <= filters.completedEndsInDaysMax;
  
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
        ourpriceMinMatch,
        ourpriceMaxMatch,
        currpriceMinMatch,
        currpriceMaxMatch,
        runningEndDateMatch,
        runningNamedEndingMatch,
        runningEndsInDaysMinMatch,
        runningEndsInDaysMaxMatch,
        completedEndDateMatch,
        completedNamedEndingMatch,
        completedEndsInDaysMinMatch,
        completedEndsInDaysMaxMatch
      };
  
      console.log('Row:', row);
      console.log('Matches:', matches);
  
      return Object.values(matches).every(Boolean);
    });
  
    console.log('Filtered rows:', filteredRows); // Debugging filtered rows
    setRows(filteredRows);
  };

  // const applyFilters = () => {
  //   console.log('Applying filters:', filters);
  //   console.log('Original rows:', originalRows); // Debugging original rows

  //   const filteredRows = originalRows.filter(row => {
  //     const allowlistStartsWithMatch = filters.allowlistStartsWith === '' || row.domain.toLowerCase().startsWith(filters.allowlistStartsWith.toLowerCase().trim());
  //     console.log(`allowlistStartsWithMatch: ${allowlistStartsWithMatch}, row.domain: ${row.domain.toLowerCase()}, filter: ${filters.allowlistStartsWith.toLowerCase().trim()}`);
  //     return allowlistStartsWithMatch;
  //   });

  //   console.log('Filtered rows:', filteredRows); // Debugging filtered rows
  //   setRows(filteredRows);
  // };

  
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

  return (
    <ThemeProvider theme={theme}>
      <Stack direction='column' alignItems='flex-start' sx={{ width: '100%' }} spacing={3}>
        <Box sx={{ width: '100%', paddingLeft: 2, paddingTop: 2 }}>
          <Stack direction="column" alignItems="flex-start" spacing={2}>
            <Typography variant="h4" gutterBottom>Scheduled Closeouts</Typography>
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
                name="auctype"
                value={filters.auctype}
                onChange={handleFilterChange}
                label="Auction Type"
                disabled={disabledFilters.auctype}
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

        {['currPrice', 'ourPrice', 'highBid', 'ourMaxBid', 'gdv', 'est', 'eub', 'aby', 'lsv', 'cpc'].map((filter) => (
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