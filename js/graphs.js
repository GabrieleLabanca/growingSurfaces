var x_offset = 0;
var y_offset = 0;
var thisData = mydata;
var bin_w = 40;
var x_scale = 1;
var y_scale = 10;
var y_domain_min = 0;
var y_domain_max = 200;
var x_domain_min = new Date(2005, 1, 1);
var x_domain_max = new Date(2016, 12, 31);
var x_label = "anno", y_label = "superamenti";

window.onload = function(){
  var svg = d3.select("svg"),
  margin = {top: 20, right: 40, bottom: 40, left: 0},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  main_g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // parent of g and rects

  //function scalex(x){ return x_scale*x - x_offset; }
  //function scaley(y){ return y_scale*y - y_offset; }

  // AXES 

  g = main_g.append("g"); //contains axes

  var formatNumber = d3.format(".1f");

  var x = d3.scaleTime()
    .domain([x_domain_min,x_domain_max])
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain([y_domain_min,y_domain_max])
    .range([height, 0]);

  var xAxis = d3.axisBottom(x)
    .ticks(d3.timeYear);

  var yAxis = d3.axisRight(y)
    .tickSize(width)
    .tickFormat(function(d) {
      var s = d;
      return this.parentNode.nextSibling
        ? s
        : s + "\xa0giorni annuali di superamento del limite";
    });


  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(customXAxis);

  g.append("g")
    .call(customYAxis);

  function customXAxis(g) {
    g.call(xAxis);
    g.select(".domain").remove();
    g.selectAll(".tick text").style("font-size","200%");;

  }

  function customYAxis(g) {
    g.call(yAxis);
    g.select(".domain").remove();
    g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
    g.selectAll(".tick text").attr("x", 4).attr("dy", -4)
      .style("font-size","200%");;
  }


  // RECTS

  bin_w = x(new Date(2006,1,1)); // a bin is one-year wide
  function get_x(d){
    return d[x_label];
  }
  function get_y(d){
    return d[y_label];
  }

  main_g.selectAll("rect")
    .data(thisData)
    .enter()
    .append("rect")
    .attr("width",bin_w)
    .attr("height",function(d){ return height - y(get_y(d)); })
    .attr("fill","red")
    .attr("x",function(d){ return x(get_x(d));})
    .attr("y",function(d){ return (y(get_y(d))); });
}



