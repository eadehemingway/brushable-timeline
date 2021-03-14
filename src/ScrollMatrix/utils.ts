import textures from 'textures'

export function getLineTexture(svg, color) {
  const bodyColor = textures
    .lines()
    .orientation('horizontal')
    .size(10)
    .stroke(color)
  svg.call(bodyColor)

  return bodyColor.url()
}

export function getHatchTexture(svg, color) {
  const colBody = textures
    .lines()
    .orientation('vertical', 'horizontal')
    .size(4)
    .strokeWidth(1)
    .shapeRendering('crispEdges')
    .stroke(color)

  svg.call(colBody)

  return colBody.url()
}

export function getY2Coordinate(index, dotsPerRow, height) {
  const placeInCol = Math.floor(index / dotsPerRow)
  const padding = 5
  return placeInCol * (padding + height)
}

export function getX2Coordinate(index, dotsPerRow, width) {
  const placeInRow = index % dotsPerRow
  const padding = 5
  return placeInRow * (width + padding)
}
