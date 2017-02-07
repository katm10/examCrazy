
var i = 0;
var firebaseChatroomRef = firebase.database().ref('chatrooms/');

function randomNum() {
  var num = Math.floor(Math.random() * 90000000) + 10000000;
  //todo: figure out why this doesn't work
 /* var query = firebaseChatroomRef.orderByKey();
  	query.once("value").then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var key = childSnapshot.key; 
        if(key==num){
        	randomNum();
        }
    });
  });*/
  return num;
}

function duplicate() {
  i = i + 1;
  var original = document.getElementById("question0");
  var clone = original.cloneNode(true); // "deep" clone
  clone.id = "question" + i;
  $(clone).find("[id]").add(clone).each(function() {
    this.id = this.id.replace("0", "") + i;
  })
  var array = new Array();
  for (var ii = 0; ii < clone.childNodes.length; ii++) {
    var childId = clone.childNodes[ii].id;

    if (typeof(childId) !== 'undefined') {
      array.push(childId);
      $(clone.childNodes[ii]).val("");
    }
  }
  console.log(array);
  // or clone.id= ""; if the divs don't need an ID
  original.parentNode.appendChild(clone);
}

function buildUrl(url, parameters) {
  var qs = "";
  for (var key in parameters) {
    var value = parameters[key];
    qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1); //chop off last "&"
    url = url + "?" + qs;
  }
  return url;
}

function startGame() {
  var firebaseRef = firebase.database().ref('Games/');
  var firebaseGameRef = firebaseRef.push();
  var quizName = $('#quizNameInput').val();
  firebaseGameRef.child("Name").set(quizName);
  console.log(i);
  for (a = 0; a <= i; a++) {
    var firebaseQuestionRef = firebaseGameRef.child("question" + a);

    var currentQuestionBlock = document.getElementById("question" + a);
    var questionStr = $('#' + 'questionStr-' + a).val();
    var falseAnswer1 = $('#' + 'falseAnswer1-' + a).val();
    var falseAnswer2 = $('#' + 'falseAnswer2-' + a).val();
    var falseAnswer3 = $('#' + 'falseAnswer3-' + a).val();
    var correctAnswer = $('#' + 'correctAnswer-' + a).val();


    firebaseQuestionRef.set({
      "questionStr": questionStr,
      "falseAnswer1": falseAnswer1,
      "falseAnswer2": falseAnswer2,
      "falseAnswer3": falseAnswer3,
      "correctAnswer": correctAnswer
    });
    console.log(questionStr + " " + falseAnswer1 + " " + falseAnswer2 + " " + falseAnswer3 + " " + correctAnswer);

    // make chatroom page url
    var url = "https://katm10.github.io/examCrazy/game_and_chat.html";
    var num = randomNum();
    var parameters = {
      chatroomNum: num,
      quizKey: firebaseGameRef.key
    };

    window.location.replace(buildUrl(url, parameters));

  }
  /*for(a = 0; a < i; a++){
  	var questionString = document.getElementById("questionStr-"+a).val();
  	var falseAnswer1 = document.getElementById("falseAnswer1-"+a).val();
  	var falseAnswer2 = document.getElementById("falseAnswer2-"+a).val();
  	var falseAnswer3 = document.getElementById("falseAnswer3-"+a).val();
  	var correctAnswer = document.getElementById("correctAnswer-"+a).val();
  	console.log(questionString + " " + falseAnswer1 + " " + falseAnswer2 + " " + falseAnswer3 + " " + correctAnswer);
  }*/
}
