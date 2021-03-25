import { getLineTexture } from './utils'

export const non_american = 'white'
export const nonAmericanPrisoner = (svg) => getLineTexture(svg, 'white')

export const american = 'coral'
export const americanPrisoner = (svg) => getLineTexture(svg, 'coral')

export const blackAmerican = '#6baed6' //blue
export const blackAmericanPrisoner = (svg) => getLineTexture(svg, '#6baed6')

export const whiteAmerican = '#dd1c77' //pink
export const whiteAmericanPrisoner = (svg) => getLineTexture(svg, '#dd1c77')


export const world_pop_id = 'world-pop'
export const prison_pop_id = 'prison-pop'
export const americas_pop_id = 'americas-pop'
export const americas_prison_pop_id = 'americas-prison-pop'
export const black_prison_pop_id = 'black-prison-pop'
export const white_americans_id = 'white-americans'
export const black_americans_id = 'black-americans'
