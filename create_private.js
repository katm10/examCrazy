window.onload = function(){
	document.getElementById("privateCode").addEventListener('submit', function(e) {
		e.preventDefault();
	}, false);
}

function keyUp(event){
	var x = event.which || event.keyCode;
	if(x == 13){
		submit();
		return true;
	}
	
	return false;
}

function randomNum() {
	var num = Math.floor(Math.random() * 90000000) + 10000000;
  //todo: figure out why this doesn't work
  firebase.database().ref('chatrooms/').once("value").then(function(snapshot) {
  	if(snapshot.val() != null){
  		document.getElementById("warning").innerHTML = "Code already exists";
  	}
  });
  return num;
}

function submit(){
	var entered = document.getElementById("privateCode").value;

		var code = randomNum();
		firebase.database().ref('chatrooms/'+code).set({name: entered});
window.location.replace("https://katm10.github.io/examCrazy/game_and_chat.html?chatroomNum="+code);
}
