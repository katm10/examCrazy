var id = 0;
	
var messages = [""];
var messagesRef;
var currentColor = [0, 0, 0];
var targetColor = [0, 0, 0];
	
function update(){
	var el = document.getElementById("messages");
	el.innerHTML = msgsToString();	
	el.scrollTop = el.scrollHeight;
}
	
window.onload = function(){
	//update();
	var i = 0;
	setInterval(function(){
		if(i % 2000 == 0){
			targetColor = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
		}
		
		for(var j = 0; j < currentColor.length; j++){
			currentColor[j] += (targetColor[j] - currentColor[j])/10.0;
		}
		
		document.body.style.background = "rgb(" + Math.trunc(currentColor[0]) + "," + Math.trunc(currentColor[1]) + "," + Math.trunc(currentColor[2]) + ")";
		
		i += 100;
	}, 100);
};
function read(){
	/*firebase.database().ref('messages').once('value').then(function(snapshot) {
		messages = snapshot.val().messages;
		if(messages == null){
			messages = [""];	
		}
	});	*/
}
	
function msgsToString(){
	var str = "";
	for(var i = 0; i < messages.length; i++){
		str += messages[i] + "<br>";
	}
	return str;
}
function clearTextBox(){
	document.getElementById("textbox").value = "";
}
function keyUp(event){
	var x = event.which || event.keyCode;
	if(x == 13){
		if(id == 0){
			var entered = document.getElementById("textbox").value;
			if(entered.length > 0){
				messagesRef = firebase.database().ref('messages/'+entered);
				
				firebase.database().ref('messages/'+entered).once('value').then(function(snapshot) {
					if(snapshot.val() == null){
						if(entered == "1"){
							firebase.database().ref('messages/1').set({
								messages: [""]
							});
						}
						else {
							alert("Incorrect chat PIN.");
						}
					}
					else {
						id = entered;
						document.getElementById("header").innerHTML = "You have joined "+entered;
						messages = snapshot.val().messages;
						if(messages == null){
							messages = [""];
						}
						
						messagesRef.on('value', function(snapshot) {
							messages = snapshot.val().messages;
							if(messages == null){
								messages = [""];
							}
							update();
						});
						update();
					}
				});
		        }
			
			clearTextBox();
		}
		else {
			var text = document.getElementById("textbox").value;
			var body = document.getElementById("body").innerHTML;
			read();
			messages.push(text);
			firebase.database().ref('messages/'+id).set({
				messages: messages
			});
			update();
			//document.getElementById("body").innerHTML = text + "<br>" + body;
			clearTextBox();
			$("#textbox").focus();
		}
	}
}
