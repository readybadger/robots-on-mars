import type { Instruction, Robot } from '../types/robot'
import type { Coord, Direction, Position } from '../types/spatial'
import type { World } from '../types/world'
import { parseScenarioInput } from './input'

const forwardVectors: Record<Direction, Coord> = {
  N: { x: 0, y: 1 },
  E: { x: 1, y: 0 },
  S: { x: 0, y: -1 },
  W: { x: -1, y: 0 },
}

export const addVectors = (coord1: Coord, coord2: Coord): Coord => {
  return {
    x: coord1.x + coord2.x,
    y: coord1.y + coord2.y,
  }
}

export const isInWorldBounds = (location: Coord, world: World): boolean => {
  return (
    location.x >= 0 &&
    location.x < world.width + 1 &&
    location.y >= 0 &&
    location.y < world.height + 1
  )
}

export const arePositionsEqual = (pos1: Position, pos2: Position): boolean => {
  return (
    pos1.location.x === pos2.location.x &&
    pos1.location.y === pos2.location.y &&
    pos1.facing === pos2.facing
  )
}

export const turnRobot = (
  robot: Robot,
  instruction: Extract<Instruction, 'L' | 'R'>
) => {
  const directions: Direction[] = ['N', 'E', 'S', 'W']
  const currentIndex = directions.indexOf(robot.position.facing)
  const indexChange = instruction === 'L' ? 3 : 1
  const facing = directions[(currentIndex + indexChange) % directions.length]
  return {
    ...robot,
    position: {
      ...robot.position,
      facing,
    },
  }
}

export const moveRobotForward = (robot: Robot, world: World): Robot => {
  const { facing, location } = robot.position
  const newLocation = addVectors(location, forwardVectors[facing])
  return isInWorldBounds(newLocation, world)
    ? {
        ...robot,
        position: {
          ...robot.position,
          location: newLocation,
        },
      }
    : {
        ...robot,
        lost: true,
      }
}

/**
 * Returns the robot updated with the result of processing the instruction.
 * Additionally, if the robot is lost, it returns the edge position where it was lost.
 */
const processInstruction = ({
  robot,
  instruction,
  world,
  edges,
}: {
  robot: Robot
  instruction: Instruction
  world: World
  edges: Position[]
}): Robot => {
  switch (instruction) {
    case 'L':
      return turnRobot(robot, 'L')
    case 'R':
      return turnRobot(robot, 'R')
    case 'F':
      // We ignore instructions to move over found edges
      if (edges.some((edge) => arePositionsEqual(edge, robot.position))) {
        return robot
      }
      return moveRobotForward(robot, world)
    default:
      throw new Error(`Unknown insruction}`)
  }
}

export const runSimulation = (input: string) => {
  const commander = parseScenarioInput(input)
  const { world, robots, instructions, robotSequenceById } = commander
  const edges: Position[] = []
  const processedRobots = robotSequenceById.reduce((processed, nextRobotId) => {
    const activeRobot = robots.find(({ id }) => id === nextRobotId)
    if (!activeRobot) {
      throw new Error(`Active robot with ID ${nextRobotId} not found`)
    }
    const robotInstructions = instructions.find(
      ({ robotId }) => robotId === nextRobotId
    )
    if (!robotInstructions) {
      throw new Error(`Instructions for robot with ID ${nextRobotId} not found`)
    }
    const movedRobot = robotInstructions.instructions.reduce(
      (currentRobot, instruction) => {
        if (currentRobot.lost) {
          // If the robot is already lost, we skip further processing
          return currentRobot
        }
        const updatedRobot = processInstruction({
          robot: currentRobot,
          instruction,
          world,
          edges,
        })
        if (updatedRobot.lost) {
          // If the robot is lost, we add its location to the edges
          edges.push(updatedRobot.position)
        }
        return updatedRobot
      },
      activeRobot
    )
    return [...processed, movedRobot]
  }, [] as Robot[])
  return {
    robots: processedRobots,
    edges,
  }
}
