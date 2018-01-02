var bin_w = 40;
var x_domain_min = -50;
var x_domain_max = 1000;
var y_domain_min = 0;
var y_domain_max = 10;
var x_label = "index", y_label = "i_w";

var x;
var y;
//svg1.attr('width',N*sq).attr('height',M*sq);

function graphs(){
  var svg = d3.select("svg#svg_graph_iw")
    .attr('width',N*sq).attr('height',2/3*N*sq),
  margin = {top: 20, right: 40, bottom: 40, left: 0},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  main_g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // parent of g and rects

  // AXES 

  g = main_g.append("g"); //contains axes

  var formatNumber = d3.format(".1f");

  x = d3.scaleLinear()
    .domain([x_domain_min,x_domain_max])
    .range([0, width]);

  y = d3.scaleLinear()
    .domain([y_domain_min,y_domain_max])
    .range([height, 0]);

  var xAxis = d3.axisBottom(x);

  var yAxis = d3.axisRight(y)
    .tickSize(width)
    .tickFormat(function(d) {
      var s = d;
      return this.parentNode.nextSibling
        ? s
        : s + "\xa0Interface width";
    });


  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(customXAxis);

  g.append("g")
    .call(customYAxis);

  function customXAxis(g) {
    g.call(xAxis);
    g.select(".domain").remove();
    g.selectAll(".tick text").style("font-size","100%");;

  }

  function customYAxis(g) {
    g.call(yAxis);
    g.select(".domain").remove();
    g.selectAll(".tick:not(:first-of-type) line").attr("stroke", "#777").attr("stroke-dasharray", "2,2");
    g.selectAll(".tick text").attr("x", 4).attr("dy", -4)
      .style("font-size","100%");;
  }

  // POINTS ARE ADDED IN update_graph()



}

function update_graph(){
  function get_x(d){
    return d[x_label];
  }
  function get_y(d){
    return d[y_label];
  }


  var svg = d3.select("svg#svg_graph_iw")
    .selectAll("circle")
    .data(s_data,function(d){return d["index"];})
    .enter()
    .append("circle")
    .attr("r",3)
    .attr("fill","red")
    .attr("cx",function(d){ return x(get_x(d));})
    .attr("cy",function(d){ return y(get_y(d)); });
}

function clear_graph(){

  var svg = d3.select("svg#svg_graph_iw")
    .selectAll("circle")
    .remove();



}

