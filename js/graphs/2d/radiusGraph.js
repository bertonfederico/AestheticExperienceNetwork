class RadiusGraph extends Abstract2DGraph {

    constructor() {
        if (!!RadiusGraph.instance) {
            return RadiusGraph.instance;
        }

        super(false, true, false, 540, "radius", d3.scaleLinear().domain([0,1]).range([30,250]), true, true, false);

        RadiusGraph.instance = this;

        return this;
    }

    createSpecificSvg(notUsed) {
        const selectedOption = this.artworkContainer.value;
        const effect = this.effectContainer.value;

        const graph = graphData.get(selectedOption);
        const effectLinks = graph.links.filter(link => (link.source == effect || link.target == effect));
        const radiusSvg = this.svg
            .append("g")
            .attr("transform", "translate(" + this.svgDimension/2 + "," + this.svgDimension/2 + ")");

        const quant = (2*Math.PI)/effectLinks.length;
        effectLinks.forEach((link, index) => {
            const angle = quant*index;
            this.createArcForEffect(radiusSvg, link.weight, angle, quant);
            this.createLines(radiusSvg, angle);
            this.createLables(radiusSvg, angle+quant/2, link.source == effect ? link.target : link.source);
        });
    }

    createLines(radiusSvg, angle) {
        const endPoint = polarToCartesian(0, 0, 250, (angle*180)/Math.PI);
        radiusSvg.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", endPoint.x)
            .attr("y2", endPoint.y)
            .attr('stroke', 'black')
            .style("stroke-dasharray","5,5");
    }

    createLables(radiusSvg, angle, effect) {
        const textPoint = polarToCartesian(0, 0, 220, (angle*180)/Math.PI);
        radiusSvg.append("rect")
            .attr("x", textPoint.x-45)
            .attr("y", textPoint.y-15)
            .attr("width", 90)
            .attr("height", 20)
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("fill", "#bbb");
        radiusSvg.append("text")
            .text(effect)
            .attr("text-anchor", "middle")
            .attr("x", textPoint.x)
            .attr("y", textPoint.y)
            .attr('font-weight', 'bold');
    }

    createArcForEffect(radiusSvg, value, startAngle, quant) {
        const arcGenerator = d3.arc()
            .outerRadius(this.linearScale(Math.abs(value)))
            .innerRadius(0)
            .startAngle(startAngle)
            .endAngle(startAngle + quant);
        radiusSvg.append("path")
            .attr("d", arcGenerator())
            .attr("fill",colorScale(value))
            .on("mouseover", function () {
                d3.select(this).transition().duration(500).attr("fill", "#0BDA51");
            })
            .on("mouseout", function () {
                d3.select(this).transition().duration(500).attr("fill", colorScale(value));
            })
            .append("title")
            .text(value);
    }

}