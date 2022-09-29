import React, { useState } from "react";
import { getRoute } from "./RouteGeneratorFunctions";
import "./RouteGenerator.css";

const RouteGenerator = ({ obstacles }) => {
  const [route, setRoute] = useState("");
  const [startPos, setstartPos] = useState({ x: "", y: "", heading: "NORTH" });
  const [desiredPos, setDesiredPos] = useState({ x: "", y: "" });

  const handleClick = () => {
    // debugger;
    const generatedRoute = getRoute(startPos, desiredPos, obstacles);
    setRoute(generatedRoute);
  };

  return (
    <>
      <div className="Group-Inputs">
        <label htmlFor="xStart">Starting X</label>
        <input
          type="number"
          value={startPos.x}
          id="xStart"
          data-testid="xStart"
          onChange={(e) =>
            setstartPos((curr) => ({ ...curr, x: e.target.value }))
          }
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
      </div>
      <div className="Group-Inputs">
        <label htmlFor="yStart">Starting Y</label>
        <input
          type="number"
          value={startPos.y}
          id="yStart"
          data-testid="yStart"
          onChange={(e) =>
            setstartPos((curr) => ({ ...curr, y: e.target.value }))
          }
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
      </div>
      <div className="Group-Inputs">
        <label htmlFor="xDesire">Desired X</label>
        <input
          type="number"
          value={desiredPos.x}
          id="xDesire"
          data-testid="xDesire"
          onChange={(e) =>
            setDesiredPos((curr) => ({ ...curr, x: e.target.value }))
          }
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
      </div>
      <div className="Group-Inputs">
        <label htmlFor="yDesire">Desired Y</label>
        <input
          type="number"
          value={desiredPos.y}
          id="yDesire"
          data-testid="yDesire"
          onChange={(e) =>
            setDesiredPos((curr) => ({ ...curr, y: e.target.value }))
          }
          onKeyPress={(e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
        />
      </div>
      <div className="Route-Info">
        <button id="btn-generate" data-testid="generate" onClick={handleClick}>
          Generate
        </button>
        <div>
          Generated Route: <span data-testid="route">{route}</span>
        </div>
      </div>
    </>
  );
};

export default RouteGenerator;
