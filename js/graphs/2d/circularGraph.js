class CircularGraph extends Abstract2DGraph {

    constructor() {
        if (!!CircularGraph.instance) {
            return CircularGraph.instance;
        }

        super(true, false, true, 540, "circular", d3.scaleLinear().domain([0,1]).range([1,10]), false, true, true);

        this.centerCoordinates = 270;
        this.circularRadius = 120;

        CircularGraph.instance = this;

        return this;
    }

    createSpecificSvg(selectedOption) {
        this.graph = graphData.get(selectedOption);
        const nodes = this.getNodesMap();
        this.pathMap = new Map();
        this.createLinks(nodes);
        this.createCircles(nodes);
        this.createLegend(nodes);
    }

    getNodesMap() {
        const angle = 360/this.graph.nodes.length;
        const nodes = new Map();
        this.graph.nodes.forEach((nodeToParse, index) => {
            const node = polarToCartesian(this.centerCoordinates, this.centerCoordinates, this.circularRadius, angle*index);
            node.description = nodeToParse.id;
            nodes.set(nodeToParse.id, node);
        });
        return nodes;
    }

    createLinks(nodes) {
        this.graph.links.forEach((linkToParse) => {
            const firstNode = nodes.get(linkToParse.source);
            const secondNode = nodes.get(linkToParse.target);
            if (linkToParse.weight > 0) {
                this.createLinkForPositive(firstNode, secondNode, linkToParse.weight);
            } else {
                this.createLinkForNegative(firstNode, secondNode, linkToParse.weight);
            }
        });
    }

    createLinkForPositive(firstNode, secondNode, value) {
        this.svg.append("line")
            .attr("x1", firstNode.x)
            .attr("y1", firstNode.y)
            .attr("x2", secondNode.x)
            .attr("y2", secondNode.y)
            .attr("stroke-width", this.linearScale(value) * 2)
            .attr("stroke", colorScale(value))
            .on("mouseover", function () {
                d3.select(this).transition().duration(500).attr("stroke", "#0BDA51");
            })
            .on("mouseout", function () {
                d3.select(this).transition().duration(500).attr("stroke", colorScale(value));
            })
            .append("title")
            .text(firstNode.description + " - " + secondNode.description + " -> " + value);
    }

    createLinkForNegative(firstNode, secondNode, value) {
        let angle = (secondNode.angle + firstNode.angle)/2;
        const flagInvertent = Math.abs(secondNode.angle - firstNode.angle) > 180;
        angle = flagInvertent ? angle + 180 : angle;
        const arcCenter = polarToCartesian(this.centerCoordinates, this.centerCoordinates, this.circularRadius*0.7, angle);
        const rad = getPointsDistance(arcCenter, firstNode);
        const polarFirst = cartesianToPolar(arcCenter.x, arcCenter.y, firstNode.x, firstNode.y);
        const polarSecond = cartesianToPolar(arcCenter.x, arcCenter.y, secondNode.x, secondNode.y);
        let angleFirst, angleSecond;
        if (flagInvertent) {
            angleFirst = polarSecond.angle;
            angleSecond = (polarSecond.angle > polarFirst.angle) ? polarFirst.angle + Math.PI * 2 : polarFirst.angle;
        } else {
            angleFirst = polarFirst.angle;
            angleSecond = (polarFirst.angle > polarSecond.angle) ? polarSecond.angle + Math.PI * 2 : polarSecond.angle;
        }
        const arcGenerator = d3.arc()
            .outerRadius(rad+(this.linearScale(Math.abs(value)) * 2))
            .innerRadius(rad)
            .startAngle(angleFirst)
            .endAngle(angleSecond);
        const arc = this.svg.append("path")
            .attr("transform", "translate(" + arcCenter.x + ", " + arcCenter.y + ")")
            .attr("d", arcGenerator())
            .attr("fill",colorScale(value))
            .on("mouseover", function () {
                d3.select(this).transition().duration(500).attr("fill", "#0BDA51");
            })
            .on("mouseout", function () {
                d3.select(this).transition().duration(500).attr("fill", colorScale(value));
            });

        arc.append("title")
            .text(firstNode.description + " - " + secondNode.description + " -> " + value);

        if (this.pathMap.get(firstNode.description) == null) {
            const arr = [arc];
            this.pathMap.set(firstNode.description, arr);
        } else {
            this.pathMap.get(firstNode.description).push(arc);
        }
        if (this.pathMap.get(secondNode.description) == null) {
            const arr = [arc];
            this.pathMap.set(secondNode.description, arr);
        } else {
            this.pathMap.get(secondNode.description).push(arc);
        }
    }

    createCircles(nodes) {
        const pathMap = this.pathMap;
        nodes.forEach((node,effect)=>{
            this.svg.append('circle')
                .attr('cx', node.x)
                .attr('cy', node.y)
                .attr('r', 10)
                .attr('stroke', 'black')
                .attr('fill', '#69a3b2')
                .on("mouseover", function () {
                    const cx = d3.select(this).attr("cx");
                    const cy = d3.select(this).attr("cy");
                    d3.selectAll("line")
                        .filter(function() { return (cx == d3.select(this).attr("x1") && cy == d3.select(this).attr("y1")) || (cx == d3.select(this).attr("x2") && cy == d3.select(this).attr("y2")); })
                        .dispatch("mouseover");
                    pathMap.get(node.description).forEach(function(path) {
                        path.dispatch("mouseover");
                    });
                })
                .on("mouseout", function () {
                    const cx = d3.select(this).attr("cx");
                    const cy = d3.select(this).attr("cy");
                    d3.selectAll("line")
                        .filter(function() { return (cx == d3.select(this).attr("x1") && cy == d3.select(this).attr("y1")) || (cx == d3.select(this).attr("x2") && cy == d3.select(this).attr("y2")); })
                        .dispatch("mouseout");
                    pathMap.get(node.description).forEach(function(path) {
                        path.dispatch("mouseout");
                    });
                })
        });
    }

    createLegend(nodes) {
        nodes.forEach((node, effect)=>{
            this.createLines(node, nodes.size);
            this.createLables(node, effect);
        });
    }

    createLines(node, lenght) {
        const center = polarToCartesian(this.centerCoordinates, this.centerCoordinates, 0, 0);
        const endPoint = polarToCartesian(this.centerCoordinates, this.centerCoordinates, this.circularRadius*2, node.angle-(360/(lenght*2)));
        this.svg.append("line")
            .attr("x1", center.x)
            .attr("y1", center.y)
            .attr("x2", endPoint.x)
            .attr("y2", endPoint.y)
            .attr('stroke', 'black')
            .style("stroke-dasharray","5,5");
    }

    createLables(node, effect) {
        const textPoint = polarToCartesian(this.centerCoordinates, this.centerCoordinates, this.circularRadius*1.8, node.angle);
        this.svg.append("rect")
            .attr("x", textPoint.x-45)
            .attr("y", textPoint.y-15)
            .attr("width", 90)
            .attr("height", 20)
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("fill", "#bbb");
        this.svg.append("text")
            .text(effect)
            .attr("text-anchor", "middle")
            .attr("x", textPoint.x)
            .attr("y", textPoint.y)
            .attr('font-weight', 'bold');
    }
}