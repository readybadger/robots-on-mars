import { describe, expect, it } from 'vitest'
import {
  addVectors,
  arePositionsEqual,
  isInWorldBounds,
  moveRobotForward,
  runSimulation,
  turnRobot,
} from './simulation'
import type { Coord, Position } from '../types/spatial'
import type { World } from '../types/world'

const mockRobot = {
  id: 'robot1',
  position: {
    location: { x: 0, y: 0 },
    facing: 'N',
  },
  lost: false,
}

describe('simulation helpers', () => {
  describe('addVectors', () => {
    it('should add two vectors correctly', () => {
      const vector1: Coord = { x: 1, y: 2 }
      const vector2: Coord = { x: 3, y: 4 }
      const result = addVectors(vector1, vector2)
      expect(result).toEqual({ x: 4, y: 6 })
    })

    it('should add vectors with negative values', () => {
      const vector1: Coord = { x: -1, y: -2 }
      const vector2: Coord = { x: 3, y: 4 }
      const result = addVectors(vector1, vector2)
      expect(result).toEqual({ x: 2, y: 2 })
    })
  })

  describe('isInWorldBounds', () => {
    it('should return true for coordinates within bounds', () => {
      const coord: Coord = { x: 2, y: 3 }
      const world: World = { width: 5, height: 5 }
      const result = isInWorldBounds(coord, world)
      expect(result).toBe(true)
    })
    it('should return false for coordinates outside bounds', () => {
      const coord: Coord = { x: 6, y: 3 }
      const world: World = { width: 5, height: 5 }
      const result = isInWorldBounds(coord, world)
      expect(result).toBe(false)
    })
  })

  describe('arePositionsEqual', () => {
    it('should return true for equal positions', () => {
      const pos1: Position = { location: { x: 1, y: 2 }, facing: 'N' }
      const pos2: Position = { location: { x: 1, y: 2 }, facing: 'N' }
      const result = arePositionsEqual(pos1, pos2)
      expect(result).toBe(true)
    })
    it('should return false for different positions', () => {
      const pos1: Position = { location: { x: 1, y: 2 }, facing: 'N' }
      const pos2: Position = { location: { x: 1, y: 3 }, facing: 'N' }
      const result = arePositionsEqual(pos1, pos2)
      expect(result).toBe(false)
    })
  })

  describe('turnRobot', () => {
    it('should turn the robot left', () => {
      const result = turnRobot(
        {
          ...mockRobot,
          position: {
            ...mockRobot.position,
            facing: 'N',
          },
        },
        'L'
      )
      expect(result.position.facing).toBe('W')
    })

    it('should turn the robot right', () => {
      const result = turnRobot(
        {
          ...mockRobot,
          position: {
            ...mockRobot.position,
            facing: 'N',
          },
        },
        'R'
      )
      expect(result.position.facing).toBe('E')
    })
  })

  describe('moveRobotForward', () => {
    it('should move the robot forward in the current direction', () => {
      const world: World = { width: 5, height: 5 }
      const result = moveRobotForward(
        {
          ...mockRobot,
          position: {
            ...mockRobot.position,
            location: { x: 0, y: 0 },
            facing: 'N',
          },
        },
        world
      )
      expect(result.position.location).toEqual({ x: 0, y: 1 })
    })

    it('should not move the robot outside world bounds', () => {
      const world: World = { width: 5, height: 5 }
      const result = moveRobotForward(
        {
          ...mockRobot,
          position: {
            ...mockRobot.position,
            location: { x: 3, y: 5 },
            facing: 'N',
          },
        },
        world
      )
      expect(result.position.location).toEqual({ x: 3, y: 5 })
      expect(result.lost).toBe(true)
    })
  })

  describe('runSimulation', () => {
    it('robots should ignore instructions at edges', () => {
      const input = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`
      const { robots } = runSimulation(input)
      expect(robots[0].position.location).toEqual({ x: 1, y: 1 })
      expect(robots[0].position.facing).toBe('E')
      expect(robots[0].lost).toBe(false)
      expect(robots[1].position.location).toEqual({ x: 3, y: 3 })
      expect(robots[1].position.facing).toBe('N')
      expect(robots[1].lost).toBe(true)
      expect(robots[2].position.location).toEqual({ x: 2, y: 3 })
      expect(robots[2].position.facing).toBe('S')
      expect(robots[2].lost).toBe(false)
    })
  })
})
