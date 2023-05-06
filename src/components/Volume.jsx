import VolumeUpRoundedIcon from "@mui/icons-material/VolumeUpRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";

import React from "react";

export const Volume = (props) => {
  console.log(props.toggleVolume);
  return (
    <VolumeUpRoundedIcon
      onClick={() => props.setToggleVolume(!props.toggleVolume)}
      className="absolute bottom-2 right-5"
      sx={props.toggleVolume ? { color: "white" } : { color: "grey" }}
    />
  );
};
