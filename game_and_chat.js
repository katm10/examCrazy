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
/*Matrix for questions in this format
    | question-0     ans1-0   ans2-0    ans3-0    correct-0|
    | question-1     ans1-1   ans2-1    ans3-1    correct-1|
    | question-2     ans1-1   ans2-2    ans3-2    correct-2|

    so quizArr[1][2] returns ans2-1

    */
    var name;
    var quizArr = [];
    var gameInfoRef = firebase.database().ref('Games/'+key);
    gameInfoRef.once('value').then(function(snapshot){
        var counter = 0;
        snapshot.forEach(function(childSnapshot) {
            if(counter==0){
                name = childSnapshot.child("Name").val();
            }else{
                quizArr.push([childSnapshot.child("questionStr").val(),childSnapshot.child("falseAnswer1").val()
                    ,childSnapshot.child("falseAnswer2").val()
                    ,childSnapshot.child("falseAnswer3").val()
                    ,childSnapshot.child("correctAnswer").val()]);

            }
            counter++;
        });
        console.log(counter);
        console.log(quizArr[0][2]);
    });

    //------finished grabbing data; let the animating begin!-------------------------//

    var stage = new createjs.Stage("quizCanvas");
    var questionRect = new createjs.Shape();
    questionRect.graphics.beginStroke("black").drawRect(0, 0, stage.canvas.width, stage.canvas.height/ 2);
    var button1 = new createjs.Shape();
    button1.graphics.beginStroke("black").drawRect(0, stage.canvas.height/2, stage.canvas.width / 2, stage.canvas.height/ 4);
    var button2 = new createjs.Shape();
    button2.graphics.beginStroke("black").drawRect(0, stage.canvas.height - (stage.canvas.height/4), stage.canvas.width / 2, stage.canvas.height/ 4);
    var button3 = new createjs.Shape();
   button3.graphics.beginStroke("black").drawRect(stage.canvas.width/2, stage.canvas.height/2, stage.canvas.width / 2, stage.canvas.height/ 4);
    var button4 = new createjs.Shape();
    button4.graphics.beginStroke("black").drawRect(stage.canvas.width/2, stage.canvas.height - (stage.canvas.height/4), stage.canvas.width / 2, stage.canvas.height/ 4);
    stage.addChild(questionRect, button1, button2, button3, button4);
    stage.update();
}
