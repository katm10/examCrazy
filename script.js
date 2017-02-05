var i = 1;

function duplicate() {
	i = i+1;
	console.log(i);
	var original = document.getElementById("question0");
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "question" + i;
    for(b = 0; b > 5; b++){
    	clone.children[b].id = original.children.id[b] + i;
    }
    // or clone.id = ""; if the divs don't need an ID
    original.appendChild(clone);
}

function startGame(){
	for(a = 0; a < i; a++){
		var questionString = document.getElementById("");
		console.log(questionString);
	}
}