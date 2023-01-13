var margin = {top: 30, right: 0, bottom: 30, left: 90};

var svgWidth = 400;

function createTriangleLegend(widthLegendContainer, svgDimension, linearScale) {
 
    const legendscale = d3.scaleLinear()
        .range([1, svgDimension - margin.top - margin.bottom])
        .domain([-1, 1]);

    const svg = widthLegendContainer
        .append("svg")
        .attr("height", svgDimension)
        .attr("width", svgWidth);

    svg.append("text")
        .text("Color&radius legend")
        .attr("text-anchor", "middle")
        .attr("x", svgWidth/2)
        .attr("y", 15)
        .attr('font-weight', 'bold');

    const line = d3.line()
        .x(function(d) {
        return d.x;
        })
        .y(function(d) {
        return d.y;
        });

    const points = [{ x: margin.left, y: margin.top},
                { x: margin.left + linearScale(Math.abs(1)), y: margin.top},
                { x: margin.left + linearScale(Math.abs(1))/2+linearScale(Math.abs(0))/2, y: svgDimension/2},
                { x: margin.left + linearScale(Math.abs(1)), y: svgDimension-margin.bottom },
                { x: margin.left, y: svgDimension-margin.bottom },
                { x: margin.left + linearScale(Math.abs(1))/2-linearScale(Math.abs(0))/2, y: svgDimension/2}];
    
    getColorGradient(svg, "triangleGrad");

    svg.append('path')
        .attr("d", line(points) + 'Z')
        .style("fill", "url(#triangleGrad)")
        .style("stroke", "black");

    const legendaxis = d3.axisRight()
        .scale(legendscale)
        .tickSize(6)
        .ticks(8);

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (margin.left/2) + "," + (margin.top) + ")")
        .call(legendaxis);
}