class NetworkGraph extends Abstract2DGraph {

    constructor() {
        if (!!NetworkGraph.instance) {
            return NetworkGraph.instance;
        }

        super(true, false, true, 540, "network", d3.scaleLinear().domain([0,1]).range([1,10]), false, true, true);

        NetworkGraph.instance = this;

        return this;
    }

    createSpecificSvg(selectedOption) {
		this.graph = structuredClone(graphData.get(selectedOption));
		this.createSimulation();
		this.createLinkForces();
		const links = this.createLinks();
		const nodes = this.createNodes();
		this.simulation.on("tick", tickActions );
		function tickActions() {
			nodes
				.attr("transform", function(d) {
					return "translate(" + d.x + "," + d.y + ")";
				});
	
			links
				.attr("x1", function(d) { return d.source.x; })
				.attr("y1", function(d) { return d.source.y; })
				.attr("x2", function(d) { return d.target.x; })
				.attr("y2", function(d) { return d.target.y; });
		}	
	}

	createSimulation() {
		this.simulation = d3.forceSimulation()
			.nodes(this.graph.nodes)
			.force("charge_force", d3.forceManyBody().strength(-2000))
			.force("center_force", d3.forceCenter(this.svgDimension / 2, this.svgDimension / 2));
	}

	createLinkForces() {
		const linkForce = d3.forceLink(this.graph.links)
			.id(function(d) { return d.id; })
			.strength(function(d) { return (Math.abs(d.weight))});
		this.simulation.force("links", linkForce)
	}

	createLinks() {
		const links = this.svg.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(this.graph.links)
			.enter().append("line")
			.attr("stroke-width", (d)=> { return this.linearScale(Math.abs(d.weight))*2; })
			.attr("stroke", function (d) { return colorScale(d.weight); })
			.on("mouseover", function () {
                d3.select(this).transition().duration(500).attr("stroke", "#0BDA51");
            })
            .on("mouseout", function (d) {
                d3.select(this).transition().duration(500).attr("stroke", colorScale(d.weight));
            });
			
		links.append("title")
			.text(function (d) { return d.source.id + " - " + d.target.id + " -> " + d.weight; });

		return links;
	}

	createNodes() {
		const nodes = this.svg.append("g")
			.attr("class", "nodes")
			.selectAll("g")
			.data(this.graph.nodes)
			.enter().append("g");
	
		nodes.append("circle")
			.attr("r", 8)
			.attr('stroke', 'black')
			.attr('fill', '#69a3b2')
			.on("mouseover", function (p) {
				d3.selectAll("line")
				.filter(function() { return (p.x == d3.select(this).attr("x1") && p.y == d3.select(this).attr("y1")) || (p.x == d3.select(this).attr("x2") && p.y == d3.select(this).attr("y2")); })
				.dispatch("mouseover");
			})
			.on("mouseout", function (p) {
				d3.selectAll("line")
				.filter(function() { return (p.x == d3.select(this).attr("x1") && p.y == d3.select(this).attr("y1")) || (p.x == d3.select(this).attr("x2") && p.y == d3.select(this).attr("y2")); })
				.dispatch("mouseout");
			})

		nodes.append("rect")
			.attr("x", -45)
			.attr("y", -30)
			.attr("width", 90)
			.attr("height", 20)
			.attr("rx", 10)
			.attr("ry", 10)
			.attr("fill", "#bbb");
			
		nodes.append("text")
			.text(function(d) {
				return d.id;
			})
			.attr("text-anchor", "middle")
			.attr('y', -15)
			.attr('font-weight', 'bold');

		return nodes;
	}

}