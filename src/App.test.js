import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import App from "./App";

afterEach(cleanup);

const setup = () => {
  const utils = render(<App />);
  return { ...utils };
};

test("Coordinates inputs shouldn't take letters in it", () => {
  const { getByTestId } = setup();

  const xInput = getByTestId("xCoordinates");
  const yInput = getByTestId("yCoordinates");

  fireEvent.change(xInput, {
    target: { value: "ffffbbblr" },
  });
  expect(xInput.value).toBe("");

  fireEvent.change(yInput, {
    target: { value: 5 },
  });
  expect(yInput.value).toBe("5");
});

test("Obstacles inputs shouldn't take letters in it", () => {
  const { getByTestId } = setup();

  const xInput = getByTestId("xObstacle");
  const yInput = getByTestId("yObstacle");

  fireEvent.change(xInput, {
    target: { value: "ffffbbblr" },
  });
  expect(xInput.value).toBe("");

  fireEvent.change(yInput, {
    target: { value: 5 },
  });
  expect(yInput.value).toBe("5");
});

test("Launching Rover on Mars", () => {
  const { getByTestId, getAllByTestId } = setup();

  const xInput = getByTestId("xCoordinates");
  const yInput = getByTestId("yCoordinates");
  const heading = getByTestId("heading");
  const options = getAllByTestId("select-heading");
  const start = getByTestId("launch");
  const roverX = getByTestId("roverX");
  const roverY = getByTestId("roverY");
  const roverHeading = getByTestId("roverHeading");

  fireEvent.change(heading, { target: { value: "NORTH" } });

  expect(options[0].selected).toBeTruthy();
  expect(options[1].selected).toBeFalsy();
  expect(options[2].selected).toBeFalsy();
  expect(options[3].selected).toBeFalsy();

  fireEvent.change(xInput, {
    target: { value: 5 },
  });
  expect(xInput.value).toBe("5");

  fireEvent.change(yInput, {
    target: { value: 5 },
  });
  expect(yInput.value).toBe("5");
  fireEvent.click(start);
  expect(roverX).toHaveTextContent("X: 5");
  expect(roverY).toHaveTextContent(`Y: ${5}`);
  expect(roverHeading).toHaveTextContent("Heading: NORTH");
});

test("Moving Rover on Mars", () => {
  const { getByTestId, getAllByTestId } = setup();

  const xInput = getByTestId("xCoordinates");
  const yInput = getByTestId("yCoordinates");
  const heading = getByTestId("heading");
  const options = getAllByTestId("select-heading");
  const start = getByTestId("launch");
  let roverX = getByTestId("roverX");
  let roverY = getByTestId("roverY");
  let roverHeading = getByTestId("roverHeading");

  fireEvent.change(heading, { target: { value: "NORTH" } });

  expect(options[0].selected).toBeTruthy();
  expect(options[1].selected).toBeFalsy();
  expect(options[2].selected).toBeFalsy();
  expect(options[3].selected).toBeFalsy();

  fireEvent.change(xInput, {
    target: { value: 5 },
  });
  expect(xInput.value).toBe("5");

  fireEvent.change(yInput, {
    target: { value: 5 },
  });
  expect(yInput.value).toBe("5");
  fireEvent.click(start);
  const commandsInput = getByTestId("commandsInput");

  expect(roverX).toHaveTextContent("X: 5");
  expect(roverY).toHaveTextContent(`Y: ${5}`);
  expect(roverHeading).toHaveTextContent("Heading: NORTH");

  fireEvent.change(commandsInput, {
    target: { value: "ffff" },
  });

  expect(commandsInput.value).toBe("ffff");

  expect(roverX).toHaveTextContent("X: 5");
  expect(roverY).toHaveTextContent(`Y: 9`);
  expect(roverHeading).toHaveTextContent("Heading: NORTH");
});

test("Generating route for the rover", () => {
  const { getByTestId } = setup();

  const xStart = getByTestId("xStart");
  const yStart = getByTestId("yStart");
  const xDesire = getByTestId("xDesire");
  const yDesire = getByTestId("yDesire");
  const generate = getByTestId("generate");
  const route = getByTestId("route");

  fireEvent.change(xStart, { target: { value: 4 } });

  expect(xStart.value).toBe(`${4}`);

  fireEvent.change(yStart, {
    target: { value: 3 },
  });
  expect(yStart.value).toBe("3");

  fireEvent.change(xDesire, {
    target: { value: 5 },
  });
  fireEvent.change(yDesire, {
    target: { value: 5 },
  });

  expect(xDesire.value).toBe(`${5}`);
  expect(yDesire.value).toBe(`${5}`);

  fireEvent.click(generate);
  expect(route).toHaveTextContent("rfrrrff");
});
