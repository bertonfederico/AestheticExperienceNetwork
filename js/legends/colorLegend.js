var legendMargin = {top: 60, right: 20, bottom: 30, left: 2};
var legendWidth = 130;
var colorScale = d3.scaleSequential(d3.interpolateLab("red", "blue")).domain([-1, 1]);

function createColorLegend(colorLegendContainer, svgDimension, tag) {  
 
    const legendscale = d3.scaleLinear()
        .range([1, svgDimension - legendMargin.top - legendMargin.bottom])
        .domain(colorScale.domain());
  
    const legendaxis = d3.axisRight()
        .scale(legendscale)
        .tickSize(6)
        .ticks(8);
  
    const svg = colorLegendContainer
        .append("svg")
        .attr("height", svgDimension)
        .attr("width", legendWidth);

    svg.append("text")
        .text("Color legend")
        .attr("text-anchor", "middle")
        .attr("x", legendWidth/2)
        .attr("y", 15)
        .attr('font-weight', 'bold');
  
    svg
        .append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + (legendMargin.right + 80 + legendMargin.left/2) + "," + (legendMargin.top) + ")")
        .call(legendaxis);

    getColorGradient(svg, tag + "colorGrad");

    svg.append("rect")
        .attr("x", legendMargin.left)
        .attr("y", legendMargin.top)
        .attr("width", 80)
        .attr("height", svgDimension-legendMargin.top-margin.bottom)
        .attr("fill", "url(#" + tag + "colorGrad)");
};

function getColorGradient(svg, tag) {
    const lg = svg.append("defs").append("linearGradient")
        .attr("id", tag)
        .attr("x1", "0%")
        .attr("x2", "0%")
        .attr("y1", "0%")
        .attr("y2", "100%");

    const stops = [{offset: "0%", stopColor: colorScale(-1)}, {offset: "25%", stopColor: colorScale(-0.5)}, {offset: "50%", stopColor: colorScale(0)}, {offset: "75%", stopColor: colorScale(0.5)}, {offset: "100%", stopColor: colorScale(1)}];

    lg.selectAll("stop")
        .data(stops)
        .enter().append("stop")
        .attr("offset", function(d) {
            return d.offset;
        })
        .style("stop-color", function(d) {
            return d.stopColor;
        })
        .style("stop-opacity", 1);

    return lg;
}