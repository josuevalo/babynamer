import React from "react";
import "../App.css";
import { useState } from "react";
import Fab from "@mui/material/Fab";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import { pink } from "@mui/material/colors";
import Badge from "@mui/material/Badge";

export default function Votes() {

  const [incCount, setIncCount] = useState(0);
  const incNum = () => {
    setIncCount(incCount + 1);
  };
  const [decCount, setDecCount] = useState(0);
  const decNum = () => {
  setDecCount(decCount + 1);
    };
 

  return (
    <main className="votes">
          <Badge className="badgeNum" badgeContent={incCount} color="primary">
            <Fab onClick={incNum} size="small"  aria-label="like">
              <ThumbUpAltIcon color="primary" />
            </Fab>
          </Badge>
          <Badge className="badgeNum" badgeContent={decCount} color="primary" sx={{ color: pink[500] }}>
            <Fab onClick={decNum} size="small" aria-label="like">
              <ThumbDownAltIcon sx={{ color: pink[500] }} />
            </Fab>
          </Badge>
    </main>
  );
}
