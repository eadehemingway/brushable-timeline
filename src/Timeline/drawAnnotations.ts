import { data } from '../data'
import * as d3 from 'd3'
// import { textwrap } from 'd3-textwrap'
import { annotation, annotationLabel } from 'd3-svg-annotation'
import _ from 'lodash'
import { maxYearInData } from './variables'

export const drawAnnotations = (yearIntoXScale, yScale) => {
  // get annotation data ======

  const annotationData = _.chain(data)
    .map((d, i) => {
      const dx = d.startYear === maxYearInData ? -250 : 20
      return {
        data: {
          startYear: d.startYear,
          description: d.description,
          title: d.title,
        },
        note: {
          title: `${d.title}. (${d.startYear})`,
          label: d.description,
          align: 'middle',
          orientation: 'leftright',
          wrap: 260,
          padding: 0,
          bgPadding: { top: 0, bottom: 0, left: 0, right: 0 },
        },
        x: yearIntoXScale(d.startYear),
        // y: yScale(d.level),
        y: yScale(d.level),
        dx: dx,
        dy: 0,
      }
    })
    .value()

  // draw annotations ======
  const makeAnnotations = annotation()
    .type(annotationLabel)
    .annotations(annotationData)

  d3.select('svg')
    .append('g')
    .attr('class', 'annotation-group')
    .call(makeAnnotations as any)

  const allAnnotationText = d3.selectAll('.annotation text')
  const wholeLabels = d3.selectAll('.label')
  const backgroundRects = d3.selectAll('.annotation-note-bg')
  const titles = d3.selectAll('.annotation-note-title')
  const descriptions = d3.selectAll('.annotation-note-label')
  const connectors = d3.selectAll('.connector')

  // annotation styles ==========
  allAnnotationText
    .attr('fill', 'lightgray')
    .attr('font-size', '11px')
    .attr('font-family', 'JosefinSans')
    .attr('transform', 'translate(15,15)')

  connectors.attr('stroke', 'lightgray')

  descriptions.attr('display', 'none').attr('opacity', 0)

  wholeLabels.style('cursor', 'pointer')

  backgroundRects
    .attr('fill', '#282c34')
    .attr('fill-opacity', 0.7)
    // .attr('stroke-dasharray', (d: any) => {
    //   const description = d.note.label.trim()
    //   return description.length ? 2 : null
    // })
    .attr('stroke', '#dddada')
    .attr('width', 224) // hard coding this because the wrap above seems to make the rect too big
    .attr('height', (d: any) => {
      return getClosedLabelHeight(d.note.title)
    }) // hard coding this (estimating the height of a title)
    .style('cursor', 'pointer')

  titles.style('cursor', 'pointer')

  // annotation mouse overs ========

  wholeLabels.on('mouseleave', function () {
    const parentGroup = d3.select(this)
    closeAnnotation(parentGroup)
  })

  backgroundRects.on('mouseover', function () {
    openAnnotation(this)
  })

  titles.on('mouseover', function () {
    openAnnotation(this)
  })
}

const openAnnotation = (textOrRectSelection) => {
  const labelParentGroup = d3.select(
    textOrRectSelection?.parentNode?.parentNode?.parentNode
  )
  labelParentGroup.raise()

  const backgroundRects = labelParentGroup.select('.annotation-note-bg')

  backgroundRects
    .transition()
    .duration(300)
    .attr('fill-opacity', 1)
    .attr('height', (d: any) => {
      const title = d.note.title
        const titleLength = title.trim().length
        const descriptionLength = d.note.label.trim().length

        if (!descriptionLength) return getClosedLabelHeight(title)

        const textHeight = titleLength + descriptionLength
        let rectHeight = textHeight / 2.7 + 40; // bit hacky - using the text length to try to calculate the rect height

        if ( title.length >= 60 ) {
            rectHeight = textHeight / 2.7 + 60;
        }else if(title.length >= 30 ){
            rectHeight = textHeight / 2.7 + 50;
        }else{
            rectHeight = textHeight / 2.7 + 40;
        } // also hacky, I use the length of the title to calculate the height of the rect
        //originally I want to use the number of children (tspan) that corresponds to the number of rows the title takes up, but couldn't figure out how to select it
        //title.children().length >= 3

        return Math.max(rectHeight, 70)
    })

  const descriptions = labelParentGroup.select('.annotation-note-label')
  descriptions
    .transition()
    .duration(750)
    .attr('opacity', 1)
    .attr('display', 'block')
}

const closeAnnotation = (parentGroup) => {
  parentGroup
    .select('.annotation-note-bg')
    .transition()
    .duration(300)
    .attr('height', (d) => {
      return getClosedLabelHeight(d.note.title)
    })
    .attr('fill-opacity', 0.7)

  parentGroup.select('.annotation-note-label').transition().attr('opacity', 0)
}

const getClosedLabelHeight = (title) => {
  const lines = title.trim().length / 30
  const lineHeight = 18
  const textHeight = lineHeight * lines
  const padding = 30
  const closedLabelHeight = textHeight + padding
  return Math.max(closedLabelHeight, 50)
}
