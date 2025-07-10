import type { Position } from './spatial'

export type World = {
  width: number
  height: number
  edges: Array<Position>
}
