function load_listeners(){
  document.getElementById("RD").addEventListener("click", switch_RD);
  document.getElementById("BD").addEventListener("click", switch_BD);
  //document.getElementById("clear_graph").addEventListener("click", clear_graph);
}
function switch_RD(){
  clear_grid();
  global_choose_deposition = 'RD';
  //document.getElementById("describe-deposition")
   // .innerHtml = "random deposition";
}
function switch_BD(){
  clear_grid();  
  clear_stats();
  clear_graph();
  global_choose_deposition = 'BD';
  //document.getElementById("describe-deposition")
   // .innerHtml = "ballistic deposition";
}

