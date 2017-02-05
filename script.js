var i = 1;

function duplicate() {
	i = i+1;
	console.log(i);
	var original = document.getElementById("question");
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "question" + i;
    // or clone.id = ""; if the divs don't need an ID
    original.parentNode.appendChild(clone);
}
