
import * as d3 from 'd3'
import { manBodyD } from '../assets/man-icon'
import { drawBigPeople } from './drawBigPeople'
import { getHatchBodyTexture, getHatchHeadTexture, getLineBodyTexture, getLineHeadTexture, getX2Coordinate, getY2Coordinate } from './utils'

export function stepNine (svg, progressOneToHundred) {

    // draw 17 men
    const data = d3.range(17)
    const headColor = getHatchHeadTexture(svg, "linen")
    const bodyColor = getHatchBodyTexture(svg, 'linen')


    const prisonBodyColor = getLineBodyTexture(svg, 'white')
    const prisonHeadColor = getLineHeadTexture(svg, 'white')

    function fill (d, i) {
   return  i === 0 ? prisonBodyColor : bodyColor
    }
    drawBigPeople(svg, data, fill, "white-americans", 300)

}