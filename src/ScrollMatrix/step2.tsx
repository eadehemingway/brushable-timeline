
import * as d3 from 'd3'
import textures from 'textures'

export function stepTwo (svg, progressOneToHundred) {
  const bodyColor = textures.lines().orientation("horizontal").size(8).strokeWidth(1).stroke('coral')
  svg.call(bodyColor)


  const headColor = textures.lines().lighter().orientation("horizontal").size(3).strokeWidth(1).stroke('coral')
  svg.call(headColor)

d3.range(progressOneToHundred + 1).forEach((n) => {
  if (n < 6) {

    svg.select(`#prison-pop-head-${n}`).attr('fill', headColor.url())
    svg.select(`#prison-pop-body-${n}`).attr('fill', bodyColor.url())
  }
})



}