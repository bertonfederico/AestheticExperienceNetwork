class SurfaceGraph extends Abstract3DGraph {

    constructor() {
        if (!!SurfaceGraph.instance) {
            return SurfaceGraph.instance;
        }

		super();

        this.tag = "surface";

        SurfaceGraph.instance = this;

        return this;
    }

	setUpGraphs() {
        this.createArtworkDropdown();
        this.createLayout();
		this.createSvg(graphData.keys().next().value);
    }
    
    createLayout() {
        this.elementDiv = d3.select("#" + this.tag + "GraphsContainer");
		this.elementDiv.node().id = "surfaceGraph";
    }

	createSpecificGraph() {
		const chart = this.getCorrectChartType();
		chart.background("black");
		this.setColorScaleAndRange(chart);
		this.setAxis(chart);
		this.generalStyle(chart);
		chart.container('surfaceGraph');
		chart.draw();
	}

	getCorrectChartType() {
		const selectedOption = document.getElementById("surfaceSelector1").value;
		const visualType = document.getElementById("surfaceSelector2").value;

		const data = this.getMatrix(selectedOption);

		const reverseNodeMap = this.reverseNodeMap;

		let chart;

		if (visualType == 1) {
			chart = anychart.surface();
			chart.markers().data(data);
			chart.markers().enabled(true);
			chart.markers().size(10);
			chart.markers().stroke(() => {
				return colorScale(this.z);
			});
			chart.markers().droplines().enabled(true);
			chart.markers().tooltip().titleFormat(function () {
				return reverseNodeMap.get(this.x) + " - " + reverseNodeMap.get(this.y);
			});
			chart.markers().tooltip().format(function () {
				return "Value: " + this.z;
			});
		} else {
			chart = anychart.surface(data);
		}
		return chart;
	}

	setColorScaleAndRange(chart) {
		const colScale = anychart.scales.linearColor();
		colScale.colors([colorScale(-1), colorScale(-0.5), colorScale(0), colorScale(0.5), colorScale(1)]);
		chart.colorScale(colScale);
		
		const colorRange = chart.colorRange().enabled(true).orientation('right')
		colorRange.marker().type("diamond");
		colorRange
			.labels(true);
		colorRange.labels().fontColor('white')
			.format(function () {
				return this.value.toFixed(2);
			});
	}

	setAxis(chart) {
		chart.yScale().ticks().interval(1);
		chart.yAxis().staggerMode(true);
		chart.yAxis().staggerLines(3);

		chart.xScale().ticks().interval(1);
		chart.xAxis().staggerMode(true);
		chart.xAxis().staggerLines(3);

		const reverseNodeMap = this.reverseNodeMap;

		chart.xAxis().labels(true);
		chart.xAxis().labels().fontColor('white')
			.format(function () {
				return reverseNodeMap.get(this.value);
			});

		chart.yAxis().labels(true);
		chart.yAxis().labels().fontColor('white')
			.format(function () {
				return reverseNodeMap.get(this.value);
			});

		chart.zAxis().labels().fontColor('white')
			.format(function () {
				return this.value.toFixed(2);
			});

		chart.xAxis().stroke('white');
		chart.yAxis().stroke('white');
		chart.zAxis().stroke('white');

		chart.xAxis().ticks().stroke('#aaa .2');
		chart.yAxis().ticks().stroke('#aaa .2');
		chart.zAxis().ticks().stroke('#aaa .2');

		chart.xScale().minimum(0).maximum(this.graph.nodes.length);
		chart.yScale().minimum(0).maximum(this.graph.nodes.length);
		chart.zScale().minimum(-1).maximum(1);

		chart.yAxis().drawLastLabel(false);
		chart.xAxis().drawLastLabel(false);
	}

	generalStyle(chart) {
		chart.rotationY(50);
		chart.rotationZ(-60);

		 chart.stroke('1 #fff .2');

		chart.box('#aaa .2');

		chart.padding(0, 50, 25);

		chart.xGrid().stroke('#aaa .2');
		chart.yGrid().stroke('#aaa .2');
		chart.zGrid().stroke('#aaa .2');

		chart.height(540);
	}

	getMatrix(selectedOption) {
		this.graph = graphData.get(selectedOption);
		const matrix = [];
		const nodeMap = new Map();
		this.reverseNodeMap = new Map();
		this.graph.nodes.forEach((node, index) => {
			nodeMap.set(node.id, index);
			this.reverseNodeMap.set(index, node.id);
		});
		this.graph.nodes.forEach((node, index) => {
			matrix.push([index, index, 1]);
		});
		this.graph.links.forEach(link => {
			matrix.push([nodeMap.get(link.source), nodeMap.get(link.target), link.weight]);
			matrix.push([nodeMap.get(link.target), nodeMap.get(link.source), link.weight]);
		});
		matrix.sort((a, b) => {
			if (a[0] < b[0]) { return -1; }
			else if (a[0] > b[0]) { return 1; }
			else if (a[0] = b[0]) {
				if (a[1] < b[1]) {return -1}
				else return 1;
			}
		});
		return matrix;
	}
}