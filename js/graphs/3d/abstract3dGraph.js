class Abstract3DGraph extends AbstractGraph {

    constructor() {
        super();
        this.svgDimension = 540;
        this.linearScale = d3.scaleLinear().domain([0,1]).range([1,10]);
		this.hasTwoDropdown = true;
    }

	createSvg(notUsed) {
		while (this.elementDiv.node().firstChild) {
			this.elementDiv.node().removeChild(this.elementDiv.node().lastChild);
		}
        this.createSpecificGraph();
	}
}