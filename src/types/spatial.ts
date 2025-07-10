export type Coord = {
  x: number
  y: number
}

export type Direction = 'N' | 'S' | 'E' | 'W'

export type Position = {
  location: Coord
  facing: Direction
}