
import * as d3 from 'd3'
import { manBodyD } from '../assets/man-icon'
import { drawBigPeople } from './drawBigPeople'
import { getHatchBodyTexture, getHatchHeadTexture, getLineBodyTexture, getLineHeadTexture } from './utils'

export function stepNine (svg, progressOneToHundred) {

    // draw three men
const data = [1,2,3]
const headColor = getHatchHeadTexture(svg, "sienna")
const bodyColor = getHatchBodyTexture(svg, 'sienna')


const prisonBodyColor = getLineBodyTexture(svg, 'white')
const prisonHeadColor = getLineHeadTexture(svg, 'white')

function fill ( i, type) {
if (type === "head"){
    return i === 0 ? prisonHeadColor : headColor
}else {
    return i === 0 ? prisonBodyColor : bodyColor
}
}

    drawBigPeople(svg, data, fill, "black-americans", 400)

}