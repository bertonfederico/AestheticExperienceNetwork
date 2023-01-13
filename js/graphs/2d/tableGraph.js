class TableGraph extends Abstract2DGraph {

    constructor() {
        if (!!TableGraph.instance) {
            return TableGraph.instance;
        }

        super(false, false, true, 540, "table", {}, false, false, false);

        this.tableSvgBigMargin = 70;
        this.tableSvgSmallMargin = 60;

        TableGraph.instance = this;

        return this;
    }

    createSpecificSvg(selectedOption) {
        this.graph = graphData.get(selectedOption);
        const quant = (this.svgDimension-this.tableSvgSmallMargin-this.tableSvgBigMargin) / this.graph.nodes.length;
        this.createTableBase(quant);
        this.createTableRects(quant);
    }

    createTableBase(quant) {
        let currentLevel = this.tableSvgBigMargin + quant;
        this.nodesMap = new Map();
        this.graph.nodes.forEach((effectNode) => {
            this.nodesMap.set(effectNode.id, currentLevel);
            this.createTableTextLegend(effectNode.id, currentLevel, quant);
            this.createCentralRect(quant, currentLevel)
            currentLevel += quant;
        });
    }

    createTableTextLegend(effect, currentLevel, quant) {
        this.svg.append("text")
            .text(effect)
            .attr("text-anchor", "end")
            .attr("x", this.tableSvgBigMargin*1.1)
            .attr("y", currentLevel+quant/2)
            .attr("id", effect + "hor")
            .attr('font-weight', 'bold');
        this.svg.append("g")
            .attr("transform", "translate(" + (currentLevel+quant/2) + "," + this.tableSvgBigMargin*1.1 + ")")
            .append("text")
            .attr("id", effect + "ver")
            .text(effect)
            .attr('font-weight', 'bold')
            .attr("transform", function(d) {
                return "rotate(-90)" 
            });
    }

    createCentralRect(quant, currentLevel) {
        this.svg.append("rect")
            .attr("x", currentLevel)
            .attr("y", currentLevel)
            .attr("width", quant)
            .attr("height", quant)
            .attr("fill", colorScale(1.0))
            .append("title")
            .text(1.0);   
    }
    
    createTableRects(quant) {
        this.graph.links.forEach((link) => {
            this.createRect(quant, link.weight, this.nodesMap.get(link.source), this.nodesMap.get(link.target), link.source, link.target);
            this.createRect(quant, link.weight, this.nodesMap.get(link.target), this.nodesMap.get(link.source), link.target, link.source);
        });
    }

    createRect(quant, value, xCoord, yCoord, xLabel, yLabel) {
        this.svg.append("rect")
            .attr("x", xCoord)
            .attr("y", yCoord)
            .attr("width", quant)
            .attr("height", quant)
            .attr("fill", colorScale(value))
            .on("mouseover", () => {
                this.svg.select("#" + yLabel + "hor").transition().duration(500).style("fill", "#0BDA51");
                this.svg.select("#" + xLabel + "ver").transition().duration(500).style("fill", "#0BDA51");
            })
            .on("mouseout", () => {
                this.svg.select("#" + yLabel + "hor").transition().duration(500).style("fill", "black");
                this.svg.select("#" + xLabel + "ver").transition().duration(500).style("fill", "black");
            })
            .append("title")
                .text(value);
    }
}