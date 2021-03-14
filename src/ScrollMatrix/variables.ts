import { getHatchTexture, getLineTexture } from './utils'

export const american = 'coral'

export const non_american = 'white'

export let american_prisoner = (svg) => getLineTexture(svg, 'coral')

export let non_american_prisoner = (svg) => getLineTexture(svg, 'white')

export let black_american = (svg) => getHatchTexture(svg, 'sienna')

export let non_black_american = (svg) => getHatchTexture(svg, 'darkorange')

export let black_american_prisoner = (svg) => getLineTexture(svg, 'sienna')

export let non_black_american_prisoner = (svg) => getHatchTexture(svg, 'coral')

export let white_american_prisoner = (svg) => getLineTexture(svg, 'white')

export let white_american = (svg) => getHatchTexture(svg, 'white')
