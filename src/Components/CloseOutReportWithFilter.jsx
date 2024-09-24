import * as React from 'react';
import { Box, Button, Stack, Typography, Paper, Tabs, Tab } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import api, { getcompletedcloseouts } from './api';
// import CommonFilters from './CommonFilters';
import AdditionalFilters from './AdditionalFilters';
import DateTimeFilters from './DateTimeFilters'; // Import the new DateTimeFilters component
import CommonFilters from './CommonFilters';

export default function CloseoutsReportWithFilter() {
  const columns = useMemo(() => [
    { accessorKey: 'platform', header: 'Platform', size: 100 },
    { accessorKey: 'domain', header: 'Domain', size: 210 },
    { accessorKey: 'status', header: 'Status', size: 100 },
    {
      accessorKey: 'currPrice',
      header: 'Sniped price',
      size: 110,
      Cell: ({ cell }) => cell.getValue(),
    },
    {
      accessorKey: 'ourPrice',
      header: 'Our Price',
      size: 110,
      Cell: ({ cell }) => cell.getValue(),
    },
    {
      accessorKey: 'endTimeist',
      header: 'Auction Date',
      size: 200,
      type: 'date-time',
      Cell: ({ cell }) => cell.getValue().substring(0, 16),
    },
  ], []);

  const [psize, setPsize] = useState(50);
  const [rows, setRows] = useState([]);
  const [originalRows, setOriginalRows] = useState([]); // Store original data
  const [filterColumns,setFilterColumns] = useState([]);
  const [filters, setFilters] = useState({
    allowlistStartsWith: '',
    allowlistContains: '',
    allowlistEndsWith: '',
    blocklistStartsNotWith: '',
    blocklistContainsNot: '',
    blocklistEndsNotWith: '',
    containsAnd: '',
    allowlistOnly: '',
    allowlistAny: '',
    allowlistAll: '',
    blocklist: '',
    patternAllowlist: '',
    patternBlocklist: '',
    platform: '',
    status: '',
    currPrice: '',
    ourPrice: '',
    endTimeist: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0); // 0 for Common, 1 for Additional, 2 for DateTime

  const theme = createTheme({
    palette: {
      primary: {
        main: '#000',
      },
      secondary: {
        main: '#edf2ff',
      },
    },
    typography: {
      fontFamily: [
        'Nunito',
        'Train One',
        'Roboto',
        'sans-serif',
        'cursive'
      ].join(",")
    }
  });

  useEffect(() => {
    getcompletedcloseouts()
      .then((response) => {
        setRows(response.data);
        setOriginalRows(response.data); // Store original data
        console.log(response.data);
      })
      .catch((Error) => console.log(Error));
  }, []);

  useEffect(() => {
    console.log(rows);
  }, [rows]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    // Implement filter logic here
    console.log('Filters applied:', filters);
    
    const filteredRows = originalRows.filter(row => {
      return (
        (filters.allowlistStartsWith === '' || row.domain.startsWith(filters.allowlistStartsWith)) &&
        (filters.allowlistContains === '' || row.domain.includes(filters.allowlistContains)) &&
        (filters.allowlistEndsWith === '' || row.domain.endsWith(filters.allowlistEndsWith)) &&
        (filters.blocklistStartsNotWith === '' || !row.domain.startsWith(filters.blocklistStartsNotWith)) &&
        (filters.blocklistContainsNot === '' || !row.domain.includes(filters.blocklistContainsNot)) &&
        (filters.blocklistEndsNotWith === '' || !row.domain.endsWith(filters.blocklistEndsNotWith)) &&
        (filters.containsAnd === '' || row.domain.includes(filters.containsAnd)) &&
        (filters.allowlistOnly === '' || row.domain.includes(filters.allowlistOnly)) &&
        (filters.allowlistAny === '' || row.domain.includes(filters.allowlistAny)) &&
        (filters.allowlistAll === '' || row.domain.includes(filters.allowlistAll)) &&
        (filters.blocklist === '' || !row.domain.includes(filters.blocklist)) &&
        (filters.patternAllowlist === '' || row.domain.includes(filters.patternAllowlist)) &&
        (filters.patternBlocklist === '' || !row.domain.includes(filters.patternBlocklist)) &&
        (filters.platform === '' || row.platform.includes(filters.platform)) &&
        (filters.status === '' || row.status.includes(filters.status)) &&
        (filters.currPrice === '' || row.currPrice.toString().includes(filters.currPrice)) &&
        (filters.ourPrice === '' || row.ourPrice.toString().includes(filters.ourPrice)) &&
        (filters.endTimeist === '' || row.endTimeist.includes(filters.endTimeist))
      );
    });
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

  useEffect(() => {
    console.log('columns',columns)
    setFilterColumns(columns.map(
      (col) => col.header
    ));
    
  }, [columns])

  useEffect(()=>{
    console.log('filterColumns',filterColumns)
  },[filterColumns])

  
  return (
    <ThemeProvider theme={theme}>
      <Stack direction='column' alignItems='flex-start' sx={{ width: '100%' }} spacing={3}>
        <Box sx={{ width: '100%', paddingLeft: 2, paddingTop: 2 }}>
          <Stack direction="column" alignItems="flex-start" spacing={2}>
            <Typography variant="h4" gutterBottom>CloseOut Report</Typography>
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
              <Tab label="Date/Time" /> {/* New tab for Date/Time filters */}
            </Tabs>
            <Box sx={{ padding: 2 }}>
              {selectedTab === 0 && (
                <CommonFilters filters={filters} 
                setFilters={setFilters} 
                handleFilterChange={handleFilterChange} 
                filterColumns={filterColumns}
                />
              )}
              {selectedTab === 1 && (
                <AdditionalFilters filters={filters} 
                handleFilterChange={handleFilterChange} 
                filterColumns={filterColumns}
                />
              )}
              {selectedTab === 2 && (
                <DateTimeFilters filters={filters} 
                handleFilterChange={handleFilterChange} 
                filterColumns={filterColumns}
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