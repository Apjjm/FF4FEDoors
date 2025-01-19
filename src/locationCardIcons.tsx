import Grid from "@mui/material/Grid2";
import { SvgIconProps } from "@mui/material";
import { FunctionComponent } from "react";
import { MapTag } from "./mapLocation";

import MapIcon from "@mui/icons-material/Map";
import HouseboatIcon from "@mui/icons-material/Houseboat";
import RocketIcon from "@mui/icons-material/Rocket";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HouseIcon from "@mui/icons-material/House";
import PetsIcon from "@mui/icons-material/Pets";
import PersonIcon from "@mui/icons-material/Person";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";

const iconProps: SvgIconProps = {
  color: "disabled",
  fontSize: "small",
};

const LocationCardIcons: FunctionComponent<{ tags: MapTag[] }> = ({ tags }) => {
  return (
    <Grid container spacing={2}>
      <Grid size={2}></Grid>
      <Grid size={2}>
        {tags.includes("MAP") && <MapIcon {...iconProps} />}
        {tags.includes("SHOP") && <ShoppingCartIcon {...iconProps} />}
        {tags.includes("INN") && <HouseIcon {...iconProps} />}
      </Grid>
      <Grid size={2}>{tags.includes("BOSS") && <SportsMmaIcon {...iconProps} />}</Grid>
      <Grid size={2}>{tags.includes("CHECK") && <LocalPostOfficeIcon {...iconProps} />}</Grid>
      <Grid size={2}>{tags.includes("CHARACTER") && <PersonIcon {...iconProps} />}</Grid>
      <Grid size={2}>
        {tags.includes("AIRSHIP") && <AirplanemodeActiveIcon {...iconProps} />}
        {tags.includes("FALCON") && <AirplanemodeActiveIcon {...iconProps} />}
        {tags.includes("HOVERCRAFT") && <HouseboatIcon {...iconProps} />}
        {tags.includes("WHALE") && <RocketIcon {...iconProps} />}
        {tags.includes("CHOCOBO") && <PetsIcon {...iconProps} />}
      </Grid>
    </Grid>
  );
};

export { LocationCardIcons };
