// JavaScript Document

'use strict';

var window_w = $(window).innerWidth();


$(window).on('load', function() { 
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
	$("#preloder").delay(400).fadeOut("slow");

});

d3.csv("data/2017.csv", function(err, data) {
	
	var config = {"data1":"Country","data2":"Happiness Score","data0":"Rank","data3":"Standard Error","data5":"Economy GDP per Capital", "data6":"Family","data7":"Health Life Expectancy","data8":"Freedom","data9":"Generosity","data10":"Trust Government Corruption","data11":"Dystopia Residual","label0":"label 0","label1":"label 1","label2":"label 2","color0":"#D5D5D5","color1":"#001900", "width":960,"height":960} ;
		  
		  var MAP_KEY = config.data1;
		  var MAP_VALUE = config.data2;
		  var MAP_RANK = config.data0;
		  var MAP_HIGH = config.data3;
		  var MAP_ECONOMY = config.data5;
		  var MAP_FAMILY = config.data6;
		  var MAP_HEALTH = config.data7;
		  var MAP_FREEDOM = config.data8;
		  var MAP_GENEROSITY = config.data9;
		  var MAP_TRUST = config.data10;
		  var MAP_DYSTOPIA = config.data11;
		  
		  var colors = [];    
		  var happiness = {};
		  var rank = {};
		  var high = {};
		  var economy = {};
		  var family = {};
		  var health = {};
		  var freedom = {};
		  var generosity = {};
		  var trust = {};
		  var dystopia = {};
		 
		  data.forEach(function(d) 
		  {
			happiness[d[MAP_KEY]] = +d[MAP_VALUE];
			rank[d[MAP_KEY]] = +d[MAP_RANK];
			high[d[MAP_KEY]] = +d[MAP_HIGH];
			economy[d[MAP_KEY]] = +d[MAP_ECONOMY];
			family[d[MAP_KEY]] = +d[MAP_FAMILY];
			health[d[MAP_KEY]] = +d[MAP_HEALTH];
			freedom[d[MAP_KEY]] = +d[MAP_FREEDOM];
			generosity[d[MAP_KEY]] = +d[MAP_GENEROSITY];
			trust[d[MAP_KEY]] = +d[MAP_TRUST];
			dystopia[d[MAP_KEY]] = +d[MAP_DYSTOPIA];
			 //console.log(isNaN(dystopia[d[MAP_KEY]]));
			
		  }); 
			
		  var width = config.width,
			  height = config.height;
		  
		  
		  var colors=['#009F6B','#800080', '#0087BD', '#FFD300', '#FF7D40', '#C40233'];
		  
		  function selectColor(num){
			  if(num>=7) { return colors[0];}
			  if(num>=6 && num<7) { return colors[1];}
			  if(num>=5 && num<6) { return colors[2];}
			  if(num>=4 && num<5) { return colors[3];}
			  if(num>=3 && num<4) { return colors[4];}
			   return colors[5];
			};
		  
		  var projection = d3.geo.mercator()
			  .scale((width + 1) / 2 / Math.PI)
			  .translate([width / 2, height / 2])
			  .precision(.1);
		  
		  var path = d3.geo.path()
			  .projection(projection);
		  
		  var graticule = d3.geo.graticule();
		  
		  var svg = d3.select("#canvas-svg").append("svg")
			  .attr("width", width)
			  .attr("height", height);
		  
		  svg.append("path")
			  .datum(graticule)
			  .attr("class", "graticule")
			  .attr("d", path);
		  
		  
		  d3.json("https://s3-us-west-2.amazonaws.com/vida-public/geo/world-topo-min.json", function(error, world) {
			var countries = topojson.feature(world, world.objects.countries).features;
		  
			svg.append("path")
			   .datum(graticule)
			   .attr("class", "choropleth")
			   .attr("d", path);
		  
			var g = svg.append("g");
		  
			g.append("path")
			 .datum({type: "LineString", coordinates: [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]]})
			 .attr("class", "equator")
			 .attr("d", path);
		  
			var country = g.selectAll(".country").data(countries);
		  
			country.enter().insert("path")
				.attr("class", "country")
				.attr("d", path)
				.attr("id", function(d,i) { return d.id; })
				.attr("title", function(d) { return d.properties.name; })
				.style("fill", function(d) {
				  if (happiness[d.properties.name]) {
						return selectColor(happiness[d.properties.name]);
				  } else {
					return "#ccc";
				  }
				})
				.on("click", function(d) {
					if(rank[d.properties.name])
					
					{ 									
						var myChart = d3.select('#chart').selectAll("*").remove();
						var margin = { top: 30, right:30, bottom: 40, left:130 }
	
							var height = 500 - margin.top - margin.bottom,
								width = 550 - margin.left - margin.right
								
							
							var data = [
									{
										"name": "Economy GDP",
										"icon":"images/gpd.png",
										"value": economy[d.properties.name],
										"rank": rank[d.properties.name]
								},
									{
										"name": "Family",
										"icon":"images/family.png",
										"value": family[d.properties.name],
										"rank": rank[d.properties.name]
								},
									{
										"name": "Health Life",
										"icon":"images/health.png",
										"value": health[d.properties.name],
										"rank": rank[d.properties.name]
								},
									{
										"name": "Freedom",
										"icon":"images/freedom.png",
										"value": freedom[d.properties.name],
										"rank": rank[d.properties.name]
								},
									{
										"name": "Generosity",
										"icon":"images/generiousty.png",
										"value": generosity[d.properties.name],
										"rank": rank[d.properties.name]
								},
									{
										"name": "Govt Corruption",
										"icon":"images/corruption.png",
										"value": trust[d.properties.name],
										"rank": rank[d.properties.name]
								},
									{
										"name": "Dystopia Residual",
										"icon":"images/rebel.png",
										"value": dystopia[d.properties.name],
										"rank": rank[d.properties.name]
								}];
								
							
							var html = "";
							html += "<h2>"+d.properties.name+"</h2>";						
							html += "<br/><h3>";
							html += (rank[d.properties.name] ? "<strong>Happiness Rank: </strong>"+rank[d.properties.name] : "<strong>Happiness Score:</strong> Not in list");
							html += "";
							html += "</h3>";
							html += "<h3>";
							html += (happiness[d.properties.name] ? "<strong>Happiness Score: </strong>"+happiness[d.properties.name] : "<strong>Happiness Score:</strong> Not in list");
							html += "";
							html += "</h3>";
												
						var myChart = d3.select('#chart').html(html);
						var div = d3.select("body").append("div").attr("class", "Tip");
		
								
						var mychart = d3.select("#chart").append("svg")
								.attr("width", width + margin.left + margin.right)
								.attr("height", height + margin.top + margin.bottom)
								.append("g")
								.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
					
							var x = d3.scale.linear()
								.range([0, width])
								.domain([0, 3]);
					
							var y = d3.scale.ordinal()
								.rangeRoundBands([height, 0], .2)
								.domain(data.map(function (d) {
									return d.name;
								}));
					
							//make y axis to show bar names
							var xAxis = d3.svg.axis()
								.scale(x)
								.tickSize(0)
								.orient("top");
								
							//make y axis to show bar names
							var yAxis = d3.svg.axis()
								.scale(y)
								//no tick marks
								.tickSize(0)
								.orient("left");
					
							var gy = mychart.selectAll(".y-axis")
									.data(data)
									.enter()
									.append("g")
									.append("image")
      								.attr("xlink:href", function (d) {
										return d.icon;
									})
									.attr('x',-50)
									.attr("y", function (d) {
										return y(d.name);
									})
									  .attr("width", 40)
									  .attr("height", 40);
								
							var gx = mychart.append("g")
								.attr("class", "x axis")
								.call(xAxis);	
					
							var bars = mychart.selectAll(".bar")
								.data(data)
								.enter()
								.append("g")
					
							//append rects
							bars.append("rect")
								.attr("class", "bar")
								.attr("y", function (d) {
									return y(d.name);
								})
								.attr("height", y.rangeBand())
								.attr("x", 0)
								.attr("width", function (d) {
									return x(d.value);
								});
					
							bars.on("mousemove", function(d){
												div.style("left", d3.event.pageX+10+"px");
												div.style("top", d3.event.pageY-25+"px");
												div.style("display", "inline-block");
												div.html(d.name+" : "+(d.value));
											});
							bars.on("mouseout", function(d){
												div.style("display", "none");
											});
					}
					else
						return true;					
					})
				.on("mousemove", function(d) {
					if (happiness[d.properties.name])
					{
						 d3.select(this).style('fill','#000000');
						var html = "";
						//console.log(MAP_RANK);
						html += "<div class=\"tooltip_kv\">";
						html += "<span class=\"tooltip_key\">";
						html += d.properties.name;
						html += "</span><br/>";
						html += "<span class=\"tooltip_value\">";
						html += (rank[d.properties.name] ? "<strong>Happiness Rank: </strong>"+rank[d.properties.name] : "<strong>Happiness Rank: </strong>Not in list");
						html += "";
						html += "</span><br/>";
						html += "<span class=\"tooltip_value\">";
						html += (happiness[d.properties.name] ? "<strong>Happiness Score: </strong>"+happiness[d.properties.name] : "<strong>Happiness Score:</strong> Not in list");
						html += "";
						html += "</span>";
						html += "</div>";
						
						$("#tooltip-container").html(html);
						$("#tooltip-container").show();
						
						var coordinates = d3.mouse(this);
						
						var map_width = $('.choropleth')[0].getBoundingClientRect().width;
						
						if (d3.event.pageX < map_width / 2) {
						  d3.select("#tooltip-container")
							.style("top", (d3.event.layerY + 15) + "px")
							.style("left", (d3.event.layerX + 15) + "px");
						} else {
						  var tooltip_width = $("#tooltip-container").width();
						  d3.select("#tooltip-container")
							.style("top", (d3.event.layerY + 15) + "px")
							.style("left", (d3.event.layerX - tooltip_width - 30) + "px");
						}
					}
					else
					{
						return true;
						}
				})
				.on("mouseout", function() {
						 d3.select(this).style("fill", function(d) {
								  if (happiness[d.properties.name]) {
										return selectColor(happiness[d.properties.name]);
								  } else {
									return "#ccc";
								  }
								})
						$("#tooltip-container").hide();
					});
			
			g.append("path")
				.datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
				.attr("class", "boundary")
				.attr("d", path);
			
			svg.attr("height", config.height * 2.2 / 3);
		  });
		  
		  d3.select(self.frameElement).style("height", (height * 2.3 / 3) + "px");
		  
		  
		
});
