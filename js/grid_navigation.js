function load_listeners(){
  document.getElementById("RD").addEventListener("click", switch_RD);
  document.getElementById("BD").addEventListener("click", switch_BD);
  document.getElementById("stop").addEventListener("click", stop_sim);
  //document.getElementById("clear_graph").addEventListener("click", clear_graph);
}
function switch_RD(){
  clear_grid();
  clear_stats();
  clear_graph();
  global_choose_deposition = 'RD';
  turn_off_lights();
  document.getElementById("rndtitle").style.color = "red";
}
function switch_BD(){
  clear_grid();  
  clear_stats();
  clear_graph();
  global_choose_deposition = 'BD';
  turn_off_lights();
  document.getElementById("baltitle").style.color = "red";
}
function stop_sim(){
  global_choose_deposition = null;
}
function turn_off_lights(){
  document.getElementById("rndtitle").style.color = "";
  document.getElementById("baltitle").style.color = "";
}
