var margin = { top: 20, right: 30, bottom: 40, left: 60 };
var width = 1300 - margin.left - margin.right;
var height = 465 - margin.top - margin.bottom;

var svg = d3.select('.chart')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .call(responsivefy)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

d3.json('data.json', function (err, data) {
  var yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Total_Deaths))
    .range([height, 0])
    .nice();
  var yAxis = d3.axisLeft(yScale);
  svg.call(yAxis);

  var xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Total_Cases))
    .range([0, width])
    .nice();

  var xAxis = d3.axisBottom(xScale)
    .ticks(5);
  svg
    .append('g')
      .attr('transform', `translate(0, ${height})`)
    .call(xAxis);

  var rScale = d3.scaleSqrt()
    .domain([0, d3.max(data, d => d.Total_Vaccinations)])
    .range([0, 40]);

  var circles = svg
    .selectAll('.ball')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'ball')
    .attr('transform', d => {
      return `translate(${xScale(d.Total_Cases)}, ${yScale(d.Total_Deaths)})`;
    });

  circles
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', d => rScale(d.Total_Vaccinations))
    .style('fill-opacity', 0.5)
    .style('fill', 'steelblue');

  circles
    .append('text')
    .style('text-anchor', 'middle')
    .style('fill', 'black')
    .attr('y', 4)
    .text(d => d.code);

});





function responsivefy(svg) {
  // get container + svg aspect ratio
  var container = d3.select(svg.node().parentNode),
      width = parseInt(svg.style("width")),
      height = parseInt(svg.style("height")),
      aspect = width / height;

  // add viewBox and preserveAspectRatio properties,
  // and call resize so that svg resizes on inital page load
  svg.attr("viewBox", "0 0 " + width + " " + height)
      .attr("preserveAspectRatio", "xMinYMid")
      .call(resize);

  // to register multiple listeners for same event type,
  // you need to add namespace, i.e., 'click.foo'
  // necessary if you call invoke this function for multiple svgs
  // api docs: https://github.com/mbostock/d3/wiki/Selections#on
  d3.select(window).on("resize." + container.attr("id"), resize);

  // get width of container and resize svg to fit it
  function resize() {
      var targetWidth = parseInt(container.style("width"));
      svg.attr("width", targetWidth);
      svg.attr("height", Math.round(targetWidth / aspect));
  }
}
