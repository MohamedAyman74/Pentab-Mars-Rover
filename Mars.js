const directions = ["NORTH", "EAST", "SOUTH", "WEST"];

const obstacles = [[1, 2]];

const currentPos = {
  x: 0,
  y: 0,
  heading: "",
};

const obstacleChecker = ({ x, y }) => {
  return obstacles.find((obstacle) =>
    obstacle.every((target, idx) => target === [x, y][idx])
  );
};

const generateStartingPos = () => {
  const x = Math.floor(Math.random() * 21) - 10;
  const y = Math.floor(Math.random() * 21) - 10;
  const direction = Math.floor(Math.random() * directions.length);
  const heading = directions[direction];

  while (obstacleChecker(x, y)) {
    console.log("Obstacle found, changing starting position");
    return generateStartingPos();
  }
  return { x, y, heading };
};

const rotateRight = () => {
  const posIdx = directions.indexOf(currentPos.heading);
  posIdx + 1 === directions.length
    ? (currentPos.heading = directions[0])
    : (currentPos.heading = directions[posIdx + 1]);
};

const rotateLeft = () => {
  const posIdx = directions.indexOf(currentPos.heading);
  posIdx - 1 < 0
    ? (currentPos.heading = directions[directions.length - 1])
    : (currentPos.heading = directions[posIdx - 1]);
};

const moveFoward = () => {
  const forwardDirection = {
    0: (obj) => obj.y++,
    1: (obj) => obj.x++,
    2: (obj) => obj.y--,
    3: (obj) => obj.x--,
  };

  const nextMove = { ...currentPos };

  forwardDirection[directions.indexOf(nextMove.heading)](nextMove);
  if (obstacleChecker(nextMove)) {
    console.log("AN OBSTACLE FOUND! MISSION ABORTED");
    return true;
  }
  forwardDirection[directions.indexOf(currentPos.heading)](currentPos);
  return false;
};

const moveBackward = () => {
  const backwardDirection = {
    0: (obj) => obj.y--,
    1: (obj) => obj.x--,
    2: (obj) => obj.y++,
    3: (obj) => obj.x++,
  };

  backwardDirection[directions.indexOf(currentPos.heading)]();
};

const actions = {
  f: () => moveFoward(),
  b: () => moveBackward(),
  r: () => rotateRight(),
  l: () => rotateLeft(),
};

const moveRover = (commands) => {
  for (let i = 0; i < commands.length; i++) {
    if (actions[commands[i]]()) break;
  }
  console.log(
    `x: ${currentPos["x"]}, y: ${currentPos["y"]}, heading: ${currentPos["heading"]}`
  );
};

const moveRoverAI = (commands) => {
  return actions[commands]();
};

const getRoute = (currentPos, desiredPos) => {
  const commands = [];
  while (currentPos.x !== desiredPos.x || currentPos.y !== desiredPos.y) {
    let xDifference = desiredPos["x"] - currentPos["x"];
    let yDifference = desiredPos["y"] - currentPos["y"];
    let desiredHeading =
      xDifference > 0 ? 1 : xDifference < 0 ? 3 : yDifference > 0 ? 0 : 2;

    while (currentPos.heading !== directions[desiredHeading]) {
      commands.push("r");
      moveRoverAI("r");
    }
    tryMove(commands);
  }
  console.log(commands.join(""));

  function tryMove(commands) {
    if (moveRoverAI("f")) {
      commands.push("r");
      moveRoverAI("r");
      tryMove(commands);
      commands.push("l");
      moveRoverAI("l");
      tryMove(commands);
      return;
    }
    commands.push("f");
  }
};

const startingPosition = generateStartingPos();

const launchRover = (
  x = startingPosition["x"],
  y = startingPosition["y"],
  heading = startingPosition["heading"]
) => {
  while (obstacleChecker([x, y])) {
    console.log("Obstacle found, landing in a random position");
    return generateStartingPos();
  }
  currentPos["x"] = x;
  currentPos["y"] = y;
  currentPos["heading"] = heading;
  console.log(currentPos);
};
