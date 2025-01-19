import { useContext, FunctionComponent } from "react";
import { Stack, Autocomplete, Typography, TextField, Divider, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { doorsRandoLocations } from "./mapLocation";
import { LocationCardIcons } from "./locationCardIcons";
import { LocationsDispatchContext, LocationsModelContext, LocationModel } from "./locationsContext";

// Because of how virtual ids work, their name will always match their non-virtual id
const locationOptions = doorsRandoLocations.map((x) => x.id).sort();

const buildChildCards = (model: LocationModel | undefined, depth: number, visited: string[]) => {
  if (!model) {
    return [];
  }

  const entries = Object.entries(model.doors);
  if (entries.length <= 1) {
    return []; // Pointless entry
  }

  const nextVisited = [...visited, model.id];
  return entries.map(([k, v]) => (
    <ChildLocationCard
      key={k}
      depth={depth + 1}
      parentId={model.id}
      parentDoor={k}
      locationId={v}
      visited={nextVisited}
    />
  ));
};

const ChildLocationCard: FunctionComponent<{
  depth: number;
  parentId: string;
  parentDoor: string;
  locationId: string | undefined;
  visited: string[];
}> = ({ depth, parentId, parentDoor, locationId, visited }) => {
  const model = useContext(LocationsModelContext);
  const dispatch = useContext(LocationsDispatchContext);

  if (!model || !dispatch) {
    throw new Error("Both Locations contexts must be provided for this component");
  }

  const locationModel = locationId ? model[locationId] : undefined;
  if (locationModel?.hidden) {
    return <></>;
  }

  const isLooped = locationId && visited.includes(locationId);
  return (
    <>
      <Grid container>
        <Grid size={6}>
          <Box display="flex" flexDirection="row">
            {[...Array(depth)].map((_, i) => (
              <Divider key={i} orientation="vertical" variant="fullWidth" flexItem sx={{ paddingLeft: 4 }} />
            ))}
            <Typography
              color={locationId ? (locationModel?.matching ? "secondary" : "textSecondary") : "primary"}
              textOverflow="clip"
              paddingLeft={4}
            >
              {parentDoor}
            </Typography>
          </Box>
        </Grid>
        <Grid size={4}>
          <Autocomplete
            size="small"
            autoHighlight={true}
            options={locationOptions}
            value={locationModel?.id ?? ""}
            onChange={(_, v) =>
              dispatch({
                id: "SET_DOOR",
                on: parentId,
                door: parentDoor,
                value: v ?? undefined,
              })
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                slotProps={{
                  input: {
                    ...params.InputProps,
                    disableUnderline: true,
                    style: { padding: 0, margin: 0 },
                  },
                  inputLabel: params.InputLabelProps,
                }}
              />
            )}
            sx={{ width: "10rem" }}
          />
        </Grid>
        <Grid size={2}>{<LocationCardIcons tags={locationModel?.tags ?? []} />}</Grid>
      </Grid>
      {isLooped ? null : buildChildCards(locationModel, depth, visited)}
    </>
  );
};

const LocationCard: FunctionComponent<{
  locationId: string;
  visited: string[];
}> = ({ locationId, visited }) => {
  const model = useContext(LocationsModelContext);
  const dispatch = useContext(LocationsDispatchContext);

  if (!model || !dispatch) {
    throw new Error("Both Locations contexts must be provided for this component");
  }

  const locationModel = locationId ? model[locationId] : undefined;
  if (!locationModel) {
    throw new Error(`Could not find root location: ${locationId}`);
  }

  return (
    <Stack direction="column" justifyContent="flex-start">
      <Typography variant="h5">{locationModel.id}</Typography>
      {buildChildCards(locationModel, -1, visited)}
    </Stack>
  );
};

export { LocationCard };
