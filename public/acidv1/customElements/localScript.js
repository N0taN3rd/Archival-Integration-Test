var localScriptImage = new Image();
localScriptImage.src = "pixel.png";
localScriptImage.style = "width: 10px; height: 10px; margin: 0 1px 1px 0; padding: 0; display: block; float: left;";
localScriptImage.title = "test2a";
var veryShady = document.getElementById('shadowJs').shadowRoot;
var scriptParent = veryShady.getElementById('scriptParent');
scriptParent.replaceChild(localScriptImage, veryShady.getElementById('localScript'));
