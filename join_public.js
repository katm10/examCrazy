window.onload = function(){
	
	var messagesRef = firebase.database().ref('chatrooms/public/').orderByKey();

	var max = 0;
	var size = 0;
	messagesRef.once('value').then(function(snapshot) {
		snapshot.forEach(function(childSnapshot){
			if(childSnapshot.val() != null){
				document.getElementById("roomList").innerHTML += '<a id="e'+size+'" class="btn btn-lg btn-success" onclick = "send(this)">'+childSnapshot.key+'</a><br><br>';
				size++;
			}
		});
		
		for(var i = 0; i < size; i++){
			var width = document.getElementById("e"+i).clientWidth;
			
			if(width > max){
				max = width;
			}
		}

		for(var i = 0; i < size; i++){
			document.getElementById("e"+i).style.width = max;
		}	
	});
}

function send(element){
	window.location = "https://katm10.github.io/examCrazy/game_and_chat.html?chatroomNum=PUBLIC_"+element.innerHTML;
}
