var i = 0;

function duplicate() {
	i = i+1;
	console.log(i);
	var original = document.getElementById("question0");
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "question0" + i;
    for(b = 0; b > 5; b++){
    	clone.children[b].id = original.children.id[b].val() + i;
    }
    // or clone.id = ""; if the divs don't need an ID
    original.appendChild(clone);
}

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