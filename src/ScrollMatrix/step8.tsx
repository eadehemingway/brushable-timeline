
import * as d3 from 'd3'
import { manBodyD } from '../assets/man-icon'
import { drawBigPeople } from './drawBigPeople'
import { getHatchBodyTexture, getHatchHeadTexture, getLineBodyTexture, getLineHeadTexture, getX2Coordinate, getY2Coordinate } from './utils'

export function stepEight(svg, progressOneToHundred) {
// remove the men on screen
d3.selectAll('.hundred-americas-pop-body').attr("opacity", 1).transition().attr("opacity", 0).remove()
d3.selectAll('.hundred-americas-prison-pop-body').attr("opacity", 1).transition().attr("opacity", 0).remove()
d3.selectAll('.hundred-americas-pop-head').attr("opacity", 1).transition().attr("opacity", 0).remove()
d3.selectAll('.hundred-americas-prison-pop-head').attr("opacity", 1).transition().attr("opacity", 0).remove()


    // draw 17 men
    const data = d3.range(17)
    const headColor = getHatchHeadTexture(svg, "linen")
    const bodyColor = getHatchBodyTexture(svg, 'linen')


    const prisonBodyColor = getLineBodyTexture(svg, 'white')
    const prisonHeadColor = getLineHeadTexture(svg, 'white')

    function fill (i, type) {
        if (type === "head"){
            return i === 0 ? prisonHeadColor : headColor
        }else {
            return i === 0 ? prisonBodyColor : bodyColor
        }
        }
    drawBigPeople(svg, data, fill, "white-americans", 0)

}