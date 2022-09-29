import "./App.css";
import React, { useEffect, useState } from "react";
import ObstaclesList from "./ObstaclesList";
import RouteGenerator from "./RouteGenerator";
const idToString = (x, y) => {
  return `(${x}, ${y})`;
};

const directions = ["NORTH", "EAST", "SOUTH", "WEST"];

const states = {
  0: "Start",
  1: "Undiscovered",
  2: "Discovered",
  3: "Obstacle",
  4: "Stop",
};

function App() {
  //Defining states
  const [started, setStarted] = useState(false);
  const [cells, setCells] = useState(
    Array.from(Array(27), () => new Array(27).fill(states[1]))
  );
  const [obstacleX, setObstacleX] = useState("");
  const [obstacleY, setObstacleY] = useState("");
  const [coordinates, setCoordinates] = useState({ x: "", y: "", heading: "" });
  const [obstacles, setObstacles] = useState([]);
  const [commands, setCommands] = useState("");
  const [roverPath, setRoverPath] = useState([]);
  const [startingPosition, setStartingPosition] = useState({});

  const obstacleChecker = ({ x, y }) => {
    return obstacles.find((obstacle) =>
      obstacle.every((target, idx) => target === [parseInt(x, 10), y][idx])
    );
  };

  const rotateRight = () => {
    const newCoordinates = coordinates;
    const directionIdx = directions.indexOf(coordinates.heading);
    if (directionIdx === directions.length - 1) {
      const heading = directions[0];
      newCoordinates.heading = heading;
      setCoordinates({ ...newCoordinates });
    }
    if (directionIdx < directions.length - 1) {
      const heading = directions[directionIdx + 1];
      newCoordinates.heading = heading;
      setCoordinates({ ...newCoordinates });
    }
  };

  const rotateLeft = () => {
    const newCoordinates = coordinates;
    const directionIdx = directions.indexOf(coordinates.heading);
    if (directionIdx === 0) {
      const heading = directions[directions.length - 1];
      newCoordinates.heading = heading;
      setCoordinates({ ...newCoordinates });
    }
    if (directionIdx > 0) {
      const heading = directions[directionIdx - 1];
      newCoordinates.heading = heading;

      setCoordinates({ ...newCoordinates });
    }
  };

  const moveFoward = () => {
    const newCoordinates = coordinates;
    const forwardDirection = {
      0: (obj) => obj.y++,
      1: (obj) => obj.x++,
      2: (obj) => obj.y--,
      3: (obj) => obj.x--,
    };

    const nextMove = { ...newCoordinates };

    forwardDirection[directions.indexOf(nextMove.heading)](nextMove);
    if (obstacleChecker(nextMove)) {
      setStarted(false);
      return true;
    }
    newCoordinates.x >= 26 && (newCoordinates.x = 0);
    newCoordinates.y >= 26 && (newCoordinates.y = 0);
    forwardDirection[directions.indexOf(coordinates.heading)](newCoordinates);
    const { x, y } = coordinates;
    setCoordinates({ ...newCoordinates });
    setRoverPath((current) => [...current, [y, x]]);
    return false;
  };

  const moveBackward = () => {
    const newCoordinates = coordinates;
    const backwardDirection = {
      0: (obj) => obj.y--,
      1: (obj) => obj.x--,
      2: (obj) => obj.y++,
      3: (obj) => obj.x++,
    };

    const nextMove = { ...newCoordinates };

    backwardDirection[directions.indexOf(nextMove.heading)](nextMove);
    if (obstacleChecker(nextMove)) {
      setStarted(false);
      return true;
    }
    newCoordinates.x >= 26 && (newCoordinates.x = 0);
    newCoordinates.y >= 26 && (newCoordinates.y = 0);
    backwardDirection[directions.indexOf(coordinates.heading)](newCoordinates);
    const { x, y } = coordinates;
    setCoordinates({ ...newCoordinates });
    setRoverPath((current) => [...current, [y, x]]);
    return false;
  };

  const actions = {
    f: () => moveFoward(),
    b: () => moveBackward(),
    r: () => rotateRight(),
    l: () => rotateLeft(),
  };

  //Defining Cell component
  function Cell({ id, role }) {
    return <span id={id} className={`Cell ${role}`}></span>;
  }

  //Handling the coordinates inputs
  const handleCoordinatesChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCoordinates({ ...coordinates, [name]: value });
    console.log(name, value);
  };

  //Updating coordinates state
  const handleCoordinatesSubmit = (e) => {
    e.preventDefault();
    const { x, y, heading } = coordinates;
    if (x && y && heading) {
      setStartingPosition({ x, y, heading });
      setStarted(true);
    } else {
      alert("Empty input");
    }
  };

  //Deleting an obstacle
  const handleDeleteObstacles = (obstacleIdx) => {
    const newObstacles = obstacles;
    newObstacles.splice(obstacleIdx, 1);
    setObstacles([...newObstacles]);
  };

  const handleObstaclesSubmit = (e) => {
    e.preventDefault();
    if (obstacleChecker(obstacleX, obstacleY)) {
      alert("Obstacle already exists");
      return;
    } else {
      if (obstacleX && obstacleY) {
        setObstacles((current) => [
          ...current,
          [parseInt(obstacleX, 10), parseInt(obstacleY, 10)],
        ]);
      } else {
        alert("Empty input");
      }
    }
  };

  const handleRestart = (e) => {
    e.preventDefault();
    setObstacleX("");
    setObstacleY("");
    setObstacles([]);
    setCommands("");
    setRoverPath([]);
    setStartingPosition({});
    setStarted(false);
    setCoordinates({ x: "", y: "", heading: "" });
  };

  useEffect(() => {
    if (!startingPosition.y || !startingPosition.x) return;
    const newCells = cells;
    newCells[startingPosition.x][startingPosition.y] = states[0];
    setCells([...newCells]);
  }, [startingPosition]);

  useEffect(() => {
    if (!commands) return;
    //Looping on commands string and performing each of them
    for (let i = 0; i < commands.length; i++) {
      actions[commands[i]]();
    }
  }, [commands]);

  useEffect(() => {
    if (!startingPosition) return;
    const newCells = Array.from(Array(27), () => new Array(27).fill(states[1]));

    for (let i = 0; i < obstacles.length; i++) {
      const x = obstacles[i][0];
      const y = obstacles[i][1];
      newCells[x][y] = states[3];
    }

    for (let i = 0; i < roverPath.length; i++) {
      const [y, x] = roverPath[i]; //   (x, y)

      i === roverPath.length - 1
        ? (newCells[x][y] = states[4])
        : (newCells[x][y] = states[2]);
    }

    if (startingPosition.y && startingPosition.x) {
      newCells[startingPosition.x][startingPosition.y] = states[0];
    }

    setCells([...newCells]);
  }, [roverPath, obstacles]);

  return (
    <div className="App">
      <h1>Mars Rover</h1>
      <div className="Container">
        <div className="Grid">
          {cells
            .slice(0)

            .map((column, i) =>
              column
                .slice(0)

                .map((role, j) => (
                  <Cell
                    key={idToString(i, j)}
                    id={idToString(i, j)}
                    y={i}
                    x={j}
                    role={role}
                  />
                ))
            )}
        </div>
        <div className="Controls">
          <div className="Information">
            <h2>Current Coordinates</h2>
            <span data-testid="roverX">X: {coordinates.x}</span>
            <span data-testid="roverY">Y: {coordinates.y}</span>
            <span data-testid="roverHeading">
              Heading: {coordinates.heading}
            </span>
          </div>
          {!started && (
            <div className="Coordinates">
              <h3>Coordinates</h3>
              <form>
                <input
                  type="number"
                  name="x"
                  placeholder="X"
                  data-testid="xCoordinates"
                  onChange={handleCoordinatesChange}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <input
                  type="number"
                  name="y"
                  placeholder="Y"
                  data-testid="yCoordinates"
                  onChange={handleCoordinatesChange}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <select
                  name="heading"
                  id="heading"
                  data-testid="heading"
                  onChange={handleCoordinatesChange}
                >
                  <option value="" hidden></option>
                  {directions.map((direction) => (
                    <option
                      data-testid="select-heading"
                      key={direction}
                      value={direction}
                    >
                      {direction}
                    </option>
                  ))}
                </select>
                <button
                  data-testid="launch"
                  onClick={(e) => {
                    e.persist();
                    handleCoordinatesSubmit(e);
                  }}
                >
                  Start
                </button>
              </form>
            </div>
          )}
          <div className="Obstacles">
            <h3>Obstacles</h3>
            <form>
              <input
                type="number"
                name="x"
                placeholder="X"
                data-testid="xObstacle"
                onChange={(e) => {
                  setObstacleX(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              <input
                type="number"
                name="y"
                placeholder="Y"
                data-testid="yObstacle"
                onChange={(e) => {
                  setObstacleY(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              />
              <button onClick={handleObstaclesSubmit}>Add</button>
            </form>
            <ObstaclesList
              obstacles={obstacles}
              handleDeleteObstacles={handleDeleteObstacles}
            />
          </div>
          {started && (
            <div className="Commands">
              <h3>Commands</h3>
              <form>
                <input
                  type="text"
                  name="commands"
                  data-testid="commandsInput"
                  value={commands}
                  onChange={(e) => {
                    setCoordinates({ ...startingPosition });
                    setCommands(e.target.value.toLowerCase());
                  }}
                  onKeyDown={(e) => {
                    if (!/([fblr/b])/g.test(e.key) && e.key !== "Backspace") {
                      e.preventDefault();
                    }
                  }}
                />
              </form>
            </div>
          )}
          <div className="Route">
            <RouteGenerator obstacles={obstacles} />
          </div>
          <button onClick={handleRestart}>Restart</button>
        </div>
      </div>
    </div>
  );
}

export default App;
