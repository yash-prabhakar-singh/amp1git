import React, { useState } from "react";
import { Button } from "@mui/material";
import HighlightCard from "./HighlightCard";
import WonCard from "./WonCard";
import LostCard from "./LostCard";
const Status = () => {
  const [isActive, setIsActive] = useState(0);

  return (
    <>
      <div className="container">
        <div
          className="button-wrapper"
          style={{
            marginBottom: "15px",
          }}
        >
          <Button
            style={{
              backgroundColor: isActive === 0 ? "#3E338F" : "transparent",
              color: "white",
            }}
            onClick={() => setIsActive(0)}
          >
            Highlight
          </Button>
          <Button
            style={{
              backgroundColor: isActive === 1 ? "#3E338F" : "transparent",
              color: "white",
            }}
            onClick={() => setIsActive(1)}
          >
            Won
          </Button>
          <Button
            style={{
              backgroundColor: isActive === 2 ? "#3E338F" : "transparent",
              color: "white",
            }}
            onClick={() => setIsActive(2)}
          >
            Lost
          </Button>
        </div>
        <div className="card-container">
          {isActive === 0 && (
            
              <HighlightCard />
            
          )}
          {isActive === 1 && (
            <div className="card">
              <WonCard />
            </div>
          )}
          {isActive === 2 && (
            <div className="card">
              <LostCard />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Status;
