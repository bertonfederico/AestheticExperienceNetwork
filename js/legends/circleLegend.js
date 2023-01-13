var circleMargin = {top: 60, right: 60, bottom: 30, left: 2};
var circleLegendWidth = 130;

function createCircleLegend(widthLegendContainer, svgDimension, linearScale) {
  
    const legendscale = d3.scaleLinear()
        .range([1, svgDimension - circleMargin.top - circleMargin.bottom])
        .domain([-1, 1]);

    const svg = widthLegendContainer
        .append("svg")
        .attr("height", (svgDimension) + "px")
        .attr("width", circleLegendWidth);

    svg.append("text")
        .text("Width legend")
        .attr("text-anchor", "middle")
        .attr("x", circleLegendWidth/2)
        .attr("y", 15)
        .attr('font-weight', 'bold');

    const legendaxis = d3.axisRight()
        .scale(legendscale)
        .tickSize(6)
        .ticks(8);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (circleLegendWidth - circleMargin.left - circleMargin.right + 3) + "," + (circleMargin.top) + ")")
        .call(legendaxis);

    let level = circleMargin.top;
    const quant = (svgDimension - circleMargin.top - circleMargin.bottom)/10;
    for (let i = -1.0; i <= 1.0; i+=0.2) {
        svg.append('circle')
            .attr('cx', 40)
            .attr('cy', level)
            .attr('r', linearScale(Math.abs(i)))
            .attr('stroke', 'black')
            .attr('fill', '#69a3b2');
        level+=quant;
    }
}