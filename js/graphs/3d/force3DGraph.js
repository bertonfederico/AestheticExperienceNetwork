class Force3DGraph extends Abstract3DGraph {

    constructor() {
        if (!!Force3DGraph.instance) {
            return Force3DGraph.instance;
        }

		super();

		this.highlightNodes = new Set();
    	this.highlightLinks = new Set();

        this.tag = "threeD";

        Force3DGraph.instance = this;

        return this;
    }

	setUpGraphs() {
        this.createArtworkDropdown();
        this.createLayout();
    }
    
    createLayout() {
        const containerSelection = d3.select("#" + this.tag + "GraphsContainer");
		this.elementDiv = containerSelection.append("div");
		this.elementDiv
			.append("svg").attr("width", this.svgDimension).attr("height", this.svgDimension)
			.append("rect").attr("width", this.svgDimension).attr("height", this.svgDimension).attr("fill", "black");
        containerSelection.append("div");
        createColorLegend(containerSelection.append("div"), this.svgDimension, this.tag);
    }

	createSpecificGraph() {
		const selectedOption = document.getElementById("threeDSelector1").value;
		const forceType = document.getElementById("threeDSelector2").value;
		this.graph = structuredClone(graphData.get(selectedOption));
		const Graph = ForceGraph3D()
      		(this.elementDiv.node())
        	.graphData(this.graph)
			.nodeColor((d) => { return this.highlightNodes.has(d) ? "#0BDA51" : "#69a3b2"; })
			.nodeLabel('id')
			.nodeRelSize(8)
			.nodeOpacity(1)
			.width(this.svgDimension)
			.height(this.svgDimension)
			.showNavInfo(false)
			.linkLabel(function (d) { return d.source.id + " - " + d.target.id + " -> " + d.weight; })
			.linkWidth((d) => { return this.linearScale(Math.abs(d.weight))*2; })
			.linkColor((d) => { return this.highlightLinks.has(d) ? "#0BDA51" : colorScale(d.weight); })
			.linkOpacity(1)
			.onNodeHover(node => {
				this.highlightNodes.clear();
				this.highlightLinks.clear();
				if (node) {
					this.highlightNodes.add(node);
				}
				updateHighlight();
			})
			.onLinkHover(link => {
				this.highlightNodes.clear();
				this.highlightLinks.clear();
				if (link) {
					this.highlightLinks.add(link);
					this.highlightNodes.add(link.source);
					this.highlightNodes.add(link.target);
				}
				updateHighlight();
			})

		if (forceType == 2) {
			Graph.d3Force('link', d3.forceLink().strength(d => Math.abs(d.weight)))
			.d3Force('center', d3.forceCenter(50, 0, 0))
			.cameraPosition({x: 200,y:100,z:500});
		} else {
			Graph.d3Force('charge').strength(-1500);
		}

		function updateHighlight() {
			Graph
			  .nodeColor(Graph.nodeColor())
			  .linkWidth(Graph.linkWidth())
			  .linkDirectionalParticles(Graph.linkDirectionalParticles());
		}
	}
}