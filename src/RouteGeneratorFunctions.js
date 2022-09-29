export const getRoute = (currentPos, desiredPos, obstacles) => {
  const directions = ["NORTH", "EAST", "SOUTH", "WEST"];
  const obstacleChecker = ({ x, y }) => {
    return obstacles.find((obstacle) =>
      obstacle.every((target, idx) => target === [x, y][idx])
    );
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

  const actions = {
    f: () => moveFoward(),
    r: () => rotateRight(),
    l: () => rotateLeft(),
  };

  const moveRoverAI = (commands) => {
    return actions[commands]();
  };

  const commands = [];
  while (currentPos.x != desiredPos.x || currentPos.y != desiredPos.y) {
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

  return commands.join("");
};
