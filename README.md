#Penta-B Mars Rover
---
A React and vanilla JavaScript simulation of an API that translates commands sent from earth to instructions that are understood by the rover on Mars.

##How to use Vanilla JavaScript API
---
1. Open the path folder
2. Open Index.html
3. Press on F12 and enter your commands in console to control the rover.

###Vanilla JavaScript commands
---
By default, the rover lands in random coordinates if left empty
1.  Landing the rover
`launchRover(x, y, heading);`
example on changing the landing position
`launchRover(4, 4, "NORTH")`
The heading parameter takes either of [NORTH, EAST, SOUTH, WEST]

2. Moving the rover
`moveRover(ffrrff)`
result would be
`x: 4, y: 4, heading: SOUTH`

3.  Generating commands to move to a specific point
`getRoute(currentPos, {x: 10, y: -5})`
result would be
`rrrffffffrfffffffff`

## React
---
The next part is related to the front-end React page

### Getting Started
---
1. Head to the path folder through any cmd using
`  > cd "path"/Pentab-Mars-Rover`
2. Install the depencencies through the cmd
`> npm install`

### Built-in CMDs
---
When you are in the project directory, you can use the following commands
1. Run the application
`> npm start`
2. Run the tests
`> npm run test`
>There are 5 tests made using [React Testing Library](https://testing-library.com/docs/react-testing-library/intro "React Testing Library")

### Application Page Components
1. A map where you can see the rover, the path it walked, it's current position and obstacles.
2. Controlled inputs Where you can: 
- Specify starting coordinates
- Add obstacles
- Give commands to the rover
- Generate route commands to specific coordinates, avoiding obstcales.
- Delete obstcales if any were added.
