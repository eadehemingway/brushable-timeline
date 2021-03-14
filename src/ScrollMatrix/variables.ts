import { getHatchTexture, getLineTexture } from './utils'

export const american = 'coral'

export const non_american = 'white'

export const americanPrisoner = (svg) => getLineTexture(svg, 'coral')

export const nonAmericanPrisoner = (svg) => getLineTexture(svg, 'white')

export const blackAmerican = (svg) => getHatchTexture(svg, 'sienna')

export const nonBlackAmerican = (svg) => getHatchTexture(svg, 'darkorange')

export const blackAmericanPrisoner = (svg) => getLineTexture(svg, 'sienna')

export const nonBlackAmericanPrisoner = (svg) => getHatchTexture(svg, 'coral')

export const whiteAmericanPrisoner = (svg) => getLineTexture(svg, 'white')

export const whiteAmerican = (svg) => getHatchTexture(svg, 'white')

export const world_pop_id = 'world-pop'
export const prison_pop_id = 'prison-pop'
export const americas_pop_id = 'americas-pop'
export const americas_prison_pop_id = 'americas-prison-pop'
export const white_americans_id = 'white-americans'
export const black_americans_id = 'black-americans'
