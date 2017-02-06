window.onload = function(){
	document.getElementById("privateCode").addEventListener('submit', function(e) {
		e.preventDefault();
	}, false);
}

function keyUp(event){
	var x = event.which || event.keyCode;
	if(x == 13){
		var entered = document.getElementById("privateCode").value;
		if(entered.length > 0){
			messagesRef = firebase.database().ref('chatrooms/'+entered);

			firebase.database().ref('chatrooms/'+entered).once('value').then(function(snapshot) {
				if(snapshot.val() == null){
					if(entered == "1"){
						firebase.database().ref('chatrooms/1').set({
							messages: [""],
							users: [""]
						});
						alert("Placeholder for making chat");
					}
					else {
						alert("Incorrect chat PIN.");
					}
				}
				else {
					alert("Placeholder for joining.");
				}
			});
		}
		
		return true;
	}
	
	return false;
}
