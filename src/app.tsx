import { FunctionComponent, useContext } from "react";
import { Box, Button, CssBaseline, Paper, Stack, TextField, ThemeProvider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchIcon from "@mui/icons-material/Search";

import { darkTheme } from "./themes";
import { LocationsDispatchContext, LocationsProvider } from "./locationsContext";
import { LocationCard } from "./locationCard";

const HeaderContent: FunctionComponent = () => {
  const locationsDispatch = useContext(LocationsDispatchContext);

  return (
    <Paper elevation={2}>
      <Stack direction="row" margin={2} alignItems="center" spacing={8}>
        <Typography variant="h4" paddingLeft={4}>
          FF4 Free Enterprise Doors
        </Typography>
        <Box display="flex" flexGrow={1} />
        <TextField
          variant="standard"
          label="Search"
          size="small"
          onChange={(ev) => locationsDispatch?.({ id: "APPLY_SEARCH_TERM", term: ev.target.value })}
          slotProps={{ input: { endAdornment: <SearchIcon /> } }}
        />
        <Button variant="outlined" color="secondary" onClick={() => locationsDispatch?.({ id: "RESET" })}>
          <Typography>Reset</Typography>
        </Button>
      </Stack>
    </Paper>
  );
};

const BodyContent: FunctionComponent = () => (
  <Paper variant="outlined">
    <Grid container spacing={4} minWidth="90rem" margin={3}>
      <Grid size={4}>
        <LocationCard locationId="Overworld" visited={["Underworld", "Moon"]} />
      </Grid>
      <Grid size={4}>
        <LocationCard locationId="Underworld" visited={["Overworld", "Moon"]} />
      </Grid>
      <Grid size={4}>
        <LocationCard locationId="Moon" visited={["Underworld", "Overworld"]} />
        <Box paddingLeft={10} paddingRight={10} paddingTop={20}>
          <TextField variant="outlined" label="Notes" minRows={10} fullWidth multiline />
        </Box>
      </Grid>
    </Grid>
  </Paper>
);

const App: FunctionComponent = () => (
  <LocationsProvider>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box margin={2} display="flex" justifyContent="center">
        <Stack direction="column" spacing={4}>
          <HeaderContent />
          <BodyContent />
        </Stack>
      </Box>
    </ThemeProvider>
  </LocationsProvider>
);

export { App };
