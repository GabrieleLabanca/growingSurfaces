var sq = 3;
var N = 150;
var M = 190;


function grid_main(){
  mydata = generateGrid(); //is an array[N*M] 
  var svg1 = d3.select('#svg1');
  svg1.attr('width',N*sq).attr('height',M*sq);
  render(svg1,mydata);
  switch_RD(); // start with random deposition

  setInterval(step,100/15,svg1,mydata); // step defined in index.html
};



function render(svg1,mydata){
  svg1.selectAll('rect')
    .data(mydata)
    .enter()
    .append('rect')
    /*.attr("width",function(d){ return sq;})
      .attr("height",function(d){ return sq; })
      .attr("fill",function(d){ return associateColor(d.status);})*/
    .attr("x",function(d){ return sq*d.x;})
    .attr("y",function(d){ return sq*d.y;});
}


function clear_grid(){
  for(var n=0; n<N; n++){
    for(var m=0; m<M; m++){
      mydata[getn(n,m)].status = 'void';
    }
  }
}

function sequential_update(arr){
  if( typeof sequential_update.counter == 'undefined' ) {
    sequential_update.counter = N*M -1 ;
  }
  arr[sequential_update.counter].status="full";
  sequential_update.counter--;
  update_stats(arr);
}

function block_update(arr){
  if(typeof this.already == 'undefined'){
    this.already = 0;
  }
  if(this.already == 0){
    for(var n=0; n<10; n++){
      for(var m=0; m<10; m++){
        arr[getn(n,m)].status = 'full';
      }
    }
    this.already = 1;
  }
  update_stats(arr);
}

function random_deposition_update(arr){
  var rnd = Math.floor(Math.random()*N);
  arr[getn(rnd,col_h(arr,rnd)+1)].status = 'full';
  update_stats(arr);
}

function ballistic_deposition_update(arr){
  var rnd = Math.floor(Math.random()*N);
  // now select max in neighbourhood of n=rnd
  var H = col_h(arr,rnd)+1;
  if(rnd<N-1){ H = H > col_h(arr,rnd+1) ? H : col_h(arr,rnd+1); }
  if(rnd>0){ H = H > col_h(arr,rnd-1) ? H : col_h(arr,rnd-1); }
  arr[getn(rnd,H)].status = 'full';
  update_stats(arr);
}

var s_data = [];
function update_stats(arr){
  if(this.index === undefined){ this.index = 0;  }
  var m_h = mean_height(arr);
  var i_w = interface_w(arr);
  if(this.index%50 === 0){
    s_data.push( new Object(
          {"index":this.index,"m_h":m_h.toPrecision(4),"i_w":i_w.toPrecision(4)}
          ));
    update_graph();
  }
  document.getElementById('mean_height').innerHTML = m_h.toPrecision(2);
  document.getElementById('interface_width').innerHTML = i_w.toPrecision(2);
  this.index++;
}
function clear_stats(){
  update_stats.index = 0;
}


function col_h(arr,n){ // get height of n-th column
  var h = M;
  var this_full = false;
  while(h>0){
    h--;
    if(arr[getn(n,h)].status == 'full'){ break; }
    //if(h==0) return -1; WHY DID I DO IT?
  }
  return h; 
}

function animation(svg1,mydata){
  svg1.selectAll('rect')
    .data(mydata)
    .attr("width",function(d){ return sq;})
    .attr("height",function(d){ return sq; })
    .attr("fill",function(d){ return associateColor(d.status);})
    .attr("x",function(d){ return sq*d.x;})
    .attr("y",function(d){ return sq*d.y;});
}

function generateGrid(){
  var grid = [];
  var y = -1;
  for(var i=0; i<(N*M); i++){
    if(i%N == 0) y++;
    grid.push(new Object({"index":i,"x":i%N,"y":y,"status":"void"}));
  }
  return grid;
}

function associateColor(S){
  if(S === "void") return 'white';
  if(S === "full") return 'midnightblue';
}

function getn(n,m){ // converts (x,y) position into index
  return N*M-(N-n+m*N); // (0,0) is bottom-left

  ////N*M-1-(n+m*N); //OLD
}


function mean_height(grid){
  var line = get_interface(grid);
  return mean(line);
}

function interface_w(grid){
  var line = get_interface(grid);
  return mean_square_deviation(line);
}

function mean(line){ 
  var L = line.length;
  var mean = 0;
  for(i in line){
    mean += line[i];
  }
  return (mean / L);
}

function mean_square_deviation(line){
  var L = line.length;
  var sqrtmean = 0;
  var mu = mean(line);
  for(i in line){
    sqrtmean += Math.pow((mu - line[i]),2);
  }
  sqrtmean = (sqrtmean / L);
  return Math.sqrt(sqrtmean);
}


function get_interface(arr){
  var line = [];
  for(var n=0; n<N; n++){
    line[n] = col_h(arr,n);
  }
  return line;
}






