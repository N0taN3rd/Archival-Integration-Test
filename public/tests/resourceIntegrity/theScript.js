var theElem = document.getElementById('scriptSaysHi')
var p = document.createElement('p')
var theLink = 'https://w3c.github.io/webappsec-subresource-integrity/'
p.innerHTML = '<a href="'+theLink+'">Subresource Integrity</a> protected script added me!'
theElem.appendChild(p)