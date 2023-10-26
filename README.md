![0_first_page](https://github.com/bertonfederico/AestheticExperienceNetwork/assets/105301467/de841229-6701-4e18-8077-f271f54de19e)
      
# Description of the project
> [!IMPORTANT]
> The project aims to
> - develop a system for visualizing a dataset that is intended to represent eight networks that model an aesthetic experience of the viewers when observing artworks;
> - create impactful charts or infographics from data through D3.js (JavaScript library).
>
> The dataset used in the project are the result of the research presented in the article ["Associating With Art: A Network Model of Aesthetic Effects"](https://online.ucpress.edu/collabra/article/7/1/24085/117225/Associating-With-Art-A-Network-Model-of-Aesthetic) which was shared by the authors of the article to have the opportunity to know "how to visualize this data set for an art historical audience or other audience that does not know about network theory". 


# Illustration of source data
<table align="center">
	<tr>
		<th>Table example</th>
		<th>Legend</th>
	</tr>
	<tr>
		<td width=90%><img src="res/aesthetic_experience_network_image_example.png" /></td>
		<td width=90%><img src="res/aesthetic_experience_network_image_legend.png" /></td>
	</tr>
</table>

> [!IMPORTANT]
> The source dataset (.xlsx) for each of the paintings analyzed contains a sheet showing a table on which the relationships between the aesthetic effects tested are contained. The aesthetic effects used are the following (each effect is reported together with its opposite):
> - ***positive — negative***
> - ***active — passive***
> - ***still — lively***
> - ***sad — happy***
> - ***peaceful — aggressive***
> - ***hard — soft***
> - ***cold — warm***
> - ***light — heavy***
> - ***rough — smooth***
> - ***spiritual — bodily***
> - ***feminine — masculine***
> - ***cautious — intrusive***
> - ***like — dislike***
> - ***interesting — uninteresting***
> 
> The numerical value has a:
> - minimum value of -1.0 (maximum correlation between one of the two aesthetic effects and the opposite of the other);
> - mean value of 0 (no correlation between the two aesthetic effects)
> - maximum value of 1 (maximum correlation between the two aesthetic effects).
> 
> Consequently, if a given connection (e.g., between ***positive*** and ***active***) recorded a positive value (0.108), then, considering the opposite of either (***positive*** and ***passive***), the value becomes negative (-0.108).
> 
> The goal of the project is to create visualization graphs that effectively show the connections between the aesthetic effects experienced during the observation of each painting, with the objectives of:
> - make all the reproduced aesthetic effects and their connections visible in a compact manner;
> - make the differences between the various reproduced connections visibly evident during total viewing;
> - give the ability to focus on a specific connection and view the complete data about it.


# Illustration of graphs obtained
## Specific description for each created graph
### Cartesian graphs
<table align="center">
	<tr>
		<th>Graph</th>
		<th>Color legend</th>
		<th>Width legend</th>
	</tr>
	<tr>
		<td width=63.6%><img src="screenshot/graph/1_cartesianGraphs.png" /></td>
		<td width=21.8%><img src="screenshot/legend/1_2_3_4_6_7_legend.png" /></td>
		<td width=14.4%><img src="screenshot/legend/1_6_legend.png" /></td>
	</tr>
</table>

> [!IMPORTANT]
> #### <h3>Object representing the connection between aesthetic effects: </h3>
> 📌 The graph is depicted through a cartesian plane; <br/>
> 📌 Each connection is represented ***by a circle*** connected vertically and horizontally to two aesthetic effects.
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Ways of representing the connection between aesthetic effects: </h3>
> 🔵 ***Circle radius length***: it's directly proportional to the absolute value to be represented, so
>   * it is useful in observing whether the two aesthetic effects are correlated or connected very slightly, but
>   * it does not give information regarding the positivity or negativity of the correlation; <br/>
>
> 🔵 ***Circle color***: it is based on color legend, with two very different colors between extreme positivity or negativity, so
>   * it is very useful for differentiating positive and negative values, but
>   * very low values, both negative and positive, have little different colors and therefore confusable.
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Is it possible to visualize the connection between all aesthetic effects considered in a single graph? </h3>
> ⭕ All connections are visible in a single graph, specific to the painting to which they relate; however, <br/>
> ⭕ each connection between aesthetic effects is reported twice in the graph.
<br/>

### Table graphs
<table align="center">
	<tr>
		<th>Graph</th>
		<th>Color legend</th>
	</tr>
	<tr>
		<td width=74.7%><img src="screenshot/graph/2_tableGraphs.png" /></td>
		<td width=25.3%><img src="screenshot/legend/1_2_3_4_6_7_legend.png" /></td>
	</tr>
</table>

> [!IMPORTANT]
> #### <h3>Object representing the connection between aesthetic effects: </h3>
> 📌 The graph is depicted through a table plane; <br/>
> 📌 Each connection is represented ***by a square*** connected vertically and horizontally to two aesthetic effects.
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Ways of representing the connection between aesthetic effects: </h3>
> ***Square color***: it is based on color legend, with two very different colors between extreme positivity or negativity, so
>   * it is very useful for differentiating positive and negative values, but
>   * very low values, both negative and positive, have little different colors and therefore confusable.
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Is it possible to visualize the connection between all aesthetic effects considered in a single graph? </h3>
> ⭕ All connections are visible in a single graph, specific to the painting to which they relate; however, <br/>
> ⭕ Each connection between aesthetic effects is reported twice in the graph.
<br/>


### Force directed graphs
<table align="center">
	<tr>
		<th>Graph</th>
		<th>Color legend</th>
		<th>Width legend</th>
	</tr>
	<tr>
		<td width=60%><img src="screenshot/graph/3_forceDirectedGraphs.png" /></td>
		<td width=20.6%><img src="screenshot/legend/1_2_3_4_6_7_legend.png" /></td>
		<td width=16.4%><img src="screenshot/legend/3_4_legend.png" /></td>
	</tr>
</table>

> [!IMPORTANT]
> #### <h3>Object representing the connection between aesthetic effects: </h3>
> ⚪ Several circles, each depicting an aesthetic effect, <br/>
> ➖ are connected ***by lines***, which represent the connections between the aesthetic effects, so <br/>
> 📉 the position of the aesthetic effects (i.e., circles) varies according to the connections between them.
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Ways of representing the connection between aesthetic effects: </h3>
> 🔵 ***Line length***: it's inversely proportional to the absolute value to be represented, so
> * it is useful in observing whether the two aesthetic effects are correlated or connected very slightly, but
> * it does not give information regarding the positivity or negativity of the correlation;
> 
> 🔵 ***Line width***: it's directly proportional to the absolute value to be represented, which increases the visual benefits obtained from the variation in lengths;
> 
> 🔵 ***Line color***: it is based on color legend, with two very different colors between extreme positivity or negativity, so
> * it is very useful for differentiating positive and negative values, but
> * very low values, both negative and positive, have little different colors and therefore confusable.
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Is it possible to visualize the connection between all aesthetic effects considered in a single graph? </h3>
> ⭕ All connections are visible in a single graph, specific to the painting to which they relate.
<br/>

### Circular graphs
<table align="center">
	<tr>
		<th>Graph</th>
		<th>Color legend</th>
		<th>Width legend</th>
	</tr>
	<tr>
		<td width=60%><img src="screenshot/graph/4_circularGraphs.png"/></td>
		<td width=20.6%><img src="screenshot/legend/1_2_3_4_6_7_legend.png"/></td>
		<td width=16.4%><img src="screenshot/legend/3_4_legend.png"/></td>
	</tr>
</table>

> [!IMPORTANT]
> #### <h3>Object representing the connection between aesthetic effects: </h3>
> ⚪ Several circles, each depicting an aesthetic effect, <br/>
> ➖ are connected ***by lines***, which represent the connections between the aesthetic effects, each of which extends
> 	* outward if they have negative value, or
>  	* inward if they have positive value.
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Ways of representing the connection between aesthetic effects: </h3>
> 🔵 ***Line position***: each line extends outward if represent negative value, or inward in case of positive value; it'is very useful because
>* overlapping lines are limited (e.g., compared with Force directed graphs);
>* positivity and negativity of values can be identified even in the case of finite numbers (unlike all previous graphs analyzed above).
> 
> 🔵 ***Line width***: it's directly proportional to the absolute value to be represented, which increases the visual benefits obtained from the variation in lengths;
> 
> 🔵 ***Line color***: it is based on color legend, with two very different colors between extreme positivity or negativity, so it is very useful for differentiating positive and negative values.
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Is it possible to visualize the connection between all aesthetic effects considered in a single graph? </h3>
> ⭕ All connections are visible in a single graph, specific to the painting to which they relate.
<br/>

### Radius graphs
<table align="center">
	<tr>
		<th>Graph</th>
		<th>Color&radius legend</th>
	</tr>
	<tr>
		<td width=61%><img src="screenshot/graph/5_radiusGraphs.png"/></td>
		<td><img src="screenshot/legend/5_legend.png"/></td>
	</tr>
</table>

> [!IMPORTANT]
> #### <h3>Object representing the connection between aesthetic effects: </h3>
> 🍕 The connection between the aesthetic effect selected on the top bar and all the rest is shown through ***lices of circle***, <br/>
> 💿 each of which is in a circular position along with the others.
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Ways of representing the connection between aesthetic effects: </h3>
> 🔵 ***Slices of circle lenght***: it's directly proportional to the absolute value to be represented, so
>   * it is useful in observing whether the two aesthetic effects are correlated or connected very slightly, but
>   * it does not give information regarding the positivity or negativity of the correlation; <br/>
> 
> 🔵 ***Slices of circle color***: it is based on color legend, with two very different colors between extreme positivity or negativity, so
>   * it is very useful for differentiating positive and negative values, but
>   * very low values, both negative and positive, have little different colors and therefore confusable.
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Is it possible to visualize the connection between all aesthetic effects considered in a single graph? </h3>
> ⭕ A single graph refers to the connections of a single aesthetic effect with the remaining ones, so 
> ⭕ as many graphs are needed for each painting as aesthetic effects.
<br/>

### Radar graphs
<table align="center">
	<tr>
		<th>Graph</th>
		<th>Painting legend</th>
	</tr>
	<tr>
		<td width=63.6%><img src="screenshot/graph/6_radarGraphs.png"/></td>
		<td width=21.8%><img src="screenshot/legend/1_2_3_4_6_7_legend.png" /></td>
		<td width=14.4%><img src="screenshot/legend/1_6_legend.png" /></td>
	</tr>
</table>


> [!IMPORTANT]
> #### <h3>Object representing the connection between aesthetic effects: </h3>
> 🔴 The connection between the aesthetic effect selected on the top bar and all the rest is shown through ***circles*** <br/>
> 🕸 which are connected to each other by a line so as to form a kind of "spider's web".
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Ways of representing the connection between aesthetic effects: </h3>
> 🔵 ***Circle distance from dashed center***: a dotted circle line is placed around the center; the distance of each circle from this line means that:
>   * the connection between the aesthetic effects is null, if the position is at the circle;
>   * the connection between the effects is negative, if the position is outside the circle;
>   * the connection between the effects is positive, if the position is outside the circle;
> 
> 🔵 ***Circle radius length***: it's directly proportional to the absolute value to be represented, so
>   * it is useful in observing whether the two aesthetic effects are correlated or connected very slightly, but
>   * it does not give information regarding the positivity or negativity of the correlation; <br/>
>
> 🔵 ***Circle color***: it is based on color legend, with two very different colors between extreme positivity or negativity, so
>   * it is very useful for differentiating positive and negative values, but
>   * very low values, both negative and positive, have little different colors and therefore confusable.
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Is it possible to visualize the connection between all aesthetic effects considered in a single graph? </h3>
> ⭕ A single graph refers to the connections of a single aesthetic effect with the remaining ones, so 
> ⭕ as many graphs are needed for each painting as aesthetic effects.
<br/>

### 3d force directed graphs
<table align="center">
	<tr>
		<th>Graph</th>
		<th>Color legend</th>
	</tr>
	<tr>
		<td width=74.7%><img src="screenshot/graph/7_3dForceDirectedGraphs.png"/></td>
		<td width=25.3%><img src="screenshot/legend/1_2_3_4_6_7_legend.png"/></td>
	</tr>
</table>

> [!IMPORTANT]
> #### <h3>Object representing the connection between aesthetic effects: </h3>
> ⚪ Several spheres, each depicting an aesthetic effect, <br/>
> ➖ connected by *3D-lines*, which represent the connections between the aesthetic effects, which differ
> * by width (by selecting the view with "same link strength") and
> * also by length in case the view with "different link strength" is selected; in this case the position of the aesthetic effects (i.e., circles) varies according to the connections between them;
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Ways of representing the connection between aesthetic effects: </h3> 
> 🔵 ***3D-line width***: it's directly proportional to the absolute value to be represented, so
> * it is useful in observing whether the two aesthetic effects are correlated or connected very slightly, but
> * it does not give information regarding the positivity or negativity of the correlation;
>
> 🔵 ***3D-line color***: it is based on color legend, with two very different colors between extreme positivity or negativity, so
> * it is very useful for differentiating positive and negative values, but
> * very low values, both negative and positive, have little different colors and therefore confusable.
>
> 🔵 ***3D-line length***: ***used only in "different link strength"***, it's inversely proportional to the absolute value to be represented, which increases the visual benefits obtained from the variation in width;
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Is it possible to visualize the connection between all aesthetic effects considered in a single graph? </h3>
> ⭕ All connections are visible in a single graph, specific to the painting to which they relate.
<br/>


### Surface graphs
<table align="center">
	<tr>
		<th>Graph</th>
	</tr>
	<tr>
		<td><img src="screenshot/graph/8_surfaceGraphs.png"/></td>
	</tr>
</table>

> [!IMPORTANT]
> #### <h3>Object representing the connection between aesthetic effects: </h3>
> 📌 This graph is very similar to the ***"Cartesian graph"***, but it is ***three-dimensional*** instead of two-dimensional.
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Ways of representing the connection between aesthetic effects: </h3>
> 🔵 ***Circle tip height***: the height of the circle is positioned on the z-axis with values z ∈ [-1, 1]; consequently:
>   * negative values are placed in the lowest part (z ∈ [-1, 0]);
>   * null values are placed in the middle part (z ∈ [-1, 0]);
>   * positive values are placed in the highest part (z ∈ [0, 1]).
>
> 🔵 ***Circle color***: it is based on color legend, with two very different colors between extreme positivity or negativity, so
>   * it is very useful for differentiating positive and negative values, but
>   * very low values, both negative and positive, have little different colors and therefore confusable.
> <br/><br/>

> [!IMPORTANT]
> #### <h3>Is it possible to visualize the connection between all aesthetic effects considered in a single graph? </h3>
> ⭕ All connections are visible in a single graph, specific to the painting to which they relate; however, <br/>
> ⭕ each connection between aesthetic effects is reported twice in the graph.
<br/>

## Description of development mode
Both the graphs and their respective legends are created via a D3.js, a JavaScript library for producing dynamic, interactive data visualizations; this library allows images to be developed as *.svg* (Scalable Vector Graphics). The central design concept of D3 is to allow the programmer to use selectors to choose nodes within the DOM and then use operators to manipulate them.

### Code example for the graph

```javascript
// Creating new svg over a div for the graph
this.svg = elementDiv.append("div")
    .append("svg")
    .attr("width", this.svgDimension)
    .attr("height", this.svgDimension)
    .attr("viewBox", [0, 0, this.svgDimension, this.svgDimension])
    .append("g");
```
	
```javascript
// Creating internal svg content
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
```

### Code example for legends
```javascript
// Creating images and numbers to form a legend
const legendscale = d3.scaleLinear()
	.range([1, svgDimension - legendMargin.top - legendMargin.bottom])
	.domain(colorScale.domain());

const legendaxis = d3.axisRight()
	.scale(legendscale)
	.tickSize(6)
	.ticks(8);

const svg = colorLegendContainer
	.append("svg")
	.attr("height", svgDimension)
	.attr("width", legendWidth);

svg.append("g")
	.attr("class", "axis")
	.attr("transform", "translate(" + (legendMargin.right + 80 + legendMargin.left/2) + "," + (legendMargin.top) + ")")
	.call(legendaxis);

svg.append("rect")
	.attr("x", legendMargin.left)
	.attr("y", legendMargin.top)
	.attr("width", 80)
	.attr("height", svgDimension-legendMargin.top-margin.bottom)
	.attr("fill", "url(#" + tag + "colorGrad)");
```
