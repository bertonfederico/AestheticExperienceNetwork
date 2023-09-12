class RadarGraph extends Abstract2DGraph {

    constructor() {
        if (!!RadarGraph.instance) {
            return RadarGraph.instance;
        }

        const atworkColorArray = ["#00ffff", "#ff00ff", "#00ff00", "#ff0000", "#808000", "#800080", "#c0c0c0", "#000080", "#ffff00", "#008080"];

        super(true, false, true, 540, "radar", d3.scaleLinear().domain([0,1]).range([6,25]), true, true, false, atworkColorArray);

        RadarGraph.instance = this;

        return this;
    }

    createSpecificSvg(notUsed) {
        const selectedOption = this.artworkContainer.value;
        const effect = this.effectContainer.value;


        let colorIndex = 0;
        const radiusSvg = this.svg
            .append("g")
            .attr("transform", "translate(" + this.svgDimension/2 + "," + this.svgDimension/2 + ")");

        graphData.forEach((graph, option) => {
            if (option == selectedOption || (selectedOption == "All" && selectedOption != "Average")) {
                this.createSingleEffectGraph(radiusSvg, option, graph, this.atworkColorArray[colorIndex], effect, selectedOption != "All");
            }
            colorIndex++;
        });

    }

    createSingleEffectGraph(radiusSvg, option, graph, color, effect, drawCircles) {
        const effectLinks = graph.links.filter(link => (link.source == effect || link.target == effect));
        const quant = (2*Math.PI)/effectLinks.length;
        const points = [];
        const maxPointPosition = 110;
        radiusSvg
            .append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', maxPointPosition)
            .attr('stroke', 'black')
            .attr('fill','transparent')
            .style("stroke-dasharray","5,5");
        effectLinks.forEach((link, index) => {
            const angle = quant*index;
            const point = polarToCartesian(0, 0, maxPointPosition + maxPointPosition*link.weight, ((angle+quant/2)*180)/Math.PI, link.weight);
            point.description = link.source + " - " + link.target + " -> " + link.weight;
            points.push(point);
            this.createLines(radiusSvg, angle+quant/2);
            this.createLables(radiusSvg, angle+quant/2, link.source == effect ? link.target : link.source);
        });
        this.createPolygon(radiusSvg, points, option, color, !drawCircles);
        if (drawCircles) {
            this.createCircles(radiusSvg, points);
        }
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

    createPolygon(radiusSvg, points, option, color, flagSetId) {
        const line = d3.line()
            .x(function(d) { return d.x; })
            .y(function(d) { return d.y; });

        const path = radiusSvg.append('path')
            .attr("d", line(points) + 'Z')
            .style("fill", color)
            .style("stroke", 'black')
            .attr("fill-opacity", 0.2);

        if (flagSetId) {
            path.on("mouseover", function () {
                d3.select(this).transition().duration(500).attr("fill-opacity", 1);
                d3.select(this).raise();
                d3.timeout(() => {
                    d3.select(this).transition().duration(500).attr("fill-opacity", 0.2);
                }, 2000);
            })
            .on("mouseout", function () {
                d3.select(this).transition().duration(500).attr("fill-opacity", 0.2);
            })
            .attr("id", option)
        }

        path.append("title")
            .text(option);
    }

    createCircles(radiusSvg, points) {
        radiusSvg
            .selectAll('circle')
            .data(points)
            .enter()
            .append('circle')
            .attr('cx', function(d) {
                return d.x;
            })
            .attr('cy', function(d) {
                return d.y;
            })
            .attr('r', (d) => {
                return this.linearScale(Math.abs(d.weight));
            })
            .attr('stroke', 'black')
            .attr("fill", function(d) {
                return colorScale(d.weight);
            })
            .append("title")
            .text(function(d) {
                return d.description;
            });
    }
}