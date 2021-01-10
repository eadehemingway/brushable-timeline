import { data } from '../data'
import * as d3 from 'd3'


export const textureColors = ['#EB6A5B', '#4d5382', '#813405', '#f9a03f']

export const svgWidth = 1330
export const svgHeight = 500
export const startYears = data.map((d) => d.startYear)

export const minYearInData = Math.min(...startYears)
export const maxYearInData = Math.max(...startYears)

export const bigTimelineHeight = 250

export const initialMinYear = 1950
export const initialMaxYear = 1970

const bottomPadding = 50
export const smallTimelineHeight = 100
export const miniYBottom = svgHeight - bottomPadding
export const miniYTop = svgHeight - smallTimelineHeight - bottomPadding
