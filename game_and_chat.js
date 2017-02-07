
window.onload = function(){
	function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

	
	var chatroomID =getUrlVars()["chatroomNum"];
	console.log(chatroomID);
	
	var chatroomRef = firebase.database().ref('chatrooms/'+chatroomID);

	firebase.database().ref('chatrooms/'+chatroomID).once('value').then(function(snapshot) {
		if(snapshot.val() == null){
				alert("This chatroom does not exist.");
		}
	});

};
