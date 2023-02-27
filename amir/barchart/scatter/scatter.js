function drawChart_a2_v3() {

    const div_id = "#a2_v3";

    // set the dimensions and margins of the graph
    const win_width = d3.select(div_id).node().getBoundingClientRect().width;
    var margin = {top: 50, right: 30, bottom: 50, left: 80},
        width = win_width - margin.left - margin.right,
        height = (win_width/2) - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(div_id)
        .append("svg")
        .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
        //.attr("width", width + margin.left + margin.right)
        //.attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")

    //Read the data
    d3.csv("amirscater.csv").then(function(data) {

        const array = []
        let one=[]; let two = [];
        let three=[]; let four=[];
        let five=[]; let six=[];
        for(let i = 0; i < data.length; i++){
            switch (data[i].Name){
                case "Afghanistan":
                    one.push(data[i]);
                    break;
                case "Albania":
                    two.push(data[i]);
                    break;
                case "Algeria":
                    three.push(data[i]);
                    break;
                case "Andorra":
                    four.push(data[i]);
                    break;
                case "Anguilla":
                    five.push(data[i]);
                    break;
                case "Argentin":
                    six.push(data[i]);
                    break;
            }
        }

        data.forEach(function(d){
            d['Total_Cases'] = +d['Total_Cases'];
            d['Total_Deaths'] = +d['Total_Deaths'];
        });

        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, d3.max(data,function(d){ return d['Total_Cases'];})])
            .range([ 0, width ])
        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(10))

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(data,function(d){ return d['Total_Deaths'];})])
            .range([ height, 0])
        svg.append("g")
            .call(d3.axisLeft(y).ticks(7))

        // Add X axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("x", width/2 + margin.left)
            .attr("y", height + margin.top - 10 )
            .text("Total_Cases");

        // Y axis label:
        svg.append("text")
            .attr("text-anchor", "end")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left + 20)
            .attr("x", -margin.top - height/2 + 20)
            .text("Total_Deaths")

        // Color scale: give me a specie name, I return a color
        var color = d3.scaleOrdinal()
            .domain(["Afghanistan" ,"AAlbania", "Algeria", "Andorra", "Anguilla", "Argentin"  ])
            .range(d3["schemeCategory10"])

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) { return x(d['Total_Cases']);} )
            .attr("cy", function (d) { return y(d['Total_Deaths']); } )
            .attr("r", 10)
            .style("fill", function (d) { return color(d['Name']); } )




    })
}

drawChart_a2_v3();
