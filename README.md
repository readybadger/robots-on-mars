# Robots on Mars

This is a toy simulation of Robots on Mars being instruction to move about a grid. The specifics rules can be found in [scenario.md](/scenario.md).

![Preview image showing the UI of Robots on Mars](/preview.png)

## Getting Started
This is a `React` App built with `Vite`. You will need `node >= v20.19` (`nvm use` is supported).

In order to run the app, use the following commands:

1. `npm install`
2. `npm run dev`

## Tests
Tests can be run with `npm test`


## Considerations

- A functional approach has been taken and emphasis has been put on keeping data immutable.
- We distinguish between edge faces for the 'learning'.
  - eg. If a robot moves off the top right hand corner to the East, another robot can still fall off the top of the grid to the North
- Performance could be improved through:
  - Processing more of the input in the same loops
  - Running the simulation as the input is parsed
  - Memoisation of various functions