import type { Commander } from '../types/command'
import { Instruction, INSTRUCTION_PATTERN } from '../types/robot'
import type { Direction, Position } from '../types/spatial'
import type { World } from '../types/world'

// Represents a group of instructions for a robot, including its initial position
type InstructionGroup = {
  initialPosition: Position
  instructions: Instruction[]
}

const initialPositionPattern = /(\d).*(\d).*([NSEW])/

const splitAndCleanInput = (input: string): string[] => {
  return input
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

/**
 * Parses the initial position of a robot
 * Valid input would be in the format "x y N|S|E|W", eg. "1 2 N"
 */
const parseInitialPosition = (input?: string): Position | null => {
  if (!input) {
    return null
  }
  const matchResult = input.match(initialPositionPattern)
  const [x, y, facing] = (matchResult || []).slice(1)
  if (!x || !y || !facing) {
    return null
  }
  return {
    location: { x: Number(x), y: Number(y) },
    facing: facing as Direction,
  }
}

export const parseInstructionLine = (input: string): Instruction[] | null => {
  const matchResult = input.match(INSTRUCTION_PATTERN)
  const instructionArray = matchResult || []
  return instructionArray.length ? (instructionArray as Instruction[]) : null
}

export const parseInstructions = (
  instructionLines: string[]
): InstructionGroup[] => {
  const instructionGroups: InstructionGroup[] = []
  for (let i = 0; i < instructionLines.length; i += 2) {
    const initialPosition = parseInitialPosition(instructionLines[i])
    const instructions = parseInstructionLine(instructionLines[i + 1])
    if (!initialPosition) {
      throw new Error(
        `Invalid input, expected initial position but received '${initialPosition}'`
      )
    }

    if (!instructions || !instructions.length) {
      throw new Error(
        `Invalid input, expected instructions but received ${initialPosition}`
      )
    }

    instructionGroups.push({
      initialPosition,
      instructions,
    })
  }
  return instructionGroups
}

export const parseWorldSize = (input: string): number[] => {
  const dimensions = input.split(' ').map(Number)
  if (dimensions.length !== 2 || dimensions.some((n) => isNaN(n))) {
    throw new Error(
      `Invalid world size input: '${input}'. Expected format: 'width height'`
    )
  }
  return dimensions
}

export const parseScenarioInput = (input: string): Commander => {
  const inputLines = splitAndCleanInput(input)
  const worldSize = parseWorldSize(inputLines[0])
  const world: World = {
    width: worldSize[0],
    height: worldSize[1],
  }
  const instructions = inputLines.slice(1)
  const instructionGroups = parseInstructions(instructions)
  return instructionGroups.reduce(
    (acc, { initialPosition, instructions }, index) => {
      const robotId = index.toString()
      return {
        ...acc,
        robots: [
          ...(acc.robots || []),
          {
            id: robotId,
            position: initialPosition,
            lost: false,
          },
        ],
        instructions: [
          ...(acc.instructions || []),
          {
            robotId,
            instructions: instructions,
          },
        ],
        robotSequenceById: [...(acc.robotSequenceById || []), robotId],
      }
    },
    {
      robots: [],
      instructions: [],
      robotSequenceById: [],
      world,
      activeRobotIndex: 0,
    } as Commander
  )
}
