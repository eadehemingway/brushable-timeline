
import * as d3 from 'd3'
import { manBodyD } from '../assets/man-icon'
import { drawBigPeople } from './drawBigPeople'
import { getHatchBodyTexture, getHatchHeadTexture, getLineBodyTexture, getLineHeadTexture } from './utils'

export function stepEight (svg, progressOneToHundred) {
// remove the men on screen
    d3.selectAll('.hundred-americas-pop-body').attr("opacity", 1).transition().attr("opacity", 0).remove()
    d3.selectAll('.hundred-americas-prison-pop-body').attr("opacity", 1).transition().attr("opacity", 0).remove()
    d3.selectAll('.hundred-americas-pop-head').attr("opacity", 1).transition().attr("opacity", 0).remove()
    d3.selectAll('.hundred-americas-prison-pop-head').attr("opacity", 1).transition().attr("opacity", 0).remove()


    // draw three men
const data = [1,2,3]
const headColor = getHatchHeadTexture(svg, "sienna")
const bodyColor = getHatchBodyTexture(svg, 'sienna')


const prisonBodyColor = getLineBodyTexture(svg, 'white')
const prisonHeadColor = getLineHeadTexture(svg, 'white')

function fill (d, i) {
return i === 0 ? prisonBodyColor : bodyColor
}

    drawBigPeople(svg, data, fill, "black-americans", 0)

}