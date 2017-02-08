window.onload = function(){
	
	var messagesRef = firebase.database().ref('chatrooms/public/').orderByKey();

	messagesRef.once('value').then(function(snapshot) {
		snapshot.forEach(function(childSnapshot){
			if(childSnapshot.val() != null){
				document.getElementById("roomList").innerHTML += '<a class="btn btn-lg btn-success" style="width:250px" onclick = "send(this)">'+childSnapshot.key+'</a><br><br>';
			}
		});
	});
}

function send(element){
	window.location = "https://katm10.github.io/examCrazy/game_and_chat.html?chatroomNum="+element.innerHTML;
}
