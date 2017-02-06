
window.onload = function(){

	var url = window.location.href;
	var index = url.indexOf("?");
	if(index < 0)
		return;
	var chatroomID = url.substring(index + 1, url.length);
	console.log(chatroomID);
	
	var chatroomRef = firebase.database().ref('chatrooms/'+chatroomID);

	firebase.database().ref('chatrooms/'+chatroomID).once('value').then(function(snapshot) {
		if(snapshot.val() == null){
				alert("This chatroom does not exist.");
		}
	});

};
