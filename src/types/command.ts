import type { Robot, RobotInstructions } from './robot'
import type { World } from './world'

export type Commander = {
  robots: Robot[]
  instructions: RobotInstructions[]
  robotSequenceById: string[]
  activeRobotIndex?: number
  world: World
}