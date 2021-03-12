
import textures from 'textures'



export function getHeadTexture(svg, color){
    const headColor = textures.lines().orientation("horizontal").size(3).stroke(color)
    svg.call(headColor)
    return headColor.url()

}
export function getBodyTexture(svg, color){
    const bodyColor = textures.lines().orientation("horizontal").size(10).stroke(color)
    svg.call(bodyColor)
    
    return bodyColor.url()

}