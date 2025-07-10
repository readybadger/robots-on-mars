import { describe, expect, it } from 'vitest'
import { parseInstructionLine, parseWorldSize } from './input'

describe('input helpers', () => {
  describe('parseInstructionLine', () => {
    it('should parse a valid instruction line', () => {
      const input = 'RFRFRFRF'
      const result = parseInstructionLine(input)
      expect(result).toEqual(['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'])
    })

    it('should return null for an empty instruction line', () => {
      const input = ''
      const result = parseInstructionLine(input)
      expect(result).toEqual(null)
    })

    it('should ignore invalid characters in the instruction line', () => {
      const input = 'RFRXFRFRF'
      const result = parseInstructionLine(input)
      expect(result).toEqual(['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'])
    })
  })

  describe('parseWorldSize', () => {
    it('should parse a valid world size', () => {
      const input = '5 3'
      const result = parseWorldSize(input)
      expect(result).toEqual([5, 3])
    })

    it('should throw an error for invalid world size', () => {
      const input = '5'
      expect(() => parseWorldSize(input)).toThrow(
        `Invalid world size input: '${input}'. Expected format: 'width height'`
      )
    })

    it('should throw an error for non-numeric world size', () => {
      const input = '5 a'
      expect(() => parseWorldSize(input)).toThrow(
        `Invalid world size input: '${input}'. Expected format: 'width height'`
      )
    })
  })
})
