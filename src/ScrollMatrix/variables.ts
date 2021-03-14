import {
  getHatchBodyTexture,
  getHatchHeadTexture,
  getLineBodyTexture
} from './utils'

export const american = 'coral'

export const non_american = 'white'

export let american_prisoner = (svg) => getLineBodyTexture(svg, 'coral')

export let non_american_prisoner = (svg) => getLineBodyTexture(svg, 'white')

export let black_american = (svg) => getHatchBodyTexture(svg, 'sienna')

export let non_black_american = (svg) => getHatchBodyTexture(svg, 'darkorange')

export let black_american_prisoner = (svg) => getLineBodyTexture(svg, 'sienna')

export let non_black_american_prisoner = (svg) =>
  getHatchBodyTexture(svg, 'coral')

export let white_american_prisoner = (svg) => getLineBodyTexture(svg, 'white')

export let white_american = (svg) => getHatchBodyTexture(svg, 'white')
