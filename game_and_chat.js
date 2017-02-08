var public;
var refPrefix = "chatrooms/";
var chatroomID;

var messages = [""];

window.onload = function(){

    var chatroomID_ = decodeURIComponent(getUrlVars()["chatroomNum"]);
    
    public = chatroomID_.indexOf("PUBLIC_") >= 0;
    var chatroomRef;

    if(public){
        chatroomID = chatroomID_.substring(7, chatroomID_.length);
        refPrefix += "public/";
    }
    else {
        chatroomID = chatroomID_;
    }

    chatroomRef = firebase.database().ref(refPrefix+chatroomID);

    document.getElementById("name").innerHTML = chatroomID + " Chat";

	chatroomRef.once('value').then(function(snapshot) {
		if(snapshot.val() == null){
				alert("This chatroom does not exist.");
		}
        else {
            firebase.database().ref(refPrefix+chatroomID+"/messages").on('value', function(snapshot) {
                messages = snapshot.val();
                if(messages == null){
                    messages = [""];
                }
                update();
            });
        }
	});

};

function getUrlVars(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}  

function keyup(event){
    var x = event.which || event.keyCode;
    if(x == 13){
        submit();
        return true;
    }
    
    return false;
}

function msgsToString(){
    var str = "";
    for(var i = 0; i < messages.length; i++){
        str += messages[i] + "<br>";
    }
    return str;
}

function update(){
    var el = document.getElementById("chatBox");
    el.innerHTML = msgsToString();  
    el.scrollTop = el.scrollHeight;
}

function submit(){
    var entered = document.getElementById("messageTextBox").value;
    if(entered.length > 0){
        /*firebase.database().ref(refPrefix+entered+"/messages").once('value').then(function(snapshot) {
            messages = snapshot.val();
        });*/
        messages.push(entered);
        firebase.database().ref(refPrefix+chatroomID+"/messages").set(messages);

        update();
        document.getElementById("messageTextBox").value = "";
    }
}