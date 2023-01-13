class CartesianGraph extends Abstract2DGraph {

    constructor() {
        if (!!CartesianGraph.instance) {
            return CartesianGraph.instance;
        }

        super(true, false, true, 540, "cartesian", d3.scaleLinear().domain([0,1]).range([3,25]), false, false, false);
       
        this.svgCartesianBigMargin = 70;
        this.svgCartesianSmallMargin = 30;

        CartesianGraph.instance = this;

        return this;
    }

    createSpecificSvg(selectedOption) {
        this.graph = graphData.get(selectedOption);
        this.createCartesianBase();
        this.createCartesianNodes();
    }

    createCartesianBase() {
        const quant = (this.svgDimension-this.svgCartesianBigMargin-this.svgCartesianSmallMargin) / this.graph.nodes.length;
        let currentLevel = this.svgCartesianBigMargin + quant;
        this.nodesMap = new Map();
        this.graph.nodes.forEach((effectNode) => {
            this.nodesMap.set(effectNode.id, currentLevel);
            this.createCartesianTextLegend(effectNode.id, currentLevel);
            this.createCartesianLines(quant, currentLevel, false);
            this.createCartesianLines(quant, currentLevel, true);
            currentLevel += quant;
        });
    }

    createCartesianTextLegend(effect, currentLevel) {
        this.svg.append("text")
            .text(effect)
            .attr("text-anchor", "end")
            .attr("x", this.svgCartesianBigMargin*1.1)
            .attr("y", currentLevel)
            .attr("id", effect + "hor")
            .attr('font-weight', 'bold');
        this.svg.append("g")
            .attr("transform", "translate(" + currentLevel + "," + this.svgCartesianBigMargin*1.1 + ")")
            .append("text")
            .text(effect)
            .attr('font-weight', 'bold')
            .attr("id", effect + "ver")
            .attr("transform", function(d) {
                return "rotate(-90)" 
            });
    }

    createCartesianLines(quant, currentLevel, flagSimmetric) {
        this.svg.append("line")
            .attr("x1", flagSimmetric ? currentLevel : this.svgCartesianBigMargin + quant)
            .attr("y1", flagSimmetric ? this.svgCartesianBigMargin + quant : currentLevel)
            .attr("x2", flagSimmetric ? currentLevel : this.svgDimension-this.svgCartesianSmallMargin)
            .attr("y2", flagSimmetric ? this.svgDimension-this.svgCartesianSmallMargin : currentLevel)
            .attr('stroke', 'black')
            .style("stroke-dasharray","5,5");
    }
    
    createCartesianNodes() {
        this.graph.links.forEach((link) => {
            this.createCartesianCircles(link.weight, this.nodesMap.get(link.source), this.nodesMap.get(link.target), link.source, link.target);
            this.createCartesianCircles(link.weight, this.nodesMap.get(link.target), this.nodesMap.get(link.source), link.target, link.source);
        });
    }
    

    
    createCartesianCircles(value, xCoord, yCoord, effect, otherEffect) {
        this.svg.append('circle')
            .attr('cx', xCoord)
            .attr('cy', yCoord)
            .attr('r', this.linearScale(Math.abs(value)))
            .attr('stroke', 'black')
            .attr('fill', colorScale(value))
            .on("mouseover", () => {
                this.svg.select("#" + effect + "ver").transition().duration(500).style("fill", "#0BDA51");
                this.svg.select("#" + otherEffect + "hor").transition().duration(500).style("fill", "#0BDA51");
            })
            .on("mouseout", () => {
                this.svg.select("#" + effect + "ver").transition().duration(500).style("fill", "black");
                this.svg.select("#" + otherEffect + "hor").transition().duration(500).style("fill", "black");
            })
            .append("title")
            .text(value);
    }
}