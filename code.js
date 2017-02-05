function keyUp(event){
    var x = event.which || event.keyCode;
    console.log(x);
    if(x == 13){
      console.log("enter");
      var text = document.getElementById("textbox").value;
      var body = document.getElementById("body").innerHTML;
      document.getElementById("body").innerHTML = text + "<br>" + body;
      document.getElementById("textbox").value = "";
      $("#textbox").focus();
      
    }
}
