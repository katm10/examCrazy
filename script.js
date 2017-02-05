var i = 0;

function duplicate() {
  i = i + 1;
  console.log(i);
  var original = document.getElementById("question0");
  var clone = original.cloneNode(true); // "deep" clone
  clone.id = "question" + i;
  for (b = 0; b > 5; b++) {
    clone.children[b].id = original.children[b].id.val().slice(0, -1) + i;
    console.log("id is: "+ clone.children[b].id.val();
    if (clone.children[b].tagName == "input" && clone.children[b].getAttribute("type") == "text") {
      clone.children[b].value = "";
	
    }
  }
  // or clone.id = ""; if the divs don't need an ID
  original.parentNode.appendChild(clone);
}

<<<<<<< HEAD
function startGame(){
	for(a = 0; a < i; a++){
		var currentQuestionBlock = document.getElementById("question"+a);
		var questionStr = currentQuestionBlock.children[0].val();
		var falseAnswer1 = currentQuestionBlock.children[1].val();
		var falseAnswer2 = currentQuestionBlock.children[2].val();
		var falseAnswer3 = currentQuestionBlock.children[3].val();
		var correctAnswer = currentQuestionBlock.children[4].val();
 var postData = {
    "questionStr": questionStr,
    uid: uid,
    body: body,
    title: title,
    starCount: 0,
    authorPic: picture
  };

  // Get a key for a new Post.
  var newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  return firebase.database().ref().update(updates);
	}
}
=======
function startGame() {
  var parent = document.getElementById("question1");
  var str = parent.children[0].getId();
  /*for(a = 0; a < i; a++){
  	var questionString = document.getElementById("questionStr-"+a).val();
  	var falseAnswer1 = document.getElementById("falseAnswer1-"+a).val();
  	var falseAnswer2 = document.getElementById("falseAnswer2-"+a).val();
  	var falseAnswer3 = document.getElementById("falseAnswer3-"+a).val();
  	var correctAnswer = document.getElementById("correctAnswer-"+a).val();
  	console.log(questionString + " " + falseAnswer1 + " " + falseAnswer2 + " " + falseAnswer3 + " " + correctAnswer);
  }*/
}
>>>>>>> origin/master
