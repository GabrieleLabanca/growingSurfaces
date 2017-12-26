function load_listeners(){
  console.log("call listeners");
  document.getElementById("RD").addEventListener("click", switch_RD);
  document.getElementById("BD").addEventListener("click", switch_BD);
}
function switch_RD(){
  clear_grid();
  global_choose_deposition = 'RD';
  //document.getElementById("describe-deposition")
    .innerHtml = "random deposition";
}
function switch_BD(){
  clear_grid();   
  global_choose_deposition = 'BD';
  //document.getElementById("describe-deposition")
    .innerHtml = "ballistic deposition";
}

