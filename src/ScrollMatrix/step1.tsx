
import * as d3 from 'd3'
import { draw100People } from './draw100People'
import textures from 'textures'

export function stepOne (svg, progressOneToHundred) {
// create a second 100 people to the right.

const bodyColor = textures.lines().orientation("horizontal").size(8).strokeWidth(1).stroke('white')
svg.call(bodyColor)


const headColor = textures.lines().lighter().orientation("horizontal").size(3).strokeWidth(1).stroke('white')
svg.call(headColor)

draw100People(300, "prison-pop", headColor.url(), bodyColor.url())



}