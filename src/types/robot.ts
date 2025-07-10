import type { Position } from './spatial'

export const Instruction = {
  LEFT: 'L',
  RIGHT: 'R',
  FORWARD: 'F',
} as const
export type Instruction = (typeof Instruction)[keyof typeof Instruction]

export const validInstructions: Instruction[] = [
  Instruction.LEFT,
  Instruction.RIGHT,
  Instruction.FORWARD,
]
export const INSTRUCTION_PATTERN = new RegExp(`(${validInstructions.join('|')})`, 'ig')

export type Robot = {
  id: string
  position: Position
  lost: boolean
}

export type RobotInstructions = {
  instructions: Instruction[]
  robotId: string
}
