var margin = {top: 30, right: 0, bottom: 30, left: 90};

var svgWidth = 400;

function createArtworkLegend(widthLegendContainer, svgDimension, atworkColorArray) {
 
    const svg = widthLegendContainer
        .append("svg")
        .attr("height", svgDimension)
        .attr("width", svgWidth);

    const quant = (svgDimension - margin.top - margin.bottom)/(graphData.size-1);
    let level = margin.top;
    let index = 0;
    graphData.forEach((graph, option) => {
        svg.append('circle')
            .attr('cx', 80)
            .attr('cy', level)
            .attr('r', 10)
            .attr('stroke', 'black')
            .attr('fill', atworkColorArray[index++])
            .on("mouseover", function () {
                d3.select("#" + option).transition().duration(500).attr("fill-opacity", 1);
                d3.select("#" + option).raise();
                d3.timeout(() => {
                    d3.select("#" + option).transition().duration(500).attr("fill-opacity", 0.2);
                }, 2000);
            })
            .on("mouseout", function () {
                d3.select("#" + option).transition().duration(500).attr("fill-opacity", 0.2);
            })
        svg.append("text")
            .text(option)
            .attr("x", 100)
            .attr("y", level+5)
            .attr('font-weight', 'bold');
        level+=quant;
    });
}