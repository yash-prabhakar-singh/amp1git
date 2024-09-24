import * as React from 'react';
import { Box, Stack, TextField, Typography, Checkbox, FormControlLabel } from '@mui/material';

const DomainFilterSection = ({ filters, handleFilterChange}) => {
  const boxStyle = {
    flex: 1,
    marginBottom: 2,
    border: '1px solid #5A5A5A',
    padding: 2,
    borderWidth: 2,
    borderRadius: 2,
    height: '300px', // Adjust height to auto to fit content
  };

  // const [isDomainDisabled, setIsDomainDisabled] = React.useState(false);
  // const [isPlatformDisabled, setIsPlatformDisabled] = React.useState(false);

 
  // React.useEffect(() => {
  //   console.log('filters', filters);
  //   console.log('filterColumns', filterColumns);
  //   setIsDomainDisabled(!filterColumns?.includes('domain'));
  //   setIsPlatformDisabled(!filterColumns?.includes('platform'));
  // }, [filterColumns]);

  // console.log('filterColumns',filterColumns)
  // const isDomainDisabled = filterColumns && !filterColumns.includes('Domain');
  // const isPlatformDisabled = filterColumns && !filterColumns.includes('Platform');
  
  
  return (
    <Box sx={{ padding: 3, border: '3px solid #636363', borderRadius: 2, marginBottom: 2, width: '100%', overflow: 'auto' }}>
      <Stack direction="row" spacing={2}>
        <Box sx={boxStyle}>
          <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Domain Name Allowlist</Typography>
          <TextField
            label="starts with"
            name="allowlistStartsWith"
            value={filters.allowlistStartsWith}
            onChange={handleFilterChange}
            fullWidth
            margin="dense"
            size="small"
            sx={{ marginBottom: 1 }}
            // disabled={isDomainDisabled}
          />
          <TextField
            label="contains"
            name="allowlistContains"
            value={filters.allowlistContains}
            onChange={handleFilterChange}
            fullWidth
            margin="dense"
            size="small"
            sx={{ marginBottom: 1 }}
            // disabled={isDomainDisabled}
          />
          <TextField
            label="ends with"
            name="allowlistEndsWith"
            value={filters.allowlistEndsWith}
            onChange={handleFilterChange}
            fullWidth
            margin="dense"
            size="small"
            sx={{ marginBottom: 1 }}
            // disabled={isDomainDisabled}
          />
        </Box>

        <Box sx={boxStyle}>
          <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Domain Name Blocklist</Typography>
          <TextField
            label="starts not with"
            name="blocklistStartsNotWith"
            value={filters.blocklistStartsNotWith}
            onChange={handleFilterChange}
            fullWidth
            margin="dense"
            size="small"
            sx={{ marginBottom: 1 }}
            // disabled={isDomainDisabled}
          />
          <TextField
            label="contains not"
            name="blocklistContainsNot"
            value={filters.blocklistContainsNot}
            onChange={handleFilterChange}
            fullWidth
            margin="dense"
            size="small"
            sx={{ marginBottom: 1 }}
            // disabled={isDomainDisabled}
          />
          <TextField
            label="ends not with"
            name="blocklistEndsNotWith"
            value={filters.blocklistEndsNotWith}
            onChange={handleFilterChange}
            fullWidth
            margin="dense"
            size="small"
            sx={{ marginBottom: 1 }}
            // disabled={isDomainDisabled}
          />
        </Box>

        <Box sx={boxStyle}>
          <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Domain Name Contains ... AND</Typography>
          <TextField
            label="contains"
            name="containsAnd"
            value={filters.containsAnd}
            onChange={handleFilterChange}
            fullWidth
            margin="dense"
            size="small"
            sx={{ marginBottom: 1 }}
            // disabled={isDomainDisabled}
          />
        </Box>

        <Box sx={boxStyle}>
          <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Domain Name (un) wanted Chars</Typography>
          <TextField
            label="Allowlist (only)"
            name="allowlistOnly"
            value={filters.allowlistOnly}
            onChange={handleFilterChange}
            fullWidth
            margin="dense"
            size="small"
            sx={{ marginBottom: 1 }}
            // disabled={isDomainDisabled}
          />
          <TextField
            label="Allowlist (any)"
            name="allowlistAny"
            value={filters.allowlistAny}
            onChange={handleFilterChange}
            fullWidth
            margin="dense"
            size="small"
            sx={{ marginBottom: 1 }}
            // disabled={isDomainDisabled}
          />
          <TextField
            label="Allowlist (all)"
            name="allowlistAll"
            value={filters.allowlistAll}
            onChange={handleFilterChange}
            fullWidth
            margin="dense"
            size="small"
            sx={{ marginBottom: 1 }}
            // disabled={isDomainDisabled}
          />
          <TextField
            label="Blocklist"
            name="blocklist"
            value={filters.blocklist}
            onChange={handleFilterChange}
            fullWidth
            margin="dense"
            size="small"
            sx={{ marginBottom: 1 }}
            // disabled={isDomainDisabled}
          />
        </Box>

        <Box sx={boxStyle}>
          <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Domain Name Pattern</Typography>
          <TextField
            label="Allowlist"
            name="patternAllowlist"
            value={filters.patternAllowlist}
            onChange={handleFilterChange}
            fullWidth
            margin="dense"
            size="small"
            sx={{ marginBottom: 1 }}
            // disabled={isDomainDisabled}
          />
          <TextField
            label="Blocklist"
            name="patternBlocklist"
            value={filters.patternBlocklist}
            onChange={handleFilterChange}
            fullWidth
            margin="dense"
            size="small"
            sx={{ marginBottom: 1 }}
            // disabled={isDomainDisabled}
          />
        </Box>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
        <Box sx={{ ...boxStyle, flex: 4.6,height:"450px" }}>
          <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Domain Name Settings</Typography>
          <Stack direction="row" spacing={22}>
            <Stack direction="column" spacing={1} alignItems="flex-start">
              <FormControlLabel
                control={<Checkbox checked={filters.noNumbers} onChange={handleFilterChange} name="noNumbers"  
                // disabled={isDomainDisabled}
                />}
                label="no Numbers"
                sx={{ alignItems: 'flex-start', marginLeft: 0 }}
              />
              <FormControlLabel
                control={<Checkbox checked={filters.noCharacters} onChange={handleFilterChange} name="noCharacters" 
                // disabled={isDomainDisabled} 
                />}
                label="no Characters"
                sx={{ alignItems: 'flex-start', marginLeft: 0 }}
              />
              <FormControlLabel
                control={<Checkbox checked={filters.noHyphens} onChange={handleFilterChange} name="noHyphens" 
                // disabled={isDomainDisabled}
                />}
                label="no Hyphens"
                sx={{ alignItems: 'flex-start', marginLeft: 0 }}
              />
              <FormControlLabel
                control={<Checkbox checked={filters.noConsecutiveHyphens} onChange={handleFilterChange} name="noConsecutiveHyphens" 
                // disabled={isDomainDisabled}
                />}
                label="no consecutive Hyphens"
                sx={{ alignItems: 'flex-start', marginLeft: 0 }}
              />
              <FormControlLabel
                control={<Checkbox checked={filters.onlyNumbers} onChange={handleFilterChange} name="onlyNumbers" 
                // disabled={isDomainDisabled}
                />}
                label="only Numbers"
                sx={{ alignItems: 'flex-start', marginLeft: 0 }}
              />
              <FormControlLabel
                control={<Checkbox checked={filters.onlyCharacters} onChange={handleFilterChange} name="onlyCharacters" 
                // disabled={isDomainDisabled}
                />}
                label="only Characters"
                sx={{ alignItems: 'flex-start', marginLeft: 0 }}
              />
              <FormControlLabel
                control={<Checkbox checked={filters.noAdultNames} onChange={handleFilterChange} name="noAdultNames" 
                // disabled={isDomainDisabled}
                />}
                label="no Adult Names"
                sx={{ alignItems: 'flex-start', marginLeft: 0 }}
              />
            </Stack>
            <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={3} alignItems="center">
              {/* <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Length</Typography> */}
                <TextField
                  label="Length min"
                  name="lengthMin"
                  value={filters.lengthMin}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1, width: "240px" }}
                  // disabled={isDomainDisabled}
                />
                <TextField
                  label="Length max"
                  name="lengthMax"
                  value={filters.lengthMax}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1, width: "240px" }}
                  // disabled={isDomainDisabled}
                />
              </Stack>
              <Stack direction="row" spacing={3} alignItems="center">
              {/* <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Hyphens</Typography> */}
                <TextField
                  label="Hyphens min"
                  name="hyphensMin"
                  value={filters.hyphensMin}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1, width: "240px" }}
                  // disabled={isDomainDisabled}
                />
                <TextField
                  label="Hyphens max"
                  name="hyphensMax"
                  value={filters.hyphensMax}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1, width: "240px" }}
                  // disabled={isDomainDisabled}
                />
              </Stack>
              <Stack direction="row" spacing={3} alignItems="center">
              {/* <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Vowels</Typography> */}
                <TextField
                  label="Vowels min"
                  name="vowelsMin"
                  value={filters.vowelsMin}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1, width: "240px" }}
                  // disabled={isDomainDisabled}
                />
                <TextField
                  label="Vowels max"
                  name="vowelsMax"
                  value={filters.vowelsMax}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1, width: "240px" }}
                  // disabled={isDomainDisabled}
                />
              </Stack>
              <Stack direction="row" spacing={3} alignItems="center">
              {/* <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Consonants</Typography> */}
                <TextField
                  label="Consonants min"
                  name="consonantsMin"
                  value={filters.consonantsMin}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1, width: "240px" }}
                  // disabled={isDomainDisabled}
                />
                <TextField
                  label="Consonants max"
                  name="consonantsMax"
                  value={filters.consonantsMax}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1, width: "240px" }}
                  // disabled={isDomainDisabled}
                />
              </Stack>
              <Stack direction="row" spacing={3} alignItems="center">
              {/* <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Characters</Typography> */}
                <TextField
                  label="Characters min"
                  name="charactersMin"
                  value={filters.charactersMin}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1, width: "240px" }}
                  // disabled={isDomainDisabled}
                />
                <TextField
                  label="Characters max"
                  name="charactersMax"
                  value={filters.charactersMax}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1, width: "240px" }}
                  // disabled={isDomainDisabled}
                />
              </Stack>
              <Stack direction="row" spacing={3} alignItems="center">
              {/* <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Numbers</Typography> */}
                <TextField
                  label="Numbers min"
                  name="numbersMin"
                  value={filters.numbersMin}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1, width: "240px" }}
                  // disabled={isDomainDisabled}
                />
                <TextField
                  label="Numbers max"
                  name="numbersMax"
                  value={filters.numbersMax}
                  onChange={handleFilterChange}
                  fullWidth
                  margin="dense"
                  size="small"
                  sx={{ marginBottom: 1, width: "240px" }}
                  // disabled={isDomainDisabled}
                />
              </Stack>
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ ...boxStyle, flex: 1,height:"450px" }}>
          <Typography variant="h8" sx={{ fontWeight: 600 }} gutterBottom>Platform</Typography>
          <TextField
            label="Platform"
            name="platform"
            value={filters.platform}
            onChange={handleFilterChange}
            fullWidth
            margin="dense"
            size="small"
            sx={{ marginBottom: 1 }}
            // disabled={isPlatformDisabled}
          />
        </Box>
      </Stack>
    </Box>
  );
};

const CommonFilters = ({ filters, setFilters, handleFilterChange }) => {
  return (
    <>
      <DomainFilterSection filters={filters} handleFilterChange={handleFilterChange} />
    </>
  );
};

export default CommonFilters;