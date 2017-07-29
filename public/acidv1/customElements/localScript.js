document.addEventListener('DOMContentLoaded', function () {
  var localScriptImage = new Image();
  localScriptImage.src = "pixel.png";
  localScriptImage.title = "test2a";
  var veryShady = document.getElementById('shadowJs').shadowRoot;
  var scriptParent = veryShady.getElementById('scriptParent');
  scriptParent.replaceChild(localScriptImage, veryShady.getElementById('localScript'));
});
