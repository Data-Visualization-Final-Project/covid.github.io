
// Set the dimensions and margins of the graph
const margin = { top: 30, right: 30, bottom: 50, left: 70 };
const width = 800 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

// Append the svg object to the body of the page
const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Parse the data

d3.csv("data_barchart_wafflechart_piechart.csv").then(function(data) {
  // Filter the data to select rows where Total_Vaccinations is not null
  const filteredData = data.filter(function(d) {
    return d.Total_Cases !== null && +d.Total_Cases > 5000000 ;
  });

  // Print the filtered data to the console
  const randomData = d3.shuffle(filteredData).slice(0,10);
  randomData.sort(function(a, b) {
    return b.Total_Vaccinations - a.Total_Vaccinations;
  });
  // console.log(randomData);
  // Cast the string values to numbers
  randomData.forEach(function(d) {
    d.Total_Cases = +d.Total_Cases;
    d.Total_Cases_Per_Million = +d.Total_Cases_Per_Million;
    d.Total_Deaths = +d.Total_Deaths;
    d.Total_Deaths_Per_Million = +d.Total_Deaths_Per_Million;
    d.Total_Vaccinations = +d.Total_Vaccinations;
    d.Total_Vaccinations_Per_Million = +d.Total_Vaccinations_Per_Million;
  });

  // Create the pie chart
  var radius = Math.min(width, height) / 2;
  var pie = d3.pie()
              .sort(null)
              .value(function(d) { return d.Total_Cases; });
  var arc = d3.arc()
              .outerRadius(radius - 10)
              .innerRadius(0);
  var labelArc = d3.arc()
              .outerRadius(radius - 40)
              .innerRadius(radius - 40);
  var color = d3.scaleOrdinal(d3.schemeCategory10);

  var g = svg.append("g")
              .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var data_ready = pie(randomData);
  
  g.selectAll("path")
   .data(data_ready)
   .enter().append("path")
   .attr("d", arc)
   .attr("fill", function(d) { return color(d.data.Country); })
   .attr("stroke", "white")
   .style("stroke-width", "2px")
   .on("mousemove", function(d) {
    // Scale the path
    d3.select(this).attr("transform", "scale(1.1)");

    // Show the country name
    svg.append("text")
      .attr("class", "tooltip")
      .attr("x", d3.event.pageX)
      .attr("y", d3.event.pageY - 10)
      .text(d.data.Country);
  })
  .on("mouseout", function(d) {
    // Reset the path scale
    d3.select(this).attr("transform", "scale(1)");

    // Hide the country name
    svg.select(".tooltip").remove();
  });
   

  g.selectAll("text")
   .data(data_ready)
   .enter().append("text")
   .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
   .attr("dy", ".35em")

});
