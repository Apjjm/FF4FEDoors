import { Box, SvgIconProps } from "@mui/material";
import { FunctionComponent } from "react";
import { MapTag } from "./mapLocation";

import MapIcon from "@mui/icons-material/Map";
import HouseboatIcon from "@mui/icons-material/Houseboat";
import RocketIcon from "@mui/icons-material/Rocket";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import LinkIcon from "@mui/icons-material/Link";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HouseIcon from "@mui/icons-material/House";
import PetsIcon from "@mui/icons-material/Pets";
import PersonIcon from "@mui/icons-material/Person";
import SportsMmaIcon from "@mui/icons-material/SportsMma";
import LocalPostOfficeIcon from "@mui/icons-material/LocalPostOffice";

const iconProps: SvgIconProps = {
  color: "primary",
  fontSize: "small",
};

const LocationCardIcons: FunctionComponent<{ tags: MapTag[] }> = ({ tags }) => {
  const icons = tags
    .sort()
    .map((t, i) => {
      switch (t) {
        case "MAP":
          return <MapIcon key={i} {...iconProps} />;
        case "CHARACTER":
          return <PersonIcon key={i} {...iconProps} />;
        case "CHECK":
          return <LocalPostOfficeIcon key={i} {...iconProps} />;
        case "BOSS":
          return <SportsMmaIcon key={i} {...iconProps} />;
        case "SHOP":
          return <ShoppingCartIcon key={i} {...iconProps} />;
        case "INN":
          return <HouseIcon key={i} {...iconProps} />;
        case "SERPENT":
          return <LinkIcon key={i} {...iconProps} />;
        case "AIRSHIP":
          return <AirplanemodeActiveIcon key={i} {...iconProps} />;
        case "FALCON":
          return <AirplanemodeActiveIcon key={i} {...iconProps} />;
        case "HOVERCRAFT":
          return <HouseboatIcon key={i} {...iconProps} />;
        case "WHALE":
          return <RocketIcon key={i} {...iconProps} />;
        case "CHOCOBO":
          return <PetsIcon key={i} {...iconProps} />;
        default:
          return null;
      }
    })
    .filter((x) => !!x);

  return icons.length > 0 ? (
    <Box display="flex" flexDirection="row-reverse" flexGrow={1}>
      {icons}
    </Box>
  ) : null;
};

export { LocationCardIcons };
