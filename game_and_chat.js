var public;
var refPrefix = "chatrooms/";
var chatroomID;
var username; 
var messages = [""];

window.onload = function(){

    if($.jStorage.get("username")==null){
        username = prompt("Hi! It seems like you haven't entered your username before. Please enter it below. (Note: This will be used for all chatrooms. Please don't make it something stupid.)", "Username");
        $.jStorage.set("username", username);
    }else{
        username = $.jStorage.get("username");
    }

    $('#messageTextBox').keyup(function(event){
        keyup(event);    
    });
    $('#sendMessage').click(function(){
        submit();
    });


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
    console.log(chatroomID);
    if(public){
        document.getElementById("name").innerHTML = chatroomID + " Chat";
    } else{
       chatroomRef.once('value').then(function(snapshot) {

           var name = snapshot.child("name").val();
           if(name != null){
           document.getElementById("name").innerHTML = name + " Chat";
           }else{
               document.getElementById("name").innerHTML = chatroomID + " Chat";
           }
       });
    }
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

    chatroomRef.once('value').then(function(snapshot) {
        console.log(snapshot.child("quizKey").val());
        if(snapshot.child("quizKey").val() == null){
            deleteElement("quizBox");
        }else{
            var quizKey = snapshot.child("quizKey").val();
            setUpQuiz(quizKey);
        }
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

        messages.push(username + " : " + entered);
        firebase.database().ref(refPrefix+chatroomID+"/messages").set(messages);

        update();
        document.getElementById("messageTextBox").value = "";
    }
}

//enter the string id of html element to remove it
function deleteElement(idStr){
    var elem = document.getElementById(idStr);
    elem.parentNode.removeChild(elem);
}

function setUpQuiz(key){
    var gameInfoRef = firebase.database().ref('Games/'+key);
    gameInfoRef.once('value').then(function(snapshot){
        var counter = 0;
        snapshot.forEach(function(childSnapshot) {
            var question = childSnapshot.child("questionStr");
            var ans1 = childSnapshot.child("falseAnswer1");
            var ans2 = childSnapshot.child("falseAnswer2");
            var ans3 = childSnapshot.child("falseAnswer3");
            var correct = childSnapshot.child("correctAnswer");
            var ansBoxes = [$('#box1'), $('#box2'), $('#box3'), $('#box4')];
            var correctBox = ansBoxes[Math.floor( Math.random() * 5 ) ];
            correctBox.val(correct);
        });
        console.log(counter);
    });
}
