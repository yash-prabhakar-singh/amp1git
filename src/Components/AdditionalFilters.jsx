import * as React from 'react';
import { Box, Grid, TextField, Typography, MenuItem, FormControl, Select, InputLabel, Stack } from '@mui/material';

const AdditionalFilters = ({ filters, handleFilterChange }) => {
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
                // disabled={isStatusDisabled}
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

        {['Current price', 'Our price', 'High bid', 'Our max bid', 'GDV', 'EST', 'EUB', 'ABY', 'LSV', 'CPC'].map((filter) => (
          <Grid item xs={12} sm={6} key={filter}>
            <Box sx={boxStyle}>
              <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>{filter}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="Min"
                    name={`${filter.toLowerCase().replace(/ /g, '')}Min`}
                    value={filters[`${filter.toLowerCase().replace(/ /g, '')}Min`]}
                    onChange={handleFilterChange}
                    fullWidth
                    margin="dense"
                    size="small"
                    // disabled={disabledStates[filter]}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Max"
                    name={`${filter.toLowerCase().replace(/ /g, '')}Max`}
                    value={filters[`${filter.toLowerCase().replace(/ /g, '')}Max`]}
                    onChange={handleFilterChange}
                    fullWidth
                    margin="dense"
                    size="small"
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
              // disabled={isExtnsDisabled}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdditionalFilters;