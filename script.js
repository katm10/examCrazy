var i = 1;

function duplicate() {
	i = i+1;
	var original = document.getElementById("button");
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "button" + i;
    // or clone.id = ""; if the divs don't need an ID
    original.parentNode.appendChild(clone);
}