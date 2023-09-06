var graphData;

var input;

var slideIndex = 1;

$(document).ready(function () {
	showSlides(slideIndex);
	setUpFirstPage();
	setOnUploadingCsvChange();
});

function openInputFilePicker() {
	input.click();
}

function setOnUploadingCsvChange() {
	input = document.createElement('input');
	input.type = 'file';
	input.onchange = (evt) => {
		readFileFromPath(evt.target.files[0]);
	}
}

function readFileFromPath(file) {
	const reader = new FileReader();
	reader.onload = function() { 
		const data = new Uint8Array(reader.result);
		const averageData = new Map();
		graphData = new Map();
		const workbook = XLSX.read(data, {type:'array'});
		createArtworksGraph(workbook, averageData);
		createAverageGraph(averageData);
		setUpFileName(input.files.item(0).name.trim());
		createInformationVisualization();
		viewButtons();
	};
	reader.readAsArrayBuffer(file);
}

function createArtworksGraph(workbook, averageData) {
	for (let sheetIndex = 0; sheetIndex < workbook.SheetNames.length; sheetIndex++) {
		createSingleArtworkGraph(workbook, averageData, sheetIndex);
	}
}

function createSingleArtworkGraph(workbook, averageData, sheetIndex) {
	const worksheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
	const worksheetName = workbook.SheetNames[sheetIndex].replace(/ /g, '');
	const range = XLSX.utils.decode_range(worksheet["!ref"]);
	const graph = new Object();
	graph.nodes = new Array();
	graph.links = new Array();
	let colStart = 2;

	for (let row=1; row<=range.e.r; row++) {
		readSingleLine(worksheet, averageData, graph, colStart, row, range);
		colStart++;
	}
	graphData.set(worksheetName, graph);
}

function readSingleLine(worksheet, averageData, graph, colStart, row, range) {
	const effectString = worksheet[XLSX.utils.encode_cell({r:row, c:0})].v;
	const effectNode = { 'id': effectString};
	graph.nodes.push(effectNode);
	for (let col=colStart; col<=range.e.c; col++) {
		readSingleCell(worksheet, averageData, graph, effectString, row, col);
	}
}

function readSingleCell(worksheet, averageData, graph, effectString, row, col) {
	const cell = worksheet[XLSX.utils.encode_cell({r:row, c:col})];
	const otherEffectString = worksheet[XLSX.utils.encode_cell({r:0, c:col})].v;
	const link = { 'source': effectString, 'target': otherEffectString, 'weight': Number(cell.v) };
	graph.links.push(link);
	putValueInAverageMap(averageData, effectString, otherEffectString, Number(cell.v));
}

function putValueInAverageMap(averageData, effectString, otherEffectString, value) {
	let innerAverageMap;
	if (averageData.has(effectString)) { innerAverageMap = averageData.get(effectString)}
	else { innerAverageMap = new Map()};
	if (innerAverageMap.has(otherEffectString)) { innerAverageMap.set(otherEffectString, value + Number(innerAverageMap.get(otherEffectString)))}
	else { innerAverageMap.set(otherEffectString, value)};
	averageData.set(effectString, innerAverageMap);
}

function createAverageGraph(averageData) {
	const averageGraph = new Object();
	averageGraph.nodes = graphData.get(graphData.keys().next().value).nodes;
	averageGraph.links = new Array();
	averageData.forEach((otherEffectStringMap, effectString) => {
		otherEffectStringMap.forEach((value, otherEffectString) => {
			const weight = value/(averageData.size-1);
			const link = { 'source': effectString, 'target': otherEffectString, 'weight': weight };
			averageGraph.links.push(link);
		});
	});
	graphData.set("Average", averageGraph);
}

function createInformationVisualization() {
	CircularGraph.setUpSlideShow();
	CartesianGraph.setUpSlideShow();
	TableGraph.setUpSlideShow();
	RadiusGraph.setUpSlideShow();
	NetworkGraph.setUpSlideShow();
	RadarGraph.setUpSlideShow();
	Force3DGraph.setUpSlideShow();
	SurfaceGraph.setUpSlideShow();
}

function viewButtons() {
	document.getElementById("dots").style.visibility = 'visible';
	document.getElementById("sxButton").style.visibility = 'visible';
	document.getElementById("dxButton").style.visibility = 'visible';
}