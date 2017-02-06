
window.onload = function(){

  var url = window.location.href;
  var index = url.indexOf("?");
  var chatroomID = url.substring(index, url.length);
  console.log(chatroomID);

};
