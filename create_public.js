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

function submit(){
	var entered = document.getElementById("privateCode").value;
	if(entered.length > 0){
		firebase.database().ref('chatrooms/public/'+entered).once('value').then(function(snapshot) {
			if(snapshot.val() != null){
				document.getElementById("warning").innerHTML = "Name already exists";
			}
			else {
				firebase.database().ref('chatrooms/public/'+entered).set({
					messages: [""],
					users: [""]
				});
				window.location = "https://katm10.github.io/examCrazy/game_and_chat.html?chatroomNum=PUBLIC_"+entered;
			}
		});
	}
}
