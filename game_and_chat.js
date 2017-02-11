var public;
var refPrefix = "chatrooms/";
var chatroomID;

var messages = [""];

window.onload = function(){

    if($.jStorage.get("username")==null){
        username = prompt("Hi! It seems like you haven't entered your username before. Please enter it below. (Note: This will be used for all chatrooms. Please don't make it something stupid.)", "Username");
        $.jStorage.set("username", username);
    }

    $('#messageTextBox').keyup(function(event){
        keyup(event);    
    });
    $('#sendMessage').click(function(){
        submit();
    });

    update();
}

function getUrlVars()
{

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
    firebase.database().ref(refPrefix+chatroomID+"/messages").once('value').then(function(snapshot) {
                messages = snapshot.val();
            });
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
            
            messages.push(entered);
            firebase.database().ref(refPrefix+chatroomID+"/messages").set(messages);

            update();
            document.getElementById("messageTextBox").value = "";
        }
    }
