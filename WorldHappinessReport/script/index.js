var bardata = [];
var count = [];
    d3.csv('data/happinesRank.csv', function(data) {
        console.log(data);

        for (key in data) {
            bardata.push(data[key].HappinessScore)
            count.push(data[key].Country)
        }
		
        console.log(count);

    var margin = { top: 5, right: 80, bottom: 160, left:50 }

    var height = 800 - margin.top - margin.bottom,
        width = 900 - margin.left - margin.right,
        barWidth = 50,
        barOffset = 10;

    var colors = '#B58929';
	
	data.forEach(function(d) {
        d.country = d.Country;
		console.log(d.Country);
        d.HappinessScore = +d.HappinessScore;
    });

    var yScale = d3.scale.linear()
            .domain([0, 9])
            .range([0, height]);
	
    var xScale = d3.scale.ordinal()
            .rangeRoundBands([0, width], .25)
			.domain(data.map(function (d) {
				console.log(d.Country)	;	
				return d.Country;
			}));
				

    var div = d3.select("body").append("div").attr("id", "tooltip-container");

    var myChart = d3.select('.chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
        .selectAll('rect').data(data)
        .enter().append('rect')
			.attr("class", "bar")
            .attr('width', xScale.rangeBand())
            .attr('x', function (d) {
				return xScale(d.Country);
			})
            .attr('height', 0)
            .attr('y', height)

        .on('mouseover', function(d) {
						div.style("left", d3.event.pageX+10+"px");
						div.style("top", d3.event.pageY-25+"px");
						div.style("display", "inline-block");
						div.html("<strong>Average Happiness Score:</strong> "+(d.HappinessScore));
        })

        .on('mouseout', function(d) {
						div.style("display", "none");	
       		 })

    myChart.transition()
        .attr('height', function(d) {
			if(d.country=='World'){d3.select(this).style('fill',colors);}
            return yScale(d.HappinessScore);
        })
        .attr('y', function(d) {
            return height - yScale(d.HappinessScore);
        })
        .delay(function(d, i) {
            return i * 20;
        })
        .duration(1000)
        .ease('elastic')

    var vGuideScale = d3.scale.linear()
        .domain([0, 9])
        .range([height, 0])

    var vAxis = d3.svg.axis()
        .scale(vGuideScale)
        .orient('left')

    var vGuide = d3.select('svg').append('g')
        vAxis(vGuide)
        vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
        vGuide.selectAll('path')
            .style({ fill: 'none', stroke: "#000"})
        vGuide.selectAll('line')
        vGuide.style({ stroke: "#000"})
            .append("text")
            .style("fill", "brown")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Average Happiness Score of 2015-17");

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')

    var hGuide = d3.select('svg').append('g')
				.attr("class", "x axis")
				.call(xAxis);
				hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
				hGuide.selectAll("text")
			   .style("text-anchor", "end")
			   .attr("dx", "-.8em")
			   .attr("dy", "-.55em")
			   .attr("transform", "rotate(-90)" );
				hGuide.selectAll('path')
					.style({ fill: 'none', stroke: "#000"})
				hGuide.selectAll('line')
					.style({ stroke: "#000"})
});