var externalScriptImage = new Image();
externalScriptImage.src = "pixel.png";
externalScriptImage.style = "width: 10px; height: 10px; margin: 0 1px 1px 0; padding: 0; display: block; float: left;";
var veryShady = document.getElementById('shadowJs').shadowRoot;
var scriptParent = veryShady.getElementById('scriptParent');
scriptParent.replaceChild(externalScriptImage,veryShady.getElementById('externalScript'));