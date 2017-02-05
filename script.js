var i = 1;

function duplicate() {
	i = i+1;
	console.log(i);
	var original = document.getElementById("question");
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "question" + i;
    // or clone.id = ""; if the divs don't need an ID
    original.appendChild(clone);
}

function startGame(){
	for(a = 0; a < i; a++){
		var questionString = document.getElementById("question"+a).getElementById("questionStr").val();
		console.log(questionString);
	}
}