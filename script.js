var i = 0;

function duplicate() {
	var original = document.getElementById("duplicater");
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "duplicater" + ++i;
    // or clone.id = ""; if the divs don't need an ID
    document.getElementById("body").parentNode.appendChild(clone);
}