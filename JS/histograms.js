d3.csv("new_vaccinated_data_by_age_countries.csv").then(function(data) {
    // Convert data object to array
    var dataArray = Object.values(data);
    
    // Filter the data by country
    var filteredData = dataArray.filter(function(d) {
      return d.location === "Italy";
    });
    
    // Create histogram
    var margin = {top: 10, right: 30, bottom: 30, left: 40},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
    
  
    var svg = d3.select("#chart")
      .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");
  
    // Create x axis
    var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(filteredData.map(function(d) { return d.age_group; }))
        .padding(0.2);
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));
  
    // Create y axis
    var y = d3.scaleLinear()
        .domain([0, d3.max(filteredData, function(d) { return +d.people_vaccinated_per_hundred; })])
        .range([ height, 0]);
    svg.append("g")
        .call(d3.axisLeft(y));
  
    // Create bars
    svg.selectAll("mybar")
        .data(filteredData)
        .enter()
        .append("rect")
          .attr("x", function(d) { return x(d.age_group); })
          .attr("y", function(d) { return y(d.people_vaccinated_per_hundred); })
          .attr("width", x.bandwidth())
          .attr("height", function(d) { return height - y(d.people_vaccinated_per_hundred); })
          .attr("fill", "#69b3a2");
  });
  