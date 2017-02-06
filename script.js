var i = 0;


function duplicate() {
  i = i + 1;
  var original = document.getElementById("question0");
  var clone = original.cloneNode(true); // "deep" clone
  clone.id = "question" + i;
   $(clone).find("[id]").add(clone).each(function() {
        this.id = this.id.replace("0", "") + i;
    })
  var array = new Array();
   var oInput = document.getElementById('oInput');
for (var ii = 0; ii < clone.childNodes.length; ii++)
{
    var childId = clone.childNodes[ii].id;
   if(typeof(childId) !== 'undefined'){
    array.push(childId);
}
}
    console.log(array);
  // or clone.id= ""; if the divs don't need an ID
  original.parentNode.appendChild(clone);
}

function startGame(){
	console.log(i);
	for(a = 0; a <= i; a++){
		var currentQuestionBlock = document.getElementById("question"+a);
		var questionStr =  $('#'+'questionStr-'+a).val(); 
		var falseAnswer1 =  $('#'+'falseAnswer1-'+a).val();
		var falseAnswer2 =  $('#'+'falseAnswer2-'+a).val();
		var falseAnswer3 =  $('#'+'falseAnswer3-'+a).val();
		var correctAnswer =  $('#'+'correctAnswer-'+a).val();

		console.log(questionStr + " " + falseAnswer1 + " " + falseAnswer2 + " " + falseAnswer3 + " " + correctAnswer);

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