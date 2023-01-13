class Abstract2DGraph extends AbstractGraph {

    constructor(hasCirclesLegend, hasTriangleLegend, hasColorLegend, svgDimension, tag, linearScale, hasTwoDropdown, hasRect, needZoom, atworkColorArray) {
        super();
        this.hasCirclesLegend = hasCirclesLegend;
        this.hasTriangleLegend = hasTriangleLegend;
        this.hasColorLegend = hasColorLegend;
        this.svgDimension = svgDimension;
        this.tag = tag;
        this.linearScale = linearScale;
        this.hasTwoDropdown = hasTwoDropdown;
        this.hasRect = hasRect;
        this.needZoom = needZoom;
        this.atworkColorArray = atworkColorArray;
    }

    setUpGraphs() {
        this.createArtworkDropdown();
        this.createEffectDropdown();
        this.createLayout();
        this.createSvg(graphData.keys().next().value);
    }
    
    createLayout() {
        const containerSelection = d3.select("#" + this.tag + "GraphsContainer");
        this.createGraphDiv(containerSelection);
        containerSelection.append("div");
        if (this.hasColorLegend) createColorLegend(containerSelection.append("div"), this.svgDimension, this.tag);
        if (this.hasCirclesLegend) createCircleLegend(containerSelection.append("div"), this.svgDimension, this.linearScale);
        if (this.hasTriangleLegend) createTriangleLegend(containerSelection.append("div"), this.svgDimension, this.linearScale);
        if (this.atworkColorArray != null) createArtworkLegend(containerSelection.append("div"), this.svgDimension, this.atworkColorArray);
    }

    createGraphDiv(containerSelection) {
        const elementDiv = containerSelection.append("div");
        this.elementDiv = elementDiv;
        elementDiv.node().style.display = "grid";
        elementDiv.node().style.gridTemplateColumns = "97% 3%";
        this.svg = elementDiv.append("div")
            .append("svg")
            .attr("width", this.svgDimension)
            .attr("height", this.svgDimension)
            .attr("viewBox", [0, 0, this.svgDimension, this.svgDimension])
            .append("g");
        if (this.needZoom) this.createZoomFunctionality(this.svg, elementDiv.node());
    }

    createZoomFunctionality(svg, elementDiv) {
        this.createZoom(svg);
        this.createZoomButtons(elementDiv);
    }

    createZoom(svg) {
        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", function zoomed() {
                const transform = d3.event.transform; 
                svg.style("stroke-width", 1.5 / transform.k + "px");
                svg.attr("transform", transform);
            });

        svg.call(zoom);
        this.zoom = zoom;
    }

    createZoomButtons(elementDiv) {
        const butContainer = document.createElement("div");
        butContainer.style.display = "grid";
        butContainer.style.gridTemplateColumns = "100%";
        butContainer.style.gridTemplateRows = "20px 20px 20px";
        elementDiv.appendChild(butContainer);

        butContainer.appendChild(this.createButtonForZoom("+", () => {
            this.zoom.scaleBy(this.svg.transition().duration(750), 1.3);
        }));

        butContainer.appendChild(this.createButtonForZoom("-", () => {
            this.zoom.scaleBy(this.svg.transition().duration(750), 1 / 1.3);
        }));

        butContainer.appendChild(this.createButtonForZoom("R", () => {
            this.svg.transition().duration(750).call(this.zoom.transform, d3.zoomIdentity);
        }));
    }

    createButtonForZoom(text, callback) {
        const zoomBtn = document.createElement("button");
        zoomBtn.innerHTML = text;
        zoomBtn.style.width = "25px";
        zoomBtn.onclick = callback;
        return zoomBtn;
    }

    createEffectDropdown() {
        if (this.hasTwoDropdown) {
            this.effectContainer = document.getElementById(this.tag + "Selector2");
            const graph = graphData.get(graphData.keys().next().value);
            graph.nodes.forEach((node) =>{
                const li = document.createElement("option");
                li.value = node.id;
                li.innerHTML = node.id;
                this.effectContainer.appendChild(li);
            });
        }
    }

    createSvg(value) {
        this.svg.selectAll("*").remove();
        if (this.needZoom) {
            this.svg.transition()
                .duration(750)
                .call(this.zoom.transform, d3.zoomIdentity);
        }
        if (this.hasRect) this.createRect();
        this.createSpecificSvg(value);
    }

    createRect() {
        this.svg.append("rect")
            .attr("width", this.svgDimension)
            .attr("height", this.svgDimension)
            .attr("rx", 30)
            .attr("ry", 30)
            .attr("fill", "#eee")
            .attr("opacity", 0.7);
    }
}