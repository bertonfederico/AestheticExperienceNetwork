var firstPageSvg;

var firstPageWidth = window.innerHeight;
var firstPageHeight = 555;

function setUpFirstPage() {
    firstPageSvg = d3.select("#firstPageContainer").append("svg")
        .attr("id", "firstPageSvg")
        .attr("width", firstPageWidth)
        .attr("height", firstPageHeight);
    
    setUpCircles();
    setUpWordsCloud();
    setUpImportButton();
}

function setUpCircles() {

    firstPageSvg.append("rect")
        .attr("width", firstPageWidth)
        .attr("height", firstPageHeight)
        .on("ontouchstart" in document ? "touchmove" : "mousemove", particle)
        .attr("pointer-events", "all")
        .attr("fill", "none");

    let i = 0;

    function particle() {
        const m = d3.mouse(this);

        firstPageSvg.insert("circle", "rect")
            .attr("cx", m[0])
            .attr("cy", m[1])
            .attr("r", 1e-6)
            .style("stroke", d3.hsl((i = (i + 1) % 360), 1, .5))
            .style("stroke-opacity", 1)
            .attr("fill", "none")
            .style("stroke-width", 2.5)
        .transition()
            .duration(2000)
            .ease(Math.sqrt)
            .attr("r", 100)
            .style("stroke-opacity", 1e-6)
            .remove();

        d3.event.preventDefault();
    }
}

function setUpWordsCloud() {
    let wordsToDraw;

    if (location.hostname == "") {
        wordsToDraw = [{ text: 'Acceptance'} , { text: 'Admiration'} , { text: 'Adoration'} , { text: 'Affection'} , { text: 'Afraid'} , { text: 'Agitation'} , { text: 'Agony'} , { text: 'Aggressive'} , { text: 'Alarm'} , { text: 'Alarmed'} , { text: 'Alienation'} , { text: 'Amazement'} , { text: 'Ambivalence'} , { text: 'Amusement'} , { text: 'Anger'} , { text: 'Anguish'} , { text: 'Annoyed'} , { text: 'Anticipating'} , { text: 'Anxious'} , { text: 'Apathy'} , { text: 'Apprehension'} , { text: 'Arrogant'} , { text: 'Assertive'} , { text: 'Astonished'} , { text: 'Attentiveness'} , { text: 'Attraction'} , { text: 'Aversion'} , { text: 'Awe'} , { text: 'Baffled'} , { text: 'Bewildered'} , { text: 'Bitter'} , { text: 'Bitter sweetness'} , { text: 'Bliss'} , { text: 'Bored'} , { text: 'Brazen'} , { text: 'Brooding'} , { text: 'Calm'} , { text: 'Carefree'} , { text: 'Careless'} , { text: 'Caring'} , { text: 'Charity'} , { text: 'Cheeky'} , { text: 'Cheerfulness'} , { text: 'Claustrophobic'} , { text: 'Coercive'} , { text: 'Comfortable'} , { text: 'Confident'} , { text: 'Confusion'} , { text: 'Contempt'} , { text: 'Content'} , { text: 'Courage'} , { text: 'Cowardly'} , { text: 'Cruelty'} , { text: 'Curiosity'} , { text: 'Cynicism'} , { text: 'Dazed'} , { text: 'Dejection'} , { text: 'Delighted'} , { text: 'Demoralized'} , { text: 'Depressed'} , { text: 'Desire'} , { text: 'Despair'} , { text: 'Determined'} ,
            { text: 'Excitement'} , { text: 'Expectancy'} , { text: 'Fascination'} , { text: 'Fear'} , { text: 'Flakey'} , { text: 'Focused'} , { text: 'Fondness'} , { text: 'Friendliness'} , { text: 'Fright'} , { text: 'Frustrated'} , { text: 'Fury'} , { text: 'Glee'} , { text: 'Gloomy'} , { text: 'Glumness'} , { text: 'Gratitude'} , { text: 'Greed'} , { text: 'Grief'} , { text: 'Grouchiness'} , { text: 'Grumpiness'} , { text: 'Guilt'} , { text: 'Happiness'} , { text: 'Hate'} , { text: 'Hatred'} , { text: 'Helpless'} , { text: 'Homesickness'} , { text: 'Hope'} , { text: 'Hopeless'} , { text: 'Horrified'} , { text: 'Hospitable'} , { text: 'Humiliation'} , { text: 'Humility'} , { text: 'Hurt'} , { text: 'Hysteria'} , { text: 'Idleness'} , { text: 'Impatient'} , { text: 'Indifference'} , { text: 'Indignant'} , { text: 'Infatuation'} , { text: 'Infuriated'} , { text: 'Insecurity'} , { text: 'Insightful'} , { text: 'Insulted'} , { text: 'Interest'} , { text: 'Intrigued'} , { text: 'Irritated'} , { text: 'Isolated'} , { text: 'Jealousy'} , { text: 'Joviality'} , { text: 'Joy'} , { text: 'Jubilation'} , { text: 'Kind'} , { text: 'Lazy'} , { text: 'Liking'} , { text: 'Loathing'} , { text: 'Lonely'} , { text: 'Longing'} , { text: 'Loopy'} , { text: 'Love'} , { text: 'Lust'} , { text: 'Mad'} , { text: 'Melancholy'} , { text: 'Miserable'} , { text: 'Miserliness'} , { text: 'Mixed up'} , { text: 'Modesty'} , { text: 'Moody'} , { text: 'Mortified'} , { text: 'Mystified'} , { text: 'Nasty'} , { text: 'Nauseated'} , { text: 'Negative'} , { text: 'Neglect'} , { text: 'Nervous'} , { text: 'Nostalgic'} , { text: 'Numb'} ,
            { text: 'Obstinate'} , { text: 'Offended'} , { text: 'Optimistic'} , { text: 'Outrage'} , { text: 'Overwhelmed'} , { text: 'Panicked'} , { text: 'Paranoid'} , { text: 'Passion'} , { text: 'Patience'} , { text: 'Pensiveness'} , { text: 'Perplexed'} , { text: 'Persevering'} , { text: 'Pessimism'} , { text: 'Pity'} , { text: 'Pleased'} , { text: 'Pleasure'} , { text: 'Politeness'} , { text: 'Positive'} , { text: 'Possessive'} , { text: 'Powerless'} , { text: 'Pride'} , { text: 'Puzzled'} , { text: 'Rage'} , { text: 'Rash'} , { text: 'Rattled'} , { text: 'Regret'} , { text: 'Rejected'} , { text: 'Relaxed'} , { text: 'Relieved'} , { text: 'Reluctant'} , { text: 'Remorse'} , { text: 'Resentment'} , { text: 'Resignation'} , { text: 'Restlessness'} , { text: 'Revulsion'} , { text: 'Ruthless'} , { text: 'Sadness'} , { text: 'Satisfaction'} , { text: 'Scared'} , { text: 'Schadenfreude'} , { text: 'Scorn'} , { text: 'Self-caring'} , { text: 'Self-compassionate'} , { text: 'Self-confident'} , { text: 'Self-conscious'} , { text: 'Self-critical'} , { text: 'Self-loathing'} , { text: 'Self-motivated'} , { text: 'Self-pity'} , { text: 'Self-respecting'} , { text: 'Self-understanding'} , { text: 'Sentimentality'} , { text: 'Serenity'} , { text: 'Shame'} , { text: 'Shameless'} , { text: 'Shocked'} , { text: 'Smug'} , { text: 'Sorrow'} , { text: 'Spite'} , { text: 'Stressed'} , { text: 'Strong'} , { text: 'Stubborn'} , { text: 'Stuck'} , { text: 'Submissive'} , { text: 'Suffering'} , { text: 'Sullenness'} , { text: 'Surprise'} , { text: 'Suspense'} , { text: 'Suspicious'} , { text: 'Sympathy'} , { text: 'Tenderness'} , { text: 'Tension'} , { text: 'Terror'} , { text: 'Thankfulness'} , { text: 'Thrilled'} , { text: 'Tired'} , { text: 'Tolerance'} , { text: 'Torment'} , { text: 'Triumphant'} , { text: 'Troubled'} , { text: 'Trust'} , { text: 'Uncertainty'} , { text: 'Undermined'} , { text: 'Uneasiness'} , { text: 'Unhappy'} , { text: 'Unnerved'} , { text: 'Unsettled'} , { text: 'Unsure'} , { text: 'Upset'} , { text: 'Vengeful'} , { text: 'Vicious'} , { text: 'Vigilance'} , { text: 'Vulnerable'} , { text: 'Weak'} , { text: 'Woe'} , { text: 'Worried'} , { text: 'Worthy'} , { text: 'Wrath'}];
    } else {
        $.ajaxSetup({ async: false });
        $.getJSON("wordsCloud.json", function(json) { wordsToDraw = json; });
        $.ajaxSetup({ async: true }); 
    }
    d3.layout.cloud()
        .size([firstPageWidth, firstPageHeight])
        .words(wordsToDraw)
        .rotate(function() {
            return ~~(Math.random() * 2) * 90;
        })
        .font("Impact")
        .fontSize(function() {
            return ~~(Math.random() * 20 + 10);
        })
        .on("end", drawWordCloud)
        .start();
}

function drawWordCloud(words) {
    const fill = d3.scaleOrdinal(d3.schemeCategory10);
    d3.select("#firstPageSvg")
        .append("g")
        .attr("transform", "translate(" + ~~(firstPageWidth / 2) + "," + ~~(firstPageHeight / 2) + ")")
        .selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", function(d) {
            return d.size + "px";
        })
        .style("-webkit-touch-callout", "none")
        .style("-webkit-user-select", "none")
        .style("-khtml-user-select", "none")
        .style("-moz-user-select", "none")
        .style("-ms-user-select", "none")
        .style("user-select", "none")
        .style("cursor", "default")
        .style("font-family", "Impact")
        .style("fill", function(d, i) {
            return fill(i);
        })
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
            return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) {
            return d.text;
        });
}

function setUpImportButton() {
    d3.select("#firstPageSvg")
        .append("rect")
        .attr("x", firstPageWidth/2)
        .attr("y", firstPageHeight/2)
        .attr("width", 400)
        .attr("height", 100)
        .attr("transform", "translate(" + (-200) + "," + (-50) + ")")
        .attr("rx", 30)
        .attr("ry", 30)
        .attr("fill", "#e52b50")
        .attr("opacity", 0.8)
        .attr('stroke', '#e52b50')
        .attr('stroke-width', 5)
        .on("click", function() {
            openInputFilePicker();
        });

    d3.select("#firstPageSvg").append("text")
        .attr("x", firstPageWidth/2)
        .attr("y", firstPageHeight/2-3)
        .attr("text-anchor", "middle")
        .text("Select new dataset")
        .style("fill", "white")
        .style("font-family", "Impact")
        .style("font-size", "25px");

}

function setUpFileName(name) {
    d3.selectAll(".xlsxFileName").remove();
    d3.select("#firstPageSvg").append("text").text("Selected: " + name)
        .attr("x", firstPageWidth/2)
        .attr("y", firstPageHeight/2+25)
        .attr("text-anchor", "middle")
        .style("fill", "white")
        .style("font-family", "Compacta")
        .style("font-size", "15px")
        .attr("font-weight", 300)
        .classed("xlsxFileName", true);
}